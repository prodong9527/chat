import { beforeEach, describe, expect, it, vi } from "vitest";

const { mockGetPublicStall, mockGenerateGroupGameResult, mockStreamStallResult } = vi.hoisted(() => ({
  mockGetPublicStall: vi.fn(),
  mockGenerateGroupGameResult: vi.fn(),
  mockStreamStallResult: vi.fn(),
}));

vi.mock("@/lib/db/market", () => ({ getPublicStall: mockGetPublicStall }));
vi.mock("@/lib/ai/stalls", () => ({
  generateGroupGameResult: mockGenerateGroupGameResult,
  streamStallResult: mockStreamStallResult,
}));
vi.mock("@/lib/guard", () => ({
  checkRate: vi.fn(() => ({ ok: true })),
  clientIp: vi.fn(() => "test-ip"),
}));

import { POST } from "./route";

const fallbackDrill = {
  title: "会议逃生演练通报",
  summary: "本次演练只练清晰沟通，不练消失术。",
  sections: [{ label: "演练目标", value: "提前说明时间边界与需要的结论。" }],
  shareTemplate: "drill",
};

function openGroupStall(slug: string) {
  return {
    id: "1d14f6fd-5766-4a85-a6fd-6c951a2f77b7",
    slug,
    code: "G-01",
    districtSlug: "huafu",
    name: "会议逃生演练",
    description: "练习清晰沟通",
    status: "open" as const,
    type: "local" as const,
    sortOrder: 0,
    config: {},
    generations: 0,
    totalGenerations: 0,
  };
}

function jsonRequest(payload: unknown) {
  return new Request("https://9527.example/api/stalls/meeting-exit/generate", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  });
}

describe("stall generation API", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns a group-game JSON receipt from a two-field payload", async () => {
    mockGetPublicStall.mockResolvedValue(openGroupStall("meeting-exit"));
    mockGenerateGroupGameResult.mockResolvedValue(fallbackDrill);

    const response = await POST(jsonRequest({ meetingType: "例会", exitLevel: "正常" }), {
      params: Promise.resolve({ slug: "meeting-exit" }),
    });

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toMatchObject({ shareTemplate: "drill" });
    expect(mockStreamStallResult).not.toHaveBeenCalled();
  });

  it("rejects undeclared group-game fields", async () => {
    mockGetPublicStall.mockResolvedValue(openGroupStall("meeting-exit"));

    const response = await POST(jsonRequest({ meetingType: "例会", exitLevel: "正常", target: "某同事" }), {
      params: Promise.resolve({ slug: "meeting-exit" }),
    });

    expect(response.status).toBe(400);
  });
});
