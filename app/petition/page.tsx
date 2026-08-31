import Link from "next/link";
import ToyChat from "@/components/ToyChat";

export default function PetitionPage() {
  return (
    <main className="flex-1 w-full max-w-2xl mx-auto px-6 py-12">
      <Link
        href="/"
        className="inline-block text-sm text-ink-soft hover:text-seal mb-8"
      >
        ← 回杂役摊
      </Link>
      <header className="mb-8">
        <h1 className="font-brush text-4xl font-bold mb-2">华府信访办</h1>
        <p className="text-ink-soft text-sm">来办事？这个嘛，得研究研究。</p>
      </header>
      <ToyChat toy="petition" placeholder="说说你要办什么事" />
    </main>
  );
}
