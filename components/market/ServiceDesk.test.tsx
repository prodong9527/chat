import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ServiceDesk } from "./ServiceDesk";

vi.mock("@/components/share/ShareActions", () => ({
  ShareActions: () => <div aria-label="图片分享操作" />,
}));

const meetingResult = {
  title: "会议逃生演练通报",
  summary: "本次演练只练清晰沟通，不练消失术。",
  sections: [
    { label: "演练目标", value: "提前说明时间边界与需要的结论。" },
    { label: "离席通报", value: "我需要在约定时间离开。" },
  ],
  shareTemplate: "drill" as const,
  isFallback: true,
};

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("ServiceDesk", () => {
  it("allows an optional nickname while requiring the allowlisted department", async () => {
    const user = userEvent.setup();

    render(<ServiceDesk slug="newcomer-guide" name="新员工说明书摊" />);

    const nickname = screen.getByLabelText("新人代号（可留空）");
    const submit = screen.getByRole("button", { name: "递交材料" });
    expect(nickname.tagName).toBe("INPUT");
    expect(nickname.getAttribute("maxlength")).toBe("30");
    expect((submit as HTMLButtonElement).disabled).toBe(true);

    await user.selectOptions(screen.getByLabelText("拟入职部门"), "产品");
    expect((submit as HTMLButtonElement).disabled).toBe(false);
  });

  it("submits two meeting fields and shows the group prompt", async () => {
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(new Response(JSON.stringify(meetingResult), { status: 200 }))
      .mockResolvedValueOnce(new Response(null, { status: 204 }));
    vi.stubGlobal("fetch", fetchMock);
    const user = userEvent.setup();

    render(<ServiceDesk slug="meeting-exit" name="会议脱身处" />);

    await user.selectOptions(screen.getByLabelText("会议类型"), "例会");
    await user.selectOptions(screen.getByLabelText("演练等级"), "正常");
    await user.click(screen.getByRole("button", { name: "递交材料" }));

    expect(fetchMock).toHaveBeenCalledWith(
      "/api/stalls/meeting-exit/generate",
      expect.objectContaining({ body: JSON.stringify({ meetingType: "例会", exitLevel: "正常" }) }),
    );
    expect(await screen.findByText("请投票：这套方案能否在“最后补充一点”前成功离场？"))
      .toBeTruthy();
    expect(screen.getByText("本摊临时改由人工印刷")).toBeTruthy();
  });
});
