import Link from "next/link";
import type { ReactNode } from "react";

export function MarketShell({ children }: { children: ReactNode }) {
  return <main className="market-shell">
    <header className="market-header"><Link href="/" className="market-brand">华府后街 <b>9527</b> 号便民摊位集市</Link><span>今日照常胡闹</span></header>
    {children}
    <footer className="market-footer">本集市不承接正经业务。摊主有权暂时离岗。</footer>
  </main>;
}
