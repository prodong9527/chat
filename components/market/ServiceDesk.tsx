"use client";
import { useState } from "react";
import { ShareActions } from "@/components/share/ShareActions";
import { resultSharePayload } from "@/components/share/templates";
import { ResultDocument } from "./ResultDocument";
import { parseStallResult, SERVICE_FIELDS } from "@/lib/stalls/result";
import { getGroupGameDefinition, groupGameShareText, isGroupGameSlug } from "@/lib/stalls/group-games";
import type { StallResult } from "@/lib/market/types";

export function ServiceDesk({ slug, name }: { slug: string; name: string }) {
  const field = SERVICE_FIELDS[slug] ?? { label: "办理内容", placeholder: "写下你要办的事" };
  const groupSlug = isGroupGameSlug(slug) ? slug : null;
  const groupGame = groupSlug ? getGroupGameDefinition(groupSlug) : null;
  const [input, setInput] = useState("");
  const [groupInput, setGroupInput] = useState<Record<string, string>>({});
  const [result, setResult] = useState<StallResult | null>(null);
  const [error, setError] = useState("");
  const [copyMessage, setCopyMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const ready = groupGame ? groupGame.fields.every((groupField) => groupInput[groupField.name]?.trim()) : input.trim();
  const groupText = groupSlug && result ? groupGameShareText(groupSlug, result) : "";

  async function submit() {
    setBusy(true);
    setError("");
    try {
      const body = groupGame ? groupInput : { input };
      const res = await fetch(`/api/stalls/${slug}/generate`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
      const text = await res.text();
      if (!res.ok) throw new Error(text);
      setResult(parseStallResult(text));
      await fetch("/api/metrics", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ slug, event: "generation" }) });
    } catch {
      setError("摊主暂时去沏茶了，原文还在，稍后再试。");
    } finally {
      setBusy(false);
    }
  }

  async function copyGroupText() {
    try {
      await navigator.clipboard.writeText(groupText);
      setCopyMessage("已复制，可直接发到群里。")
    } catch {
      setCopyMessage("复制没成功，文字仍可选中后手动发送。")
    }
  }

  return <section className="service-desk">
    <p className="desk-seal">{name} · 业务受理单</p>
    {groupGame ? <div className="service-fields">
      {groupGame.fields.map((groupField) => <label key={groupField.name}>{groupField.label}
        {groupField.options ? <select value={groupInput[groupField.name] ?? ""} onChange={(event) => setGroupInput((current) => ({ ...current, [groupField.name]: event.target.value }))}>
          <option value="" disabled>请选择</option>
          {groupField.options.map((option) => <option key={option} value={option}>{option}</option>)}
        </select> : groupField.name === "smallTask" ? <textarea value={groupInput[groupField.name] ?? ""} onChange={(event) => setGroupInput((current) => ({ ...current, [groupField.name]: event.target.value }))} placeholder={groupField.placeholder} maxLength={60} /> : <input value={groupInput[groupField.name] ?? ""} onChange={(event) => setGroupInput((current) => ({ ...current, [groupField.name]: event.target.value }))} placeholder={groupField.placeholder} maxLength={30} />}
      </label>)}
    </div> : <label>{field.label}<textarea value={input} onChange={(event) => setInput(event.target.value)} placeholder={field.placeholder} maxLength={500} /></label>}
    <button disabled={!ready || busy} onClick={submit}>{busy ? <><i className="desk-spinner" aria-hidden />正在替你走流程</> : "递交材料"}</button>
    {busy && <p className="desk-loading" role="status">摊主正在盖章、找人签字、假装催办……</p>}
    {error && <p className="desk-error">{error}</p>}
    {result && <><ResultDocument result={result} />
      {groupGame && <section className="group-copy"><p className="group-prompt">{groupGame.groupPrompt}</p><label>发到群里<textarea aria-label="群聊版内容" readOnly value={groupText} /></label><button onClick={copyGroupText}>复制群聊版</button>{copyMessage && <p>{copyMessage}</p>}</section>}
      <ShareActions template={result.shareTemplate} payload={resultSharePayload(result)} filename={`${slug}-9527.png`} onSaved={() => void fetch("/api/metrics", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ slug, event: "image_save" }) })} />
    </>}
  </section>;
}
