"use client";

import { useEffect, useMemo, useState } from "react";
import { MarketShell } from "@/components/market/MarketShell";
import { recordGeneration } from "@/lib/market/client-metrics";
import { dealApplication, issueVerdict, type Application, type CardKind, type Deal } from "@/lib/touming-data";

const RECENT_KEY = "huafu-touming-recent";
const PARTS: Array<{ kind: CardKind; label: string; note: string }> = [
  { kind: "skill", label: "本事", note: "拿得出手的，未必拿得稳。" },
  { kind: "flaw", label: "隐患", note: "先说出来，日后少挨一顿。" },
  { kind: "connection", label: "来头", note: "关系不必硬，听着硬就行。" },
  { kind: "tribute", label: "投名礼", note: "不收贵重物品，太可疑的除外。" },
];

function asApplication(selection: Partial<Application>): Application | null {
  return PARTS.every(({ kind }) => selection[kind]) ? selection as Application : null;
}

function readRememberedIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = JSON.parse(window.localStorage.getItem(RECENT_KEY) ?? "[]");
    return Array.isArray(stored) && stored.every((item) => typeof item === "string") ? stored.slice(0, 30) : [];
  } catch { return []; }
}

export default function BadgePage() {
  const [recent, setRecent] = useState<string[]>([]);
  const [deal, setDeal] = useState<Deal>(() => dealApplication(() => 0.5));
  const [selected, setSelected] = useState<Partial<Application>>({});
  const [submitted, setSubmitted] = useState(false);
  const application = useMemo(() => asApplication(selected), [selected]);
  const verdict = submitted && application ? issueVerdict(application) : null;

  useEffect(() => {
    const remembered = readRememberedIds();
    const timer = window.setTimeout(() => {
      setRecent(remembered);
      setDeal(dealApplication(Math.random, remembered));
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  function choose(kind: CardKind, card: Application[CardKind]) {
    setSubmitted(false);
    setSelected((current) => ({ ...current, [kind]: card }));
  }

  function dealAgain() {
    const seen = Object.values(deal).flat().map((card) => card.id);
    const remembered = readRememberedIds();
    const nextRecent = [...seen, ...recent, ...remembered].filter((id, index, items) => items.indexOf(id) === index).slice(0, 30);
    setRecent(nextRecent);
    window.localStorage.setItem(RECENT_KEY, JSON.stringify(nextRecent));
    setDeal(dealApplication(Math.random, nextRecent));
    setSelected({});
    setSubmitted(false);
  }

  function submit() {
    if (!application) return;
    setSubmitted(true);
    void recordGeneration("huafu-badge").catch(() => undefined);
  }

  return <MarketShell><section className="stall-page touming-page">
    <p>A-01 · 入府报到</p>
    <h1>投名状摊</h1>
    <p className="touming-intro">四样凭据，缺一样都显得太像正经人。</p>

    <div className="touming-board">
      {PARTS.map(({ kind, label, note }) => <section className="touming-part" key={kind}>
        <header><div><span>{label}</span><small>{note}</small></div><b>{selected[kind] ? "已按手印" : "待挑选"}</b></header>
        <div className="touming-cards">
          {deal[kind].map((card) => <button key={card.id} type="button" aria-label={`${label}：${card.text}`} className={selected[kind]?.id === card.id ? "chosen" : ""} onClick={() => choose(kind, card)}>
            {card.text}
          </button>)}
        </div>
      </section>)}
    </div>

    {!verdict ? <div className="touming-actions">
      <p>挑齐四样，再把命运递到柜台上。</p>
      <button type="button" disabled={!application} onClick={submit}>递上投名状</button>
      <button type="button" className="secondary" onClick={dealAgain}>换一桌凭据</button>
    </div> : <section className="touming-verdict" aria-live="polite">
      <p>华府收件批文</p>
      <h2>{verdict.title}</h2>
      <dl><dt>编入：</dt><dd>{verdict.department}</dd><dt>月钱：</dt><dd>{verdict.salary}</dd><dt>离谱 KPI：</dt><dd>{verdict.kpi}</dd></dl>
      <blockquote>「{verdict.note}」</blockquote>
      <div className="touming-actions"><button type="button" onClick={dealAgain}>再递一张投名状</button></div>
    </section>}
  </section></MarketShell>;
}
