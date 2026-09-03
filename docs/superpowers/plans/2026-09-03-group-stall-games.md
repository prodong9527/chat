# 群聊玩梗摊位 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将“入府适应办”“会议脱身处”“绩效申辩堂”上线为适合同事群接梗、可保存主题卡片的三个轻量 AI 摊位。

**Architecture:** 建立只服务三个指定 slug 的玩法定义层，集中定义字段、提示词、结构化结果、本地兜底和群聊引子。它们使用可 await 的 JSON 生成路径，模型错误、超时或结果不合规时返回本地结果；既有摊位继续用流式路径。客户端据此渲染一到两个输入、群聊复制文本和专属 Canvas 卡片。

**Tech Stack:** Next.js 16 App Router、React 19、TypeScript、Zod 4、AI SDK 7、Vitest、Canvas API、Neon Postgres。

**Spec:** `docs/superpowers/specs/2026-09-03-group-stall-games-design.md`

## Global Constraints

- 三个摊位仅需一到两个轻输入，不增加账号、房间、邀请、实时同步或群平台集成。
- 只吐槽泛化工作流程、会议和组织语言；不得输出针对真实个人、领导或公司的攻击、歧视、造谣或羞辱。
- 会议玩法不得提供伪造证明、欺骗性脱身或规避工作责任的具体指令。
- 每个结果都必须有主题卡片、可复制的群聊文本和明确的接梗引子。
- 模型超时、错误或输出不合规时必须返回同主题本地兜底结果；不得暴露上游技术细节。
- 成功生成和图片保存继续只记录匿名日汇总，不保存表单文本。
- 修改 Next.js Route Handler 前必须阅读 `node_modules/next/dist/docs/01-app/` 中 Route Handlers 和动态路由参数的当前版本文档。

---

## File Structure

| 文件 | 职责 |
| --- | --- |
| `lib/stalls/group-games.ts` | 三个玩法的字段、schema、提示词、本地兜底与群聊文本。 |
| `lib/ai/stalls.ts` | 增加可 await 的群聊玩法 JSON 生成函数，保留既有流式函数。 |
| `app/api/stalls/[slug]/generate/route.ts` | 接受群聊玩法多字段请求，保留其他摊位单 `input` 请求。 |
| `components/market/ServiceDesk.tsx` | 渲染多字段表单、群聊复制区与结果操作。 |
| `components/share/templates.ts`、`lib/share/canvas.ts` | 生成主题分享文案与 handbook/drill/award Canvas 卡片。 |
| `lib/market/types.ts`、`lib/stalls/result.ts` | 扩展分享模板 union 与解析允许列表。 |
| `db/migrations/004_open_group_stall_games.sql`、`lib/market/catalog.ts` | 打开三个既有摊位，并使种子数据与部署数据库一致。 |

## Task 1: 定义玩法契约、本地兜底和分享模板类型

**Files:**
- Create: `lib/stalls/group-games.ts`
- Create: `lib/stalls/group-games.test.ts`
- Modify: `lib/market/types.ts`
- Modify: `lib/stalls/result.ts`

**Interfaces:** Produces `GROUP_GAME_SLUGS`, `isGroupGameSlug(slug)`, `getGroupGameDefinition(slug)`, `parseGroupGameInput(slug, raw)`, `createFallbackGroupGameResult(slug)` and `groupGameShareText(slug, result)`.

- [ ] **Step 1: Write failing behavior tests**

```ts
it("defines exactly two newcomer fields", () => {
  expect(getGroupGameDefinition("newcomer-guide").fields.map((field) => field.name)).toEqual(["nickname", "departmentType"]);
});

it("rejects undeclared meeting input", () => {
  expect(() => parseGroupGameInput("meeting-exit", { meetingType: "例会", exitLevel: "荒诞", target: "某人" })).toThrow();
});

it("makes a local award fallback with a group invitation", () => {
  const result = createFallbackGroupGameResult("performance-defense");
  expect(result.shareTemplate).toBe("award");
  expect(groupGameShareText("performance-defense", result)).toContain("请各位同事提交自己的年度获奖项目");
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- lib/stalls/group-games.test.ts`

Expected: FAIL because the module does not exist.

- [ ] **Step 3: Implement the contract**

