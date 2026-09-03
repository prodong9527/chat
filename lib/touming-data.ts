export type CardKind = "skill" | "flaw" | "connection" | "tribute";
export type Tag = "账房" | "内院" | "武力" | "文墨" | "马屁" | "门房" | "后厨" | "花木" | "可疑" | "好运" | "懒散" | "跑腿";

export type CandidateCard = { id: string; kind: CardKind; text: string; tags: Tag[] };
export type Application = Record<CardKind, CandidateCard>;
export type Deal = Record<CardKind, CandidateCard[]>;
export type Verdict = { title: string; department: string; salary: string; kpi: string; note: string };

type Seed = { text: string; tags: Tag[] };
const TAILS = ["掌柜看了直点头", "只在月末发作", "邻居均可作证", "暂未闹出人命"];

const SEEDS: Record<CardKind, Seed[]> = {
  skill: [
    { text: "能把死账说成活账", tags: ["账房"] }, { text: "算盘打得隔壁鸡都下蛋", tags: ["账房", "好运"] },
    { text: "跑得比传话的小厮快", tags: ["跑腿"] }, { text: "能在夫人抬眼前递上热茶", tags: ["内院", "马屁"] },
    { text: "一眼认出哪匹马在装病", tags: ["武力"] }, { text: "会把吵架写成诗", tags: ["文墨"] },
    { text: "站岗时连蚊子都不敢进门", tags: ["门房"] }, { text: "能把剩菜摆成宴席", tags: ["后厨", "好运"] },
    { text: "给枯花讲两句就能开", tags: ["花木"] }, { text: "挨骂时能自动进入省电模式", tags: ["懒散"] },
    { text: "听过的话只忘对自己不利的", tags: ["可疑"] }, { text: "懂得在错话出口前咳一声", tags: ["内院"] },
    { text: "能把跑腿差事跑出仪仗队气势", tags: ["跑腿", "马屁"] }, { text: "会给账本留白，方便日后解释", tags: ["账房", "可疑"] },
    { text: "能从主子叹气里听出菜单", tags: ["后厨", "内院"] }, { text: "背得出华府所有人的小名", tags: ["内院", "可疑"] },
    { text: "扫地时能顺手扫掉尴尬", tags: ["懒散", "好运"] }, { text: "拳脚不精，倒地极快", tags: ["武力", "好运"] },
  ],
  flaw: [
    { text: "见银票就自动点头", tags: ["账房", "可疑"] }, { text: "一紧张就报上家乡地址", tags: ["跑腿"] },
    { text: "遇见贵人会忘了自己姓什么", tags: ["马屁"] }, { text: "听见算盘声就想改人生", tags: ["账房", "可疑"] },
    { text: "饭点前后不宜谈正事", tags: ["后厨", "懒散"] }, { text: "看守东西时爱给它们起名字", tags: ["门房"] },
    { text: "写字太好看，容易被抓去抄账", tags: ["文墨"] }, { text: "会替花草打抱不平", tags: ["花木"] },
    { text: "见到夫人就条件反射站直", tags: ["内院", "马屁"] }, { text: "跑快了会忘记自己为何出门", tags: ["跑腿", "懒散"] },
    { text: "听见打架先找最佳观看位", tags: ["武力", "懒散"] }, { text: "嘴比脑子先领月钱", tags: ["可疑"] },
    { text: "对着空白账册会生出创作欲", tags: ["账房", "可疑"] }, { text: "太会察言观色，偶尔看错人", tags: ["内院"] },
    { text: "每逢下雨自称旧伤复发", tags: ["懒散"] }, { text: "与每条看门狗都有旧交", tags: ["门房", "可疑"] },
    { text: "端菜时会背出菜价", tags: ["后厨", "账房"] }, { text: "把路痴说成深度巡查", tags: ["跑腿", "可疑"] },
  ],
  connection: [
    { text: "自称账房先生同乡", tags: ["账房"] }, { text: "替夫人表弟送过一次伞", tags: ["内院", "好运"] },
    { text: "与门房家的狗互相认识", tags: ["门房"] }, { text: "曾给少爷的马让过路", tags: ["武力"] },
    { text: "说书先生夸过一句有悟性", tags: ["文墨"] }, { text: "厨娘说此人吃相端正", tags: ["后厨"] },
    { text: "给花匠借过三次水", tags: ["花木"] }, { text: "被管家骂过但没赶走", tags: ["内院"] },
    { text: "隔壁王员外据说听过他的名字", tags: ["马屁", "可疑"] }, { text: "镖局门口站过半个时辰", tags: ["武力", "跑腿"] },
    { text: "认识一个能把字写小的人", tags: ["文墨", "可疑"] }, { text: "替账房捡过掉在地上的铜钱", tags: ["账房", "好运"] },
    { text: "说和知县师爷同看过一轮月亮", tags: ["文墨", "可疑"] }, { text: "曾被后门放进去过一次", tags: ["门房", "可疑"] },
    { text: "茶房愿意替他温一壶隔夜茶", tags: ["后厨", "好运"] }, { text: "与扫帚房的老师傅同姓", tags: ["懒散"] },
    { text: "掌柜说他面相像个会还钱的", tags: ["账房", "好运"] }, { text: "曾替华府追回一只走失的鸡", tags: ["跑腿", "好运"] },
  ],
  tribute: [
    { text: "一把来路不明的铁算盘", tags: ["账房", "可疑"] }, { text: "会自己响的铜铃一只", tags: ["门房", "好运"] },
    { text: "写着半首诗的扇子", tags: ["文墨"] }, { text: "一包不会开花的花种", tags: ["花木", "可疑"] },
    { text: "刻着华府二字的旧钥匙", tags: ["内院", "可疑"] }, { text: "马厩里捡到的幸运马蹄铁", tags: ["武力", "好运"] },
    { text: "一罐只剩香气的肉汤", tags: ["后厨"] }, { text: "能自动滚回原处的扫帚", tags: ["懒散", "好运"] },
    { text: "写错地址仍会送到的信封", tags: ["跑腿", "可疑"] }, { text: "一面照不出本人的铜镜", tags: ["内院", "可疑"] },
    { text: "据说能让人点头的空酒坛", tags: ["马屁"] }, { text: "盖了七个章的白纸一张", tags: ["文墨", "可疑"] },
    { text: "会在月末变轻的钱袋", tags: ["账房", "可疑"] }, { text: "后门钥匙形状的萝卜", tags: ["门房", "后厨"] },
    { text: "一双跑丢过三次的布鞋", tags: ["跑腿", "好运"] }, { text: "写有“不许动”的木牌", tags: ["武力"] },
    { text: "会替人叹气的盆栽", tags: ["花木", "懒散"] }, { text: "一本永远翻不到最后的账册", tags: ["账房", "文墨"] },
  ],
};

