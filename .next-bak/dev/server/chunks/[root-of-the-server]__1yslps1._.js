module.exports = [
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/runtime-reacts.external.js [external] (next/dist/server/runtime-reacts.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/runtime-reacts.external.js", () => require("next/dist/server/runtime-reacts.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/node:stream [external] (node:stream, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:stream", () => require("node:stream"));

module.exports = mod;
}),
"[externals]/os [external] (os, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[project]/app/api/chat/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST,
    "maxDuration",
    ()=>maxDuration,
    "runtime",
    ()=>runtime
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ai$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/ai/dist/index.js [app-route] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$guard$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/guard.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$model$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/model.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prompts$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/prompts.ts [app-route] (ecmascript)");
;
;
;
;
const maxDuration = 300;
const runtime = "nodejs";
function textOf(message) {
    if (!message) return "";
    return (message.parts ?? []).filter((p)=>p.type === "text").map((p)=>p.text).join("");
}
async function POST(req) {
    let body;
    try {
        body = await req.json();
    } catch  {
        return Response.json({
            error: "你这话，本号没听清。"
        }, {
            status: 400
        });
    }
    const { toy, messages } = body;
    if (!(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prompts$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isToyKey"])(toy)) {
        return Response.json({
            error: "没这个窗口。"
        }, {
            status: 400
        });
    }
    const guard = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$guard$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["checkInput"])(textOf(messages?.[messages.length - 1]));
    if (!guard.ok) return Response.json({
        error: guard.reason
    }, {
        status: 400
    });
    const rate = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$guard$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["checkRate"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$guard$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["clientIp"])(req));
    if (!rate.ok) return Response.json({
        error: rate.reason
    }, {
        status: 429
    });
    try {
        const result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ai$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["streamText"])({
            model: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$model$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["qwen"])(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$model$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MODEL_ID"]),
            system: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prompts$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PROMPTS"][toy],
            messages: await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ai$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__$3c$locals$3e$__["convertToModelMessages"])(messages ?? []),
            temperature: 0.9,
            // 给上游单独设 deadline，别让挂死的调用拖满 300s
            abortSignal: AbortSignal.timeout(120_000)
        });
        return result.toUIMessageStreamResponse({
            onError: ()=>"歇工了"
        });
    } catch  {
        return Response.json({
            error: "歇工了"
        }, {
            status: 503
        });
    }
}
}),
"[project]/lib/guard.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "checkInput",
    ()=>checkInput,
    "checkRate",
    ()=>checkRate,
    "clientIp",
    ()=>clientIp
]);
const MAX_LEN = 500;
const RATE_WINDOW_MS = 60_000;
const RATE_LIMIT = 10;
/**
 * 需要额外拦截的词，按需自行补充。
 * 默认留空：只做长度、刷屏、频率这类技术性拦截。
 */ const BLOCKED = [];
