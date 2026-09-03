# 华府后街 · 9527 号便民摊位集市

一个周星驰 9527 梗的个人游乐场。9527 是《逃学威龙》里周星星的警号，也是《唐伯虎点秋香》里唐伯虎卖身进华府当仆人的编号。

本号承接对对子、递投名状、派工单、接状子，以及一切没有意义但有趣的业务。**不承接任何正经业务。**

## 首发摊位

| 路由 | 名称 | 类型 |
|---|---|---|
| `/badge` | 投名状摊 | 纯前端入府卡牌 |
| `/draw` | 入职抽签处 | 纯前端词库 |
| `/duilian` | 对穿肠擂台 | 接模型 |
| `/ticket` | 今日工单 | 接模型 |
| `/petition` | 华府信访办 | 接模型 |
| `/stall/desk-fortune` | 工位玄学铺 | 每日固定卦象 |
| `/stall/read-reply` | 已读乱回亭 | 接模型 |
| `/stall/blame-translation` | 甩锅翻译局 | 接模型 |
| `/stall/leave-request` | 请假事务所 | 接模型 |
| `/stall/weekly-report` | 周报膨胀厂 | 接模型 |

## 本地跑

```bash
npm install
npm run dev
```

打开 http://localhost:3000

## 模型配置

接模型的摊位需要一个 OpenAI 兼容端点。复制 `.env.example` 为 `.env.local`，填三项：

```
OPENAI_BASE_URL=https://你的端点/v1
OPENAI_API_KEY=你的密钥
MODEL_NAME=qwen3-27b
```

`OPENAI_BASE_URL`、`OPENAI_API_KEY` 和 `MODEL_NAME` 也适用于 Vercel 的环境变量设置。旧变量名 `MODEL_BASE_URL`、`MODEL_API_KEY`、`MODEL_ID` 仍可作为本地兼容配置使用。

不配也能跑：纯前端玩具正常用，接模型的玩具会显示歇工降级文案。

## Market database setup

Vercel Marketplace 的 Neon 集成会提供 `DATABASE_URL`。不要把该值提交到源码控制中。连接 Neon 后，由操作人员在本地显式执行一次迁移；不要把迁移放入 Vercel 的构建钩子，以免预览或并发部署重复执行。

```bash
vercel env pull .env.local
npm run db:migrate
```

## 部署

```bash
vercel deploy --prod
```

或推到 GitHub 后在 Vercel 控制台 Import。完整上线步骤、后台口令哈希生成和验收清单见 [`docs/deployment/vercel-market.md`](docs/deployment/vercel-market.md)。

## 技术栈

Next.js 16 · AI SDK 7 · Tailwind 4 · TypeScript
