import type { BadgeData } from "@/components/badge/BadgeCanvas";

export const TITLES = [
  "高级摸鱼架构师", "第七代传薪人", "工位风水总监", "需求已读研究员", "会议纪要蒸馏师", "摸鱼流程合规官",
  "茶水间战略顾问", "跨部门已读专员", "项目进度观察员", "表格边框鉴定师", "周会静音执行官", "键盘声效设计师",
  "待办事项搬运工", "工牌挂绳总监", "流程卡点维护员", "PPT 留白研究员", "午休秩序巡查使", "群聊气氛组组长",
  "文件命名规划师", "打印机情绪安抚员", "工位绿植代言人", "报销单折角专员", "茶叶续杯协调员", "临时需求缓冲官",
];
export const DEPARTMENTS = [
  "战略发呆部", "不急不缓司", "跨部门甩锅中心", "华府流程研究院", "茶水间情报局", "例会延长处",
  "格式统一科", "需求漂流所", "临时任务驿站", "工位秩序署", "已读回执办", "周报润色厂",
];
export const SKILLS = [
  "已读不回", "假装在开会", "Ctrl+C/V 大师", "收到但不理解", "精准踩点", "文件改名",
  "空气式汇报", "熟练转发", "适度沉默", "表情包沟通", "假装断网", "会议速记",
  "隔空催进度", "熟练泡茶", "精准甩锅", "快速撤回", "摸鱼雷达", "群聊隐身",
];

function select<T>(items: readonly T[], random: () => number, excluded: readonly T[] = []): T {
  const candidates = items.filter((item) => !excluded.includes(item));
  return candidates[Math.floor(random() * candidates.length)];
}

function selectMany<T>(items: readonly T[], count: number, random: () => number, excluded: readonly T[] = []): T[] {
  const picked: T[] = [];
  while (picked.length < count) picked.push(select(items, random, [...excluded, ...picked]));
  return picked;
}

export function createBadge(name: string, random = Math.random, previous?: BadgeData): BadgeData {
  return {
    name: name.trim() || "无名氏",
    number: String(1000 + Math.floor(random() * 9000)),
    titles: selectMany(TITLES, 3, random, previous?.titles),
    department: select(DEPARTMENTS, random, previous ? [previous.department] : []),
    skills: selectMany(SKILLS, 3, random, previous?.skills),
  };
}
