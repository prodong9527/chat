"use client";

import { useState } from "react";

const IDLE_LINES = [
  {
    title: "9527 号今日歇工，明日请早。",
    sub: "（本号正在后巷喂狗，有事留言。）",
  },
  {
    title: "9527 号外出办事，留下字样：勿念。",
    sub: "（工牌挂在墙上，风吹得哗哗响。）",
  },
  {
    title: "华府今日封府。",
    sub: "（管事说要盘点，其实是在打麻将。）",
  },
];

export default function Idle({
  detail,
  onRetry,
}: {
  detail?: string;
  onRetry?: () => void;
}) {
  const [line] = useState(
    () => IDLE_LINES[Math.floor(Math.random() * IDLE_LINES.length)],
  );
  return (
    <div className="border border-dashed border-line rounded-lg p-10 text-center">
      <p className="font-brush text-2xl font-bold mb-3">{line.title}</p>
      <p className="text-sm text-ink-soft mb-6">{line.sub}</p>
      {detail && (
        <p className="text-xs text-ink-soft/70 mb-6 font-mono break-all">
          {detail}
        </p>
      )}
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-6 py-2 border border-line rounded-md text-sm hover:border-seal transition-colors"
        >
          再 试 一 次
        </button>
      )}
    </div>
  );
}
