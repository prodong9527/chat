import ToyChat from "@/components/ToyChat";
import { MarketShell } from "@/components/market/MarketShell";

export default function TicketPage() {
  return (
    <MarketShell><section className="stall-page">
      <header className="mb-8">
        <h1 className="font-brush text-4xl font-bold mb-2">今日工单</h1>
        <p className="text-ink-soft text-sm">每日一张工单，可完成，可驳回。</p>
      </header>
      <ToyChat
        toy="ticket"
        placeholder="回话给管事"
        hint="说「驳回」或「完成」也行。"
      />
    </section></MarketShell>
  );
}
