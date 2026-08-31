import { getModelConfig } from "@/lib/model-config";

export const runtime = "nodejs";

export async function GET() {
  try {
    const modelConfig = getModelConfig(process.env);
    const base = modelConfig.baseURL.replace(/\/$/, "");
    const res = await fetch(`${base}/models`, {
      headers: {
        Authorization: `Bearer ${modelConfig.apiKey}`,
      },
      signal: AbortSignal.timeout(5_000),
    });
    return Response.json({ ok: res.ok });
  } catch {
    return Response.json({ ok: false });
  }
}
