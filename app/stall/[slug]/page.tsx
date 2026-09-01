import { notFound } from "next/navigation";
import { getPublicStall } from "@/lib/db/market";
import { MarketShell } from "@/components/market/MarketShell";
import { ServiceDesk } from "@/components/market/ServiceDesk";
export default async function StallPage({ params }: { params: Promise<{ slug: string }> }) { let stall; try { stall = await getPublicStall((await params).slug); } catch { notFound(); } if (!stall || stall.status !== "open") notFound(); return <MarketShell><section className="stall-page"><p>{stall.code} · {stall.description}</p><h1>{stall.name}</h1><ServiceDesk slug={stall.slug} name={stall.name} /></section></MarketShell>; }
