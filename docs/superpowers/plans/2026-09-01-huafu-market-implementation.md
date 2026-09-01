# 华府后街摊位集市 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the current 9527 chat app into a mobile-safe, database-backed Huafu market with ten launch stalls, an authenticated hidden admin area, anonymous aggregate metrics, and local PNG sharing.

**Architecture:** Keep Next.js App Router and the existing OpenAI-compatible model integration. Add Neon Postgres for districts, stalls, metrics, and admin sessions; expose server Route Handlers for generation, metrics, and admin mutations. Public pages read a database-configured market, while complex stalls retain focused custom components and simple future AI stalls use a typed generic form/result contract.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS 4, AI SDK 7, `@neondatabase/serverless`, Zod, Vitest, Testing Library, `@dnd-kit`, Canvas API, Vercel Functions, Neon Postgres.

**Spec:** `docs/superpowers/specs/2026-09-01-huafu-market-design.md`

## Global Constraints

- Deploy the app, Route Handlers, admin UI, and AI calls on Vercel.
- Use Neon Postgres through the Vercel Marketplace; do not add Redis, Blob storage, cron jobs, or a user-account system.
- Require `OPENAI_BASE_URL`, `OPENAI_API_KEY`, `MODEL_NAME`, `DATABASE_URL`, `ADMIN_PASSWORD_HASH`, and `ADMIN_SESSION_SECRET` in production.
- Persist only anonymous daily aggregate metrics; never persist user prompts, names, complete IP addresses, chat transcripts, or generated share images.
- Keep the public app usable when metric writes fail; model failures must leave the form input visible and offer a retry.
- Generate share PNGs in the browser with Canvas; mobile must treat image saving as the primary action and native sharing as an optional fallback.
- Preserve the stable URL for existing tools while moving all market placement and status into database configuration.
- Treat `/_9527/neibu` as a non-indexed route, not a security control; all admin mutations require a signed HttpOnly session.

---

## File Structure

| Path | Responsibility |
| --- | --- |
| `lib/market/types.ts` | Domain types for districts, stalls, generation requests, results, and metrics. |
| `lib/market/catalog.ts` | Built-in definitions for the ten launch stalls and generic-stall defaults. |
| `lib/db/client.ts` | Lazily creates the Neon SQL client from `DATABASE_URL`. |
| `lib/db/market.ts` | Queries and mutations for districts, stalls, and daily aggregate metrics. |
| `lib/auth/admin.ts` | Password verification, HMAC session cookies, origin checks, and admin guards. |
| `lib/ai/stalls.ts` | Zod validation, prompt construction, result parsing, and model invocation for non-chat stalls. |
| `lib/share/canvas.ts` | Pure Canvas drawing helpers and PNG export fallback behavior. |
| `db/migrations/001_market.sql` | Idempotent schema for market configuration, metrics, and sessions. |
| `db/migrations/002_seed_market.sql` | Initial street and ten-stall seed data. |
| `scripts/migrate.mjs` | Runs ordered SQL migration files against `DATABASE_URL`. |
| `app/page.tsx` | Server-rendered market home page. |
| `app/stall/[slug]/page.tsx` | Database-driven public stall route. |
| `app/_9527/neibu/page.tsx` | Server-protected admin dashboard entry. |
| `app/api/stalls/[slug]/generate/route.ts` | Typed one-shot generation endpoint for generic and new AI stalls. |
| `app/api/metrics/route.ts` | Accepts allowed anonymous events and increments a daily aggregate. |
| `app/api/admin/**/route.ts` | Login, logout, stall CRUD, sort, and dashboard APIs. |
| `components/market/*` | Street, stall sign, shared office form, result card, and loading/error UI. |
| `components/admin/*` | Login form, sortable stalls, stall editor, and metrics dashboard. |
| `components/share/*` | Mobile-safe save/share controls and template adapters. |
| `components/stalls/*` | Focused components for the ten individual stall experiences. |
| `lib/**/*.test.ts` and `components/**/*.test.tsx` | Unit and component regression coverage. |

## Task 1: Establish Test and Validation Infrastructure

**Files:**
- Modify: `package.json`
- Modify: `tsconfig.json`
- Create: `vitest.config.ts`
- Create: `test/setup.ts`
- Create: `lib/market/types.test.ts`
- Create: `lib/market/types.ts`

**Interfaces:**
- Produces `StallStatus`, `StallType`, `MetricEvent`, `Stall`, `District`, `StallGenerationRequest`, and `StallResult` used by all later tasks.
- Produces `npm test` running Vitest without pulling `*.test.ts` into `next build`.

- [ ] **Step 1: Add a failing domain-contract test.**

```ts
import { describe, expect, it } from "vitest";
import { StallSchema } from "./types";

describe("StallSchema", () => {
  it("rejects a public stall without a stable slug", () => {
    expect(() => StallSchema.parse({ name: "华府人事摊" })).toThrow();
  });
});
```

