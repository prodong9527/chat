// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { drawShareCard, sanitizeSharePayload, selectShareSize } from "./canvas";

describe("share canvas", () => {
  beforeEach(() => {
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue({
      fillRect: vi.fn(), strokeRect: vi.fn(), fillText: vi.fn(), beginPath: vi.fn(), moveTo: vi.fn(), lineTo: vi.fn(), stroke: vi.fn(), arc: vi.fn(), fill: vi.fn(), measureText: () => ({ width: 0 }),
    } as unknown as CanvasRenderingContext2D);
  });
  afterEach(() => vi.restoreAllMocks());

  it("caps long user content before drawing a share card", () => {
    expect(sanitizeSharePayload({ title: "工牌", body: "x".repeat(800) }).body.length).toBeLessThanOrEqual(240);
  });
  it("preserves the requested share theme through sanitization", () => {
    expect(sanitizeSharePayload({ title: "工牌", body: "测试", template: "handbook" })).toMatchObject({ template: "handbook" });
  });
  it("selects a mobile-safe image size", () => expect(selectShareSize(375)).toEqual({ width: 1080, height: 1350 }));
  it.each(["handbook", "drill", "award"] as const)("draws %s at vertical size", (template) => {
    const canvas = document.createElement("canvas");
    drawShareCard(canvas, { title: "测试回执", body: "用于群聊接梗的测试内容", footer: "9527 号签发", template }, { width: 1080, height: 1350 });
    expect(canvas.width).toBe(1080);
    expect(canvas.height).toBe(1350);
  });
});
