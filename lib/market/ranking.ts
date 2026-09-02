export function assignHotRanks(stalls: { slug: string; totalGenerations: number }[]) {
  return Object.fromEntries(stalls.filter((stall) => stall.totalGenerations > 0).sort((a, b) => b.totalGenerations - a.totalGenerations || a.slug.localeCompare(b.slug)).slice(0, 3).map((stall, index) => [stall.slug, index + 1])) as Record<string, 1 | 2 | 3>;
}
