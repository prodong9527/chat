"use client";

import { useEffect } from "react";

export function MetricBeacon({ slug }: { slug: string }) {
  useEffect(() => {
    const body = JSON.stringify({ slug, event: "visit" });
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/metrics", new Blob([body], { type: "application/json" }));
    } else {
      void fetch("/api/metrics", { method: "POST", body, headers: { "content-type": "application/json" }, keepalive: true });
    }
  }, [slug]);
  return null;
}
