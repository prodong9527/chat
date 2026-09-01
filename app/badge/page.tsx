"use client";
import { useRef, useState } from "react";
import { MarketShell } from "@/components/market/MarketShell";
import BadgeCanvas, { type BadgeData } from "@/components/badge/BadgeCanvas";
import { exportPng, triggerDownload } from "@/lib/share/canvas";
const TITLES = ["高级摸鱼架构师", "第7代传薪人", "工位风水总监", "需求已读研究员", "会议纪要蒸馏师", "摸鱼流程合规官"];
const DEPARTMENTS = ["战略发呆部", "不急不缓司", "跨部门甩锅中心", "华府流程研究院"];
const SKILLS = ["已读不回", "假装在开会", "Ctrl+C/V 大师", "收到但不理解"];
function makeBadge(name: string): BadgeData { const pick = <T,>(items: readonly T[], shift: number) => items[(name.length * 13 + shift) % items.length]; return { name: name || "无名氏", number: "9527", titles: [pick(TITLES, 1), pick(TITLES, 2), pick(TITLES, 3)], department: pick(DEPARTMENTS, 4), skills: [pick(SKILLS, 5), pick(SKILLS, 6), pick(SKILLS, 7)] }; }
export default function BadgePage() { const [name, setName] = useState(""); const [data, setData] = useState(makeBadge("")); const ref = useRef<HTMLCanvasElement>(null); async function save() { if (!ref.current) return; triggerDownload(await exportPng(ref.current), `华府工牌-${data.name}.png`); } return <MarketShell><section className="stall-page"><p>A-01 · 人事受理</p><h1>华府人事摊</h1><div className="badge-desk"><div><BadgeCanvas canvasRef={ref} data={data} /><p>本工牌由 9527 号签发，解释权归华府所有。</p></div><div className="service-desk"><label>输入你的名字或工号<input value={name} onChange={(event) => setName(event.target.value.slice(0, 16))} placeholder="张三 / 9527" /></label><button onClick={() => setData(makeBadge(name))}>生成离谱头衔</button><button onClick={() => setData(makeBadge(`${name}${Date.now()}`))}>换一张头衔</button><button onClick={save}>保存工牌图片</button><p>纯文字工牌，不需要照片。</p></div></div></section></MarketShell>; }
