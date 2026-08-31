export const runtime = "nodejs";

export async function GET() {
  try {
    const base = (process.env.MODEL_BASE_URL ?? "http://localhost:8000/v1").replace(/\/$/, "");
    const res = await fetch(`${base}/models`, {
      headers: {
        Authorization: `Bearer ${process.env.MODEL_API_KEY ?? ""}`,
      },
      signal: AbortSignal.timeout(5_000),
    });
    return Response.json({ ok: res.ok });
  } catch {
    return Response.json({ ok: false });
  }
}
