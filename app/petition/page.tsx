import ToyChat from "@/components/ToyChat";
import { MarketShell } from "@/components/market/MarketShell";

export default function PetitionPage() {
  return (
    <MarketShell><section className="stall-page">
      <header className="mb-8">
        <h1 className="font-brush text-4xl font-bold mb-2">华府信访办</h1>
        <p className="text-ink-soft text-sm">来办事？这个嘛，得研究研究。</p>
      </header>
      <ToyChat toy="petition" placeholder="说说你要办什么事" />
    </section></MarketShell>
  );
}