- [ ] **Step 2: Run the test and confirm it fails because the module is absent.**

Run: `npm test -- lib/market/types.test.ts`

Expected: FAIL with a module-resolution error for `lib/market/types`.

- [ ] **Step 3: Add the test dependencies and scripts.**

```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "devDependencies": {
    "@testing-library/react": "^16.0.0",
    "@testing-library/user-event": "^14.0.0",
    "jsdom": "^26.0.0",
    "vitest": "^3.0.0"
  }
}
```

Configure `vitest.config.ts` with the React/jsdom environment only for `components/**/*.test.tsx`, and Node for `lib/**/*.test.ts`.

- [ ] **Step 4: Implement the minimum shared domain types and Zod schemas.**

```ts
export const StallStatusSchema = z.enum(["open", "coming_soon", "closed"]);
export const StallTypeSchema = z.enum(["generic_ai", "custom_ai", "daily", "local"]);
export const MetricEventSchema = z.enum(["visit", "generation", "image_save"]);

export const StallSchema = z.object({
  id: z.string().uuid(),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  code: z.string().regex(/^[A-Z]-\d{2}$/),
  districtSlug: z.string(),
  name: z.string().min(1).max(40),
  description: z.string().min(1).max(100),
  status: StallStatusSchema,
  type: StallTypeSchema,
  sortOrder: z.number().int().nonnegative(),
  config: z.record(z.string(), z.unknown()),
});
```

- [ ] **Step 5: Run the focused and full test suites.**

Run: `npm test -- lib/market/types.test.ts && npm test`

Expected: PASS; the valid fixture parses and the missing slug fixture rejects.

- [ ] **Step 6: Commit the test foundation.**

```bash
git add package.json package-lock.json tsconfig.json vitest.config.ts test/setup.ts lib/market/types.ts lib/market/types.test.ts
git commit -m "test: add market domain test harness"
```

## Task 2: Add Neon Schema, Migrations, and Launch Catalog

**Files:**
- Modify: `package.json`
- Create: `db/migrations/001_market.sql`
- Create: `db/migrations/002_seed_market.sql`
- Create: `scripts/migrate.mjs`
- Create: `lib/db/client.ts`
- Create: `lib/db/market.ts`
- Create: `lib/market/catalog.ts`
- Create: `lib/db/market.test.ts`
- Create: `README.md` section “Market database setup”

**Interfaces:**
- Consumes: `Stall`, `District`, and `MetricEvent` from `lib/market/types.ts`.
- Produces `listPublicDistricts()`, `getPublicStall(slug)`, `listAdminStalls()`, `saveStall(input)`, `moveStall(input)`, and `recordMetric(slug, event, date)`.

- [ ] **Step 1: Write failing repository tests using a fake SQL tagged-template adapter.**

```ts
it("increments a generation aggregate with one upsert", async () => {
  const sql = createRecordingSql();
  await recordMetricWith(sql, "huafu-badge", "generation", new Date("2026-09-01"));
  expect(sql.calls[0].text).toContain("ON CONFLICT (metric_date, stall_id)");
  expect(sql.calls[0].values).toContain("generation");
});
```

- [ ] **Step 2: Run the test and confirm it fails because `recordMetricWith` does not exist.**

Run: `npm test -- lib/db/market.test.ts`

Expected: FAIL with `recordMetricWith is not a function` or missing export.

- [ ] **Step 3: Add `@neondatabase/serverless` and write idempotent migrations.**

`001_market.sql` must create:

```sql
CREATE TABLE IF NOT EXISTS districts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  accent text NOT NULL,
  sort_order integer NOT NULL CHECK (sort_order >= 0)
);

CREATE TABLE IF NOT EXISTS stalls (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  code text UNIQUE NOT NULL,
  district_id uuid NOT NULL REFERENCES districts(id) ON DELETE RESTRICT,
  name text NOT NULL,
  description text NOT NULL,
  status text NOT NULL CHECK (status IN ('open', 'coming_soon', 'closed')),
  type text NOT NULL CHECK (type IN ('generic_ai', 'custom_ai', 'daily', 'local')),
  sort_order integer NOT NULL CHECK (sort_order >= 0),
  config jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS daily_metrics (
  metric_date date NOT NULL,
  stall_id uuid NOT NULL REFERENCES stalls(id) ON DELETE CASCADE,
  visits integer NOT NULL DEFAULT 0,
  generations integer NOT NULL DEFAULT 0,
  image_saves integer NOT NULL DEFAULT 0,
  PRIMARY KEY (metric_date, stall_id)
);

CREATE TABLE IF NOT EXISTS admin_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  token_hash text UNIQUE NOT NULL,
  expires_at timestamptz NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
```

`002_seed_market.sql` must insert the five named districts and all ten stable launch slugs using `ON CONFLICT DO NOTHING`.

- [ ] **Step 4: Implement database access and migration execution.**

