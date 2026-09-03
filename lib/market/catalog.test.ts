import { describe, expect, it } from "vitest";
import { LAUNCH_STALLS } from "./catalog";

describe("launch market", () => {
  it("opens the three group games with shipped descriptions", () => {
    const bySlug = Object.fromEntries(LAUNCH_STALLS.map((stall) => [stall.slug, stall]));
    expect(bySlug["newcomer-guide"]).toMatchObject({ status: "open", description: "生成一份华府新员工说明书" });
    expect(bySlug["meeting-exit"]).toMatchObject({ status: "open", description: "抽一份会议逃生演练通报" });
    expect(bySlug["performance-defense"]).toMatchObject({ status: "open", description: "颁一张年度摸鱼成果奖" });
  });
});
