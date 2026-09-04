import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { parseStallResult } from "../stalls/result";
import { generateGroupGameResult } from "./stalls";

const { mockGenerateText } = vi.hoisted(() => ({ mockGenerateText: vi.fn() }));

vi.mock("ai", () => ({ generateText: mockGenerateText, streamText: vi.fn() }));

const handbookJson = JSON.stringify({
  title: "华府新员工说明书",
  summary: "欢迎加入华府后街。",
  sections: [
    { label: "入职首日必修课", value: "先把目标说清楚。" },
    { label: "生存装备", value: "一支笔和一杯温水。" },
    { label: "直属领导饲养指南", value: "用明确的事项和时间边界沟通。" },
    { label: "隐藏条例", value: "把问题写进待办。" },
  ],
  shareTemplate: "handbook",
});

function gameJson(slug: "newcomer-guide" | "meeting-exit", overrides: Record<string, unknown> = {}) {
  const isMeeting = slug === "meeting-exit";
  return JSON.stringify({
    title: isMeeting ? "会议逃生演练通报" : "华府新员工说明书",
    summary: "请友善协作。",
    sections: isMeeting
      ? [
        { label: "突发事件", value: "需要确认会议结论。" },
        { label: "当前逃生身份", value: "清晰沟通的事项负责人。" },
        { label: "三步逃生动作", value: "说明边界、确认负责人、会后补齐记录。" },
        { label: "预计成功率", value: "在完整交接下稳稳当当。" },
      ]
      : [
        { label: "入职首日必修课", value: "先说清楚目标。" },
        { label: "生存装备", value: "一支笔和一杯温水。" },
        { label: "直属领导饲养指南", value: "用明确的事项和时间边界沟通。" },
        { label: "隐藏条例", value: "把问题写进待办。" },
      ],
    shareTemplate: isMeeting ? "drill" : "handbook",
    ...overrides,
  });
}

