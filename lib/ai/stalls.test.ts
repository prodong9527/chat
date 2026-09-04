import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { parseStallResult } from "../stalls/result";
import { generateGroupGameResult } from "./stalls";

const { mockGenerateText } = vi.hoisted(() => ({ mockGenerateText: vi.fn() }));

vi.mock("ai", () => ({ generateText: mockGenerateText, streamText: vi.fn() }));

describe("stall results", () => {
  beforeEach(() => {
    mockGenerateText.mockReset();
    vi.spyOn(console, "error").mockImplementation(() => undefined);
  });

  afterEach(() => vi.restoreAllMocks());

  it("accepts a fenced JSON model response and strips the fence", () => expect(parseStallResult('```json\n{"title":"回执","summary":"已办","sections":[]}\n```').title).toBe("回执"));
  it("extracts JSON after a Qwen reasoning prefix", () => expect(parseStallResult('<think>先想想</think>\n{"title":"回执","summary":"已办","sections":[]}').title).toBe("回执"));
  it("falls back to the default share template for unknown model values", () => expect(parseStallResult('{"title":"回执","summary":"已办","sections":[],"shareTemplate":"receipt"}').shareTemplate).toBe("notice"));
  it("rejects a model response without all required result fields", () => expect(() => parseStallResult('{"title":"缺页"}')).toThrow("模型回执字段不合规"));

  it("never invokes a model or surfaces an unsafe model response for group games", async () => {
    mockGenerateText.mockResolvedValueOnce({ text: '{"title":"张三是废物","summary":"编造病假后偷偷溜走","sections":[],"shareTemplate":"drill"}' });

    const result = await generateGroupGameResult("meeting-exit", { meetingType: "例会", exitLevel: "紧急" });
    const visibleText = [result.title, result.summary, ...result.sections.map(({ value }) => value)].join("\n");

    expect(mockGenerateText).not.toHaveBeenCalled();
    expect(result.isFallback).not.toBe(true);
    expect(visibleText).not.toContain("张三是废物");
    expect(visibleText).not.toContain("编造病假后偷偷溜走");
  });

  it("never surfaces arbitrary nickname or small-task input in a curated group result", async () => {
    const newcomer = await generateGroupGameResult("newcomer-guide", { nickname: "小王是废物", departmentType: "产品" });
    const award = await generateGroupGameResult("performance-defense", { smallTask: "编造病假后偷偷溜走", workType: "协作" });
    const visibleText = [newcomer, award].flatMap((result) => [result.title, result.summary, ...result.sections.map(({ value }) => value)]).join("\n");

    expect(visibleText).not.toContain("小王是废物");
    expect(visibleText).not.toContain("编造病假后偷偷溜走");
  });

  it("returns exactly three discrete hidden rules in every newcomer result", async () => {
    const result = await generateGroupGameResult("newcomer-guide", { departmentType: "产品" });
    const hiddenRules = result.sections.find(({ label }) => label === "隐藏条例")?.value.split("\n");

    expect(hiddenRules).toHaveLength(3);
  });
});
