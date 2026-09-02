export async function recordGeneration(
  slug: string,
  request: typeof fetch = fetch,
) {
  const response = await request("/api/metrics", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ slug, event: "generation" }),
  });
  return response.ok;
}
