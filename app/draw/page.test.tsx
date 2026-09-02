import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import DrawPage from "./page";

describe("DrawPage", () => {
  it("uses the same return-to-market entry as other stalls", () => {
    render(<DrawPage />);
    expect(screen.getByRole("link", { name: /返回集市/ }).getAttribute("href")).toBe("/");
  });
});
