import { listPublicDistricts, type PublicDistrict } from "@/lib/db/market";
import { LAUNCH_DISTRICTS, LAUNCH_STALLS } from "@/lib/market/catalog";
import { DistrictStreet } from "@/components/market/DistrictStreet";
import { MarketShell } from "@/components/market/MarketShell";

export const dynamic = "force-dynamic";

function fallbackMarket(): PublicDistrict[] {
  return LAUNCH_DISTRICTS.map((district) => ({ id: `fallback-${district.slug}`, ...district, stalls: LAUNCH_STALLS.filter((stall) => stall.districtSlug === district.slug).map((stall) => ({ id: `fallback-${stall.slug}`, ...stall, generations: 0 })) }));
}

export default async function Home() {
  let districts: PublicDistrict[];
  try { districts = await listPublicDistricts(); } catch { districts = fallbackMarket(); }
  return <MarketShell><section className="market-hero"><p>华府后街 · 内部便民服务</p><h1>逛摊办事，<br />不必讲道理。</h1><span>摊位随时增开，业务随时离谱。</span></section><aside className="market-notice">今日告示：请各位同僚有事没事都来排个队，显得我们很忙。</aside><div className="market-streets">{districts.map((district) => <DistrictStreet key={district.slug} district={district} />)}</div></MarketShell>;
}

/*
const TOYS = [
  {
    href: "/badge",
    name: "工牌生成器",
    desc: "报上名来，领一张华府出入牌",
    tag: "出入牌",
    ready: true,
  },
  {
    href: "/draw",
    name: "抽签入职",
    desc: "抽个岗位，附一本正经的说明书",
    tag: "人事",
    ready: true,
  },
  {
    href: "/duilian",
    name: "对穿肠擂台",
    desc: "你出上联，它对下联，出得烂还呛你",
    tag: "文斗",
    ready: true,
  },
  {
    href: "/ticket",
    name: "今日工单",
    desc: "每日一张荒诞任务，可完成，可驳回",
    tag: "派活",
    ready: true,
  },
  {
    href: "/petition",
    name: "华府信访办",
    desc: "来办事？这个嘛，得研究研究",
    tag: "接访",
    ready: true,
  },
];

export default function OldHome() {
  return (
    <main className="flex-1 w-full max-w-3xl mx-auto px-6 py-16 sm:py-24">
      <header className="mb-14">
        <p className="text-seal text-sm tracking-[0.4em] mb-4">华 府</p>
        <h1 className="font-brush text-5xl sm:text-6xl font-bold tracking-wide mb-5">
          9527 号
        </h1>
        <p className="text-xl sm:text-2xl text-ink-soft mb-6">什么都接</p>
        <p className="text-base leading-relaxed text-ink-soft max-w-xl">
          本号承接对对子、发工牌、派工单、接状子，
          以及一切没有意义但有趣的业务。
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2">
        {TOYS.map((toy) =>
          toy.ready ? (
            <Link
              key={toy.href}
              href={toy.href}
              className="group block bg-paper-card border border-line rounded-lg p-6 transition-all hover:border-seal hover:-translate-y-0.5"
            >
              <div className="flex items-baseline justify-between mb-2">
                <h2 className="text-lg font-medium">{toy.name}</h2>
                <span className="text-xs text-ink-soft border border-line rounded px-2 py-0.5">
                  {toy.tag}
                </span>
              </div>
              <p className="text-sm text-ink-soft leading-relaxed">
                {toy.desc}
              </p>
            </Link>
          ) : (
            <div
              key={toy.href}
              className="block bg-paper-card border border-line border-dashed rounded-lg p-6 opacity-60"
            >
              <div className="flex items-baseline justify-between mb-2">
                <h2 className="text-lg font-medium">{toy.name}</h2>
                <span className="text-xs text-ink-soft">筹备中</span>
              </div>
              <p className="text-sm text-ink-soft leading-relaxed">
                {toy.desc}
              </p>
            </div>
          ),
        )}
      </section>

      <footer className="mt-20 pt-8 border-t border-line text-sm text-ink-soft">
        <p>9527 号 · 不承接任何正经业务</p>
      </footer>
    </main>
  );
}
*/
