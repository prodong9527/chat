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

type DepartmentType = z.infer<typeof DepartmentTypeSchema>;
type MeetingType = z.infer<typeof MeetingTypeSchema>;
type ExitLevel = z.infer<typeof ExitLevelSchema>;
type WorkType = z.infer<typeof WorkTypeSchema>;

const NEWCOMER_RESULTS: Record<DepartmentType, StallResult> = {
  产品: { title: "华府新员工说明书", summary: "产品组的第一课：让问题和答案在同一张纸上见面。", sections: [{ label: "入职首日必修课", value: "先确认用户、目标和下一步验证。" }, { label: "生存装备", value: "一张需求卡、一支笔和一颗求证心。" }, { label: "直属领导饲养指南", value: "只描述泛化习惯：先给结论，再补证据。" }, { label: "隐藏条例", value: "一、先问为什么，再问怎么做。\n二、把假设写下来，方便验证。\n三、每次讨论都留下下一步。" }], shareTemplate: "handbook" },
  技术: { title: "华府新员工说明书", summary: "技术组的第一课：把不确定性拆成可验证的小步。", sections: [{ label: "入职首日必修课", value: "先跑通最小路径，再记录边界条件。" }, { label: "生存装备", value: "一个终端、一份文档和可复现的步骤。" }, { label: "直属领导饲养指南", value: "只描述泛化习惯：报告风险时，也带上可选方案。" }, { label: "隐藏条例", value: "一、先复现问题，再讨论修法。\n二、改动前后都留一条验证线索。\n三、卡住时及时把上下文交出来。" }], shareTemplate: "handbook" },
  设计: { title: "华府新员工说明书", summary: "设计组的第一课：让每个选择都能被看见和讨论。", sections: [{ label: "入职首日必修课", value: "先对齐场景，再让方案服务于真实使用。" }, { label: "生存装备", value: "一支标注笔、一个原型和一份清楚的说明。" }, { label: "直属领导饲养指南", value: "只描述泛化习惯：展示方案时，说清取舍和影响。" }, { label: "隐藏条例", value: "一、先看使用场景，再画第一稿。\n二、反馈针对方案，不针对任何人。\n三、每次改动说明它解决了什么。" }], shareTemplate: "handbook" },
  运营: { title: "华府新员工说明书", summary: "运营组的第一课：把热闹变成可跟进的节奏。", sections: [{ label: "入职首日必修课", value: "先确认触达对象，再安排清楚的跟进节奏。" }, { label: "生存装备", value: "一份排期、一张看板和一条备用提醒。" }, { label: "直属领导饲养指南", value: "只描述泛化习惯：同步进展时，同时标记风险和需要协助处。" }, { label: "隐藏条例", value: "一、先定节奏，再补充创意。\n二、重要信息至少留一个可查入口。\n三、收尾时把下一轮线索交清楚。" }], shareTemplate: "handbook" },
  综合: { title: "华府新员工说明书", summary: "综合组的第一课：让每一次接力都有清楚的落点。", sections: [{ label: "入职首日必修课", value: "先确认谁需要什么，再把事项送到正确入口。" }, { label: "生存装备", value: "一个联系人清单、一份待办和一条时间线。" }, { label: "直属领导饲养指南", value: "只描述泛化习惯：协调前先对齐优先级和边界。" }, { label: "隐藏条例", value: "一、先分清轻重缓急，再安排顺序。\n二、接到事项先复述一次确认。\n三、完成后留下可追溯的记录。" }], shareTemplate: "handbook" },
};

const MEETING_SCENARIOS: Record<MeetingType, { summary: string; incident: string; identity: string }> = {
  例会: { summary: "例会已到收束节点，重点是留下明确行动。", incident: "例行议题已完成，需要按时收束。", identity: "守住会议节奏的日常协作员。" },
  评审会: { summary: "评审会进入结论阶段，重点是记录取舍。", incident: "方案已展示完毕，需要确认评审结论。", identity: "负责把取舍写清楚的评审参与者。" },
  复盘会: { summary: "复盘会已梳理关键事实，重点是带走改进项。", incident: "事实和经验已汇总，需要锁定后续改进。", identity: "帮助团队把经验变成下一步的人。" },
  同步会: { summary: "同步会已交换状态，重点是让信息继续流动。", incident: "各方进展已同步，需要交接未决事项。", identity: "维护信息流通的同步联络员。" },
};

const EXIT_ACTIONS: Record<ExitLevel, { summary: string; steps: string; rate: string }> = {
  正常: { summary: "按既定时间边界完成交接。", steps: "复述结论、标记待办、约定会后补充渠道。", rate: "在完整交接下，稳稳当当。" },
  紧急: { summary: "需要优先处理时间敏感事项，但交接不能缺席。", steps: "说明紧急时间边界、指定临时负责人、会后补齐记录。", rate: "提前说明并完成交接时，保持可靠。" },
  荒诞: { summary: "演练警报响起：流程要幽默，交接仍要认真。", steps: "郑重宣布流程小休、写下结论、把待办交给清楚的下一棒。", rate: "道具再荒诞，交接完整就能从容。" },
};

