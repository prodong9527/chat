import { describe, expect, it } from "vitest";
import { CARD_LIBRARY, dealApplication, issueVerdict, type Application } from "./touming-data";

describe("投名状摊词库与规则", () => {
  it("provides a deep deck for every part of an application", () => {
    expect(CARD_LIBRARY.skill).toHaveLength(72);
    expect(CARD_LIBRARY.flaw).toHaveLength(72);
    expect(CARD_LIBRARY.connection).toHaveLength(72);
    expect(CARD_LIBRARY.tribute).toHaveLength(72);
  });

  it("deals five unseen choices for each part of an application", () => {
    const recentIds = CARD_LIBRARY.skill.slice(0, 10).map((card) => card.id);
    const deal = dealApplication(() => 0, recentIds);

    expect(deal.skill).toHaveLength(5);
    expect(new Set(deal.skill.map((card) => card.id)).size).toBe(5);
    expect(deal.skill.some((card) => recentIds.includes(card.id))).toBe(false);
    expect(deal.flaw).toHaveLength(5);
    expect(deal.connection).toHaveLength(5);
    expect(deal.tribute).toHaveLength(5);
  });

  it("sends a suspicious money-minded applicant to the temporary accounting innocence team", () => {
    const application: Application = {
      skill: { id: "test-skill", kind: "skill", text: "能把死账说成活账", tags: ["账房"] },
      flaw: { id: "test-flaw", kind: "flaw", text: "见银票就自动点头", tags: ["可疑"] },
      connection: { id: "test-connection", kind: "connection", text: "自称账房先生同乡", tags: ["账房"] },
      tribute: { id: "test-tribute", kind: "tribute", text: "一把来路不明的铁算盘", tags: ["账房", "可疑"] },
    };

    expect(issueVerdict(application)).toMatchObject({
      department: "账房临时清白组",
      title: "暂收，钥匙先别碰",
    });
  });
});
