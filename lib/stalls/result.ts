import { z } from "zod";
import { ShareTemplateSchema, type StallResult } from "@/lib/market/types";

const ResultSchema = z.object({
  title: z.string().min(1).max(80),
  summary: z.string().min(1).max(240),
  sections: z.array(z.object({ label: z.string().min(1).max(30), value: z.string().min(1).max(240) })).max(8),
  shareTemplate: ShareTemplateSchema.default("notice"),
  isFallback: z.boolean().optional(),
});
const SHARE_TEMPLATES = new Set<string>(ShareTemplateSchema.options);

export const SERVICE_FIELDS: Record<string, { label: string; placeholder: string; mode?: "select"; options?: string[] }> = {
  "read-reply": { label: "同事发来的原话", placeholder: "例如：在吗？今天的方案能发我吗？" },
  "blame-translation": { label: "需要翻译的话", placeholder: "例如：我们要打造行业颠覆性的生态闭环" },
  "leave-request": { label: "请假缘由", placeholder: "例如：明天不想上班" },
  "weekly-report": { label: "今天完成的事", placeholder: "例如：今天修了个 bug" },
};

export function parseStallResult(text: string): StallResult {
  try {
    const stripped = text.trim().replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "");
    // Qwen may place a <think> block or a short explanation before the JSON receipt.
    const json = stripped.match(/\{[\s\S]*\}/)?.[0] ?? stripped;
    const receipt = JSON.parse(json) as Record<string, unknown>;
    if (typeof receipt.shareTemplate === "string" && !SHARE_TEMPLATES.has(receipt.shareTemplate)) {
      receipt.shareTemplate = "notice";
    }
    return ResultSchema.parse(receipt);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(`模型回执字段不合规：${error.issues.map((issue) => issue.path.join(".") || "根对象").join(",")}`);
    }
    throw new Error("模型回执不是有效 JSON");
  }
}
