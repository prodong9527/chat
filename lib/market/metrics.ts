import { recordMetric } from "@/lib/db/market";
import type { MetricEvent } from "./types";

export async function recordMetricBestEffort(slug: string, event: MetricEvent) {
  try { await recordMetric(slug, event); return true; } catch (error) { console.error("metric_record_failed", { slug, event, error }); return false; }
}
