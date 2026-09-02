import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/db/market", () => ({
  listTodayGenerationCounts: vi.fn(async () => ({ "huafu-badge": 3, "job-draw": 1 })),
}));

import { GET, POST } from "./route";

describe("metrics API", () => {
  it("returns today’s accepted counts keyed by stall slug", async () => {
    const response = await GET();

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ generations: { "huafu-badge": 3, "job-draw": 1 } });
  });

  it("accepts only approved metric event names", async () => {
    const response = await POST(new Request("https://9527.example/api/metrics", {
      method: "POST", headers: { "content-type": "application/json" },
      body: JSON.stringify({ slug: "huafu-badge", event: "prompt" }),
    }));
    expect(response.status).toBe(400);
  });
});