```ts
export async function recordMetric(slug: string, event: MetricEvent, date = new Date()) {
  const column = event === "visit" ? "visits" : event === "generation" ? "generations" : "image_saves";
  await sql(`INSERT INTO daily_metrics (metric_date, stall_id, ${column})
    SELECT $1::date, id, 1 FROM stalls WHERE slug = $2
    ON CONFLICT (metric_date, stall_id)
    DO UPDATE SET ${column} = daily_metrics.${column} + 1`, [toIsoDate(date), slug]);
}
```

The migration script must read sorted `db/migrations/*.sql`, split only on a `-- migrate:break` line, execute every statement in order, and stop on the first failure. Add `"db:migrate": "node scripts/migrate.mjs"`.

- [ ] **Step 5: Document the one-time database command.**

Add these exact instructions to the README:

```bash
vercel env pull .env.local
npm run db:migrate
```

Explain that the Neon integration provides `DATABASE_URL`, and do not place the value in source control.

- [ ] **Step 6: Run tests and a local migration dry-run.**

Run: `npm test -- lib/db/market.test.ts && npm test`

Expected: PASS. If `DATABASE_URL` is absent, `npm run db:migrate` must exit with `DATABASE_URL is required` before attempting a connection.

- [ ] **Step 7: Commit persistence and seed data.**

```bash
git add package.json package-lock.json db scripts lib/db lib/market/catalog.ts README.md
git commit -m "feat: add market persistence and seed catalog"
```

## Task 3: Add Admin Authentication and Protected APIs

**Files:**
- Create: `lib/auth/admin.ts`
- Create: `lib/auth/admin.test.ts`
- Create: `app/api/admin/login/route.ts`
- Create: `app/api/admin/logout/route.ts`
- Create: `app/api/admin/stalls/route.ts`
- Create: `app/api/admin/stalls/[slug]/route.ts`
- Create: `app/api/admin/stalls/reorder/route.ts`
- Create: `app/api/admin/metrics/route.ts`

**Interfaces:**
- Consumes: repository methods from `lib/db/market.ts`.
- Produces `requireAdmin(request)`, `createAdminSession()`, `clearAdminSession()`, and `assertSameOrigin(request)`.
- Produces JSON admin APIs returning `{ stalls }`, `{ stall }`, `{ districts }`, or `{ metrics }`.

- [ ] **Step 1: Write failing authentication tests.**

```ts
it("rejects a tampered admin session cookie", async () => {
  const request = new Request("https://9527.example/_9527/neibu", {
    headers: { cookie: "huafu_admin=changed" },
  });
  await expect(requireAdmin(request)).rejects.toMatchObject({ status: 401 });
});

it("rejects a state-changing request from another origin", () => {
  const request = new Request("https://9527.example/api/admin/stalls", {
    method: "POST",
    headers: { origin: "https://attacker.example" },
  });
  expect(() => assertSameOrigin(request)).toThrow("origin");
});
```

- [ ] **Step 2: Run the test and confirm the auth module is missing.**

Run: `npm test -- lib/auth/admin.test.ts`

Expected: FAIL with a missing module/export error.

- [ ] **Step 3: Implement password verification and signed sessions.**

Use Node `crypto.scrypt` and `timingSafeEqual` to verify `ADMIN_PASSWORD_HASH` in `scrypt$<salt-base64>$<hash-base64>` format. Use `crypto.createHmac("sha256", ADMIN_SESSION_SECRET)` to sign a random token; store only the token SHA-256 hash and expiry in `admin_sessions`. Set a `huafu_admin` cookie with `httpOnly`, `sameSite: "lax"`, `secure` in production, `path: "/"`, and a 12-hour `maxAge`.

- [ ] **Step 4: Implement the admin routes with Zod input validation.**

Use this response pattern for every route:

```ts
try {
  const admin = await requireAdmin(request);
  assertSameOrigin(request);
  const input = UpdateStallSchema.parse(await request.json());
  const stall = await saveStall(input, admin);
  return Response.json({ stall });
} catch (error) {
  return adminErrorResponse(error);
}
```

`POST /api/admin/stalls/reorder` must accept `{ districtSlug, slugs: string[] }`, verify that every slug belongs to the district, and update all `sort_order` values in one database transaction.

- [ ] **Step 5: Run focused tests and confirm unauthenticated routes return 401.**

Run: `npm test -- lib/auth/admin.test.ts && npm test`

Expected: PASS; tampered cookies, cross-origin writes, and malformed stall payloads reject.

- [ ] **Step 6: Commit admin security and APIs.**

```bash
git add lib/auth app/api/admin
git commit -m "feat: add protected market admin APIs"
```

## Task 4: Build Public Market Reads and Anonymous Aggregate Metrics

