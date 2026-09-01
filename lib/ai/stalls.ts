import { streamText } from "ai";
import { qwen, MODEL_ID } from "@/lib/model";
import type { Stall } from "@/lib/market/types";
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
  const result = streamText({ model: qwen(MODEL_ID), temperature: 0.8, maxOutputTokens: 1_000, abortSignal: AbortSignal.timeout(120_000), providerOptions: { qwenLocal: { enable_thinking: false } }, system: `你是华府后街的${stall.name}。用中文荒诞但友善地办理业务。${instruction} 每个 value 最多 60 个汉字；若是已读乱回，每条最多 36 个汉字。只返回 JSON，结构为 {title,summary,sections:[{label,value}],shareTemplate}，不要 Markdown。`, prompt: content, onError: (error) => console.error("Stall model stream failed", error), onFinish: ({ text, finishReason }) => { try { parseStallResult(text); console.info("Stall model stream finished", { finishReason, characters: text.length, validReceipt: true }); } catch (error) { console.error("Stall model receipt invalid", { finishReason, characters: text.length, reason: error instanceof Error ? error.message : "unknown" }); } } });
  return result.toTextStreamResponse();
}
