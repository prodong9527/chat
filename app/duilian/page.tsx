import ToyChat from "@/components/ToyChat";
import { MarketShell } from "@/components/market/MarketShell";

export default function DuilianPage() {
  return (
    <MarketShell><section className="stall-page">
      <header className="mb-8">
        <h1 className="font-brush text-4xl font-bold mb-2">对穿肠擂台</h1>
        <p className="text-ink-soft text-sm">
          你出上联，它对下联。出得烂，它可不留情面。
        </p>
      </header>
      <ToyChat toy="duilian" placeholder="出你的上联" />
    </section></MarketShell>
  );
}
