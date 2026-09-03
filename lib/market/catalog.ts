import type { District, Stall } from "./types";

export const LAUNCH_DISTRICTS: Omit<District, "id">[] = [
  { slug: "entry", name: "入职服务街", accent: "seal-red", sortOrder: 0 },
  { slug: "entertainment", name: "文娱消遣巷", accent: "lantern-gold", sortOrder: 1 },
  { slug: "workplace", name: "职场求生路", accent: "jade-green", sortOrder: 2 },
  { slug: "reports", name: "汇报加工厂", accent: "ink-blue", sortOrder: 3 },
  { slug: "errands", name: "杂务回收站", accent: "brick-orange", sortOrder: 4 },
];

export const LAUNCH_STALLS: Omit<Stall, "id">[] = [
  { slug: "huafu-badge", code: "A-01", districtSlug: "entry", name: "投名状摊", description: "凑齐四样凭据，递一张入府投名状", status: "open", type: "local", sortOrder: 0, config: {} },
  { slug: "job-draw", code: "A-02", districtSlug: "entry", name: "入职抽签处", description: "抽一张今日入职签", status: "open", type: "local", sortOrder: 1, config: {} },
  { slug: "duilian", code: "B-01", districtSlug: "entertainment", name: "对穿肠擂台", description: "和对穿肠过几招", status: "open", type: "custom_ai", sortOrder: 0, config: {} },
  { slug: "desk-fortune", code: "B-02", districtSlug: "entertainment", name: "工位玄学铺", description: "摇一支今日职场卦", status: "open", type: "daily", sortOrder: 1, config: {} },
  { slug: "read-reply", code: "C-01", districtSlug: "workplace", name: "已读乱回亭", description: "把同事消息回得煞有介事", status: "open", type: "generic_ai", sortOrder: 0, config: {} },
  { slug: "blame-translation", code: "C-02", districtSlug: "workplace", name: "甩锅翻译局", description: "把职场黑话翻译明白", status: "open", type: "generic_ai", sortOrder: 1, config: {} },
  { slug: "leave-request", code: "C-03", districtSlug: "workplace", name: "请假事务所", description: "代拟一份请假理由", status: "open", type: "generic_ai", sortOrder: 2, config: {} },
  { slug: "weekly-report", code: "D-01", districtSlug: "reports", name: "周报膨胀厂", description: "把周报吹得天花乱坠", status: "open", type: "generic_ai", sortOrder: 0, config: {} },
  { slug: "ticket", code: "E-01", districtSlug: "errands", name: "今日工单", description: "领一张今日荒唐工单", status: "open", type: "custom_ai", sortOrder: 0, config: {} },
  { slug: "petition", code: "E-02", districtSlug: "errands", name: "华府信访办", description: "递上一份不正经状子", status: "open", type: "custom_ai", sortOrder: 1, config: {} },
  { slug: "newcomer-guide", code: "A-03", districtSlug: "entry", name: "入府适应办", description: "新人求生手册，筹备中", status: "coming_soon", type: "generic_ai", sortOrder: 2, config: {} },
  { slug: "meeting-exit", code: "C-04", districtSlug: "workplace", name: "会议脱身处", description: "体面离场话术，筹备中", status: "coming_soon", type: "generic_ai", sortOrder: 3, config: {} },
  { slug: "performance-defense", code: "D-02", districtSlug: "reports", name: "绩效申辩堂", description: "年度成绩效自评，筹备中", status: "coming_soon", type: "generic_ai", sortOrder: 1, config: {} },
];

export const GENERIC_STALL_DEFAULTS = {
  status: "open" as const,
  type: "generic_ai" as const,
  config: {},
};
