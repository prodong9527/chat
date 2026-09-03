import { describe, expect, it } from "vitest";
import { resultSharePayload } from "./templates";
import type { StallResult } from "@/lib/market/types";

const handbookResult: StallResult = {
  title: "华府新员工说明书",
  summary: "带着好奇心和一杯温水入职。",
  sections: [
    { label: "入府条例", value: "先问清目标。" },
    { label: "生存物资", value: "一支笔。" },
    { label: "部门暗号", value: "我来同步一下。" },
    { label: "不应分享", value: "第四项不进入群聊版。" },
  ],
  shareTemplate: "handbook",
};

describe("resultSharePayload", () => {
  it("formats a handbook as a concise group-ready payload", () => {
    expect(resultSharePayload(handbookResult)).toEqual({
      title: "华府新员工说明书",
      body: "带着好奇心和一杯温水入职。\n入府条例：先问清目标。\n生存物资：一支笔。\n部门暗号：我来同步一下。",
      footer: "本回执由 9527 号签发",
    });
  });
});
