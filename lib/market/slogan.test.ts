import { describe, expect, it } from "vitest";
import { sloganForDate } from "./slogan";

describe("sloganForDate", () => {
  it("uses a stable but changing daily market slogan", () => {
    expect(sloganForDate(new Date("2026-09-01T00:00:00Z"))).not.toBe(sloganForDate(new Date("2026-09-02T00:00:00Z")));
  });
});