```ts
export const GROUP_GAME_SLUGS = ["newcomer-guide", "meeting-exit", "performance-defense"] as const;
export type GroupGameSlug = (typeof GROUP_GAME_SLUGS)[number];
export type GroupGameDefinition = {
  fields: readonly { name: string; label: string; placeholder?: string; options?: readonly string[] }[];
  instruction: string;
  shareTemplate: "handbook" | "drill" | "award";
  groupPrompt: string;
};
```

Use strict Zod objects: newcomer uses `nickname` and `departmentType`; meeting uses `meetingType` and `exitLevel`; award uses `smallTask` and `workType`. Add input-free themed fallbacks with required sections. Add `handbook`, `drill`, and `award` to `ShareTemplate`, `StallResultSchema`, `ResultSchema`, and parser allow-lists.

- [ ] **Step 4: Verify and commit**

Run: `npm test -- lib/stalls/group-games.test.ts lib/stalls/result.test.ts`

Expected: PASS. Commit only these files with message `feat: define group stall game contracts`.

## Task 2: Add deterministic degradation for group-game generation

**Files:**
- Modify: `lib/ai/stalls.ts`
- Modify: `lib/ai/stalls.test.ts`

**Interfaces:** Consumes Task 1 definitions and `parseStallResult`. Produces `generateGroupGameResult(slug: GroupGameSlug, input: Record<string, string>): Promise<StallResult>`.

- [ ] **Step 1: Write failing generation tests**

```ts
it("uses an explicit non-targeted safety instruction", async () => {
  mockGenerateText.mockResolvedValueOnce({ text: handbookJson });
  await generateGroupGameResult("newcomer-guide", { nickname: "新同事", departmentType: "产品" });
  expect(mockGenerateText.mock.calls[0][0].system).toContain("不得攻击具体个人");
});

it("returns a themed local fallback when the model rejects", async () => {
  mockGenerateText.mockRejectedValueOnce(new Error("provider unavailable"));
  await expect(generateGroupGameResult("meeting-exit", { meetingType: "例会", exitLevel: "正常" })).resolves.toMatchObject({ shareTemplate: "drill" });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- lib/ai/stalls.test.ts`

Expected: FAIL because `generateGroupGameResult` is not exported.

- [ ] **Step 3: Implement isolated non-streaming generation**

Import `generateText` from `ai`. Call it with the existing `qwen(MODEL_ID)`, `AbortSignal.timeout(120_000)`, `temperature: 0.8`, and `maxOutputTokens: 700`. Require JSON `{title,summary,sections,shareTemplate}` and the expected template. System prompts ban attacks on specific people/organizations, discriminatory language, rumor-like claims, and deceptive meeting-exit guidance. Parse with `parseStallResult`; on provider error, timeout, parse failure, template mismatch, or safety mismatch, log internally and return `createFallbackGroupGameResult(slug)`. Do not change `streamStallResult`.

- [ ] **Step 4: Verify and commit**

Run: `npm test -- lib/ai/stalls.test.ts`

Expected: PASS. Commit only these files with message `feat: add resilient group stall generation`.

## Task 3: Route multi-field requests without changing existing stalls

**Files:**
- Modify: `app/api/stalls/[slug]/generate/route.ts`
- Create: `app/api/stalls/[slug]/generate/route.test.ts`

**Interfaces:** Consumes `isGroupGameSlug` and `parseGroupGameInput` from Task 1 and `generateGroupGameResult` from Task 2. Produces a JSON `StallResult` for group-game slugs and the existing text stream for every other open stall.

- [ ] **Step 1: Read current route documentation**

Read `node_modules/next/dist/docs/01-app/03-building-your-application/01-routing/13-route-handlers.md` and the dynamic-route page beside it. Confirm the handler continues to await `params` and uses `Request`/`Response` APIs supported by Next.js 16.

- [ ] **Step 2: Write failing route tests**

```ts
it("returns a group-game JSON receipt from a two-field payload", async () => {
  mockGetPublicStall.mockResolvedValue(openGroupStall("meeting-exit"));
  mockGenerateGroupGameResult.mockResolvedValue(fallbackDrill);
  const response = await POST(jsonRequest({ meetingType: "例会", exitLevel: "正常" }), { params: Promise.resolve({ slug: "meeting-exit" }) });
  expect(response.status).toBe(200);
  await expect(response.json()).resolves.toMatchObject({ shareTemplate: "drill" });
});

it("rejects undeclared group-game fields", async () => {
  mockGetPublicStall.mockResolvedValue(openGroupStall("meeting-exit"));
  const response = await POST(jsonRequest({ meetingType: "例会", exitLevel: "正常", target: "某同事" }), { params: Promise.resolve({ slug: "meeting-exit" }) });
  expect(response.status).toBe(400);
});
```

