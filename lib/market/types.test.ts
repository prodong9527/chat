import { describe, expect, it } from "vitest";
import { StallSchema } from "./types";

describe("StallSchema", () => {
  it("rejects a public stall without a stable slug", () => {
    const validStall = {
      id: "00000000-0000-4000-8000-000000000001",
      slug: "huafu-badge",
      code: "A-01",
      districtSlug: "entry-services",
      name: "华府人事摊",
      description: "生成一张离谱工牌",
      status: "open" as const,
      type: "custom_ai" as const,
      sortOrder: 0,
      config: {},
    };

    expect(StallSchema.parse(validStall)).toEqual(validStall);

    const { slug: _slug, ...stallWithoutSlug } = validStall;
    void _slug;
    expect(() => StallSchema.parse(stallWithoutSlug)).toThrow();
  });
});
