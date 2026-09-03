import type { SharePayload } from "@/lib/share/canvas";
import type { StallResult } from "@/lib/market/types";

export function resultSharePayload(result: StallResult): SharePayload {
  const sections = result.sections.slice(0, 3).map(({ label, value }) => `${label}：${value}`);
  return { title: result.title, body: [result.summary, ...sections].join("\n"), footer: "本回执由 9527 号签发" };
}
