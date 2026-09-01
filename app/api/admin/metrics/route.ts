import { adminErrorResponse, requireAdmin } from "@/lib/auth/admin";
import { listDistricts, listMetricSummary } from "@/lib/db/market";

export async function GET(request: Request) {
  try {
    await requireAdmin(request);
    const [districts, metrics] = await Promise.all([listDistricts(), listMetricSummary()]);
    return Response.json({ districts, metrics });
  } catch (error) { return adminErrorResponse(error); }
}