type TaskCategory = "organize" | "communicate" | "repair" | "coordinate" | "default";
const AWARD_CATEGORIES: Record<TaskCategory, { award: string; citation: string; metric: string; review: string }> = {
  organize: { award: "归档秩序奖", citation: "把散落的线索摆回了大家都能找到的位置。", metric: "让三次翻找资料的旅程，缩短成一次轻松定位。", review: "秩序不是小事，它替团队省下了很多深呼吸。" },
  communicate: { award: "清晰回声奖", citation: "让需要知道的人，在恰当的时候听见了关键信息。", metric: "把两轮追问压缩成一条可执行的说明。", review: "说清楚的温柔，是协作里可靠的节能灯。" },
  repair: { award: "补洞修补奖", citation: "耐心找到了卡住流程的小缝，并把它补得更顺。", metric: "让一次小故障少绕四个弯，回到可验证的正路。", review: "修好一个小坑，也是在给明天铺路。" },
  coordinate: { award: "协作接力奖", citation: "让不同节奏的人，接上了同一条清楚的时间线。", metric: "把三处等待变成一次明确的接力安排。", review: "协调不是催促，而是让每个人知道下一棒在哪里。" },
  default: { award: "默默推进奖", citation: "完成了一件看似平常、实则让团队更顺的事。", metric: "让一个小小阻塞少停半拍，多走一步。", review: "细小而可靠的推进，值得一枚郑重的印章。" },
};

const WORK_TYPE_CONTEXT: Record<WorkType, { summary: string; qualifier: string }> = {
  协作: { summary: "协作席特别颁发", qualifier: "它让接力更顺畅。" },
  救火: { summary: "救火席特别颁发", qualifier: "它让临场处置更稳当。" },
  整理: { summary: "整理席特别颁发", qualifier: "它让后续查找更轻松。" },
  沟通: { summary: "沟通席特别颁发", qualifier: "它让信息抵达得更准确。" },
  创意: { summary: "创意席特别颁发", qualifier: "它让下一步多了一种清楚的可能。" },
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
  if (slug === "newcomer-guide") {
    const department = input.departmentType as DepartmentType;
    return Object.hasOwn(NEWCOMER_RESULTS, department) ? copyResult(NEWCOMER_RESULTS[department]) : copyResult(GROUP_GAME_FALLBACKS[slug]);
  }

  if (slug === "meeting-exit") {
    const meetingType = input.meetingType as MeetingType;
    const exitLevel = input.exitLevel as ExitLevel;
    if (!Object.hasOwn(MEETING_SCENARIOS, meetingType) || !Object.hasOwn(EXIT_ACTIONS, exitLevel)) return copyResult(GROUP_GAME_FALLBACKS[slug]);
    const scenario = MEETING_SCENARIOS[meetingType];
    const exit = EXIT_ACTIONS[exitLevel];
    return {
      title: "会议逃生演练通报",
      summary: `${scenario.summary}${exit.summary}`,
      sections: [
        { label: "突发事件", value: scenario.incident },
        { label: "当前逃生身份", value: scenario.identity },
        { label: "三步逃生动作", value: exit.steps },
        { label: "预计成功率", value: exit.rate },
      ],
      shareTemplate: "drill",
    };
  }

  const workType = input.workType as WorkType;
  if (!Object.hasOwn(WORK_TYPE_CONTEXT, workType)) return copyResult(GROUP_GAME_FALLBACKS[slug]);
  const workContext = WORK_TYPE_CONTEXT[workType];
  const category = classifySmallTask(input.smallTask ?? "");
  const award = AWARD_CATEGORIES[category];
  return {
    title: "年度摸鱼成果奖",
    summary: `${workContext.summary}：表彰一件让团队更顺的细小努力。`,
    sections: [
      { label: "奖项名称", value: award.award },
      { label: "表彰事由", value: `${award.citation}${workContext.qualifier}` },
      { label: "可量化的虚构成果", value: award.metric },
      { label: "评审委员会批语", value: award.review },
    ],
    shareTemplate: "award",
  };
}

function classifySmallTask(smallTask: string): TaskCategory {
  const normalized = smallTask.toLowerCase();
  if (/(整理|归档|分类|清理|文档|文件|表格|目录)/.test(normalized)) return "organize";
  if (/(沟通|通知|同步|回复|答疑|解释|纪要)/.test(normalized)) return "communicate";
  if (/(修复|修补|排查|测试|故障|bug)/.test(normalized)) return "repair";
  if (/(协调|对齐|排期|安排|跟进|推动|联络)/.test(normalized)) return "coordinate";
  return "default";
}

export function groupGameShareText(slug: GroupGameSlug, result: StallResult): string {
  const sections = result.sections.map(({ label, value }) => `${label}：${value}`).join("\n");
  return `${result.title}\n${result.summary}\n${sections}\n${GROUP_GAME_DEFINITIONS[slug].groupPrompt}`;
}