**Files:**
- Create: `app/api/metrics/route.ts`
- Create: `app/api/metrics/route.test.ts`
- Create: `components/market/MetricBeacon.tsx`
- Create: `components/market/MarketShell.tsx`
- Create: `components/market/StallSign.tsx`
- Create: `components/market/DistrictStreet.tsx`
- Modify: `app/page.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: `listPublicDistricts()` and `recordMetric()`.
- Produces `POST /api/metrics` accepting `{ slug, event }` where event is one of `visit`, `generation`, `image_save`.
- Produces `MarketShell`, `DistrictStreet`, and `StallSign` for all public pages.

- [ ] **Step 1: Write failing metric endpoint tests.**

```ts
it("accepts only approved metric event names", async () => {
  const response = await POST(jsonRequest({ slug: "huafu-badge", event: "prompt" }));
  expect(response.status).toBe(400);
});

it("does not fail a public response when metric storage is unavailable", async () => {
  mockRecordMetric.mockRejectedValueOnce(new Error("database unavailable"));
  await expect(recordMetricBestEffort("huafu-badge", "visit")).resolves.toBeUndefined();
});
```

- [ ] **Step 2: Run tests and confirm the route/helper do not exist.**

Run: `npm test -- app/api/metrics/route.test.ts`

Expected: FAIL with missing module/export errors.

- [ ] **Step 3: Implement a narrow metric API and client beacon.**

Validate the slug against public open/coming-soon stalls. Do not accept arbitrary payload fields. `MetricBeacon` must send a single `visit` event after client mount using `navigator.sendBeacon`; use `fetch(..., { keepalive: true })` only when `sendBeacon` is unavailable. Ignore metric write failures.

- [ ] **Step 4: Replace the static homepage with a street map.**

`app/page.tsx` must load public districts and stalls on the server, render a `MarketShell`, display the daily notice, and group `StallSign` instances by district. Each sign must show stable code, name, short description, status, and today’s generation count. Use database ordering, not a hard-coded array.

- [ ] **Step 5: Add responsive market tokens and motion.**

In `globals.css`, retain paper/ink/seal colors and add street-specific accents, signboard borders, status seal styles, and `prefers-reduced-motion` handling. Grid layouts must collapse to one column below `640px`; all tap targets must be at least `44px` tall.

- [ ] **Step 6: Run tests and manually check mobile layout.**

Run: `npm test -- app/api/metrics/route.test.ts && npm test`

Manual check: open `/` at 375px and 1280px widths; confirm no horizontal scroll and every stall link remains reachable.

- [ ] **Step 7: Commit the market home and metrics.**

```bash
git add app/page.tsx app/api/metrics components/market app/globals.css
git commit -m "feat: add market street and anonymous metrics"
```

## Task 5: Implement Mobile-Safe Share Canvas Infrastructure

**Files:**
- Create: `lib/share/canvas.ts`
- Create: `lib/share/canvas.test.ts`
- Create: `components/share/ShareActions.tsx`
- Create: `components/share/ShareActions.test.tsx`
- Create: `components/share/templates.ts`

**Interfaces:**
- Produces `drawShareCard(canvas, payload, size)`, `exportPng(canvas, filename)`, and `tryNativeShare(file, title)`.
- `ShareActions` consumes `{ template, payload, filename, onSaved }` and records only successful image-save metrics.

- [ ] **Step 1: Write failing Canvas payload tests.**

```ts
it("caps long user content before drawing a share card", () => {
  const payload = sanitizeSharePayload({ title: "工牌", body: "x".repeat(800) });
  expect(payload.body.length).toBeLessThanOrEqual(240);
});

it("selects a mobile-safe image size", () => {
  expect(selectShareSize(375)).toEqual({ width: 1080, height: 1350 });
});
```

- [ ] **Step 2: Run tests and confirm share helpers are absent.**

Run: `npm test -- lib/share/canvas.test.ts`

Expected: FAIL with a missing module/export error.

- [ ] **Step 3: Implement pure Canvas drawing helpers.**

Support `badge`, `fortune`, `chat`, `notice`, `leave`, and `report` templates using only text, fills, strokes, and local fonts. Never call `drawImage` with remote URLs. Clamp canvas strings, wrap text by measured width, and render only 1080 x 1350 or 1080 x 1080 output.

- [ ] **Step 4: Implement resilient mobile actions.**

```ts
async function saveImage() {
  try {
    const blob = await exportPng(canvas, filename);
    triggerDownload(blob, filename);
    onSaved?.();
  } catch {
    setError("图片没盖出来，文字结果还在，重试一次即可。");
  }
}

