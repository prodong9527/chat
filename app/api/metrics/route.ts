import { z } from "zod";
import { MetricEventSchema } from "@/lib/market/types";
import { recordMetricBestEffort } from "@/lib/market/metrics";

const MetricSchema = z.object({
  // Slugs are checked by the SQL INSERT's `SELECT ... FROM stalls`; this keeps
  // metrics available for new admin-created stalls without accepting arbitrary SQL.
  slug: z.string().regex(/^[a-z0-9-]{1,64}$/),
  event: MetricEventSchema,
});

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
