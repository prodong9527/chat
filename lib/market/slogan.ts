const SLOGANS = ["做人如果没有梦想，和咸鱼有什么区别？", "我养你啊。先把这份材料递上来。", "还有谁？还有谁要来办事？", "你看，那个人好像一条狗。", "努力，奋斗！今天也别忘了排队。", "小强，你怎么了小强？系统正在受理。"];

export function sloganForDate(date: Date): string {
  const day = Math.floor(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()) / 86_400_000);
  return SLOGANS[day % SLOGANS.length];
}
