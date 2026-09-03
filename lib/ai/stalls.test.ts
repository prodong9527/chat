import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { parseStallResult } from "../stalls/result";
import { generateGroupGameResult } from "./stalls";

const { mockGenerateText } = vi.hoisted(() => ({ mockGenerateText: vi.fn() }));

vi.mock("ai", () => ({ generateText: mockGenerateText, streamText: vi.fn() }));

const handbookJson = JSON.stringify({
  title: "华府新员工说明书",
  summary: "欢迎加入华府后街。",
  sections: [{ label: "第一条", value: "先把目标说清楚。" }],
  shareTemplate: "handbook",
});

function gameJson(overrides: Record<string, unknown> = {}) {
  return JSON.stringify({
    title: "华府小游戏回执",
    summary: "请友善协作。",
    sections: [{ label: "行动", value: "先说清楚目标。" }],
    shareTemplate: "handbook",
    ...overrides,
  });
}

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

  it("uses an explicit non-targeted safety instruction", async () => {
    mockGenerateText.mockResolvedValueOnce({ text: handbookJson });

    await generateGroupGameResult("newcomer-guide", { nickname: "新同事", departmentType: "产品" });

    expect(mockGenerateText.mock.calls[0][0].system).toContain("不得攻击具体个人");
  });

  it("returns a themed local fallback when the model rejects", async () => {
    mockGenerateText.mockRejectedValueOnce(new Error("provider unavailable"));

    await expect(generateGroupGameResult("meeting-exit", { meetingType: "例会", exitLevel: "正常" })).resolves.toMatchObject({ title: "会议逃生演练通报", shareTemplate: "drill" });
  });

  it("returns the local fallback when the model response cannot be parsed", async () => {
    mockGenerateText.mockResolvedValueOnce({ text: "not JSON" });

    await expect(generateGroupGameResult("newcomer-guide", { nickname: "新同事", departmentType: "产品" })).resolves.toMatchObject({ title: "华府新员工说明书", shareTemplate: "handbook" });
  });

  it("returns the local fallback when the model uses the wrong share template", async () => {
    mockGenerateText.mockResolvedValueOnce({ text: gameJson({ shareTemplate: "drill" }) });

    await expect(generateGroupGameResult("newcomer-guide", { nickname: "新同事", departmentType: "产品" })).resolves.toMatchObject({ title: "华府新员工说明书", shareTemplate: "handbook" });
  });

  it.each([
    ["a named-person attack", "newcomer-guide", { nickname: "新同事", departmentType: "产品" }, "张三是废物", "handbook"],
    ["a protected-characteristic claim", "newcomer-guide", { nickname: "新同事", departmentType: "产品" }, "女性天生不适合技术", "handbook"],
    ["a deceptive meeting-exit direction", "meeting-exit", { meetingType: "例会", exitLevel: "正常" }, "借口接电话后直接离开会议", "drill"],
  ] as const)("returns the local fallback for %s", async (_reason, slug, input, unsafeContent, template) => {
    mockGenerateText.mockResolvedValueOnce({ text: gameJson({ sections: [{ label: "行动", value: unsafeContent }], shareTemplate: template }) });

    await expect(generateGroupGameResult(slug, input)).resolves.toMatchObject({
      title: slug === "meeting-exit" ? "会议逃生演练通报" : "华府新员工说明书",
      shareTemplate: template,
    });
  });
});