async function shareImage() {
  const file = await toPngFile(canvas, filename);
  if (navigator.share && navigator.canShare?.({ files: [file] })) {
    await navigator.share({ title, files: [file] });
  } else {
    await saveImage();
  }
}
```

The primary button is “保存图片”. Render “立即分享” only after checking support, and turn a cancelled share into a silent no-op.

- [ ] **Step 5: Run unit/component tests.**

Run: `npm test -- lib/share/canvas.test.ts components/share/ShareActions.test.tsx && npm test`

Expected: PASS; unsupported native sharing falls back to saving and export errors keep the result visible.

- [ ] **Step 6: Commit sharing infrastructure.**

```bash
git add lib/share components/share
git commit -m "feat: add mobile-safe share image actions"
```

## Task 6: Add Typed Stall Generation and the Generic Stall Page

**Files:**
- Create: `lib/ai/stalls.ts`
- Create: `lib/ai/stalls.test.ts`
- Create: `app/api/stalls/[slug]/generate/route.ts`
- Create: `app/api/stalls/[slug]/generate/route.test.ts`
- Create: `app/stall/[slug]/page.tsx`
- Create: `components/market/ServiceDesk.tsx`
- Create: `components/market/ServiceDesk.test.tsx`
- Create: `components/market/ResultDocument.tsx`

**Interfaces:**
- Consumes: `getPublicStall(slug)`, `checkInput`, `checkRate`, `qwen`, and `MODEL_ID`.
- Produces `generateStallResult(stall, input): Promise<StallResult>` and `POST /api/stalls/:slug/generate`.
- `StallResult` is `{ title: string; summary: string; sections: Array<{ label: string; value: string }>; shareTemplate: ShareTemplate }`.

- [ ] **Step 1: Write failing result-parser tests.**

```ts
it("accepts a fenced JSON model response and strips the fence", () => {
  const result = parseStallResult('```json\n{"title":"回执","summary":"已办","sections":[]}\n```');
  expect(result.title).toBe("回执");
});

it("rejects a model response without all required result fields", () => {
  expect(() => parseStallResult('{"title":"缺页"}')).toThrow("模型回执格式不对");
});
```

- [ ] **Step 2: Run tests and confirm parser/generator are missing.**

Run: `npm test -- lib/ai/stalls.test.ts`

Expected: FAIL with missing module/export errors.

- [ ] **Step 3: Implement validated one-shot AI generation.**

Use `generateText`, not streaming, for document-like stalls. Build a system prompt that requires JSON only and includes the stall’s administrator-authored config. Strip optional Markdown fences, parse JSON, validate with Zod, and return a typed 422 `model_invalid` error when parsing fails. Cap every submitted input field at 500 characters and every rendered result value at 240 characters.

- [ ] **Step 4: Implement the public service desk.**

`ServiceDesk` must render config-defined text fields, preserve values after API errors, show the “正在替你走流程” state, expose retry, record successful `generation`, and render `ResultDocument` plus `ShareActions`. It must not expose prompts or admin-only config to the browser.

- [ ] **Step 5: Protect the route.**

The Route Handler must reject unknown or closed slugs with 404, reject invalid form data with 400, apply `checkRate(clientIp(req))`, and return `{ error: "idle" }` only for upstream availability failures. Public metric writes remain best effort.

- [ ] **Step 6: Run route and UI tests.**

Run: `npm test -- lib/ai/stalls.test.ts app/api/stalls/[slug]/generate/route.test.ts components/market/ServiceDesk.test.tsx && npm test`

Expected: PASS; malformed model output, invalid input, model failure, and a successful result each have covered behavior.

- [ ] **Step 7: Commit generic stall generation.**

```bash
git add lib/ai app/api/stalls app/stall components/market
git commit -m "feat: add generic market stall generation"
```

## Task 7: Build the Badge, Draw, and Daily Fortune Stalls

**Files:**
- Modify: `app/badge/page.tsx`
- Modify: `components/badge/BadgeCanvas.tsx`
- Create: `components/stalls/BadgeDesk.tsx`
- Create: `components/stalls/DrawDesk.tsx`
- Create: `components/stalls/FortuneDesk.tsx`
- Create: `components/stalls/FortuneDesk.test.tsx`
- Create: `lib/stalls/fortune.ts`
- Create: `lib/stalls/fortune.test.ts`
- Modify: `app/draw/page.tsx`
- Create: `app/stall/workstation-fortune/page.tsx`

**Interfaces:**
- Consumes: `ShareActions`, `recordMetricBestEffort`, and `MetricBeacon`.
- Produces `getDailyFortune(date, deviceSeed): FortuneResult` and focused desk components for the three stalls.

- [ ] **Step 1: Write failing deterministic-fortune tests.**

```ts
it("returns the same fortune for the same date and local device seed", () => {
  expect(getDailyFortune("2026-09-01", "device-a")).toEqual(
    getDailyFortune("2026-09-01", "device-a"),
  );
});

