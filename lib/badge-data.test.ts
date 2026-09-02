import { describe, expect, it } from "vitest";
import { createBadge } from "./badge-data";

describe("createBadge", () => {
  it("keeps the entered name while changing the other badge fields", () => {
    const first = createBadge("张三", () => 0);
    const next = createBadge("张三", () => 0.7);

    expect(first.name).toBe("张三");
    expect(next.name).toBe("张三");
    expect(next).not.toEqual(first);
  });
});
