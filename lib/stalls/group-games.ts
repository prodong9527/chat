import { z } from "zod";
import type { StallResult } from "@/lib/market/types";

export const GROUP_GAME_SLUGS = ["newcomer-guide", "meeting-exit", "performance-defense"] as const;

export type GroupGameSlug = (typeof GROUP_GAME_SLUGS)[number];
export type GroupGameDefinition = {
  fields: readonly { name: string; label: string; placeholder?: string; options?: readonly string[] }[];
  instruction: string;
  shareTemplate: "handbook" | "drill" | "award";
  groupPrompt: string;
};

const GroupGameInputSchemas = {
  "newcomer-guide": z.object({
    nickname: z.string().trim().min(1).max(30),
    departmentType: z.string().trim().min(1).max(30),
  }).strict(),
  "meeting-exit": z.object({
    meetingType: z.string().trim().min(1).max(30),
    exitLevel: z.string().trim().min(1).max(30),
  }).strict(),
  "performance-defense": z.object({
    smallTask: z.string().trim().min(1).max(60),
    workType: z.string().trim().min(1).max(30),
  }).strict(),
} as const;

const GROUP_GAME_DEFINITIONS: Record<GroupGameSlug, GroupGameDefinition> = {
  "newcomer-guide": {
    fields: [
      { name: "nickname", label: "新人代号", placeholder: "例如：小王" },
      { name: "departmentType", label: "拟入职部门", options: ["产品", "技术", "设计", "运营", "综合"] },
    ],
    instruction: "生成友善、荒诞的华府新员工说明书，不编造真实组织规则。",
    shareTemplate: "handbook",
    groupPrompt: "请各位老员工补充本员工尚未掌握的隐藏条例。",
  },
  "meeting-exit": {
    fields: [
      { name: "meetingType", label: "会议类型", options: ["例会", "评审会", "复盘会", "同步会"] },
      { name: "exitLevel", label: "演练等级", options: ["正常", "加急", "荒诞"] },
    ],
    instruction: "生成不欺骗、不冒充、不针对具体人的会议离席沟通演练通报。",
    shareTemplate: "drill",
    groupPrompt: "请各位同事补充一条清晰、诚实的会议协作约定。",
  },
  "performance-defense": {
    fields: [
      { name: "smallTask", label: "年度小事", placeholder: "例如：整理了共享文件夹" },
      { name: "workType", label: "工作属性", options: ["协作", "救火", "整理", "沟通", "创意"] },
    ],
    instruction: "生成友善、夸张但不贬损任何人的年度成果奖。",
    shareTemplate: "award",
    groupPrompt: "请各位同事提交自己的年度获奖项目。",
  },
};

const GROUP_GAME_FALLBACKS: Record<GroupGameSlug, StallResult> = {
  "newcomer-guide": {
    title: "华府新员工说明书",
    summary: "本说明书为本地兜底版本，请带着好奇心和一杯温水入职。",
    sections: [
      { label: "入府条例", value: "先问清目标，再把问题写进待办。" },
      { label: "生存物资", value: "一支笔、一个充电器，以及随时确认的勇气。" },
      { label: "部门暗号", value: "“我来同步一下”意为我们一起把事情讲明白。" },
    ],
    shareTemplate: "handbook",
  },
  "meeting-exit": {
    title: "会议逃生演练通报",
    summary: "本次演练只练清晰沟通，不练消失术。",
    sections: [
      { label: "演练目标", value: "提前说明时间边界与需要的结论。" },
      { label: "离席通报", value: "我需要在约定时间离开，会后会补齐负责事项。" },
      { label: "后续动作", value: "记录决定、负责人和截止时间，再同步给相关同事。" },
    ],
    shareTemplate: "drill",
  },
  "performance-defense": {
    title: "年度摸鱼成果奖",
    summary: "兹表彰所有让团队运转得更顺一点的细小努力。",
    sections: [
      { label: "奖项名称", value: "隐形齿轮贡献奖" },
      { label: "获奖事迹", value: "把散落的信息整理成了大家都能找到的答案。" },
      { label: "颁奖词", value: "看似平常的坚持，悄悄托住了很多人的一天。" },
    ],
    shareTemplate: "award",
  },
};

export function isGroupGameSlug(slug: string): slug is GroupGameSlug {
  return (GROUP_GAME_SLUGS as readonly string[]).includes(slug);
}

export function getGroupGameDefinition(slug: GroupGameSlug): GroupGameDefinition {
  return GROUP_GAME_DEFINITIONS[slug];
}

export function parseGroupGameInput(slug: GroupGameSlug, raw: unknown): Record<string, string> {
  return GroupGameInputSchemas[slug].parse(raw);
}

export function createFallbackGroupGameResult(slug: GroupGameSlug): StallResult {
  return GROUP_GAME_FALLBACKS[slug];
}

export function groupGameShareText(slug: GroupGameSlug, result: StallResult): string {
  const sections = result.sections.map(({ label, value }) => `${label}：${value}`).join("\n");
  return `${result.title}\n${result.summary}\n${sections}\n${GROUP_GAME_DEFINITIONS[slug].groupPrompt}`;
}
