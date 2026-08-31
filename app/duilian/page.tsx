import Link from "next/link";
import ToyChat from "@/components/ToyChat";

export default function DuilianPage() {
  return (
    <main className="flex-1 w-full max-w-2xl mx-auto px-6 py-12">
      <Link
        href="/"
        className="inline-block text-sm text-ink-soft hover:text-seal mb-8"
      >
        ← 回杂役摊
      </Link>
      <header className="mb-8">
        <h1 className="font-brush text-4xl font-bold mb-2">对穿肠擂台</h1>
        <p className="text-ink-soft text-sm">
          你出上联，它对下联。出得烂，它可不留情面。
        </p>
      </header>
      <ToyChat toy="duilian" placeholder="出你的上联" />
    </main>
  );
}
