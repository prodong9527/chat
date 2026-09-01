import { describe, expect, it } from "vitest";
import { parseStallResult } from "./stalls";
describe("stall results", () => {
  it("accepts a fenced JSON model response and strips the fence", () => expect(parseStallResult('```json\n{"title":"回执","summary":"已办","sections":[]}\n```').title).toBe("回执"));
  it("extracts JSON after a Qwen reasoning prefix", () => expect(parseStallResult('<think>先想想</think>\n{"title":"回执","summary":"已办","sections":[]}').title).toBe("回执"));
  it("rejects a model response without all required result fields", () => expect(() => parseStallResult('{"title":"缺页"}')).toThrow("模型回执格式不对"));
});
