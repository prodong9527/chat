import type { StallResult } from "@/lib/market/types";
export function ResultDocument({ result }: { result: StallResult }) { return <article className="result-document"><h2>{result.title}</h2><p>{result.summary}</p>{result.sections.map((section) => <section key={section.label}><b>{section.label}</b><span>{section.value}</span></section>)}</article>; }
