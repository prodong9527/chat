import { describe, expect, it } from "vitest";
import {
  createFallbackGroupGameResult,
  getGroupGameDefinition,
  groupGameShareText,
  parseGroupGameInput,
} from "./group-games";

describe("group game contracts", () => {
  it("defines exactly two newcomer fields", () => {
    expect(getGroupGameDefinition("newcomer-guide").fields.map((field) => field.name)).toEqual(["nickname", "departmentType"]);
  });

  it("rejects undeclared meeting input", () => {
    expect(() => parseGroupGameInput("meeting-exit", { meetingType: "例会", exitLevel: "荒诞", target: "某人" })).toThrow();
  });

  it("only accepts the allowlisted option values and keeps the newcomer nickname optional", () => {
    expect(parseGroupGameInput("newcomer-guide", { departmentType: "产品" })).toEqual({ departmentType: "产品" });
    expect(() => parseGroupGameInput("newcomer-guide", { departmentType: "其它部门" })).toThrow();
    expect(() => parseGroupGameInput("meeting-exit", { meetingType: "例会", exitLevel: "加急" })).toThrow();
    expect(() => parseGroupGameInput("performance-defense", { smallTask: "整理共享文件夹", workType: "其它" })).toThrow();
  });

  it("uses the exact urgent level and the meeting voting invitation", () => {
    const definition = getGroupGameDefinition("meeting-exit");

    expect(definition.fields[1]?.options).toContain("紧急");
    expect(definition.groupPrompt).toBe("请投票：这套方案能否在“最后补充一点”前成功离场？");
  });

  it("makes a local award fallback with a group invitation", () => {
    const result = createFallbackGroupGameResult("performance-defense");

    expect(result.shareTemplate).toBe("award");
    expect(result.isFallback).toBe(true);
    expect(groupGameShareText("performance-defense", result)).toContain("请各位同事提交自己的年度获奖项目");
  });

  it.each([
    ["newcomer-guide", ["入职首日必修课", "生存装备", "直属领导饲养指南", "隐藏条例"]],
    ["meeting-exit", ["突发事件", "当前逃生身份", "三步逃生动作", "预计成功率"]],
    ["performance-defense", ["奖项名称", "表彰事由", "可量化的虚构成果", "评审委员会批语"]],
  ] as const)("provides every required %s fallback section", (slug, labels) => {
    expect(createFallbackGroupGameResult(slug).sections.map(({ label }) => label)).toEqual(labels);
  });

  it("includes exactly three discrete hidden rules in the newcomer fallback", () => {
    const hiddenRules = createFallbackGroupGameResult("newcomer-guide").sections.find(({ label }) => label === "隐藏条例")?.value.split("\n");

    expect(hiddenRules).toHaveLength(3);
    expect(hiddenRules).toEqual([
      expect.stringMatching(/^一、/),
      expect.stringMatching(/^二、/),
      expect.stringMatching(/^三、/),
    ]);
  });
});
