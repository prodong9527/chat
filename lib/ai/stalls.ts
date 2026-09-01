import { generateText } from "ai";
import { z } from "zod";
import { qwen, MODEL_ID } from "@/lib/model";
import type { Stall, StallResult } from "@/lib/market/types";

const ResultSchema = z.object({ title: z.string().min(1).max(80), summary: z.string().min(1).max(240), sections: z.array(z.object({ label: z.string().min(1).max(30), value: z.string().min(1).max(240) })).max(8), shareTemplate: z.enum(["badge", "fortune", "chat", "notice", "leave", "report"]).default("notice") });
export const SERVICE_FIELDS: Record<string, { label: string; placeholder: string; mode?: "select"; options?: string[] }> = {
  "read-reply": { label: "同事发来的原话", placeholder: "例如：在吗？今天的方案能发我吗？" },
  "blame-translation": { label: "需要翻译的话", placeholder: "例如：我们要打造行业颠覆性的生态闭环" },
  "leave-request": { label: "请假缘由", placeholder: "例如：明天不想上班" },
  "weekly-report": { label: "今天完成的事", placeholder: "例如：今天修了个 bug" },
};
const STALL_INSTRUCTIONS: Record<string, string> = {
  "read-reply": "生成恰好五条已读乱回，每条都放进一个 section，label 为‘回复 1’至‘回复 5’；summary 只说明已生成五条回复，绝不能复述用户原话。",
  "blame-translation": "输出正常人话、职场安全话术和三个可选变体；避免人身攻击。",
  "leave-request": "输出保守、正常、离谱三个 section；每个 section 都必须包含请假理由、领导可能回复和推荐跟进回复。不要编造医疗诊断、法律事实或公司制度。",
  "weekly-report": "输出一段约 200 字专业周报、一个‘本周亮点’ section 和一个‘下周计划’ section。",
};
export function parseStallResult(text: string): StallResult { try { const stripped = text.trim().replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, ""); return ResultSchema.parse(JSON.parse(stripped)); } catch { throw new Error("模型回执格式不对"); } }
export async function generateStallResult(stall: Stall, input: Record<string, string>) {
  const content = Object.entries(input).map(([key, value]) => `${key}: ${value.slice(0, 500)}`).join("\n");
  const instruction = STALL_INSTRUCTIONS[stall.slug] ?? "根据业务给出清晰回执。";
  const result = await generateText({ model: qwen(MODEL_ID), temperature: 0.8, abortSignal: AbortSignal.timeout(120_000), system: `你是华府后街的${stall.name}。用中文荒诞但友善地办理业务。${instruction} 只返回 JSON，结构为 {title,summary,sections:[{label,value}],shareTemplate}，不要 Markdown。`, prompt: content });
  return parseStallResult(result.text);
}
