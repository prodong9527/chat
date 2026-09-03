import { describe, expect, it, vi } from "vitest";
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
describe("stall results", () => {
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
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => undefined);

    await expect(generateGroupGameResult("meeting-exit", { meetingType: "例会", exitLevel: "正常" })).resolves.toMatchObject({ shareTemplate: "drill" });

    errorSpy.mockRestore();
  });
});
