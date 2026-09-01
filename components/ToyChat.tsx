"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { useEffect, useRef, useState } from "react";
import { GREETINGS, type ToyKey } from "@/lib/prompts";
import Idle from "./Idle";

type Props = {
  toy: ToyKey;
  placeholder: string;
  hint?: string;
};

function textOf(m: UIMessage): string {
  return m.parts
    .map((p) =>
      p.type === "text" ? String((p as { text?: unknown }).text ?? "") : "",
    )
    .join("");
}

/** 「（今日工单）」这类括号指令是触发词，不该显示成用户气泡 */
function isCommand(text: string): boolean {
  return /^（.+）$/.test(text.trim());
}

export default function ToyChat({ toy, placeholder, hint }: Props) {
  const { messages, sendMessage, status, error, regenerate, stop } = useChat({
    transport: new DefaultChatTransport({ body: { toy } }),
  });

  const [input, setInput] = useState("");
  const [slow, setSlow] = useState(false);
  const greeted = useRef(false);
  const boxRef = useRef<HTMLDivElement>(null);

  const busy = status === "submitted" || status === "streaming";

  // 开场白只发一次，省得用户对着空白框发呆
  useEffect(() => {
    if (greeted.current) return;
    greeted.current = true;
    sendMessage({ text: GREETINGS[toy] });
  }, [toy, sendMessage]);

  // 27B 首字本来就慢，超过 8 秒给句人话
  useEffect(() => {
    const t = setTimeout(() => setSlow(status === "submitted"), status === "submitted" ? 8000 : 0);
    return () => clearTimeout(t);
  }, [status]);

  useEffect(() => {
    const el = boxRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, busy, slow]);

  function submit() {
    const text = input.trim();
    if (!text || busy) return;
    sendMessage({ text });
    setInput("");
  }

  return (
    <div>
      <div
        ref={boxRef}
        className="bg-paper-card border border-line rounded-lg p-5 h-[52vh] min-h-[260px] overflow-y-auto space-y-4"
      >
        {messages.map((m) => {
          const text = textOf(m);
          if (!text || isCommand(text)) return null;
          const mine = m.role === "user";
          return (
            <div key={m.id} className={mine ? "flex justify-end" : "flex gap-3"}>
              {!mine && (
                <span className="shrink-0 mt-1.5 text-seal text-xs font-brush">
                  9527
                </span>
              )}
              <div
                className={
                  mine
                    ? "inline-block max-w-[80%] bg-ink text-paper rounded-lg px-4 py-2 text-sm leading-relaxed whitespace-pre-wrap"
                    : "font-brush text-lg leading-relaxed whitespace-pre-wrap"
                }
              >
                {text}
              </div>
            </div>
          );
        })}

        {busy && (
          <p className="text-sm text-ink-soft">
            {slow ? "9527 号正在翻箱倒柜……" : "・ ・ ・"}
          </p>
        )}

        {error && <Idle detail={error.message} onRetry={() => regenerate()} />}
      </div>

      <div className="mt-4 flex gap-2 items-end">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              submit();
            }
          }}
          rows={2}
          placeholder={placeholder}
          className="flex-1 px-4 py-3 bg-paper-card border border-line rounded-md resize-none outline-none focus:border-seal"
        />
        {busy ? (
          <button
            onClick={() => stop()}
            className="px-5 py-3 border border-line rounded-md whitespace-nowrap hover:border-seal"
          >
            打住
          </button>
        ) : (
          <button
            onClick={submit}
            disabled={!input.trim()}
            className="px-5 py-3 bg-ink text-paper rounded-md whitespace-nowrap disabled:opacity-40"
          >
            递上去
          </button>
        )}
      </div>

      <p className="mt-3 text-xs text-ink-soft">
        {hint ?? "Enter 发送，Shift + Enter 换行。"}
      </p>
    </div>
  );
}
