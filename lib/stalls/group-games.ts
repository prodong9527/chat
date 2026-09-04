import { z } from "zod";
import type { StallResult } from "@/lib/market/types";

export const GROUP_GAME_SLUGS = ["newcomer-guide", "meeting-exit", "performance-defense"] as const;

export type GroupGameSlug = (typeof GROUP_GAME_SLUGS)[number];
export type GroupGameDefinition = {
  fields: readonly { name: string; label: string; placeholder?: string; options?: readonly string[]; required?: boolean }[];
  instruction: string;
  shareTemplate: "handbook" | "drill" | "award";
  groupPrompt: string;
};

const DepartmentTypeSchema = z.enum(["产品", "技术", "设计", "运营", "综合"]);
const MeetingTypeSchema = z.enum(["例会", "评审会", "复盘会", "同步会"]);
const ExitLevelSchema = z.enum(["正常", "紧急", "荒诞"]);
const WorkTypeSchema = z.enum(["协作", "救火", "整理", "沟通", "创意"]);

const GroupGameInputSchemas = {
  "newcomer-guide": z.object({
    nickname: z.string().trim().max(30).optional(),
    departmentType: DepartmentTypeSchema,
  }).strict(),
  "meeting-exit": z.object({
    meetingType: MeetingTypeSchema,
    exitLevel: ExitLevelSchema,
  }).strict(),
  "performance-defense": z.object({
    smallTask: z.string().trim().min(1).max(60),
    workType: WorkTypeSchema,
  }).strict(),
} as const;

const GROUP_GAME_DEFINITIONS: Record<GroupGameSlug, GroupGameDefinition> = {
  "newcomer-guide": {
    fields: [
      { name: "nickname", label: "新人代号（可留空）", placeholder: "例如：小王", required: false },
      { name: "departmentType", label: "拟入职部门", options: ["产品", "技术", "设计", "运营", "综合"] },
    ],
    instruction: "生成友善、荒诞的华府新员工说明书，不编造真实组织规则。sections 必须依次为：入职首日必修课、生存装备、直属领导饲养指南、隐藏条例。",
    shareTemplate: "handbook",
    groupPrompt: "请各位老员工补充本员工尚未掌握的隐藏条例。",
  },
  "meeting-exit": {
    fields: [
      { name: "meetingType", label: "会议类型", options: ["例会", "评审会", "复盘会", "同步会"] },
      { name: "exitLevel", label: "演练等级", options: ["正常", "紧急", "荒诞"] },
    ],
    instruction: "生成不欺骗、不冒充、不针对具体人的会议离席沟通演练通报。sections 必须依次为：突发事件、当前逃生身份、三步逃生动作、预计成功率。",
    shareTemplate: "drill",
    groupPrompt: "请投票：这套方案能否在“最后补充一点”前成功离场？",
  },
  "performance-defense": {
    fields: [
      { name: "smallTask", label: "年度小事", placeholder: "例如：整理了共享文件夹" },
      { name: "workType", label: "工作属性", options: ["协作", "救火", "整理", "沟通", "创意"] },
    ],
    instruction: "生成友善、夸张但不贬损任何人的年度成果奖。sections 必须依次为：奖项名称、表彰事由、可量化的虚构成果、评审委员会批语。",
    shareTemplate: "award",
    groupPrompt: "请各位同事提交自己的年度获奖项目。",
  },
};

