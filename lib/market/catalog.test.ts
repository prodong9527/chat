import { describe, expect, it } from "vitest";
import { LAUNCH_STALLS } from "./catalog";

describe("launch market", () => {
  it("includes the three planned coming-soon stalls", () => {
    expect(LAUNCH_STALLS.filter((stall) => stall.status === "coming_soon").map((stall) => stall.slug)).toEqual([
      "newcomer-guide", "meeting-exit", "performance-defense",
    ]);
  });
});
