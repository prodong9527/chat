import { describe, expect, it } from "vitest";
import { sanitizeSharePayload, selectShareSize } from "./canvas";

describe("share canvas", () => {
  it("caps long user content before drawing a share card", () => {
    expect(sanitizeSharePayload({ title: "工牌", body: "x".repeat(800) }).body.length).toBeLessThanOrEqual(240);
  });
  it("selects a mobile-safe image size", () => expect(selectShareSize(375)).toEqual({ width: 1080, height: 1350 }));
});
