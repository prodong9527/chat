import { describe, expect, it } from "vitest";
import { assertSameOrigin, requireAdmin } from "./admin";

describe("admin authentication", () => {
  it("rejects a tampered admin session cookie", async () => {
    const request = new Request("https://9527.example/_9527/neibu", {
      headers: { cookie: "huafu_admin=changed" },
    });

    await expect(requireAdmin(request)).rejects.toMatchObject({ status: 401 });
  });

  it("rejects a state-changing request from another origin", () => {
    const request = new Request("https://9527.example/api/admin/stalls", {
      method: "POST",
      headers: { origin: "https://attacker.example" },
    });

    expect(() => assertSameOrigin(request)).toThrow("origin");
  });
});
