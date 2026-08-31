module.exports = [
"[project]/app/badge/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BadgePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$badge$2f$BadgeCanvas$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/badge/BadgeCanvas.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$draw$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/draw-data.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
function makeData(name) {
    return {
        name,
        number: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$draw$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["drawNumber"])(),
        post: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$draw$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["drawPost"])().name,
        date: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$draw$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["drawDate"])(),
        remark: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$draw$2d$data$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["drawRemark"])()
    };
}
function BadgePage() {
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [name, setName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [avatar, setAvatar] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    // 随机数据放到客户端初始化，避免 SSR 与 hydration 结果不一致
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        setData(makeData(""));
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (data) setData((d)=>d ? {
                ...d,
                name
            } : d);
    }, [
        name
    ]);
    function reroll() {
        setData(makeData(name));
    }
    function onPickAvatar(e) {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = ()=>{
            const img = new Image();
            img.onload = ()=>setAvatar(img);
            img.src = reader.result;
        };
        reader.readAsDataURL(file);
    }
    function save() {
        const canvas = canvasRef.current;
        if (!canvas) return;
        canvas.toBlob((blob)=>{
            if (!blob) return;
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `9527-${name.trim() || "无名氏"}.png`;
            a.click();
            URL.revokeObjectURL(url);
        }, "image/png");
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "flex-1 w-full max-w-4xl mx-auto px-6 py-12 sm:py-16",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                href: "/",
                className: "inline-block text-sm text-ink-soft hover:text-seal mb-10",
                children: "← 回杂役摊"
            }, void 0, false, {
                fileName: "[project]/app/badge/page.tsx",
                lineNumber: 65,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "mb-10",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "font-brush text-4xl sm:text-5xl font-bold mb-3",
                        children: "工牌生成器"
                    }, void 0, false, {
                        fileName: "[project]/app/badge/page.tsx",
                        lineNumber: 73,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-ink-soft",
                        children: "报上名来，领一张华府出入牌。"
                    }, void 0, false, {
                        fileName: "[project]/app/badge/page.tsx",
                        lineNumber: 76,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/badge/page.tsx",
                lineNumber: 72,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid gap-8 md:grid-cols-[1fr_320px] items-start",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-paper-card border border-line rounded-lg p-4",
                        children: data ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$badge$2f$BadgeCanvas$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                            canvasRef: canvasRef,
                            data: data,
                            avatar: avatar
                        }, void 0, false, {
                            fileName: "[project]/app/badge/page.tsx",
                            lineNumber: 82,
                            columnNumber: 13
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "aspect-[640/1000] rounded-md border border-line bg-paper animate-pulse"
                        }, void 0, false, {
                            fileName: "[project]/app/badge/page.tsx",
                            lineNumber: 84,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/badge/page.tsx",
                        lineNumber: 80,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-sm text-ink-soft mb-2",
                                        children: "姓 名"
                                    }, void 0, false, {
                                        fileName: "[project]/app/badge/page.tsx",
                                        lineNumber: 90,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        value: name,
                                        onChange: (e)=>setName(e.target.value.slice(0, 8)),
                                        placeholder: "无名氏",
                                        className: "w-full px-4 py-3 bg-paper-card border border-line rounded-md text-base outline-none focus:border-seal"
                                    }, void 0, false, {
                                        fileName: "[project]/app/badge/page.tsx",
                                        lineNumber: 91,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/badge/page.tsx",
                                lineNumber: 89,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "block text-sm text-ink-soft mb-2",
                                        children: "头像（可不传）"
                                    }, void 0, false, {
                                        fileName: "[project]/app/badge/page.tsx",
                                        lineNumber: 100,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "file",
                                        accept: "image/*",
                                        onChange: onPickAvatar,
                                        className: "block w-full text-sm text-ink-soft file:mr-3 file:px-4 file:py-2 file:border-0 file:rounded file:bg-ink file:text-paper file:text-sm file:cursor-pointer"
                                    }, void 0, false, {
                                        fileName: "[project]/app/badge/page.tsx",
                                        lineNumber: 103,
                                        columnNumber: 13
                                    }, this),
                                    avatar && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setAvatar(null),
                                        className: "mt-2 text-xs text-ink-soft hover:text-seal",
                                        children: "移除头像"
                                    }, void 0, false, {
                                        fileName: "[project]/app/badge/page.tsx",
                                        lineNumber: 110,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/badge/page.tsx",
                                lineNumber: 99,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3 pt-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: save,
                                        disabled: !data,
                                        className: "w-full px-6 py-3 bg-ink text-paper rounded-md font-medium transition-opacity hover:opacity-85 disabled:opacity-40",
                                        children: "保存图片"
                                    }, void 0, false, {
                                        fileName: "[project]/app/badge/page.tsx",
                                        lineNumber: 120,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: reroll,
                                        disabled: !data,
                                        className: "w-full px-6 py-3 border border-line rounded-md text-base transition-colors hover:border-seal disabled:opacity-40",
                                        children: "换一批"
                                    }, void 0, false, {
                                        fileName: "[project]/app/badge/page.tsx",
                                        lineNumber: 127,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/badge/page.tsx",
                                lineNumber: 119,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-ink-soft leading-relaxed",
                                children: [
                                    "头像只在浏览器里处理，不上传服务器。",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                        fileName: "[project]/app/badge/page.tsx",
                                        lineNumber: 138,
                                        columnNumber: 13
                                    }, this),
                                    "编号、职位、评语都是随机的，中意就保存，不中意就换。"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/badge/page.tsx",
                                lineNumber: 136,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/badge/page.tsx",
                        lineNumber: 88,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/badge/page.tsx",
                lineNumber: 79,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/badge/page.tsx",
        lineNumber: 64,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/badge/BadgeCanvas.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>BadgeCanvas
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
const W = 640;
const H = 1000;
const SCALE = 2;
const PAPER = "#f7f5ef";
const INK = "#1f1c19";
const INK_SOFT = "#6b6459";
const LINE = "#d9d3c7";
const SEAL = "#a8322d";
const BRUSH = '"STKaiti", "KaiTi", "Kaiti SC", "Songti SC", "SimSun", serif';
const SANS = 'system-ui, "PingFang SC", "Microsoft YaHei", sans-serif';
function roundRectPath(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
}
/** 逐字绘制并加字距，绕开 ctx.letterSpacing 的兼容性问题 */ function drawSpaced(ctx, text, cx, y, spacing) {
    const chars = [
        ...text
    ];
    const widths = chars.map((c)=>ctx.measureText(c).width);
    const total = widths.reduce((a, b)=>a + b, 0) + spacing * (chars.length - 1);
    let x = cx - total / 2;
    chars.forEach((c, i)=>{
        ctx.fillText(c, x + widths[i] / 2, y);
        x += widths[i] + spacing;
    });
}
function drawPhotoFrame(ctx, x, y, w, h) {
    ctx.fillStyle = "#efece2";
    roundRectPath(ctx, x, y, w, h, 6);
    ctx.fill();
    ctx.strokeStyle = LINE;
    ctx.lineWidth = 1;
    roundRectPath(ctx, x, y, w, h, 6);
    ctx.stroke();
}
function drawSilhouette(ctx, x, y, w, h) {
    const cx = x + w / 2;
    ctx.fillStyle = "#cfc9ba";
    // 头
    ctx.beginPath();
    ctx.arc(cx, y + h * 0.36, w * 0.17, 0, Math.PI * 2);
    ctx.fill();
    // 身
    ctx.beginPath();
    ctx.moveTo(cx - w * 0.29, y + h * 0.98);
    ctx.quadraticCurveTo(cx - w * 0.26, y + h * 0.62, cx, y + h * 0.58);
    ctx.quadraticCurveTo(cx + w * 0.26, y + h * 0.62, cx + w * 0.29, y + h * 0.98);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = INK_SOFT;
    ctx.font = `20px ${SANS}`;
    ctx.textAlign = "center";
    ctx.fillText("无 像", cx, y + h - 26);
}
function BadgeCanvas({ canvasRef, data, avatar }) {
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        canvas.width = W * SCALE;
        canvas.height = H * SCALE;
        ctx.setTransform(SCALE, 0, 0, SCALE, 0, 0);
        ctx.clearRect(0, 0, W, H);
        // 纸底与双框
        ctx.fillStyle = PAPER;
        ctx.fillRect(0, 0, W, H);
        ctx.strokeStyle = LINE;
        ctx.lineWidth = 2;
        ctx.strokeRect(24, 24, W - 48, H - 48);
        ctx.lineWidth = 1;
        ctx.strokeRect(32, 32, W - 64, H - 64);
        // 标题
        ctx.fillStyle = INK;
        ctx.font = `bold 40px ${BRUSH}`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        drawSpaced(ctx, "华府出入牌", W / 2, 100, 16);
        ctx.strokeStyle = LINE;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(120, 138);
        ctx.lineTo(W - 120, 138);
        ctx.stroke();
        // 照片
        const pw = 200;
        const ph = 250;
        const px = (W - pw) / 2;
        const py = 176;
        drawPhotoFrame(ctx, px, py, pw, ph);
        if (avatar) {
            ctx.save();
            roundRectPath(ctx, px, py, pw, ph, 6);
            ctx.clip();
            const scale = Math.max(pw / avatar.width, ph / avatar.height);
            const dw = avatar.width * scale;
            const dh = avatar.height * scale;
            ctx.drawImage(avatar, px + (pw - dw) / 2, py + (ph - dh) / 2, dw, dh);
            ctx.restore();
        } else {
            drawSilhouette(ctx, px, py, pw, ph);
        }
        // 信息
        const rows = [
            [
                "姓 名",
                data.name || "无名氏"
            ],
            [
                "编 号",
                data.number
            ],
            [
                "职 位",
                data.post
            ],
            [
                "入 府",
                data.date
            ]
        ];
        let y = 486;
        rows.forEach(([label, value])=>{
            ctx.textAlign = "left";
            ctx.fillStyle = INK_SOFT;
            ctx.font = `22px ${SANS}`;
            ctx.fillText(label, 100, y);
            ctx.fillStyle = INK;
            ctx.font = `28px ${BRUSH}`;
            ctx.fillText(value, 190, y);
            ctx.strokeStyle = "#e6e0d2";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(100, y + 24);
            ctx.lineTo(W - 100, y + 24);
            ctx.stroke();
            y += 58;
        });
        // 评语
        ctx.textAlign = "left";
        ctx.fillStyle = INK_SOFT;
        ctx.font = `20px ${SANS}`;
        ctx.fillText("评 语", 100, 742);
        ctx.fillStyle = INK;
        ctx.font = `26px ${BRUSH}`;
        const remark = data.remark;
        const maxWidth = W - 200;
        const line1 = remark.slice(0, 12);
        const line2 = remark.slice(12);
        ctx.fillText(line1, 100, 782, maxWidth);
        if (line2) ctx.fillText(line2, 100, 818, maxWidth);
        // 底部
        ctx.textAlign = "center";
        ctx.fillStyle = INK_SOFT;
        ctx.font = `18px ${SANS}`;
        ctx.fillText("9527.chat", W / 2, H - 82);
        // 印章
        const sx = W - 150;
        const sy = H - 168;
        ctx.strokeStyle = SEAL;
        ctx.lineWidth = 3;
        roundRectPath(ctx, sx, sy, 84, 84, 8);
        ctx.stroke();
        ctx.fillStyle = SEAL;
        ctx.font = `bold 30px ${BRUSH}`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("华", sx + 42, sy + 26);
        ctx.fillText("府", sx + 42, sy + 58);
        ctx.textBaseline = "alphabetic";
    }, [
        canvasRef,
        data,
        avatar
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
        ref: canvasRef,
        style: {
            width: "100%",
            height: "auto",
            display: "block"
        },
        className: "rounded-md border border-line"
    }, void 0, false, {
        fileName: "[project]/components/badge/BadgeCanvas.tsx",
        lineNumber: 226,
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

//# sourceMappingURL=_0cc8vgg._.js.map