- [ ] **Step 3: Run the test to verify it fails**

Run: `npm test -- app/api/stalls/[slug]/generate/route.test.ts`

Expected: FAIL because the handler only accepts `{ input }`.

- [ ] **Step 4: Implement slug-specific routing**

After public-open-stall and rate checks, read JSON once. For group-game slugs, run `parseGroupGameInput`, await `generateGroupGameResult`, then return `Response.json(result)`. For every other stall preserve `InputSchema.parse(payload)` and `streamStallResult(stall, { input })`. Keep existing 404, 429, malformed-body 400 and legacy 503 responses.

- [ ] **Step 5: Verify and commit**

Run: `npm test -- app/api/stalls/[slug]/generate/route.test.ts`

Expected: PASS. Commit only these files with message `feat: accept group stall game forms`.

## Task 4: Render group forms and group-ready result actions

**Files:**
- Modify: `components/market/ServiceDesk.tsx`
- Create: `components/market/ServiceDesk.test.tsx`
- Modify: `components/share/templates.ts`
- Create: `components/share/templates.test.ts`
- Modify: `app/globals.css`

**Interfaces:** Consumes Task 1 definitions and Task 3 response. Produces field-name request payloads for group games and `resultSharePayload(result)` that includes a concise selection of result sections.

- [ ] **Step 1: Write failing client tests**

