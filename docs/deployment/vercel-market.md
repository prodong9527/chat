# 华府后街 Vercel 上线清单

## 1. 连接数据库

在 Vercel 项目的 Marketplace 添加 Neon，并将集成附加到 Production 和 Preview。它会注入 `DATABASE_URL`；不要复制该值到 GitHub。

## 2. 配置 Production 环境变量

在 Project Settings -> Environment Variables 添加：

- `OPENAI_BASE_URL`
- `OPENAI_API_KEY`
- `MODEL_NAME`
- `DATABASE_URL`（通常由 Neon 集成提供）
- `ADMIN_PASSWORD_HASH`
- `ADMIN_SESSION_SECRET`

生成管理口令哈希：

```bash
node -e "const c=require('crypto');const salt=c.randomBytes(16).toString('base64');c.scrypt(process.argv[1],salt,64,(e,k)=>console.log('scrypt$'+salt+'$'+k.toString('base64')))" '你的后台口令'
```

`ADMIN_SESSION_SECRET` 使用一段随机的长字符串，例如密码管理器生成的 32 字节随机值。

## 3. 仅执行一次数据库迁移

在本地项目目录执行：

```bash
vercel env pull .env.local
npm run db:migrate
```

迁移不要配置成 Vercel Build Command，避免预览或并发构建重复执行。

## 4. 发布与验收

推送 `main` 后等待 Vercel 构建成功，再检查：

1. 首页展示十个初始摊位。
2. 任意一个 AI 摊位和工位玄学铺可用。
3. 手机端“保存图片”可下载 PNG；不支持原生分享时不会报错。
4. 用 `/_9527/neibu` 登录后可以新增、暂停、调整摊位位置。
5. 未登录访问后台接口会得到 401。