const CURATED_GROUP_GAME_RESULTS: Record<GroupGameSlug, readonly StallResult[]> = {
  "newcomer-guide": [
    {
      title: "华府新员工说明书",
      summary: "欢迎领取一份不慌不忙的入府适应手册。",
      sections: [
        { label: "入职首日必修课", value: "先把目标、负责人和截止时间写进同一张待办。" },
        { label: "生存装备", value: "一支笔、一个充电器，以及随时确认的勇气。" },
        { label: "直属领导饲养指南", value: "只描述泛化习惯：带着结论、风险和下一步来沟通。" },
        { label: "隐藏条例", value: "一、先问清目标，再开始忙。\n二、把决定记下来，省去猜谜。\n三、遇到卡点及时举手求援。" },
      ],
      shareTemplate: "handbook",
    },
    {
      title: "华府新员工说明书",
      summary: "本页专治刚入府时的流程迷雾。",
      sections: [
        { label: "入职首日必修课", value: "认识项目入口，再确认自己负责的第一小步。" },
        { label: "生存装备", value: "一个日历提醒、一杯温水和可追踪的待办。" },
        { label: "直属领导饲养指南", value: "只描述泛化习惯：同步进展时，把选择和需要的帮助说清楚。" },
        { label: "隐藏条例", value: "一、开会前先写下想要的结论。\n二、协作时默认对事不对人。\n三、下班前给明天留一条清楚的线索。" },
      ],
      shareTemplate: "handbook",
    },
  ],
  "meeting-exit": [
    {
      title: "会议逃生演练通报",
      summary: "本次演练只练清晰沟通，不练消失术。",
      sections: [
        { label: "突发事件", value: "时间边界临近，会议需要收束到明确结论。" },
        { label: "当前逃生身份", value: "清晰沟通的事项负责人。" },
        { label: "三步逃生动作", value: "说明时间边界、确认负责人、会后补齐记录。" },
        { label: "预计成功率", value: "在提前说明和完整交接下，稳稳当当。" },
      ],
      shareTemplate: "drill",
    },
    {
      title: "会议逃生演练通报",
      summary: "流程允许离席，前提是把协作线索留完整。",
      sections: [
        { label: "突发事件", value: "议题已覆盖，需要为后续动作留出执行时间。" },
        { label: "当前逃生身份", value: "守住时间约定的会议参与者。" },
        { label: "三步逃生动作", value: "复述结论、标记待办、约定会后补充渠道。" },
        { label: "预计成功率", value: "结论明确、交接完整时，保持从容。" },
      ],
      shareTemplate: "drill",
    },
  ],
  "performance-defense": [
    {
      title: "年度摸鱼成果奖",
      summary: "兹表彰所有让团队运转得更顺一点的细小努力。",
      sections: [
        { label: "奖项名称", value: "隐形齿轮贡献奖" },
        { label: "表彰事由", value: "让信息更容易被找到，让协作少绕一圈。" },
        { label: "可量化的虚构成果", value: "把三次寻找答案的旅程，压缩成一次轻松定位。" },
        { label: "评审委员会批语", value: "看似平常的坚持，悄悄托住了很多人的一天。" },
      ],
      shareTemplate: "award",
    },
    {
      title: "年度摸鱼成果奖",
      summary: "此奖献给那些默默把流程扶正的人。",
      sections: [
        { label: "奖项名称", value: "流程顺手推动奖" },
        { label: "表彰事由", value: "让大家下一次接手时少问一个问题、多走一步正路。" },
        { label: "可量化的虚构成果", value: "让七张便签和平共处，并减少两轮来回确认。" },
        { label: "评审委员会批语", value: "细小的整理与沟通，也是可靠的团队魔法。" },
      ],
      shareTemplate: "award",
    },
  ],
};

const GROUP_GAME_FALLBACKS: Record<GroupGameSlug, StallResult> = {
  "newcomer-guide": {
    title: "华府新员工说明书",
    summary: "本说明书为本地兜底版本，请带着好奇心和一杯温水入职。",
    sections: [
      { label: "入职首日必修课", value: "先问清目标，再把问题写进待办。" },
      { label: "生存装备", value: "一支笔、一个充电器，以及随时确认的勇气。" },
      { label: "直属领导饲养指南", value: "只描述泛化工作习惯：把结论、风险和下一步说清楚。" },
      { label: "隐藏条例", value: "一、先确认目标，不替别人猜题。\n二、把决定写下，方便大家接力。\n三、遇到卡点及时说明需要的帮助。" },
    ],
    shareTemplate: "handbook",
    isFallback: true,
  },
  "meeting-exit": {
    title: "会议逃生演练通报",
    summary: "本次演练只练清晰沟通，不练消失术。",
    sections: [
      { label: "突发事件", value: "时间边界临近，需要确认会议结论。" },
      { label: "当前逃生身份", value: "清晰沟通的事项负责人。" },
      { label: "三步逃生动作", value: "说明时间边界、确认负责人、会后补齐记录。" },
      { label: "预计成功率", value: "在提前说明和完整交接下，稳稳当当。" },
    ],
    shareTemplate: "drill",
    isFallback: true,
  },
  "performance-defense": {
    title: "年度摸鱼成果奖",
    summary: "兹表彰所有让团队运转得更顺一点的细小努力。",
    sections: [
      { label: "奖项名称", value: "隐形齿轮贡献奖" },
      { label: "表彰事由", value: "把散落的信息整理成了大家都能找到的答案。" },
      { label: "可量化的虚构成果", value: "让三次寻找文件的旅程缩短成一次轻松定位。" },
      { label: "评审委员会批语", value: "看似平常的坚持，悄悄托住了很多人的一天。" },
    ],
    shareTemplate: "award",
    isFallback: true,
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

function copyResult(result: StallResult): StallResult {
  return { ...result, sections: result.sections.map((section) => ({ ...section })) };
}

export function createCuratedGroupGameResult(slug: GroupGameSlug, input: Record<string, string>): StallResult {
  // Free-text fields never contribute to display text; only their associated safe themes pick a local variant.
  const theme = Object.entries(input)
    .filter(([key]) => key !== "nickname" && key !== "smallTask")
    .map(([, value]) => value)
    .join("");
  const index = Array.from(theme).reduce((sum, character) => sum + character.codePointAt(0)!, 0) % CURATED_GROUP_GAME_RESULTS[slug].length;
  return copyResult(CURATED_GROUP_GAME_RESULTS[slug][index]!);
}

export function groupGameShareText(slug: GroupGameSlug, result: StallResult): string {
  const sections = result.sections.map(({ label, value }) => `${label}：${value}`).join("\n");
  return `${result.title}\n${result.summary}\n${sections}\n${GROUP_GAME_DEFINITIONS[slug].groupPrompt}`;
}
