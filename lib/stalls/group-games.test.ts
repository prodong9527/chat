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

  it("makes a local award fallback with a group invitation", () => {
    const result = createFallbackGroupGameResult("performance-defense");

    expect(result.shareTemplate).toBe("award");
    expect(groupGameShareText("performance-defense", result)).toContain("请各位同事提交自己的年度获奖项目");
  });
});