const hits = new Map();
/** 去掉空白、零宽字符与控制字符 */ function normalize(text) {
    return text.replace(/[\u200b-\u200f\ufeff\u0000-\u001f]/g, "").trim();
}
/** 单一字符连续重复超过 15 次视为刷屏 */ function isSpam(text) {
    return /(.)\1{14,}/.test(text.replace(/\s/g, ""));
}
/** 去掉全部标点和空白后还有没有实际内容 */ function hasContent(text) {
    return text.replace(/[\s\p{P}\p{S}]/gu, "").length > 0;
}
function checkInput(raw) {
    if (typeof raw !== "string") return {
        ok: false,
        reason: "这算什么话？"
    };
    const text = normalize(raw);
    if (!text) return {
        ok: false,
        reason: "你倒是说句话啊。"
    };
    if (!hasContent(text)) return {
        ok: false,
        reason: "光打标点符号，糊弄谁呢。"
    };
    if (text.length > MAX_LEN) return {
        ok: false,
        reason: `太长了，超 ${MAX_LEN} 字，本号懒得看。`
    };
    if (isSpam(text)) return {
        ok: false,
        reason: "同一个字翻来覆去，你当我是账房？"
    };
    const lower = text.toLowerCase();
    if (BLOCKED.some((w)=>lower.includes(w.toLowerCase()))) return {
        ok: false,
        reason: "这话本号接不了，换一句。"
    };
    return {
        ok: true
    };
}
function checkRate(ip) {
    const now = Date.now();
    const recent = (hits.get(ip) ?? []).filter((t)=>now - t < RATE_WINDOW_MS);
    if (recent.length >= RATE_LIMIT) {
        hits.set(ip, recent);
        return {
            ok: false,
            reason: "慢点，本号只有一双手。"
        };
    }
    recent.push(now);
    hits.set(ip, recent);
    return {
        ok: true
    };
}
/** 防止 Map 无限增长，同时不阻止进程退出 */ setInterval(()=>{
    const now = Date.now();
    for (const [ip, times] of hits){
        const alive = times.filter((t)=>now - t < RATE_WINDOW_MS);
        if (alive.length) hits.set(ip, alive);
        else hits.delete(ip);
    }
}, RATE_WINDOW_MS).unref?.();
function clientIp(req) {
    const fwd = req.headers.get("x-forwarded-for");
    if (fwd) return fwd.split(",")[0].trim();
    return req.headers.get("x-real-ip") ?? "unknown";
}
}),
"[project]/lib/model.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MODEL_ID",
    ()=>MODEL_ID,
    "qwen",
    ()=>qwen
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ai$2d$sdk$2f$openai$2d$compatible$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@ai-sdk/openai-compatible/dist/index.js [app-route] (ecmascript)");
;
const qwen = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ai$2d$sdk$2f$openai$2d$compatible$2f$dist$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["createOpenAICompatible"])({
    name: "qwen-local",
    baseURL: process.env.MODEL_BASE_URL ?? "http://localhost:8000/v1",
    headers: {
        Authorization: `Bearer ${process.env.MODEL_API_KEY ?? ""}`
    }
});
const MODEL_ID = process.env.MODEL_ID ?? "qwen3-27b";
}),
"[project]/lib/prompts.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GREETINGS",
    ()=>GREETINGS,
    "PROMPTS",
    ()=>PROMPTS,
    "isToyKey",
    ()=>isToyKey
]);
const PROMPTS = {
    duilian: `你是华府的对穿肠。自诩才高八斗、学富五车，实则半瓶子醋，最爱与人对对子，输了就强词夺理。

规矩：
1. 用户输入上联，你对下联。要对仗工整，但内容可以荒诞。
2. 你对得好时，要得意，顺带自夸两句。
3. 你对不上时，绝不认输，要顾左右而言他，或反过来嘲笑用户的上联不合平仄。
4. 用户的上联若确实粗俗不通，你要毫不客气地讥讽——只讥讽文采，不许人身攻击。
5. 语言半文半白，夹杂市井俚语，一本正经地胡说八道。
6. 记住本轮对话里用户输过几次，下次开口要提一句："上回那句，你还没还呢。"

语气示范：
- "哼，此等句子，也敢拿出来现眼？且听我——"
- "对得工整否？我自己都佩服自己。"
- "这个嘛……平仄嘛，古人也不一定讲究。"

收到"（开场）"时，主动挑衅一句开场，要短，别啰嗦。

回答控制在四句以内，别啰嗦。`,
    ticket: `你是华府的管事，每日给手下人派活。你派活时一本正经，派的内容却荒诞至极，而你自己浑然不觉。

工单格式（严格照此输出）：
【华府工单 No.XXXX】
事由：<一句话>
内容：<二到三句，公文腔>
期限：<荒诞的期限，例如"鸡叫三遍之前">
备注：<一句莫名其妙的补充>
签发：华府管事（画押）

规矩：
1. 工单内容要荒诞，但描述必须一本正经，用足公文腔。
2. 用户说"驳回"时，你要跟他讲道理：先威逼，后利诱，最后还是要派给他。不许真取消，但可以说"酌减"。
3. 用户说"完成"时，你要验收，并挑毛病，然后赏一句不痛不痒的评语。
4. 绝不承认任务本身荒诞。

语气示范：
- "此事务关华府体面，不得有误。"
- "驳回？驳回也得有个由头，你说说看。"
- "办得尚可，然火候欠佳，下回注意。"

收到"（今日工单）"时，直接派一张工单，不要寒暄。`,
    petition: `你是华府接待信访的门房，后来可能变成师爷、管家。有人来办事，你的第一反应永远是：这事不归我管。

流程（按顺序推进，但可以被用户的坚持打断）：
1. 先问清楚什么事，态度客气但敷衍。
2. 判断这事的归属，然后推给别的部门，说清楚去哪儿找谁。
3. 用户若坚持，你继续踢，但换个理由：管事不在、印章找不着、今日不宜办事、要先填表。
4. 用户若第三次坚持，或说得确实在理，你终于松口给办，但要强调"下不为例"，并索要一样莫名其妙的东西（例如"一寸免冠照三张"）。

语气：官话套话为主，偶尔掺一句真心话（马上又收回去）。
- "这个事情嘛，我们要研究研究。"
- "你先回去等通知，有消息我们派人去叫你。"
- "不是我不帮你，是规矩它不允许啊。"
- （偶尔冒一句）"说句掏心窝子的……哎，当我没说。"

每次回复不超过六句。可以切换身份，切换时说明："门房不在，我是师爷，你再说一遍。"

收到"（所为何事）"时，先问来意，态度客气但敷衍。`
};
const GREETINGS = {
    duilian: "（开场）",
    ticket: "（今日工单）",
    petition: "（所为何事）"
};
function isToyKey(v) {
    return typeof v === "string" && v in PROMPTS;
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1yslps1._.js.map