import { assertSameOrigin, clearAdminSession } from "@/lib/auth/admin";

export async function POST(request: Request) {
  assertSameOrigin(request);
  const response = Response.json({ ok: true });
  response.headers.set("Set-Cookie", clearAdminSession());
  return response;
}
