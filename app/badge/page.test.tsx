import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import BadgePage from "./page";

describe("投名状摊", () => {
  it("lets a visitor assemble an application and receive an entry verdict", () => {
    render(<BadgePage />);

    expect(screen.getByRole("heading", { name: "投名状摊" })).toBeTruthy();
    expect(screen.getByText("四样凭据，缺一样都显得太像正经人。")).toBeTruthy();

    for (const kind of ["本事", "隐患", "来头", "投名礼"]) {
      fireEvent.click(screen.getAllByRole("button", { name: new RegExp(`^${kind}：`) })[0]);
    }

    fireEvent.click(screen.getByRole("button", { name: "递上投名状" }));
    expect(screen.getByText("华府收件批文")).toBeTruthy();
    expect(screen.getByText(/编入：/)).toBeTruthy();
  });
});
