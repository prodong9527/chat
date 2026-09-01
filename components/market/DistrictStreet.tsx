import type { PublicDistrict } from "@/lib/db/market";
import { StallSign } from "./StallSign";

export function DistrictStreet({ district }: { district: PublicDistrict }) {
  return <section className={`district-street accent-${district.accent}`}><div className="street-label"><span>第 {district.sortOrder + 1} 街</span><h2>{district.name}</h2></div><div className="stall-grid">{district.stalls.map((stall) => <StallSign key={stall.slug} stall={stall} />)}</div></section>;
}
