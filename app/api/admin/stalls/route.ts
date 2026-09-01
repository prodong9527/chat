import { z } from "zod";
import { adminErrorResponse, assertSameOrigin, requireAdmin } from "@/lib/auth/admin";
import { listAdminStalls, saveStall } from "@/lib/db/market";
import { StallStatusSchema, StallTypeSchema } from "@/lib/market/types";

const StallInputSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  code: z.string().regex(/^[A-Z]-\d{2}$/),
  districtSlug: z.string().regex(/^[a-z0-9-]+$/),
  name: z.string().min(1).max(40),
  description: z.string().min(1).max(100),
  status: StallStatusSchema,
  type: StallTypeSchema,
  sortOrder: z.number().int().nonnegative(),
  config: z.record(z.string(), z.unknown()),
});

export async function GET(request: Request) {
  try {
    await requireAdmin(request);
    return Response.json({ stalls: await listAdminStalls() });
  } catch (error) {
    return adminErrorResponse(error);
  }
}

export async function POST(request: Request) {
  try {
    await requireAdmin(request);
    assertSameOrigin(request);
    const stall = await saveStall(StallInputSchema.parse(await request.json()));
    return Response.json({ stall });
  } catch (error) {
    return adminErrorResponse(error);
  }
}
