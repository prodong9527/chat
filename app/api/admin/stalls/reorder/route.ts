import { z } from "zod";
import { adminErrorResponse, assertSameOrigin, requireAdmin } from "@/lib/auth/admin";
import { moveStall } from "@/lib/db/market";

const ReorderSchema = z.object({ districtSlug: z.string().regex(/^[a-z0-9-]+$/), slugs: z.array(z.string().regex(/^[a-z0-9-]+$/)).min(1) });

export async function POST(request: Request) {
  try {
    await requireAdmin(request); assertSameOrigin(request);
    await moveStall(ReorderSchema.parse(await request.json()));
    return Response.json({ ok: true });
  } catch (error) { return adminErrorResponse(error); }
}
