export type ShareTemplate = "badge" | "fortune" | "chat" | "notice" | "leave" | "report" | "handbook" | "drill" | "award";
export type SharePayload = { title: string; body: string; subtitle?: string; footer?: string; template?: ShareTemplate };

export function sanitizeSharePayload(payload: SharePayload): SharePayload {
  const clean = (value: string, max: number) => value.replace(/\s+/g, " ").trim().slice(0, max);
  return { title: clean(payload.title, 44), body: clean(payload.body, 240), subtitle: payload.subtitle ? clean(payload.subtitle, 80) : undefined, footer: payload.footer ? clean(payload.footer, 80) : undefined, template: payload.template };
}
export function selectShareSize(viewportWidth: number) { return viewportWidth < 640 ? { width: 1080, height: 1350 } : { width: 1080, height: 1080 }; }
function lines(ctx: CanvasRenderingContext2D, text: string, maxWidth: number) { const output: string[] = []; let line = ""; for (const char of text) { if (ctx.measureText(line + char).width > maxWidth && line) { output.push(line); line = char; } else line += char; } if (line) output.push(line); return output; }
function drawFooter(ctx: CanvasRenderingContext2D, payload: SharePayload, size: { width: number; height: number }, color = "#a8322d", align: CanvasTextAlign = "left") {
  ctx.fillStyle = color; ctx.font = '28px "PingFang SC", sans-serif'; ctx.textAlign = align;
  ctx.fillText(payload.footer ?? "解释权归华府所有", align === "center" ? size.width / 2 : 96, size.height - 104);
  ctx.textAlign = "left";
}
function drawClassicCard(ctx: CanvasRenderingContext2D, payload: SharePayload, size: { width: number; height: number }) {
  ctx.fillStyle = "#f6f0e5"; ctx.fillRect(0, 0, size.width, size.height); ctx.strokeStyle = "#a8322d"; ctx.lineWidth = 12; ctx.strokeRect(42, 42, size.width - 84, size.height - 84);
  ctx.fillStyle = "#a8322d"; ctx.font = '32px "KaiTi", serif'; ctx.fillText("华府后街 · 9527 号", 96, 120);
  ctx.fillStyle = "#1f1c19"; ctx.font = 'bold 76px "KaiTi", serif'; lines(ctx, payload.title, size.width - 192).slice(0, 2).forEach((line, index) => ctx.fillText(line, 96, 260 + index * 96));
  ctx.fillStyle = "#554d43"; ctx.font = '38px "PingFang SC", sans-serif'; lines(ctx, payload.body, size.width - 192).slice(0, 7).forEach((line, index) => ctx.fillText(line, 96, 480 + index * 62));
  drawFooter(ctx, payload, size);
}
function drawHandbookCard(ctx: CanvasRenderingContext2D, payload: SharePayload, size: { width: number; height: number }) {
  ctx.fillStyle = "#f7f2e7"; ctx.fillRect(0, 0, size.width, size.height);
  ctx.strokeStyle = "#c8b998"; ctx.lineWidth = 3;
  for (let y = 310; y < size.height - 140; y += 74) { ctx.beginPath(); ctx.moveTo(84, y); ctx.lineTo(size.width - 84, y); ctx.stroke(); }
  ctx.fillStyle = "#c16742"; ctx.fillRect(78, 66, 430, 126); ctx.fillStyle = "#fff8ed"; ctx.font = 'bold 34px "PingFang SC", sans-serif'; ctx.fillText("华府后街 · 入府手册", 112, 145);
  ctx.fillStyle = "#2e4439"; ctx.font = 'bold 72px "KaiTi", serif'; lines(ctx, payload.title, size.width - 168).slice(0, 2).forEach((line, index) => ctx.fillText(line, 84, 270 + index * 84));
  const maxBodyLines = Math.max(1, Math.floor((size.height - 210 - 378) / 74));
  ctx.fillStyle = "#39473e"; ctx.font = '38px "PingFang SC", sans-serif'; lines(ctx, payload.body, size.width - 168).slice(0, Math.min(9, maxBodyLines)).forEach((line, index) => ctx.fillText(line, 84, 378 + index * 74));
  drawFooter(ctx, payload, size, "#2e4439");
}
function drawDrillCard(ctx: CanvasRenderingContext2D, payload: SharePayload, size: { width: number; height: number }) {
  ctx.fillStyle = "#f3f0e6"; ctx.fillRect(0, 0, size.width, size.height); ctx.fillStyle = "#171717"; ctx.fillRect(0, 0, size.width, 190);
  ctx.strokeStyle = "#f3c62c"; ctx.lineWidth = 58;
  for (let x = -80; x < size.width + 120; x += 130) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x + 160, 190); ctx.stroke(); }
  ctx.fillStyle = "#171717"; ctx.fillRect(0, 190, size.width, 120); ctx.fillStyle = "#f3c62c"; ctx.font = 'bold 34px "PingFang SC", sans-serif'; ctx.fillText("9527 号 · 群聊演练流程", 82, 265);
  ctx.fillStyle = "#171717"; ctx.font = 'bold 70px "KaiTi", serif'; lines(ctx, payload.title, size.width - 164).slice(0, 2).forEach((line, index) => ctx.fillText(line, 82, 398 + index * 82));
  const maxSteps = Math.max(1, Math.floor((size.height - 190 - 560) / 78));
  ctx.font = '38px "PingFang SC", sans-serif'; const steps = lines(ctx, payload.body, size.width - 234).slice(0, Math.min(8, maxSteps)); steps.forEach((line, index) => { const y = 560 + index * 78; ctx.fillStyle = "#f3c62c"; ctx.fillRect(82, y - 37, 48, 48); ctx.fillStyle = "#171717"; ctx.font = 'bold 26px sans-serif'; ctx.fillText(String(index + 1), 96, y); ctx.font = '38px "PingFang SC", sans-serif'; ctx.fillText(line, 156, y); });
  drawFooter(ctx, payload, size, "#171717");
}
function drawAwardCard(ctx: CanvasRenderingContext2D, payload: SharePayload, size: { width: number; height: number }) {
  ctx.fillStyle = "#fff9e9"; ctx.fillRect(0, 0, size.width, size.height); ctx.strokeStyle = "#a8322d"; ctx.lineWidth = 14; ctx.strokeRect(46, 46, size.width - 92, size.height - 92); ctx.strokeStyle = "#d39a43"; ctx.lineWidth = 4; ctx.strokeRect(72, 72, size.width - 144, size.height - 144);
  ctx.fillStyle = "#a8322d"; [130, size.width - 130].forEach((x) => { ctx.beginPath(); ctx.arc(x, 150, 56, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = "#fff9e9"; ctx.font = 'bold 24px serif'; ctx.textAlign = "center"; ctx.fillText("9527", x, 158); ctx.textAlign = "left"; ctx.fillStyle = "#a8322d"; });
  ctx.fillStyle = "#a8322d"; ctx.font = '34px "KaiTi", serif'; ctx.textAlign = "center"; ctx.fillText("华府后街 · 荣誉证书", size.width / 2, 242);
  ctx.fillStyle = "#31211b"; ctx.font = 'bold 76px "KaiTi", serif'; lines(ctx, payload.title, size.width - 190).slice(0, 2).forEach((line, index) => ctx.fillText(line, size.width / 2, 390 + index * 94));
  const maxBodyLines = Math.max(1, Math.floor((size.height - 190 - 580) / 64));
  ctx.fillStyle = "#5e4a3c"; ctx.font = '38px "PingFang SC", sans-serif'; lines(ctx, payload.body, size.width - 224).slice(0, Math.min(7, maxBodyLines)).forEach((line, index) => ctx.fillText(line, size.width / 2, 580 + index * 64));
  drawFooter(ctx, payload, size, "#a8322d", "center");
}
export function drawShareCard(canvas: HTMLCanvasElement, raw: SharePayload, size = { width: 1080, height: 1350 }) {
  const payload = sanitizeSharePayload(raw); canvas.width = size.width; canvas.height = size.height;
  const ctx = canvas.getContext("2d"); if (!ctx) throw new Error("canvas unavailable");
  if (payload.template === "handbook") drawHandbookCard(ctx, payload, size);
  else if (payload.template === "drill") drawDrillCard(ctx, payload, size);
  else if (payload.template === "award") drawAwardCard(ctx, payload, size);
  else drawClassicCard(ctx, payload, size);
}
export function exportPng(canvas: HTMLCanvasElement): Promise<Blob> { return new Promise((resolve, reject) => canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error("export failed")), "image/png")); }
export function triggerDownload(blob: Blob, filename: string) { const url = URL.createObjectURL(blob); const link = document.createElement("a"); link.href = url; link.download = filename; link.click(); setTimeout(() => URL.revokeObjectURL(url), 1_000); }
export async function tryNativeShare(file: File, title: string) { if (!navigator.share || !navigator.canShare?.({ files: [file] })) return false; try { await navigator.share({ title, files: [file] }); return true; } catch { return false; } }
