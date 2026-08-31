const MAX_LEN = 500;
const RATE_WINDOW_MS = 60_000;
const RATE_LIMIT = 10;

/**
 * 需要额外拦截的词，按需自行补充。
 * 默认留空：只做长度、刷屏、频率这类技术性拦截。
 */
const BLOCKED: string[] = [];

const hits = new Map<string, number[]>();

/** 去掉空白、零宽字符与控制字符 */
function normalize(text: string): string {
  return text.replace(/[\u200b-\u200f\ufeff\u0000-\u001f]/g, "").trim();
}

/** 单一字符连续重复超过 15 次视为刷屏 */
function isSpam(text: string): boolean {
  return /(.)\1{14,}/.test(text.replace(/\s/g, ""));
}

/** 去掉全部标点和空白后还有没有实际内容 */
function hasContent(text: string): boolean {
  return text.replace(/[\s\p{P}\p{S}]/gu, "").length > 0;
}

export type GuardResult = { ok: true } | { ok: false; reason: string };

export function checkInput(raw: unknown): GuardResult {
  if (typeof raw !== "string") return { ok: false, reason: "这算什么话？" };

  const text = normalize(raw);
  if (!text) return { ok: false, reason: "你倒是说句话啊。" };
  if (!hasContent(text)) return { ok: false, reason: "光打标点符号，糊弄谁呢。" };
  if (text.length > MAX_LEN)
    return { ok: false, reason: `太长了，超 ${MAX_LEN} 字，本号懒得看。` };
  if (isSpam(text)) return { ok: false, reason: "同一个字翻来覆去，你当我是账房？" };

  const lower = text.toLowerCase();
  if (BLOCKED.some((w) => lower.includes(w.toLowerCase())))
    return { ok: false, reason: "这话本号接不了，换一句。" };

  return { ok: true };
}

/**
 * 单 IP 频率限制。
 * 注意：Vercel Function 多实例，内存计数不精确，只用来挡明显的刷子。
 * 真正的并发排队交给推理框架的 max_num_seqs。
 */
export function checkRate(ip: string): GuardResult {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);

  if (recent.length >= RATE_LIMIT) {
    hits.set(ip, recent);
    return { ok: false, reason: "慢点，本号只有一双手。" };
  }

  recent.push(now);
  hits.set(ip, recent);
  return { ok: true };
}

/** 防止 Map 无限增长，同时不阻止进程退出 */
setInterval(() => {
  const now = Date.now();
  for (const [ip, times] of hits) {
    const alive = times.filter((t) => now - t < RATE_WINDOW_MS);
    if (alive.length) hits.set(ip, alive);
    else hits.delete(ip);
  }
}, RATE_WINDOW_MS).unref?.();

export function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}
