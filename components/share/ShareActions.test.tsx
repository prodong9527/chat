// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ShareActions } from "./ShareActions";

const { drawShareCard } = vi.hoisted(() => ({ drawShareCard: vi.fn(() => { throw new Error("canvas unavailable"); }) }));

vi.mock("@/lib/share/canvas", () => ({
  drawShareCard,
  exportPng: vi.fn(),
  selectShareSize: vi.fn(() => ({ width: 1080, height: 1080 })),
  triggerDownload: vi.fn(),
  tryNativeShare: vi.fn(),
}));

describe("ShareActions", () => {
  it("keeps its result actions available when canvas drawing fails", async () => {
    render(<ShareActions template="drill" payload={{ title: "演练通报", body: "文字结果仍可复制" }} filename="drill.png" />);

    expect(screen.getByRole("button", { name: "保存图片" })).toBeTruthy();
    expect(await screen.findByText("图片没盖出来，文字结果还在，重试一次即可。")).toBeTruthy();
  });
});
