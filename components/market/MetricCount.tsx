"use client";

import { useEffect, useState } from "react";

export function MetricCount({ slug, initial }: { slug: string; initial: number }) {
  const [count, setCount] = useState(initial);

  useEffect(() => {
    let active = true;
    const refresh = async () => {
      try {
        const response = await fetch("/api/metrics", { cache: "no-store" });
        if (!response.ok) return;
        const body = await response.json() as { generations?: Record<string, number> };
        if (active) setCount(body.generations?.[slug] ?? 0);
      } catch { /* The server-rendered value remains visible if refresh fails. */ }
    };
    void refresh();
    const interval = window.setInterval(refresh, 15000);
    return () => { active = false; window.clearInterval(interval); };
  }, [slug]);

  return <>今日已受理 {count} 件</>;
}
