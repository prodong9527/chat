import { createAdminSession, adminErrorResponse, verifyAdminPassword } from "@/lib/auth/admin";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { password?: unknown };
    if (typeof body.password !== "string" || !(await verifyAdminPassword(body.password))) {
      return Response.json({ error: "invalid credentials" }, { status: 401 });
    }
    const response = Response.json({ ok: true });
    response.headers.set("Set-Cookie", await createAdminSession());
    return response;
  } catch (error) {
    return adminErrorResponse(error);
  }
}
