"use client";
import { useRef, useState } from "react";
import { MarketShell } from "@/components/market/MarketShell";
import BadgeCanvas, { type BadgeData } from "@/components/badge/BadgeCanvas";
import { exportPng, triggerDownload } from "@/lib/share/canvas";
import { createBadge } from "@/lib/badge-data";
import { recordGeneration } from "@/lib/market/client-metrics";
export default function BadgePage() { const [name, setName] = useState(""); const [data, setData] = useState<BadgeData | null>(null); const ref = useRef<HTMLCanvasElement>(null); async function save() { if (!ref.current || !data) return; triggerDownload(await exportPng(ref.current), `华府工牌-${data.name}.png`); } function generate() { setData(createBadge(name)); void recordGeneration("huafu-badge"); } return <MarketShell><section className="stall-page"><p>A-01 · 人事受理</p><h1>华府人事摊</h1><div className="badge-desk">{data ? <div><BadgeCanvas canvasRef={ref} data={data} /><p>本工牌由 9527 号签发，解释权归华府所有。</p></div> : <div className="badge-empty">请先递上姓名，华府才好给你发牌。</div>}<div className="service-desk"><label>输入你的名字或工号<input value={name} onChange={(event) => setName(event.target.value.slice(0, 16))} placeholder="张三 / 9527" /></label><button onClick={generate}>生成离谱头衔</button>{data && <><button onClick={() => setData(createBadge(data.name, Math.random, data))}>换一张头衔</button><button onClick={save}>保存工牌图片</button></>}<p>纯文字工牌，不需要照片。</p></div></div></section></MarketShell>; }
