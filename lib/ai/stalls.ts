import { generateText, streamText } from "ai";
import { qwen, MODEL_ID } from "@/lib/model";
import type { Stall, StallResult } from "@/lib/market/types";
import {
  createFallbackGroupGameResult,
  getGroupGameDefinition,
  type GroupGameSlug,
} from "@/lib/stalls/group-games";
import { parseStallResult } from "@/lib/stalls/result";
const STALL_INSTRUCTIONS: Record<string, string> = {
  "read-reply": "生成恰好五条已读乱回，每条都放进一个 section，label 为‘回复 1’至‘回复 5’；summary 只说明已生成五条回复，绝不能复述用户原话。",
  "blame-translation": "输出正常人话、职场安全话术和三个可选变体；避免人身攻击。",
  "leave-request": "输出保守、正常、离谱三个 section；每个 section 都必须包含请假理由、领导可能回复和推荐跟进回复。不要编造医疗诊断、法律事实或公司制度。",
  "weekly-report": "输出一段约 200 字专业周报、一个‘本周亮点’ section 和一个‘下周计划’ section。",
};
export function streamStallResult(stall: Stall, input: Record<string, string>) {
  const content = Object.entries(input).map(([key, value]) => `${key}: ${value.slice(0, 500)}`).join("\n");
  const instruction = STALL_INSTRUCTIONS[stall.slug] ?? "根据业务给出清晰回执。";
  // Return headers immediately so Vercel and mobile networks keep the request open
  // while Qwen reasons. The browser parses the complete JSON receipt at the end.
  const result = streamText({ model: qwen(MODEL_ID), temperature: 0.8, maxOutputTokens: 1_000, abortSignal: AbortSignal.timeout(120_000), providerOptions: { qwenLocal: { enable_thinking: false } }, system: `你是华府后街的${stall.name}。用中文荒诞但友善地办理业务。${instruction} 每个 value 最多 60 个汉字；若是已读乱回，每条最多 36 个汉字。只返回 JSON，结构为 {title,summary,sections:[{label,value}],shareTemplate}，不要 Markdown。`, prompt: content, onError: (error) => console.error("Stall model stream failed", error) });
  return result.toTextStreamResponse();
}

const GROUP_GAME_SAFETY_PATTERNS = [
  /(?:某(?:人|公司|组织)|具体(?:个人|公司|组织)).{0,20}(?:蠢|废物|垃圾|骗子|无能)/,
  /(?:低等|劣等|不配|天生不适合)/,
  /(?:听说|据传|内部消息|有人说).{0,40}(?:公司|组织|同事|领导)/,
  /(?:假装|伪造|谎称|偷偷离开|不告而别).{0,30}(?:会议|生病|有事|离席)/,
];

function isSafeGroupGameResult(result: StallResult) {
  const content = [result.title, result.summary, ...result.sections.flatMap(({ label, value }) => [label, value])].join("\n");
  return !GROUP_GAME_SAFETY_PATTERNS.some((pattern) => pattern.test(content));
}

export async function generateGroupGameResult(slug: GroupGameSlug, input: Record<string, string>): Promise<StallResult> {
  const definition = getGroupGameDefinition(slug);
  const content = Object.entries(input).map(([key, value]) => `${key}: ${value.slice(0, 500)}`).join("\n");

  try {
    const { text } = await generateText({
      model: qwen(MODEL_ID),
      temperature: 0.8,
      maxOutputTokens: 700,
      abortSignal: AbortSignal.timeout(120_000),
      providerOptions: { qwenLocal: { enable_thinking: false } },
      system: `你是华府后街的群聊小游戏主持人。${definition.instruction} 不得攻击具体个人或组织；不得使用歧视性语言；不得编造传闻式事实；不得提供欺骗性会议离席指引。只返回 JSON，结构为 {title,summary,sections:[{label,value}],shareTemplate}，不要 Markdown。shareTemplate 必须是 "${definition.shareTemplate}"。`,
      prompt: content,
    });
    const result = parseStallResult(text);

    if (result.shareTemplate !== definition.shareTemplate || !isSafeGroupGameResult(result)) {
      throw new Error("群聊小游戏模型回执不符合安全或模板要求");
    }

    return result;
  } catch (error) {
    console.error("Group stall model generation failed", { slug, error });
    return createFallbackGroupGameResult(slug);
  }
}