it("changes the fortune on the following date", () => {
  expect(getDailyFortune("2026-09-01", "device-a")).not.toEqual(
    getDailyFortune("2026-09-02", "device-a"),
  );
});
```

- [ ] **Step 2: Run tests and confirm the utility is missing.**

Run: `npm test -- lib/stalls/fortune.test.ts`

Expected: FAIL with missing module/export errors.

- [ ] **Step 3: Implement a stable local daily seed.**

Store one random `huafu-device-seed` in `localStorage`. Hash `YYYY-MM-DD:seed` into an index for a checked-in list of job-speak fortunes. Do not call the model or add a scheduled job.

- [ ] **Step 4: Replace the photo badge with AI title generation.**

Remove avatar upload and the old random title fields. `BadgeDesk` takes a name or employee number, calls the typed generation route, and maps title, department, skill tags, and signer text into a revised Canvas badge. Keep the default display number 9527 and add “换一张头衔”.

- [ ] **Step 5: Migrate draw into the market shell.**

Keep existing random draw behavior, but wrap it in `DrawDesk`, add market navigation, generation metric recording after a completed roll, and a notice-style share image. Do not change the existing post data in this task.

- [ ] **Step 6: Implement and test the fortune desk.**

Render one daily result, a “今日宜 / 忌 / 摸鱼指数 / 建议话术” layout, a no-op message when the user tries to redraw, and a fortune-template PNG. Test the one-draw-per-day local storage rule.

- [ ] **Step 7: Run focused and full tests.**

Run: `npm test -- lib/stalls/fortune.test.ts components/stalls/FortuneDesk.test.tsx && npm test`

Expected: PASS; the badge no longer renders file input, draw and fortune record only successful outcomes, and fortune output is stable for one device/day.

- [ ] **Step 8: Commit the first stall group.**

```bash
git add app/badge app/draw app/stall/workstation-fortune components/stalls components/badge lib/stalls
git commit -m "feat: add badge draw and fortune stalls"
```

## Task 8: Build the Four New AI Document Stalls

**Files:**
- Create: `app/stall/read-misreply/page.tsx`
- Create: `app/stall/blame-translator/page.tsx`
- Create: `app/stall/leave-office/page.tsx`
- Create: `app/stall/weekly-expander/page.tsx`
- Create: `components/stalls/MisreplyDesk.tsx`
- Create: `components/stalls/TranslatorDesk.tsx`
- Create: `components/stalls/LeaveDesk.tsx`
- Create: `components/stalls/WeeklyDesk.tsx`
- Create: `components/stalls/DocumentDesk.test.tsx`
- Modify: `lib/market/catalog.ts`

**Interfaces:**
- Consumes: `generateStallResult`, `ResultDocument`, and `ShareActions`.
- Produces typed configs for `read-misreply`, `blame-translator`, `leave-office`, and `weekly-expander`.

- [ ] **Step 1: Write failing component tests for each output contract.**

```tsx
it("keeps the original colleague message out of a misreply share payload", () => {
  render(<MisreplyDesk />);
  // submit input and select the first generated reply
  expect(lastSharePayload.body).not.toContain("同事原话");
});

