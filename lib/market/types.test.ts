import { describe, expect, it } from "vitest";
import { StallSchema } from "./types";

describe("StallSchema", () => {
  it("rejects a public stall without a stable slug", () => {
    expect(() => StallSchema.parse({ name: "华府人事摊" })).toThrow();
  });
});
