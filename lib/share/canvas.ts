export type ShareTemplate = "badge" | "fortune" | "chat" | "notice" | "leave" | "report" | "handbook" | "drill" | "award";
export type SharePayload = { title: string; body: string; subtitle?: string; footer?: string };

export function sanitizeSharePayload(payload: SharePayload): SharePayload {
  const clean = (value: string, max: number) => value.replace(/\s+/g, " ").trim().slice(0, max);
  return { title: clean(payload.title, 44), body: clean(payload.body, 240), subtitle: payload.subtitle ? clean(payload.subtitle, 80) : undefined, footer: payload.footer ? clean(payload.footer, 80) : undefined };
}
export function selectShareSize(viewportWidth: number) { return viewportWidth < 640 ? { width: 1080, height: 1350 } : { width: 1080, height: 1080 }; }
function lines(ctx: CanvasRenderingContext2D, text: string, maxWidth: number) { const output: string[] = []; let line = ""; for (const char of text) { if (ctx.measureText(line + char).width > maxWidth && line) { output.push(line); line = char; } else line += char; } if (line) output.push(line); return output; }
export function drawShareCard(canvas: HTMLCanvasElement, raw: SharePayload, size = { width: 1080, height: 1350 }) {
  const payload = sanitizeSharePayload(raw); canvas.width = size.width; canvas.height = size.height;
  const ctx = canvas.getContext("2d"); if (!ctx) throw new Error("canvas unavailable");
  ctx.fillStyle = "#f6f0e5"; ctx.fillRect(0, 0, size.width, size.height); ctx.strokeStyle = "#a8322d"; ctx.lineWidth = 12; ctx.strokeRect(42, 42, size.width - 84, size.height - 84);
  ctx.fillStyle = "#a8322d"; ctx.font = '32px "KaiTi", serif'; ctx.fillText("华府后街 · 9527 号", 96, 120);
  ctx.fillStyle = "#1f1c19"; ctx.font = 'bold 76px "KaiTi", serif'; lines(ctx, payload.title, size.width - 192).slice(0, 2).forEach((line, index) => ctx.fillText(line, 96, 260 + index * 96));
  ctx.fillStyle = "#554d43"; ctx.font = '38px "PingFang SC", sans-serif'; const bodyTop = 480; lines(ctx, payload.body, size.width - 192).slice(0, 7).forEach((line, index) => ctx.fillText(line, 96, bodyTop + index * 62));
  ctx.fillStyle = "#a8322d"; ctx.font = '28px "PingFang SC", sans-serif'; ctx.fillText(payload.footer ?? "解释权归华府所有", 96, size.height - 104);
}
export function exportPng(canvas: HTMLCanvasElement): Promise<Blob> { return new Promise((resolve, reject) => canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error("export failed")), "image/png")); }
export function triggerDownload(blob: Blob, filename: string) { const url = URL.createObjectURL(blob); const link = document.createElement("a"); link.href = url; link.download = filename; link.click(); setTimeout(() => URL.revokeObjectURL(url), 1_000); }
export async function tryNativeShare(file: File, title: string) { if (!navigator.share || !navigator.canShare?.({ files: [file] })) return false; try { await navigator.share({ title, files: [file] }); return true; } catch { return false; } }
