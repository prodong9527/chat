const FORTUNES = [
  ["摸鱼", "主动接需求", "收到，正在同步相关同学。"], ["回‘收到’", "问‘这个归谁管’", "我先拉个群把链路对齐。"], ["假装开会", "优化已经运行的东西", "这个方向很有价值，容我沉淀一下。"], ["整理桌面", "回复三天前的消息", "已看到，晚些时候给您一个有温度的答复。"],
] as const;
function hash(text: string) { let value = 2166136261; for (const char of text) value = Math.imul(value ^ char.charCodeAt(0), 16777619); return value >>> 0; }
export function getDailyFortune(date: string, deviceSeed: string) { const [good, bad, line] = FORTUNES[hash(`${date}:${deviceSeed}`) % FORTUNES.length]; return { date, good, bad, line, score: hash(`${deviceSeed}:${date}:score`) % 5 + 1 }; }
