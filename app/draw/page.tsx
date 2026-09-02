"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { drawDate, drawNumber, drawPost, type Post } from "@/lib/draw-data";
import { MarketShell } from "@/components/market/MarketShell";
import { recordGeneration } from "@/lib/market/client-metrics";

type Result = {
  post: Post;
  number: string;
  date: string;
};

const GRADE_STYLE: Record<string, string> = {
  下等: "text-ink-soft",
  中等: "text-ink",
  上等: "text-seal",
};

export default function DrawPage() {
  const [result, setResult] = useState<Result | null>(null);
  const [rolling, setRolling] = useState(false);
  const [preview, setPreview] = useState("");
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  function roll() {
    if (rolling) return;
    setRolling(true);
    setPreview(drawPost().name);

    let ticks = 0;
    timerRef.current = setInterval(() => {
      ticks += 1;
      setPreview(drawPost().name);
      if (ticks >= 12) {
        if (timerRef.current) clearInterval(timerRef.current);
        setResult({
          post: drawPost(),
          number: drawNumber(),
          date: drawDate(),
        });
        void recordGeneration("job-draw");
        setRolling(false);
      }
    }, 45);
  }

  const isLucky = result?.number === "9527";

  return (
    <MarketShell><section className="draw-page">
      <Link href="/" className="market-back">← 返回集市</Link>

      <header className="draw-heading">
        <h1 className="font-brush text-4xl sm:text-5xl font-bold mb-3">
          抽签入职
        </h1>
        <p className="text-ink-soft">
          签筒在此。抽到什么，就是什么，不许挑。
        </p>
      </header>

      {!result && !rolling && (
        <div className="border border-dashed border-line rounded-lg p-12 text-center text-ink-soft">
          签筒还是满的。
        </div>
      )}

      {(rolling || result) && (
        <div className="bg-paper-card border border-line rounded-lg p-8">
          <div className="flex items-baseline justify-between mb-6 pb-6 border-b border-line">
            <div>
              <p className="text-xs tracking-widest text-ink-soft mb-2">职 位</p>
              <p
                className={`font-brush text-4xl font-bold ${rolling ? "opacity-50" : ""}`}
              >
                {rolling ? preview : result?.post.name}
              </p>
            </div>
            {!rolling && result && (
              <span
                className={`text-sm font-medium ${GRADE_STYLE[result.post.grade]}`}
              >
                {result.post.grade}
              </span>
            )}
          </div>

          {!rolling && result && (
            <>
              <dl className="grid grid-cols-2 gap-y-4 text-sm mb-8">
                <dt className="text-ink-soft">编 号</dt>
                <dd className="font-mono text-lg">
                  {result.number}
                  {isLucky && (
                    <span className="ml-2 text-xs text-seal align-middle">
                      本号
                    </span>
                  )}
                </dd>
                <dt className="text-ink-soft">入 府</dt>
                <dd>{result.date}</dd>
              </dl>

              {isLucky && (
                <p className="mb-6 p-3 bg-seal/5 border border-seal/20 rounded text-sm text-seal">
                  好家伙，抽中 9527 本号。此号历来出人才，也出事。
                </p>
              )}

              <div className="space-y-4 text-sm leading-relaxed mb-8">
                <div>
                  <p className="text-ink-soft mb-1">职 责</p>
                  <p>{result.post.duty}</p>
                </div>
                <div>
                  <p className="text-ink-soft mb-1">待 遇</p>
                  <p>{result.post.perk}</p>
                </div>
              </div>

              <p className="font-brush text-lg text-ink-soft border-l-2 border-line pl-4">
                「{result.post.line}」
              </p>
            </>
          )}
        </div>
      )}

      <button
        onClick={roll}
        disabled={rolling}
        className="mt-8 w-full sm:w-auto px-10 py-3 bg-ink text-paper rounded-md text-base font-medium transition-opacity hover:opacity-85 disabled:opacity-40"
      >
        {rolling ? "抽 着 呢" : result ? "再 抽 一 次" : "抽 签"}
      </button>

      {result && (
        <p className="mt-6 text-xs text-ink-soft">
          抽中不许反悔。华府人事科敬启。
        </p>
      )}
    </section></MarketShell>
  );
}