function buildCards(kind: CardKind): CandidateCard[] {
  return SEEDS[kind].flatMap((seed, seedIndex) => TAILS.map((tail, tailIndex) => ({
    id: `${kind}-${seedIndex}-${tailIndex}`,
    kind,
    text: `${seed.text}，${tail}`,
    tags: seed.tags,
  })));
}

export const CARD_LIBRARY: Record<CardKind, CandidateCard[]> = {
  skill: buildCards("skill"), flaw: buildCards("flaw"), connection: buildCards("connection"), tribute: buildCards("tribute"),
};

function shuffled<T>(items: readonly T[], random: () => number): T[] {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }
  return result;
}

export function dealApplication(random = Math.random, recentIds: readonly string[] = []): Deal {
  const recent = new Set(recentIds);
  return Object.fromEntries((Object.keys(CARD_LIBRARY) as CardKind[]).map((kind) => {
    const unseen = CARD_LIBRARY[kind].filter((card) => !recent.has(card.id));
    return [kind, shuffled(unseen.length >= 5 ? unseen : CARD_LIBRARY[kind], random).slice(0, 5)];
  })) as Deal;
}

const NORMAL_VERDICTS: Record<Tag, Omit<Verdict, "note">> = {
  账房: { title: "先记名，别记钱", department: "账房旁听席", salary: "月钱按账本厚度结", kpi: "把每笔糊涂账说得更有道理" },
  内院: { title: "留用，嘴要比耳朵紧", department: "内院风声观察处", salary: "月例随夫人心情浮动", kpi: "在消息传开前先假装不知道" },
  武力: { title: "收下，先站远些", department: "护院气势储备队", salary: "跌打药从月钱里扣", kpi: "有事先挡一下，真打再商量" },
  文墨: { title: "准入府，笔墨自备", department: "文书润色外包组", salary: "按字数，不按实话", kpi: "把坏消息写得像一件好消息" },
  马屁: { title: "试用三日，声音收着点", department: "花厅气氛维护班", salary: "赏钱看夸得是否具体", kpi: "每日发现一处值得称赞的家具" },
  门房: { title: "留门边，别留钥匙边", department: "偏门消息收发处", salary: "夜班补贴半盏凉茶", kpi: "分清贵客、熟客与很像贵客的人" },
  后厨: { title: "闻着挺香，先试两口", department: "后厨余味研究所", salary: "可领剩菜，但需签收", kpi: "让三样剩料看起来像四道菜" },
  花木: { title: "先养花，养活再谈", department: "内院绿意保全队", salary: "花开才有花钱", kpi: "令一盆枯花对未来重拾信心" },
  可疑: { title: "暂收，钥匙先别碰", department: "后院紧急背锅队", salary: "月钱暂存于掌柜心里", kpi: "每次出事都要第一个表示不知情" },
  好运: { title: "吉兆入府，快去排队", department: "华府临时福气办", salary: "逢初一十五另有口彩", kpi: "在倒霉事发生前站得离它远一点" },
  懒散: { title: "能坐着办的，别站着办", department: "洒扫节能试点组", salary: "按出勤的传闻结算", kpi: "把一件事拖到刚好不算迟到" },
  跑腿: { title: "腿脚合格，去送个急件", department: "华府加急折返处", salary: "鞋底磨穿后另议", kpi: "把没有地址的信送到该收的人手里" },
};

export function issueVerdict(application: Application): Verdict {
  const tags = Object.values(application).flatMap((card) => card.tags);
  const count = (tag: Tag) => tags.filter((item) => item === tag).length;
  if (count("账房") >= 3 && count("可疑") >= 2) return {
    title: "暂收，钥匙先别碰", department: "账房临时清白组", salary: "月钱先由铁算盘保管", kpi: "解释那把算盘究竟从哪来", note: "担保人听闻消息，已连夜搬家。",
  };
  const leadingTag = (Object.keys(NORMAL_VERDICTS) as Tag[]).sort((left, right) => count(right) - count(left))[0] ?? "好运";
  const verdict = NORMAL_VERDICTS[leadingTag];
  const notes = ["本批文盖章有效，盖错概不负责。", "直属上司说稍后再说，至今未说。", "试用期内不得主动询问月钱。", "华府欢迎有用的人，也欢迎看起来有用的人。"];
  const seed = [...application.skill.id, ...application.tribute.id].reduce((sum, character) => sum + character.charCodeAt(0), 0);
  return { ...verdict, note: notes[seed % notes.length] };
}