it("renders three leave tiers with a manager reply and a recommended response", () => {
  render(<LeaveDesk />);
  expect(screen.getByText("保守")).toBeInTheDocument();
  expect(screen.getByText("正常")).toBeInTheDocument();
  expect(screen.getByText("离谱")).toBeInTheDocument();
});
```

- [ ] **Step 2: Run the tests and confirm the desk components are missing.**

Run: `npm test -- components/stalls/DocumentDesk.test.tsx`

Expected: FAIL with missing component errors.

- [ ] **Step 3: Add strict result configs and prompts.**

Use these result contracts:

```ts
type MisreplyResult = { replies: [string, string, string, string, string] };
type TranslationResult = { official: string; plain: string; variants: [string, string, string] };
type LeaveResult = { tiers: Array<{ level: "保守" | "正常" | "离谱"; reason: string; managerReply: string; followUp: string }> };
type WeeklyResult = { report: string; highlights: string[]; nextWeek: string[] };
```

Prompt constraints: no invented medical diagnosis, legal claim, employment-policy advice, or personal attack; keep jokes directed at workplace language rather than protected characteristics.

- [ ] **Step 4: Implement each desk’s dedicated output treatment.**

- `MisreplyDesk`: list five selectable reply slips; share only the selected reply.
- `TranslatorDesk`: tabs for black-talk-to-plain and truth-to-safe; render official/marginal-note columns.
- `LeaveDesk`: render three visible tiers with manager reply and follow-up, then a leave-notice share card.
- `WeeklyDesk`: render report, highlights, and plan as individually copyable sections; share a shortened “本周辛苦证明”.

- [ ] **Step 5: Run component tests and verify no desk leaks original private input to a share payload.**

Run: `npm test -- components/stalls/DocumentDesk.test.tsx && npm test`

Expected: PASS; all four output contracts display and every share payload is privacy-safe.

- [ ] **Step 6: Commit the document stalls.**

```bash
git add app/stall components/stalls lib/market/catalog.ts
git commit -m "feat: add workplace document stalls"
```

## Task 9: Migrate Existing AI Stalls and Complete Ten-Stall Coverage

**Files:**
- Modify: `components/ToyChat.tsx`
- Modify: `app/duilian/page.tsx`
- Modify: `app/ticket/page.tsx`
- Modify: `app/petition/page.tsx`
- Modify: `app/api/chat/route.ts`
- Modify: `lib/prompts.ts`
- Create: `components/stalls/ChatStallFrame.tsx`
- Create: `components/stalls/ChatStallFrame.test.tsx`
- Create: `app/stall/duilian/page.tsx`
- Create: `app/stall/today-ticket/page.tsx`
- Create: `app/stall/petition-office/page.tsx`

**Interfaces:**
- Consumes: market shell, `MetricBeacon`, and `ShareActions`.
- Produces a chat frame usable by the three conversational launch stalls while preserving legacy paths as redirects.

- [ ] **Step 1: Write failing chat-stall tests.**

```tsx
it("records a generation only after an assistant reply completes", async () => {
  render(<ChatStallFrame toy="duilian" />);
  await userEvent.type(screen.getByRole("textbox"), "春风");
  await userEvent.click(screen.getByRole("button", { name: "递上去" }));
  expect(recordGeneration).not.toHaveBeenCalled();
  await screen.findByText(/对得工整/);
  expect(recordGeneration).toHaveBeenCalledWith("duilian");
});
```

- [ ] **Step 2: Run tests and confirm the frame is absent.**

Run: `npm test -- components/stalls/ChatStallFrame.test.tsx`

Expected: FAIL with missing component/export errors.

- [ ] **Step 3: Extract `ChatStallFrame` from `ToyChat`.**

Keep the existing AI SDK streaming behavior, opening greetings, input guard, stop action, and retry behavior. Move its market chrome, generation metric write, share-last-answer action, and explicit “本摊临时歇业” error copy into the new frame.

- [ ] **Step 4: Move routes without breaking old links.**

The old `/duilian`, `/ticket`, and `/petition` pages must redirect to their stable market slugs. Add the three market pages and preserve their existing personality prompts. Update `app/api/chat/route.ts` to validate the three supported conversational slugs rather than a page-only toy key.

- [ ] **Step 5: Verify the launch catalog has exactly ten open stalls.**

```ts
it("seeds exactly ten unique launch slugs", () => {
  expect(LAUNCH_STALLS).toHaveLength(10);
  expect(new Set(LAUNCH_STALLS.map((stall) => stall.slug)).size).toBe(10);
  expect(LAUNCH_STALLS.every((stall) => stall.status === "open")).toBe(true);
});
```

- [ ] **Step 6: Run tests and smoke test all legacy routes.**

Run: `npm test -- components/stalls/ChatStallFrame.test.tsx lib/market/catalog.test.ts && npm test`

Manual check: visit `/duilian`, `/ticket`, and `/petition`; confirm each reaches its market page and can return to the market home.

- [ ] **Step 7: Commit chat migration and catalog completion.**

```bash
git add app components/ToyChat.tsx lib/prompts.ts lib/market
git commit -m "feat: migrate existing chats into market stalls"
```

## Task 10: Build the Hidden Admin Dashboard and Sortable Stall Management

**Files:**
- Modify: `package.json`
- Create: `app/_9527/neibu/layout.tsx`
- Create: `app/_9527/neibu/page.tsx`
- Create: `components/admin/AdminLogin.tsx`
- Create: `components/admin/AdminDashboard.tsx`
- Create: `components/admin/StallEditor.tsx`
- Create: `components/admin/SortableDistrict.tsx`
- Create: `components/admin/MetricsPanel.tsx`
- Create: `components/admin/AdminDashboard.test.tsx`
- Modify: `app/robots.ts`

**Interfaces:**
- Consumes: all admin APIs from Task 3.
- Produces a protected non-indexed dashboard that can create generic AI stalls, edit existing stalls, reorder by district, change status, and view daily metrics.

- [ ] **Step 1: Write failing dashboard tests.**

```tsx
it("sends the ordered slugs after a same-district drag reorder", async () => {
  render(<SortableDistrict district={district} stalls={stalls} />);
  await reorder("huafu-badge", "job-draw");
  expect(fetch).toHaveBeenCalledWith(
    "/api/admin/stalls/reorder",
    expect.objectContaining({ body: JSON.stringify({ districtSlug: "entry", slugs: ["job-draw", "huafu-badge"] }) }),
  );
});

