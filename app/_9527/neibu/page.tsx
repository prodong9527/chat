import { AdminLogin } from "@/components/admin/AdminLogin";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { requireAdmin } from "@/lib/auth/admin";
import { cookies } from "next/headers";
export const metadata = { robots: { index: false, follow: false } };
export default async function AdminPage() { let allowed = false; try { const token = (await cookies()).get("huafu_admin")?.value; await requireAdmin(new Request("http://localhost/_9527/neibu", { headers: { cookie: token ? `huafu_admin=${token}` : "" } })); allowed = true; } catch {} return <main className="stall-page"><p>华府内务系统</p><h1>摊位管理</h1>{allowed ? <AdminDashboard /> : <AdminLogin />}</main>; }