```tsx
it("submits two meeting fields and shows the group prompt", async () => {
  render(<ServiceDesk slug="meeting-exit" name="会议脱身处" />);
  await userEvent.selectOptions(screen.getByLabelText("会议类型"), "例会");
  await userEvent.selectOptions(screen.getByLabelText("脱身程度"), "正常");
  await userEvent.click(screen.getByRole("button", { name: "递交材料" }));
  expect(fetch).toHaveBeenCalledWith("/api/stalls/meeting-exit/generate", expect.objectContaining({ body: JSON.stringify({ meetingType: "例会", exitLevel: "正常" }) }));
  expect(await screen.findByText("请投票：这套方案能否在“最后补充一点”前成功离场？")).toBeInTheDocument();
});

it("formats a handbook as group-ready text", () => {
  expect(groupGameShareText("newcomer-guide", handbookResult)).toContain("请各位老员工补充本员工尚未掌握的隐藏条例");
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `npm test -- components/market/ServiceDesk.test.tsx components/share/templates.test.ts`

Expected: FAIL because the desk only renders one textarea.

- [ ] **Step 3: Implement conditional forms, copy, and payloads**

Keep legacy behavior unchanged. For group slugs, render options as native `select` controls and `smallTask` as the only short textarea; build the body from field names and disable submission until all fields are present. After result rendering, show a selectable “发到群里” block and a “复制群聊版” button using `navigator.clipboard.writeText`; if it fails, leave text selectable and show a non-technical message. Change `resultSharePayload` to accept `StallResult`, composing its body from summary and no more than three sections. Add responsive `.service-fields`, `.group-prompt`, and `.group-copy` styles while retaining 44px minimum buttons.

- [ ] **Step 4: Verify and commit**

Run: `npm test -- components/market/ServiceDesk.test.tsx components/share/templates.test.ts`

Expected: PASS. Commit only these files with message `feat: add group-ready stall desk interactions`.

## Task 5: Add handbook, drill, and award Canvas cards

**Files:**
- Modify: `lib/share/canvas.ts`
- Modify: `lib/share/canvas.test.ts`
- Modify: `components/share/ShareActions.tsx`

**Interfaces:** Consumes the extended `ShareTemplate` union and the full share payload from Task 4. Produces distinct handbook, drill, and award visual treatments at 1080×1080 and 1080×1350.

- [ ] **Step 1: Write failing drawing tests**

```ts
it.each(["handbook", "drill", "award"] as const)("draws %s at vertical size", (template) => {
  const canvas = document.createElement("canvas");
  drawShareCard(canvas, { title: "测试回执", body: "用于群聊接梗的测试内容", footer: "9527 号签发", template }, { width: 1080, height: 1350 });
  expect(canvas.width).toBe(1080);
  expect(canvas.height).toBe(1350);
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- lib/share/canvas.test.ts`

Expected: FAIL because `SharePayload` has no `template` property and drawing does not branch by theme.

- [ ] **Step 3: Implement theme-aware drawing**

Add `template: ShareTemplate` to `SharePayload` and provide it from `ShareActions`. Retain shared sanitization and wrapping. Dispatch through private drawing helpers: handbook uses rule lines and a folder-tab heading; drill uses a black/yellow safety-stripe header and numbered steps; award uses red seals, centered award title, and certificate border. Use only text, fills, and lines with built-in fonts. Preserve the existing shared rendering for `badge`, `fortune`, `chat`, `notice`, `leave`, and `report`.

- [ ] **Step 4: Verify and commit**

Run: `npm test -- lib/share/canvas.test.ts components/share/templates.test.ts`

Expected: PASS. Commit only these files with message `feat: add themed group stall share cards`.

## Task 6: Open the three stalls in seed data and deployed databases

**Files:**
- Create: `db/migrations/004_open_group_stall_games.sql`
- Modify: `lib/market/catalog.ts`
- Modify: `lib/market/catalog.test.ts`

**Interfaces:** Produces three existing slugs with `open` status, matching descriptions, `generic_ai` type, and minimal config that identifies the game key. Never creates duplicate rows.

- [ ] **Step 1: Write failing seed expectations**

```ts
it("opens the three group games with shipped descriptions", () => {
  const bySlug = Object.fromEntries(LAUNCH_STALLS.map((stall) => [stall.slug, stall]));
  expect(bySlug["newcomer-guide"]).toMatchObject({ status: "open", description: "生成一份华府新员工说明书" });
  expect(bySlug["meeting-exit"]).toMatchObject({ status: "open", description: "抽一份会议逃生演练通报" });
  expect(bySlug["performance-defense"]).toMatchObject({ status: "open", description: "颁一张年度摸鱼成果奖" });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- lib/market/catalog.test.ts`

Expected: FAIL because these entries are `coming_soon`.

- [ ] **Step 3: Update seed and add idempotent migration**

Set the matching `LAUNCH_STALLS` rows to `open` with the descriptions above and config `{ game: "newcomer-guide" }`, `{ game: "meeting-exit" }`, and `{ game: "performance-defense" }`. Add migration 004 with three explicit `UPDATE stalls SET status = 'open', description = ..., config = ...::jsonb, updated_at = now() WHERE slug = ...;` statements. Do not change codes, districts, types, or sort order.

- [ ] **Step 4: Verify and commit**

Run: `npm test -- lib/market/catalog.test.ts`

Expected: PASS. Commit only these files with message `feat: open group stall games`.

## Task 7: Verify the complete feature

**Files:** Modify only files above if verification exposes a feature defect.

**Interfaces:** Consumes all previous tasks and produces a buildable application where all three public stall pages work on desktop and mobile.

- [ ] **Step 1: Run the feature suite**

Run: `npm test -- lib/stalls/group-games.test.ts lib/ai/stalls.test.ts app/api/stalls/[slug]/generate/route.test.ts components/market/ServiceDesk.test.tsx components/share/templates.test.ts lib/share/canvas.test.ts lib/market/catalog.test.ts`

Expected: PASS with zero failures.

- [ ] **Step 2: Run full automated verification**

Run: `npm test && npm run lint && npm run build`

Expected: each command exits 0; fix only defects introduced by this feature.

- [ ] **Step 3: Manually smoke-test desktop and 390px mobile**

Run: `npm run dev`

Check `/stall/newcomer-guide` generates a handbook, group prompt and image action; `/stall/meeting-exit` returns no deceptive exit guidance; `/stall/performance-defense` shows award and invitation; provider failure returns each themed fallback; and the home page no longer labels the three stalls “筹备中”.

- [ ] **Step 4: Inspect the final state and commit verification-only fixes**

Run: `git diff --check && git status --short`

Expected: no whitespace errors and only intentional feature files. If fixes were necessary, commit only them with message `fix: verify group stall games`.
