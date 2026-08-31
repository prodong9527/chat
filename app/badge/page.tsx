"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import BadgeCanvas, { type BadgeData } from "@/components/badge/BadgeCanvas";
import { drawDate, drawNumber, drawPost, drawRemark } from "@/lib/draw-data";

function makeData(name: string): BadgeData {
  return {
    name,
    number: drawNumber(),
    post: drawPost().name,
    date: drawDate(),
    remark: drawRemark(),
  };
}

export default function BadgePage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [name, setName] = useState("");
  const [data, setData] = useState<BadgeData | null>(null);
  const [avatar, setAvatar] = useState<HTMLImageElement | null>(null);

  // 随机数据放到客户端初始化，避免 SSR 与 hydration 结果不一致
  useEffect(() => {
    setData(makeData(""));
  }, []);

  useEffect(() => {
    if (data) setData((d) => (d ? { ...d, name } : d));
  }, [name]);

  function reroll() {
    setData(makeData(name));
  }

  function onPickAvatar(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => setAvatar(img);
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  function save() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `9527-${name.trim() || "无名氏"}.png`;
      a.click();
      URL.revokeObjectURL(url);
    }, "image/png");
  }

  return (
    <main className="flex-1 w-full max-w-4xl mx-auto px-6 py-12 sm:py-16">
      <Link
        href="/"
        className="inline-block text-sm text-ink-soft hover:text-seal mb-10"
      >
        ← 回杂役摊
      </Link>

      <header className="mb-10">
        <h1 className="font-brush text-4xl sm:text-5xl font-bold mb-3">
          工牌生成器
        </h1>
        <p className="text-ink-soft">报上名来，领一张华府出入牌。</p>
      </header>

      <div className="grid gap-8 md:grid-cols-[1fr_320px] items-start">
        <div className="bg-paper-card border border-line rounded-lg p-4">
          {data ? (
            <BadgeCanvas canvasRef={canvasRef} data={data} avatar={avatar} />
          ) : (
            <div className="aspect-[640/1000] rounded-md border border-line bg-paper animate-pulse" />
          )}
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm text-ink-soft mb-2">姓 名</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value.slice(0, 8))}
              placeholder="无名氏"
              className="w-full px-4 py-3 bg-paper-card border border-line rounded-md text-base outline-none focus:border-seal"
            />
          </div>

          <div>
            <label className="block text-sm text-ink-soft mb-2">
              头像（可不传）
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={onPickAvatar}
              className="block w-full text-sm text-ink-soft file:mr-3 file:px-4 file:py-2 file:border-0 file:rounded file:bg-ink file:text-paper file:text-sm file:cursor-pointer"
            />
            {avatar && (
              <button
                onClick={() => setAvatar(null)}
                className="mt-2 text-xs text-ink-soft hover:text-seal"
              >
                移除头像
              </button>
            )}
          </div>

          <div className="space-y-3 pt-2">
            <button
              onClick={save}
              disabled={!data}
              className="w-full px-6 py-3 bg-ink text-paper rounded-md font-medium transition-opacity hover:opacity-85 disabled:opacity-40"
            >
              保存图片
            </button>
            <button
              onClick={reroll}
              disabled={!data}
              className="w-full px-6 py-3 border border-line rounded-md text-base transition-colors hover:border-seal disabled:opacity-40"
            >
              换一批
            </button>
          </div>

          <p className="text-xs text-ink-soft leading-relaxed">
            头像只在浏览器里处理，不上传服务器。
            <br />
            编号、职位、评语都是随机的，中意就保存，不中意就换。
          </p>
        </div>
      </div>
    </main>
  );
}
