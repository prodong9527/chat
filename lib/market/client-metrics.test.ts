import { describe, expect, it, vi } from "vitest";
import { recordGeneration } from "./client-metrics";

describe("recordGeneration", () => {
  it("posts exactly one generation event for the completed stall", async () => {
    const request = vi.fn(async () => new Response(null, { status: 204 }));

    await recordGeneration("huafu-badge", request);

    expect(request).toHaveBeenCalledWith("/api/metrics", expect.objectContaining({
      method: "POST",
      body: JSON.stringify({ slug: "huafu-badge", event: "generation" }),
    }));
  });
});
