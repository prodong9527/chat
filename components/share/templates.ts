import type { SharePayload } from "@/lib/share/canvas";
export function resultSharePayload(title: string, body: string): SharePayload { return { title, body, footer: "本回执由 9527 号签发" }; }
