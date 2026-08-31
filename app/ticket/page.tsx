import Link from "next/link";
import ToyChat from "@/components/ToyChat";

export default function TicketPage() {
  return (
    <main className="flex-1 w-full max-w-2xl mx-auto px-6 py-12">
      <Link
        href="/"
        className="inline-block text-sm text-ink-soft hover:text-seal mb-8"
      >
        ← 回杂役摊
      </Link>
      <header className="mb-8">
        <h1 className="font-brush text-4xl font-bold mb-2">今日工单</h1>
        <p className="text-ink-soft text-sm">每日一张工单，可完成，可驳回。</p>
      </header>
      <ToyChat
        toy="ticket"
        placeholder="回话给管事"
        hint="说「驳回」或「完成」也行。"
      />
    </main>
  );
}
