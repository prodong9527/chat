import { z } from "zod";
import { getPublicStall } from "@/lib/db/market";
import { generateGroupGameResult, streamStallResult } from "@/lib/ai/stalls";
import { checkRate, clientIp } from "@/lib/guard";
import { isGroupGameSlug, parseGroupGameInput } from "@/lib/stalls/group-games";
export const runtime = "nodejs";
export const maxDuration = 120;
const InputSchema = z.object({ input: z.string().min(1).max(500) });
export async function POST(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const stall = await getPublicStall(slug);
    if (!stall || stall.status !== "open") return Response.json({ error: "not_found" }, { status: 404 });

    const rate = checkRate(clientIp(request));
    if (!rate.ok) return Response.json({ error: "rate" }, { status: 429 });

    const payload = await request.json();
    if (isGroupGameSlug(slug)) {
      const input = parseGroupGameInput(slug, payload);
      return Response.json(await generateGroupGameResult(slug, input));
    }

    const { input } = InputSchema.parse(payload);
    return streamStallResult(stall, { input });
  }
  catch (error) {
    if (error instanceof z.ZodError) return Response.json({ error: "bad_request" }, { status: 400 });
    // Keep upstream details out of the public response, but retain them in Vercel logs.
    console.error("Stall generation failed", error);
    return Response.json({ error: "idle" }, { status: 503 });
  }
}