describe("stall results", () => {
  beforeEach(() => {
    mockGenerateText.mockReset();
    vi.spyOn(console, "error").mockImplementation(() => undefined);
  });

  afterEach(() => vi.restoreAllMocks());

  it("accepts a fenced JSON model response and strips the fence", () => expect(parseStallResult('```json\n{"title":"回执","summary":"已办","sections":[]}\n```').title).toBe("回执"));
  it("extracts JSON after a Qwen reasoning prefix", () => expect(parseStallResult('<think>先想想</think>\n{"title":"回执","summary":"已办","sections":[]}').title).toBe("回执"));
  it("falls back to the default share template for unknown model values", () => expect(parseStallResult('{"title":"回执","summary":"已办","sections":[],"shareTemplate":"receipt"}').shareTemplate).toBe("notice"));
  it("rejects a model response without all required result fields", () => expect(() => parseStallResult('{"title":"缺页"}')).toThrow("模型回执字段不合规"));

  it("uses an explicit non-targeted safety instruction", async () => {
    mockGenerateText.mockResolvedValueOnce({ text: handbookJson });

    await generateGroupGameResult("newcomer-guide", { nickname: "新同事", departmentType: "产品" });

    expect(mockGenerateText.mock.calls[0][0].system).toContain("不得攻击具体个人");
  });

  it("does not send an entered nickname to the model or accept it back in the result", async () => {
    mockGenerateText.mockResolvedValueOnce({ text: handbookJson.replace("欢迎加入华府后街。", "小王，欢迎加入华府后街。") });

    await expect(generateGroupGameResult("newcomer-guide", { nickname: "小王", departmentType: "产品" })).resolves.toMatchObject({
      title: "华府新员工说明书",
      isFallback: true,
    });
    expect(mockGenerateText.mock.calls[0][0].prompt).not.toContain("小王");
  });

  it("falls back when a game result omits a required section", async () => {
    const incompleteHandbook = JSON.parse(handbookJson) as { sections: unknown[] };
    incompleteHandbook.sections.pop();
    mockGenerateText.mockResolvedValueOnce({ text: JSON.stringify(incompleteHandbook) });

    await expect(generateGroupGameResult("newcomer-guide", { departmentType: "产品" })).resolves.toMatchObject({
      title: "华府新员工说明书",
      isFallback: true,
    });
  });

  it("returns a themed local fallback when the model rejects", async () => {
    mockGenerateText.mockRejectedValueOnce(new Error("provider unavailable"));

    await expect(generateGroupGameResult("meeting-exit", { meetingType: "例会", exitLevel: "正常" })).resolves.toMatchObject({ title: "会议逃生演练通报", shareTemplate: "drill" });
  });

  it("returns the local fallback when the model response cannot be parsed", async () => {
    mockGenerateText.mockResolvedValueOnce({ text: "not JSON" });

    await expect(generateGroupGameResult("newcomer-guide", { nickname: "新同事", departmentType: "产品" })).resolves.toMatchObject({ title: "华府新员工说明书", shareTemplate: "handbook" });
  });

  it("returns the local fallback when the model uses the wrong share template", async () => {
    mockGenerateText.mockResolvedValueOnce({ text: gameJson("newcomer-guide", { shareTemplate: "drill" }) });

    await expect(generateGroupGameResult("newcomer-guide", { nickname: "新同事", departmentType: "产品" })).resolves.toMatchObject({ title: "华府新员工说明书", shareTemplate: "handbook" });
  });

  it.each([
    ["a named-person attack", "newcomer-guide", { nickname: "新同事", departmentType: "产品" }, "张三是废物", "handbook"],
    ["a named-person attack with an intensifier", "newcomer-guide", { nickname: "新同事", departmentType: "产品" }, "张三真是废物", "handbook"],
    ["a protected-characteristic claim", "newcomer-guide", { nickname: "新同事", departmentType: "产品" }, "女性天生不适合技术", "handbook"],
    ["a protected-characteristic insult", "newcomer-guide", { nickname: "新同事", departmentType: "产品" }, "女性都是废物", "handbook"],
    ["a manager attack", "newcomer-guide", { nickname: "新同事", departmentType: "产品" }, "王经理就是骗子", "handbook"],
    ["a protected-characteristic attack on a person", "newcomer-guide", { nickname: "新同事", departmentType: "产品" }, "小李是残疾人，所以不适合做这份工作", "handbook"],
    ["a deceptive meeting-exit direction", "meeting-exit", { meetingType: "例会", exitLevel: "正常" }, "借口接电话后直接离开会议", "drill"],
    ["a deceptive meeting-exit direction after the meeting reference", "meeting-exit", { meetingType: "例会", exitLevel: "正常" }, "会议中假装有急事后离开", "drill"],
    ["a covert deceptive meeting exit", "meeting-exit", { meetingType: "例会", exitLevel: "正常" }, "编造家里有事，趁会议偷偷溜走", "drill"],
  ] as const)("returns the local fallback for %s", async (_reason, slug, input, unsafeContent, template) => {
    const safeSections = slug === "meeting-exit"
      ? [
        { label: "突发事件", value: unsafeContent },
        { label: "当前逃生身份", value: "清晰沟通的事项负责人。" },
        { label: "三步逃生动作", value: "说明边界、确认负责人、会后补齐记录。" },
        { label: "预计成功率", value: "在完整交接下稳稳当当。" },
      ]
      : [
        { label: "入职首日必修课", value: unsafeContent },
        { label: "生存装备", value: "一支笔和一杯温水。" },
        { label: "直属领导饲养指南", value: "用明确的事项和时间边界沟通。" },
        { label: "隐藏条例", value: "把问题写进待办。" },
      ];
    mockGenerateText.mockResolvedValueOnce({ text: gameJson(slug, { sections: safeSections, shareTemplate: template }) });

    await expect(generateGroupGameResult(slug, input)).resolves.toMatchObject({
      title: slug === "meeting-exit" ? "会议逃生演练通报" : "华府新员工说明书",
      shareTemplate: template,
    });
  });
});
