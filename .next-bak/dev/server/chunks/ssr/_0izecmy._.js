module.exports = [
"[project]/app/draw/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DrawPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$draw$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/draw-data.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
const GRADE_STYLE = {
    下等: "text-ink-soft",
    中等: "text-ink",
    上等: "text-seal"
};
function DrawPage() {
    const [result, setResult] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [rolling, setRolling] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [preview, setPreview] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const timerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        return ()=>{
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, []);
    function roll() {
        if (rolling) return;
        setRolling(true);
        setPreview((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$draw$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["drawPost"])().name);
        let ticks = 0;
        timerRef.current = setInterval(()=>{
            ticks += 1;
            setPreview((0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$draw$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["drawPost"])().name);
            if (ticks >= 12) {
                if (timerRef.current) clearInterval(timerRef.current);
                setResult({
                    post: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$draw$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["drawPost"])(),
                    number: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$draw$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["drawNumber"])(),
                    date: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$draw$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["drawDate"])()
                });
                setRolling(false);
            }
        }, 45);
    }
    const isLucky = result?.number === "9527";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "flex-1 w-full max-w-2xl mx-auto px-6 py-12 sm:py-16",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                href: "/",
                className: "inline-block text-sm text-ink-soft hover:text-seal mb-10",
                children: "← 回杂役摊"
            }, void 0, false, {
                fileName: "[project]/app/draw/page.tsx",
                lineNumber: 56,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "mb-10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "font-brush text-4xl sm:text-5xl font-bold mb-3",
                        children: "抽签入职"
                    }, void 0, false, {
                        fileName: "[project]/app/draw/page.tsx",
                        lineNumber: 64,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-ink-soft",
                        children: "签筒在此。抽到什么，就是什么，不许挑。"
                    }, void 0, false, {
                        fileName: "[project]/app/draw/page.tsx",
                        lineNumber: 67,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/draw/page.tsx",
                lineNumber: 63,
                columnNumber: 7
            }, this),
            !result && !rolling && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border border-dashed border-line rounded-lg p-12 text-center text-ink-soft",
                children: "签筒还是满的。"
            }, void 0, false, {
                fileName: "[project]/app/draw/page.tsx",
                lineNumber: 73,
                columnNumber: 9
            }, this),
            (rolling || result) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-paper-card border border-line rounded-lg p-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-baseline justify-between mb-6 pb-6 border-b border-line",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs tracking-widest text-ink-soft mb-2",
                                        children: "职 位"
                                    }, void 0, false, {
                                        fileName: "[project]/app/draw/page.tsx",
                                        lineNumber: 82,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: `font-brush text-4xl font-bold ${rolling ? "opacity-50" : ""}`,
                                        children: rolling ? preview : result?.post.name
                                    }, void 0, false, {
                                        fileName: "[project]/app/draw/page.tsx",
                                        lineNumber: 83,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/draw/page.tsx",
                                lineNumber: 81,
                                columnNumber: 13
                            }, this),
                            !rolling && result && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `text-sm font-medium ${GRADE_STYLE[result.post.grade]}`,
                                children: result.post.grade
                            }, void 0, false, {
                                fileName: "[project]/app/draw/page.tsx",
                                lineNumber: 90,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/draw/page.tsx",
                        lineNumber: 80,
                        columnNumber: 11
                    }, this),
                    !rolling && result && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("dl", {
                                className: "grid grid-cols-2 gap-y-4 text-sm mb-8",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                        className: "text-ink-soft",
                                        children: "编 号"
                                    }, void 0, false, {
                                        fileName: "[project]/app/draw/page.tsx",
                                        lineNumber: 101,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                        className: "font-mono text-lg",
                                        children: [
                                            result.number,
                                            isLucky && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "ml-2 text-xs text-seal align-middle",
                                                children: "本号"
                                            }, void 0, false, {
                                                fileName: "[project]/app/draw/page.tsx",
                                                lineNumber: 105,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/draw/page.tsx",
                                        lineNumber: 102,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                        className: "text-ink-soft",
                                        children: "入 府"
                                    }, void 0, false, {
                                        fileName: "[project]/app/draw/page.tsx",
                                        lineNumber: 110,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                        children: result.date
                                    }, void 0, false, {
                                        fileName: "[project]/app/draw/page.tsx",
                                        lineNumber: 111,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/draw/page.tsx",
                                lineNumber: 100,
                                columnNumber: 15
                            }, this),
                            isLucky && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "mb-6 p-3 bg-seal/5 border border-seal/20 rounded text-sm text-seal",
                                children: "好家伙，抽中 9527 本号。此号历来出人才，也出事。"
                            }, void 0, false, {
                                fileName: "[project]/app/draw/page.tsx",
                                lineNumber: 115,
                                columnNumber: 17
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-4 text-sm leading-relaxed mb-8",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-ink-soft mb-1",
                                                children: "职 责"
                                            }, void 0, false, {
                                                fileName: "[project]/app/draw/page.tsx",
                                                lineNumber: 122,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: result.post.duty
                                            }, void 0, false, {
                                                fileName: "[project]/app/draw/page.tsx",
                                                lineNumber: 123,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/draw/page.tsx",
                                        lineNumber: 121,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-ink-soft mb-1",
                                                children: "待 遇"
                                            }, void 0, false, {
                                                fileName: "[project]/app/draw/page.tsx",
                                                lineNumber: 126,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: result.post.perk
                                            }, void 0, false, {
                                                fileName: "[project]/app/draw/page.tsx",
                                                lineNumber: 127,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/draw/page.tsx",
                                        lineNumber: 125,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/draw/page.tsx",
                                lineNumber: 120,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-brush text-lg text-ink-soft border-l-2 border-line pl-4",
                                children: [
                                    "「",
                                    result.post.line,
                                    "」"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/draw/page.tsx",
                                lineNumber: 131,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/draw/page.tsx",
                        lineNumber: 99,
                        columnNumber: 13
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/draw/page.tsx",
                lineNumber: 79,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: roll,
                disabled: rolling,
                className: "mt-8 w-full sm:w-auto px-10 py-3 bg-ink text-paper rounded-md text-base font-medium transition-opacity hover:opacity-85 disabled:opacity-40",
                children: rolling ? "抽 着 呢" : result ? "再 抽 一 次" : "抽 签"
            }, void 0, false, {
                fileName: "[project]/app/draw/page.tsx",
                lineNumber: 139,
                columnNumber: 7
            }, this),
            result && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "mt-6 text-xs text-ink-soft",
                children: "抽中不许反悔。华府人事科敬启。"
            }, void 0, false, {
                fileName: "[project]/app/draw/page.tsx",
                lineNumber: 148,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/draw/page.tsx",
        lineNumber: 55,
        columnNumber: 5
    }, this);
}
}),
"[project]/lib/draw-data.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POSTS",
    ()=>POSTS,
    "REMARKS",
    ()=>REMARKS,
    "drawDate",
    ()=>drawDate,
    "drawNumber",
    ()=>drawNumber,
    "drawPost",
    ()=>drawPost,
    "drawRemark",
    ()=>drawRemark
]);
const POSTS = [
    {
        name: "后厨帮佣",
        grade: "下等",
        duty: "负责华府上下三十余口人的膳食，兼管柴火与泔水。",
        perk: "每日可得残羹一碗，逢年过节赏铜钱两枚。",
        line: "洗碗是修行，你急什么。"
    },
    {
        name: "门房",
        grade: "下等",
        duty: "看守华府正门，登记出入，拦下一切不该进来的人。",
        perk: "逢雨雪可入内避寒，但不得坐。",
        line: "你找谁？找谁都得先问我。"
    },
    {
        name: "马夫",
        grade: "下等",
        duty: "照料府中马匹，兼管马厩清洁与草料。",
        perk: "马吃剩下的，你可自行处置。",
        line: "它比我吃得还好，你说气不气人。"
    },
    {
        name: "挑水工",
        grade: "下等",
        duty: "每日挑满府中七口大缸，不得间断。",
        perk: "桶坏了自理，水洒了自担。",
        line: "这水啊，挑着挑着就懂人生了。"
    },
    {
        name: "洒扫仆役",
        grade: "下等",
        duty: "负责前三进院落的洒扫，落叶随落随扫。",
        perk: "扫帚每月一换，用坏了拿头发赔。",
        line: "扫地扫地，扫不尽心头火。"
    },
    {
        name: "浣衣仆",
        grade: "下等",
        duty: "浣洗衣物，分色分类，深浅不得混洗。",
        perk: "皂角管够，热水限时。",
        line: "领口的油渍，是人生的痕迹。"
    },
    {
        name: "更夫",
        grade: "下等",
        duty: "夜间巡更，逢更敲梆，报平安。",
        perk: "夜宵自备，梆子公发。",
        line: "天干物燥，小心火烛——喊了十年也没着过火。"
    },
    {
        name: "花匠",
        grade: "中等",
        duty: "侍弄府中花木，应季修剪，不得让枯枝过夜。",
        perk: "可私藏花种三粒，多种按偷论处。",
        line: "花不会说话，所以最好相处。"
    },
    {
        name: "账房先生",
        grade: "中等",
        duty: "登记出入账目，日清月结，错一字罚俸三日。",
        perk: "笔墨公发，算盘自备。",
        line: "这世上最诚实的，是数字；最不诚实的，也是。"
    },
    {
        name: "书房侍墨",
        grade: "中等",
        duty: "研墨铺纸，随时候唤，主人写字时不得出声。",
        perk: "可习字，但不得用公家纸。",
        line: "我研的墨，比他们写的字值钱。"
    },
    {
        name: "护卫",
        grade: "中等",
        duty: "守卫内院，武艺须过得去，长相须过得去。",
        perk: "兵器公发，跌打药自理。",
        line: "真打起来，我一般先倒下。"
    },
    {
        name: "传膳",
        grade: "中等",
        duty: "传菜、报菜名、试毒，三样都得会。",
        perk: "试毒后须等一炷香方能进食。",
        line: "菜是凉的，心是热的。"
    },
    {
        name: "采办",
        grade: "中等",
        duty: "外出采买，货比三家，差价归公。",
        perk: "车马费实报实销，须有票据。",
        line: "我买的贵，但我买得回来啊。"
    },
    {
        name: "库管",
        grade: "中等",
        duty: "看管库房，登记出入，钥匙随身携带不得离身。",
        perk: "库中有耗子，可养猫一只，猫粮自理。",
        line: "少了东西是我的，多了东西不是我的。"
    },
    {
        name: "车夫",
        grade: "中等",
        duty: "驾车出行，须识路、识人、识天气。",
        perk: "车坏了修，马病了治，你病了自愈。",
        line: "路是熟的，日子是生的。"
    },
    {
        name: "教习",
        grade: "上等",
        duty: "教少爷小姐读书习字，兼管家规礼仪。",
        perk: "可入内院用饭，但不得与主人同席。",
        line: "教了三年，只教会他们怎么躲我。"
    },
    {
        name: "总管",
        grade: "上等",
        duty: "统管府中杂役，调度人事，直接对华夫人负责。",
        perk: "有独立厢房一间，月俸另议。",
        line: "我说了算，但夫人说了更算。"
    },
    {
        name: "师爷",
        grade: "上等",
        duty: "出谋划策，起草文书，代写往来书信。",
        perk: "可与主人对坐，但不得先坐。",
        line: "主意是我的，功劳是别人的，懂么。"
    },
    {
        name: "贴身丫鬟",
        grade: "上等",
        duty: "贴身侍候小姐起居，梳妆、更衣、传话。",
        perk: "月例银子另算，节庆另有赏赐。",
        line: "小姐的心事，我知道得比她自己还早。"
    },
    {
        name: "掌勺",
        grade: "上等",
        duty: "掌府中灶台，定菜单，管后厨一应人等。",
        perk: "可自行决定今日汤的咸淡。",
        line: "盐放多少，是我的江湖。"
    }
];
const GAN = [
    "甲",
    "乙",
    "丙",
    "丁",
    "戊",
    "己",
    "庚",
    "辛",
    "壬",
    "癸"
];
const ZHI = [
    "子",
    "丑",
    "寅",
    "卯",
    "辰",
    "巳",
    "午",
    "未",
    "申",
    "酉",
    "戌",
    "亥"
];
const MONTH = [
    "正",
    "二",
    "三",
    "四",
    "五",
    "六",
    "七",
    "八",
    "九",
    "十",
    "冬",
    "腊"
];
const DAY_PREFIX = [
    "初",
    "十",
    "廿"
];
const DAY_NUM = [
    "一",
    "二",
    "三",
    "四",
    "五",
    "六",
    "七",
    "八",
    "九",
    "十",
    "一",
    "二",
    "三",
    "四",
    "五",
    "六",
    "七",
    "八",
    "九"
];
function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
function drawNumber() {
    if (Math.random() < 0.08) return "9527";
    return String(9500 + Math.floor(Math.random() * 200));
}
function drawDate() {
    const year = pick(GAN) + pick(ZHI);
    const month = pick(MONTH);
    const d = Math.floor(Math.random() * 29);
    const day = d < 9 ? "初" + DAY_NUM[d] : d === 9 ? "初十" : d < 19 ? "十" + DAY_NUM[d] : d === 19 ? "二十" : "廿" + DAY_NUM[d];
    return `${year}年${month}月${day}`;
}
function drawPost() {
    return pick(POSTS);
}
const REMARKS = [
    "此人尚可，暂留",
    "相貌堂堂，可惜无用",
    "手脚麻利，脑子另说",
    "按时到岗，从不早退，仅此而已",
    "忠厚老实，老实到没有主见",
    "话不多，活不少，难得",
    "眼里有活，可惜手上没劲",
    "来了三年，无人记得姓名",
    "干活不含糊，吃饭更不含糊",
    "请示多，主意少，安全第一",
    "走路带风，干活带喘",
    "心眼好，就是没心眼",
    "据说有才华，只是没见过",
    "任劳任怨，怨得也挺勤快",
    "看着机灵，用着一般",
    "不迟到，不早退，不突出",
    "唯一的缺点是太谦虚——其实也没别的优点",
    "沉默是金，这位是金山",
    "可靠，但仅限于不跑路",
    "新来的，先看着吧"
];
function drawRemark() {
    return pick(REMARKS);
}
}),
];

//# sourceMappingURL=_0izecmy._.js.map