it("never renders an admin navigation link in the public MarketShell", () => {
  render(<MarketShell districts={districts} />);
  expect(screen.queryByText(/内务/)).not.toBeInTheDocument();
});
```

- [ ] **Step 2: Run tests and confirm the dashboard components are missing.**

Run: `npm test -- components/admin/AdminDashboard.test.tsx`

Expected: FAIL with missing component/export errors.

- [ ] **Step 3: Add `@dnd-kit/core` and `@dnd-kit/sortable`.**

Configure pointer and touch sensors. Reordering must send only the final ordered slug list after drag end; it must optimistically render and restore prior order when the API rejects.

- [ ] **Step 4: Implement login and dashboard states.**

Use a server component page to check the admin session. Render `AdminLogin` only without a session; render `AdminDashboard` only with a verified session. The layout exports `robots: { index: false, follow: false }`; `app/robots.ts` also disallows `/_9527/`.

- [ ] **Step 5: Implement stall editor validation.**

The editor must require code, slug, street, name, description, status, and type. For `generic_ai`, require at least one input field, one output section, a prompt, and a selected share template. Existing custom stalls show placement/status/config fields but do not expose their server prompt text.

- [ ] **Step 6: Implement the metrics panel.**

Render today total visits/generations/image saves, 7/30-day series, and per-stall generation/share rankings from aggregate endpoint data. Do not render raw requests, source text, names, IPs, or chat transcripts.

- [ ] **Step 7: Run dashboard tests and manual touch checks.**

Run: `npm test -- components/admin/AdminDashboard.test.tsx && npm test`

Manual check: at 375px width, long-press a stall, reorder within a street, refresh, and confirm position persisted.

- [ ] **Step 8: Commit admin UI.**

```bash
git add package.json package-lock.json app/_9527 app/robots.ts components/admin
git commit -m "feat: add hidden market admin dashboard"
```

## Task 11: Verify Vercel Readiness, Accessibility, and Documentation

**Files:**
- Modify: `README.md`
- Create: `.env.example`
- Create: `docs/deployment/vercel-market.md`
- Create: `app/not-found.tsx`
- Create: `app/stall/[slug]/not-found.tsx`
- Create: `tests/market-smoke.test.ts`

**Interfaces:**
- Consumes: all public routes, admin routes, environment names, and migration command.
- Produces deploy instructions and a repeatable pre-deploy smoke suite.

- [ ] **Step 1: Write failing environment validation tests.**

```ts
it("lists every required production variable without exposing a value", () => {
  expect(requiredProductionEnv()).toEqual([
    "OPENAI_BASE_URL",
    "OPENAI_API_KEY",
    "MODEL_NAME",
    "DATABASE_URL",
    "ADMIN_PASSWORD_HASH",
    "ADMIN_SESSION_SECRET",
  ]);
});
```

- [ ] **Step 2: Run tests and confirm the validation module is absent.**

Run: `npm test -- tests/market-smoke.test.ts`

Expected: FAIL with missing module/export errors.

- [ ] **Step 3: Implement startup-safe environment validation and public missing pages.**

Validate database/admin configuration only when the relevant server routes run, so a database outage does not prevent static market shell rendering. Missing/closed stalls render an in-world “铺面暂未营业” page with a return-to-market link.

- [ ] **Step 4: Write deployment documentation.**

Document these exact Vercel steps:

1. Create Neon in Vercel Marketplace and attach it to Production and Preview.
2. Add `OPENAI_BASE_URL`, `OPENAI_API_KEY`, `MODEL_NAME`, `ADMIN_PASSWORD_HASH`, and `ADMIN_SESSION_SECRET` for Production.
3. Pull environment variables locally and run `npm run db:migrate` once.
4. Push to `main`, wait for Vercel build success, then sign into `/_9527/neibu`.
5. Test one AI stall, one local stall, image saving on a real phone, and one admin reorder.

`.env.example` must contain keys only and no usable secrets.

- [ ] **Step 5: Run full verification.**

Run: `npm test && npm run lint && npm run build`

Expected: all tests pass, lint has no errors, and Next production build exits 0. If existing lint violations remain, fix them in the files reported before declaring the work deployable.

- [ ] **Step 6: Perform the manual acceptance checklist.**

- Visit all ten public stalls on desktop and 375px mobile width.
- Confirm every successful result increments the correct generation counter once.
- Confirm a failed AI request preserves inputs and offers retry.
- Confirm an unauthenticated request to every `/api/admin/*` write route returns 401.
- Confirm save/share fallback does not surface an exception when native sharing is unavailable.
- Confirm no public page or API response includes admin session data, AI keys, database URLs, or user input logs.

- [ ] **Step 7: Commit deployment readiness.**

```bash
git add README.md .env.example docs/deployment app/not-found.tsx app/stall/[slug]/not-found.tsx tests
git commit -m "docs: add market deployment and verification guide"
```

## Plan Self-Review

- Spec coverage: Tasks 2-4 implement districts, unlimited configurable stalls, position management data, aggregate statistics, and Vercel persistence. Tasks 3 and 10 implement the hidden password-protected admin. Tasks 5-9 implement the mobile-safe share flow and all ten public stalls. Task 11 covers required environment setup and deployment verification.
- Privacy coverage: Tasks 2, 4, 5, 8, 10, and 11 explicitly prevent prompt, image, IP, and session leakage.
- Mobile coverage: Tasks 4, 5, 7, 8, 10, and 11 require narrow-width layout, touch sorting, Canvas-only export, and native-share fallback behavior.
- Type consistency: `Stall`, `MetricEvent`, `StallResult`, `recordMetric`, `generateStallResult`, and the admin API contracts are defined before use by later tasks.
- Placeholder scan: no deferred implementation markers or unspecified error-handling steps remain.
