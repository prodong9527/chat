(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/Idle.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Idle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
const IDLE_LINES = [
    {
        title: "9527 号今日歇工，明日请早。",
        sub: "（本号正在后巷喂狗，有事留言。）"
    },
    {
        title: "9527 号外出办事，留下字样：勿念。",
        sub: "（工牌挂在墙上，风吹得哗哗响。）"
    },
    {
        title: "华府今日封府。",
        sub: "（管事说要盘点，其实是在打麻将。）"
    }
];
function Idle({ detail, onRetry }) {
    _s();
    const [line] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "Idle.useState": ()=>IDLE_LINES[Math.floor(Math.random() * IDLE_LINES.length)]
    }["Idle.useState"]);
    const [mounted, setMounted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Idle.useEffect": ()=>setMounted(true)
    }["Idle.useEffect"], []);
    if (!mounted) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "border border-dashed border-line rounded-lg p-10 text-center",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "font-brush text-2xl font-bold mb-3",
                children: line.title
            }, void 0, false, {
                fileName: "[project]/components/Idle.tsx",
                lineNumber: 37,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm text-ink-soft mb-6",
                children: line.sub
            }, void 0, false, {
                fileName: "[project]/components/Idle.tsx",
                lineNumber: 38,
                columnNumber: 7
            }, this),
            detail && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-xs text-ink-soft/70 mb-6 font-mono break-all",
                children: detail
            }, void 0, false, {
                fileName: "[project]/components/Idle.tsx",
                lineNumber: 40,
                columnNumber: 9
            }, this),
            onRetry && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: onRetry,
                className: "px-6 py-2 border border-line rounded-md text-sm hover:border-seal transition-colors",
                children: "再 试 一 次"
            }, void 0, false, {
                fileName: "[project]/components/Idle.tsx",
                lineNumber: 45,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/Idle.tsx",
        lineNumber: 36,
        columnNumber: 5
    }, this);
}
_s(Idle, "lBW9eQ+h4MNfIlolYIh72xy4JX0=");
_c = Idle;
var _c;
__turbopack_context__.k.register(_c, "Idle");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ToyChat.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ToyChat
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ai$2d$sdk$2f$react$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@ai-sdk/react/dist/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ai$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/ai/dist/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prompts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/prompts.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Idle$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Idle.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function textOf(m) {
    return m.parts.map((p)=>p.type === "text" ? String(p.text ?? "") : "").join("");
}
/** 「（今日工单）」这类括号指令是触发词，不该显示成用户气泡 */ function isCommand(text) {
    return /^（.+）$/.test(text.trim());
}
function ToyChat({ toy, placeholder, hint }) {
    _s();
    const { messages, sendMessage, status, error, regenerate, stop } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ai$2d$sdk$2f$react$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChat"])({
        transport: new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$ai$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["DefaultChatTransport"]({
            body: {
                toy
            }
        })
    });
    const [input, setInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [slow, setSlow] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const greeted = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const boxRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const busy = status === "submitted" || status === "streaming";
    // 开场白只发一次，省得用户对着空白框发呆
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ToyChat.useEffect": ()=>{
            if (greeted.current) return;
            greeted.current = true;
            sendMessage({
                text: __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$prompts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GREETINGS"][toy]
            });
        }
    }["ToyChat.useEffect"], [
        toy,
        sendMessage
    ]);
    // 27B 首字本来就慢，超过 8 秒给句人话
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ToyChat.useEffect": ()=>{
            if (status !== "submitted") {
                setSlow(false);
                return;
            }
            const t = setTimeout({
                "ToyChat.useEffect.t": ()=>setSlow(true)
            }["ToyChat.useEffect.t"], 8000);
            return ({
                "ToyChat.useEffect": ()=>clearTimeout(t)
            })["ToyChat.useEffect"];
        }
    }["ToyChat.useEffect"], [
        status
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ToyChat.useEffect": ()=>{
            const el = boxRef.current;
            if (el) el.scrollTop = el.scrollHeight;
        }
    }["ToyChat.useEffect"], [
        messages,
        busy,
        slow
    ]);
    function submit() {
        const text = input.trim();
        if (!text || busy) return;
        sendMessage({
            text
        });
        setInput("");
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: boxRef,
                className: "bg-paper-card border border-line rounded-lg p-5 h-[52vh] min-h-[260px] overflow-y-auto space-y-4",
                children: [
                    messages.map((m)=>{
                        const text = textOf(m);
                        if (!text || isCommand(text)) return null;
                        const mine = m.role === "user";
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: mine ? "flex justify-end" : "flex gap-3",
                            children: [
                                !mine && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "shrink-0 mt-1.5 text-seal text-xs font-brush",
                                    children: "9527"
                                }, void 0, false, {
                                    fileName: "[project]/components/ToyChat.tsx",
                                    lineNumber: 82,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: mine ? "inline-block max-w-[80%] bg-ink text-paper rounded-lg px-4 py-2 text-sm leading-relaxed whitespace-pre-wrap" : "font-brush text-lg leading-relaxed whitespace-pre-wrap",
                                    children: text
                                }, void 0, false, {
                                    fileName: "[project]/components/ToyChat.tsx",
                                    lineNumber: 86,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, m.id, true, {
                            fileName: "[project]/components/ToyChat.tsx",
                            lineNumber: 80,
                            columnNumber: 13
                        }, this);
                    }),
                    busy && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-ink-soft",
                        children: slow ? "9527 号正在翻箱倒柜……" : "・ ・ ・"
                    }, void 0, false, {
                        fileName: "[project]/components/ToyChat.tsx",
                        lineNumber: 100,
                        columnNumber: 11
                    }, this),
                    error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Idle$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        detail: error.message,
                        onRetry: ()=>regenerate()
                    }, void 0, false, {
                        fileName: "[project]/components/ToyChat.tsx",
                        lineNumber: 105,
                        columnNumber: 19
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ToyChat.tsx",
                lineNumber: 71,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4 flex gap-2 items-end",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                        value: input,
                        onChange: (e)=>setInput(e.target.value),
                        onKeyDown: (e)=>{
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                submit();
                            }
                        },
                        rows: 2,
                        placeholder: placeholder,
                        className: "flex-1 px-4 py-3 bg-paper-card border border-line rounded-md resize-none outline-none focus:border-seal"
                    }, void 0, false, {
                        fileName: "[project]/components/ToyChat.tsx",
                        lineNumber: 109,
                        columnNumber: 9
                    }, this),
                    busy ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>stop(),
                        className: "px-5 py-3 border border-line rounded-md whitespace-nowrap hover:border-seal",
                        children: "打住"
                    }, void 0, false, {
                        fileName: "[project]/components/ToyChat.tsx",
                        lineNumber: 123,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: submit,
                        disabled: !input.trim(),
                        className: "px-5 py-3 bg-ink text-paper rounded-md whitespace-nowrap disabled:opacity-40",
                        children: "递上去"
                    }, void 0, false, {
                        fileName: "[project]/components/ToyChat.tsx",
                        lineNumber: 130,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/ToyChat.tsx",
                lineNumber: 108,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-3 text-xs text-ink-soft",
                children: hint ?? "Enter 发送，Shift + Enter 换行。"
            }, void 0, false, {
                fileName: "[project]/components/ToyChat.tsx",
                lineNumber: 140,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/ToyChat.tsx",
        lineNumber: 70,
        columnNumber: 5
    }, this);
}
_s(ToyChat, "WiiXsnMLviAf7udB9eiJlyIXtmc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$ai$2d$sdk$2f$react$2f$dist$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useChat"]
    ];
});
_c = ToyChat;
var _c;
__turbopack_context__.k.register(_c, "ToyChat");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/prompts.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_0v_whsm._.js.map