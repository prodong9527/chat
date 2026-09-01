import { z } from "zod";
import { adminErrorResponse, assertSameOrigin, requireAdmin } from "@/lib/auth/admin";
import { deleteStall, saveStall } from "@/lib/db/market";
import { StallStatusSchema, StallTypeSchema } from "@/lib/market/types";

const UpdateStallSchema = z.object({
  code: z.string().regex(/^[A-Z]-\d{2}$/), districtSlug: z.string().regex(/^[a-z0-9-]+$/),
  name: z.string().min(1).max(40), description: z.string().min(1).max(100),
  status: StallStatusSchema, type: StallTypeSchema, sortOrder: z.number().int().nonnegative(),
  config: z.record(z.string(), z.unknown()),
});

type Context = { params: Promise<{ slug: string }> };

export async function PATCH(request: Request, { params }: Context) {
  try {
    await requireAdmin(request); assertSameOrigin(request);
    const { slug } = await params;
    const stall = await saveStall({ slug, ...UpdateStallSchema.parse(await request.json()) });
    return Response.json({ stall });
  } catch (error) { return adminErrorResponse(error); }
}

export async function DELETE(request: Request, { params }: Context) {
  try {
    await requireAdmin(request); assertSameOrigin(request);
    await deleteStall((await params).slug);
    return Response.json({ ok: true });
  } catch (error) { return adminErrorResponse(error); }
}
