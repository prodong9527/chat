"use client";

import { useEffect, type RefObject } from "react";

export type BadgeData = {
  name: string;
  number: string;
  post: string;
  date: string;
  remark: string;
};

type Props = {
  canvasRef: RefObject<HTMLCanvasElement | null>;
  data: BadgeData;
  avatar: HTMLImageElement | null;
};

const W = 640;
const H = 1000;
const SCALE = 2;

const PAPER = "#f7f5ef";
const INK = "#1f1c19";
const INK_SOFT = "#6b6459";
const LINE = "#d9d3c7";
const SEAL = "#a8322d";

const BRUSH =
  '"STKaiti", "KaiTi", "Kaiti SC", "Songti SC", "SimSun", serif';
const SANS = 'system-ui, "PingFang SC", "Microsoft YaHei", sans-serif';

function roundRectPath(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

/** 逐字绘制并加字距，绕开 ctx.letterSpacing 的兼容性问题 */
function drawSpaced(
  ctx: CanvasRenderingContext2D,
  text: string,
  cx: number,
  y: number,
  spacing: number,
) {
  const chars = [...text];
  const widths = chars.map((c) => ctx.measureText(c).width);
  const total =
    widths.reduce((a, b) => a + b, 0) + spacing * (chars.length - 1);
  let x = cx - total / 2;
  chars.forEach((c, i) => {
    ctx.fillText(c, x + widths[i] / 2, y);
    x += widths[i] + spacing;
  });
}

function drawPhotoFrame(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
  ctx.fillStyle = "#efece2";
  roundRectPath(ctx, x, y, w, h, 6);
  ctx.fill();
  ctx.strokeStyle = LINE;
  ctx.lineWidth = 1;
  roundRectPath(ctx, x, y, w, h, 6);
  ctx.stroke();
}

function drawSilhouette(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
  const cx = x + w / 2;
  ctx.fillStyle = "#cfc9ba";
  // 头
  ctx.beginPath();
  ctx.arc(cx, y + h * 0.36, w * 0.17, 0, Math.PI * 2);
  ctx.fill();
  // 身
  ctx.beginPath();
  ctx.moveTo(cx - w * 0.29, y + h * 0.98);
  ctx.quadraticCurveTo(cx - w * 0.26, y + h * 0.62, cx, y + h * 0.58);
  ctx.quadraticCurveTo(cx + w * 0.26, y + h * 0.62, cx + w * 0.29, y + h * 0.98);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = INK_SOFT;
  ctx.font = `20px ${SANS}`;
  ctx.textAlign = "center";
  ctx.fillText("无 像", cx, y + h - 26);
}

export default function BadgeCanvas({ canvasRef, data, avatar }: Props) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = W * SCALE;
    canvas.height = H * SCALE;
    ctx.setTransform(SCALE, 0, 0, SCALE, 0, 0);
    ctx.clearRect(0, 0, W, H);

    // 纸底与双框
    ctx.fillStyle = PAPER;
    ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = LINE;
    ctx.lineWidth = 2;
    ctx.strokeRect(24, 24, W - 48, H - 48);
    ctx.lineWidth = 1;
    ctx.strokeRect(32, 32, W - 64, H - 64);

    // 标题
    ctx.fillStyle = INK;
    ctx.font = `bold 40px ${BRUSH}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    drawSpaced(ctx, "华府出入牌", W / 2, 100, 16);

    ctx.strokeStyle = LINE;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(120, 138);
    ctx.lineTo(W - 120, 138);
    ctx.stroke();

    // 照片
    const pw = 200;
    const ph = 250;
    const px = (W - pw) / 2;
    const py = 176;
    drawPhotoFrame(ctx, px, py, pw, ph);

    if (avatar) {
      ctx.save();
      roundRectPath(ctx, px, py, pw, ph, 6);
      ctx.clip();
      const scale = Math.max(pw / avatar.width, ph / avatar.height);
      const dw = avatar.width * scale;
      const dh = avatar.height * scale;
      ctx.drawImage(avatar, px + (pw - dw) / 2, py + (ph - dh) / 2, dw, dh);
      ctx.restore();
    } else {
      drawSilhouette(ctx, px, py, pw, ph);
    }

    // 信息
    const rows: [string, string][] = [
      ["姓 名", data.name || "无名氏"],
      ["编 号", data.number],
      ["职 位", data.post],
      ["入 府", data.date],
    ];

    let y = 486;
    rows.forEach(([label, value]) => {
      ctx.textAlign = "left";
      ctx.fillStyle = INK_SOFT;
      ctx.font = `22px ${SANS}`;
      ctx.fillText(label, 100, y);

      ctx.fillStyle = INK;
      ctx.font = `28px ${BRUSH}`;
      ctx.fillText(value, 190, y);

      ctx.strokeStyle = "#e6e0d2";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(100, y + 24);
      ctx.lineTo(W - 100, y + 24);
      ctx.stroke();

      y += 58;
    });

    // 评语
    ctx.textAlign = "left";
    ctx.fillStyle = INK_SOFT;
    ctx.font = `20px ${SANS}`;
    ctx.fillText("评 语", 100, 742);

    ctx.fillStyle = INK;
    ctx.font = `26px ${BRUSH}`;
    const remark = data.remark;
    const maxWidth = W - 200;
    const line1 = remark.slice(0, 12);
    const line2 = remark.slice(12);
    ctx.fillText(line1, 100, 782, maxWidth);
    if (line2) ctx.fillText(line2, 100, 818, maxWidth);

    // 底部
    ctx.textAlign = "center";
    ctx.fillStyle = INK_SOFT;
    ctx.font = `18px ${SANS}`;
    ctx.fillText("9527.chat", W / 2, H - 82);

    // 印章
    const sx = W - 150;
    const sy = H - 168;
    ctx.strokeStyle = SEAL;
    ctx.lineWidth = 3;
    roundRectPath(ctx, sx, sy, 84, 84, 8);
    ctx.stroke();
    ctx.fillStyle = SEAL;
    ctx.font = `bold 30px ${BRUSH}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("华", sx + 42, sy + 26);
    ctx.fillText("府", sx + 42, sy + 58);
    ctx.textBaseline = "alphabetic";
  }, [canvasRef, data, avatar]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height: "auto", display: "block" }}
      className="rounded-md border border-line"
    />
  );
}
