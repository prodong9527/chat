import { recordMetric } from "@/lib/db/market";
import type { MetricEvent } from "./types";

export async function recordMetricBestEffort(slug: string, event: MetricEvent) {
  try { await recordMetric(slug, event); } catch { /* metrics must never block public use */ }
}
