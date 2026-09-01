import { z } from "zod";
import { recordMetric } from "@/lib/db/market";
import { LAUNCH_STALLS } from "@/lib/market/catalog";
import { MetricEventSchema } from "@/lib/market/types";

const MetricSchema = z.object({
  slug: z.enum(LAUNCH_STALLS.map((stall) => stall.slug) as [string, ...string[]]),
  event: MetricEventSchema,
});

export async function recordMetricBestEffort(slug: string, event: z.infer<typeof MetricEventSchema>) {
  try { await recordMetric(slug, event); } catch { /* metrics must never block public use */ }
}

export async function POST(request: Request) {
  try {
    const { slug, event } = MetricSchema.parse(await request.json());
    await recordMetricBestEffort(slug, event);
    return Response.json({ ok: true });
  } catch (error) {
    if (error instanceof z.ZodError) return Response.json({ error: "bad_metric" }, { status: 400 });
    return Response.json({ ok: true });
  }
}
