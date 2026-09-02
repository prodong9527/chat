"use client";
import { useEffect, useState } from "react";
import { getDailyFortune } from "@/lib/stalls/fortune";
import { ShareActions } from "@/components/share/ShareActions";
import { recordGeneration } from "@/lib/market/client-metrics";

export function FortuneDesk() {
  const [fortune, setFortune] = useState<ReturnType<typeof getDailyFortune>>();
  useEffect(() => {
    const timer = setTimeout(() => {
      let seed = localStorage.getItem("huafu-device-seed");
      if (!seed) { seed = crypto.randomUUID(); localStorage.setItem("huafu-device-seed", seed); }
      setFortune(getDailyFortune(new Date().toISOString().slice(0, 10), seed));
      void recordGeneration("desk-fortune");
    }, 0);
    return () => clearTimeout(timer);
  }, []);
  if (!fortune) return <p>正在摇卦……</p>;
  return <section className="fortune-desk"><p>今日工位卦</p><h2>摸鱼指数：{"★".repeat(fortune.score)}</h2><dl><dt>今日宜</dt><dd>{fortune.good}</dd><dt>今日忌</dt><dd>{fortune.bad}</dd><dt>建议话术</dt><dd>{fortune.line}</dd></dl><p>此卦今日仅限一签，切勿反复摇到满意为止。</p><ShareActions template="fortune" payload={{ title: "今日工位卦", body: `宜：${fortune.good}\n忌：${fortune.bad}\n${fortune.line}` }} filename="今日工位卦.png" /></section>;
}
