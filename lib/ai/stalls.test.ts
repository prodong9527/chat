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

  it("generates a complete distinct newcomer handbook for every department", async () => {
    const departments = ["产品", "技术", "设计", "运营", "综合"] as const;
    const results = await Promise.all(departments.map((departmentType) => generateGroupGameResult("newcomer-guide", { departmentType })));

    for (const result of results) {
      expect(result.shareTemplate).toBe("handbook");
      expect(result.sections.map(({ label }) => label)).toEqual(["入职首日必修课", "生存装备", "直属领导饲养指南", "隐藏条例"]);
      expect(result.sections[3]?.value.split("\n")).toHaveLength(3);
    }
    expect(new Set(results.map((result) => JSON.stringify(result))).size).toBe(departments.length);
  });

  it("generates distinct safe drills for every meeting type and exit level", async () => {
    const meetingTypes = ["例会", "评审会", "复盘会", "同步会"] as const;
    const exitLevels = ["正常", "紧急", "荒诞"] as const;
    const inputs = meetingTypes.flatMap((meetingType) => exitLevels.map((exitLevel) => ({ meetingType, exitLevel })));
    const results = await Promise.all(inputs.map((input) => generateGroupGameResult("meeting-exit", input)));

    for (const result of results) {
      expect(result.shareTemplate).toBe("drill");
      expect(result.sections.map(({ label }) => label)).toEqual(["突发事件", "当前逃生身份", "三步逃生动作", "预计成功率"]);
      expect(result.sections.some(({ label }) => label === "隐藏条例")).toBe(false);
    }
    expect(new Set(results.map((result) => JSON.stringify(result))).size).toBe(inputs.length);
  });

  it("maps every curated small-task category to a distinct award and preserves work-type variety", async () => {
    const categoryCases = [
      ["整理共享文件夹", "归档秩序奖"],
      ["回复同事的问题", "清晰回声奖"],
      ["修复登录故障", "补洞修补奖"],
      ["协调跨组排期", "协作接力奖"],
      ["给工位浇水", "默默推进奖"],
    ] as const;
    const categoryResults = await Promise.all(categoryCases.map(([smallTask]) => generateGroupGameResult("performance-defense", { smallTask, workType: "协作" })));
    const workTypes = ["协作", "救火", "整理", "沟通", "创意"] as const;
    const workTypeResults = await Promise.all(workTypes.map((workType) => generateGroupGameResult("performance-defense", { smallTask: "整理会议纪要", workType })));

    categoryResults.forEach((result, index) => {
      expect(result.shareTemplate).toBe("award");
      expect(result.sections.map(({ label }) => label)).toEqual(["奖项名称", "表彰事由", "可量化的虚构成果", "评审委员会批语"]);
      expect(result.sections[0]?.value).toBe(categoryCases[index]?.[1]);
      expect(result.sections.some(({ label }) => label === "隐藏条例")).toBe(false);
    });
    expect(new Set(workTypeResults.map((result) => JSON.stringify(result))).size).toBe(workTypes.length);
  });
});
