import { describe, expect, it } from "vitest";
import { POST } from "./route";

describe("metrics API", () => {
  it("accepts only approved metric event names", async () => {
    const response = await POST(new Request("https://9527.example/api/metrics", {
      method: "POST", headers: { "content-type": "application/json" },
      body: JSON.stringify({ slug: "huafu-badge", event: "prompt" }),
    }));
    expect(response.status).toBe(400);
  });
});
