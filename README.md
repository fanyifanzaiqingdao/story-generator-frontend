# Story Generator Frontend

这是一个可直接运行的 Next.js + TypeScript 前端示例，包含：

- `app/story/page.tsx`
- `app/layout.tsx`
- `app/globals.css`
- `components/story/story-generator-form.tsx`
- `lib/story/options.ts`
- `lib/story/schema.ts`
- `lib/story/labels.ts`
- `lib/story/random.ts`
- `lib/story/prompt.ts`
- `package.json`
- `tsconfig.json`
- `next.config.ts`
- `postcss.config.mjs`

## 安装

```bash
pnpm install
```

## 启动开发环境

```bash
pnpm dev
```

打开：

```txt
http://localhost:3000/story
```

## 功能

- 结构化故事选项配置
- Zod 表单校验
- 单字段掷骰子
- 随机部分设定
- 一键随机整套故事
- Prompt 摘要与拼装函数

## 后续对接 API

你可以在提交时调用：

```ts
const payload = {
  form: data,
  prompt: buildStoryPrompt(data),
};
```

然后发给你的 `/api/story/generate` 接口。
