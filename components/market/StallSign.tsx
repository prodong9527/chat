import Link from "next/link";
import type { PublicStall } from "@/lib/db/market";
import { MetricCount } from "./MetricCount";

const legacyPaths: Record<string, string> = { "huafu-badge": "/badge", "job-draw": "/draw", duilian: "/duilian", ticket: "/ticket", petition: "/petition" };

export function StallSign({ stall }: { stall: PublicStall }) {
  const href = legacyPaths[stall.slug] ?? `/stall/${stall.slug}`;
  return <Link href={href} className={`stall-sign ${stall.status !== "open" ? "stall-closed" : ""}`}>
    <span className="stall-code">{stall.code}</span><h3>{stall.name}</h3><p>{stall.description}</p>
    <footer><span>{stall.status === "open" ? "正在受理" : "筹备中"}</span><b><MetricCount slug={stall.slug} initial={stall.generations} /></b></footer>
  </Link>;
}
