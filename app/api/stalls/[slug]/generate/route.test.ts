import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const { mockCheckRate, mockGetPublicStall, mockGenerateGroupGameResult, mockStreamStallResult } = vi.hoisted(() => ({
  mockCheckRate: vi.fn(),
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
  checkRate: mockCheckRate,
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

function jsonRequest(payload: unknown, slug = "meeting-exit") {
  return new Request(`https://9527.example/api/stalls/${slug}/generate`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  });
}

describe("stall generation API", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, "error").mockImplementation(() => undefined);
    mockCheckRate.mockReturnValue({ ok: true });
  });

  afterEach(() => {
    vi.restoreAllMocks();
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

  it("streams a legacy stall with its input field", async () => {
    const stall = openGroupStall("read-reply");
    const streamResponse = new Response("legacy stream");
    mockGetPublicStall.mockResolvedValue(stall);
    mockStreamStallResult.mockReturnValue(streamResponse);

    const response = await POST(jsonRequest({ input: "收到" }, "read-reply"), {
      params: Promise.resolve({ slug: "read-reply" }),
    });

    expect(response).toBe(streamResponse);
    expect(mockStreamStallResult).toHaveBeenCalledWith(stall, { input: "收到" });
  });

  it("returns 404 when the stall is unavailable", async () => {
    mockGetPublicStall.mockResolvedValue(null);

    const response = await POST(jsonRequest({ input: "收到" }, "read-reply"), {
      params: Promise.resolve({ slug: "read-reply" }),
    });

    expect(response.status).toBe(404);
    await expect(response.json()).resolves.toEqual({ error: "not_found" });
  });

  it("returns 429 when the caller exceeds the rate limit", async () => {
    mockGetPublicStall.mockResolvedValue(openGroupStall("read-reply"));
    mockCheckRate.mockReturnValue({ ok: false, reason: "slow down" });

    const response = await POST(jsonRequest({ input: "收到" }, "read-reply"), {
      params: Promise.resolve({ slug: "read-reply" }),
    });

    expect(response.status).toBe(429);
    await expect(response.json()).resolves.toEqual({ error: "rate" });
  });

  it("returns 400 for a malformed JSON request body", async () => {
    mockGetPublicStall.mockResolvedValue(openGroupStall("read-reply"));
    const request = new Request("https://9527.example/api/stalls/read-reply/generate", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: "{",
    });

    const response = await POST(request, { params: Promise.resolve({ slug: "read-reply" }) });

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({ error: "bad_request" });
  });

  it("returns 503 when legacy generation fails", async () => {
    mockGetPublicStall.mockResolvedValue(openGroupStall("read-reply"));
    mockStreamStallResult.mockImplementation(() => { throw new Error("model unavailable"); });

    const response = await POST(jsonRequest({ input: "收到" }, "read-reply"), {
      params: Promise.resolve({ slug: "read-reply" }),
    });

    expect(response.status).toBe(503);
    await expect(response.json()).resolves.toEqual({ error: "idle" });
  });
});
