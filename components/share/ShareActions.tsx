"use client";
import { useEffect, useRef, useState } from "react";
import { drawShareCard, exportPng, selectShareSize, triggerDownload, tryNativeShare, type SharePayload, type ShareTemplate } from "@/lib/share/canvas";

export function ShareActions({ template, payload, filename, onSaved }: { template: ShareTemplate; payload: SharePayload; filename: string; onSaved?: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null); const [error, setError] = useState("");
  const canShare = typeof window !== "undefined" && typeof navigator.share === "function" && typeof (navigator as Navigator & { canShare?: unknown }).canShare === "function";
  useEffect(() => { if (canvasRef.current) drawShareCard(canvasRef.current, { ...payload, template, footer: payload.footer ?? `华府 ${template} 回执` }, selectShareSize(window.innerWidth)); }, [payload, template]);
  async function save() { try { const canvas = canvasRef.current; if (!canvas) throw new Error("canvas"); triggerDownload(await exportPng(canvas), filename); onSaved?.(); } catch { setError("图片没盖出来，文字结果还在，重试一次即可。"); } }
  async function share() { const canvas = canvasRef.current; if (!canvas) return; const blob = await exportPng(canvas); const shared = await tryNativeShare(new File([blob], filename, { type: "image/png" }), payload.title); if (!shared) await save(); }
  return <div className="share-actions"><canvas ref={canvasRef} className="sr-only" aria-hidden="true" /><button onClick={save}>保存图片</button>{canShare && <button onClick={share}>立即分享</button>}{error && <p>{error}</p>}</div>;
}
