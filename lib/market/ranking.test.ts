import { describe, expect, it } from "vitest";
import { assignHotRanks } from "./ranking";

describe("assignHotRanks", () => {
  it("marks the three highest non-zero totals as popular stalls", () => {
    const ranked = assignHotRanks([
      { slug: "a", totalGenerations: 12 }, { slug: "b", totalGenerations: 4 },
      { slug: "c", totalGenerations: 9 }, { slug: "d", totalGenerations: 2 }, { slug: "e", totalGenerations: 0 },
    ]);
    expect(ranked).toEqual({ a: 1, c: 2, b: 3 });
  });
});
