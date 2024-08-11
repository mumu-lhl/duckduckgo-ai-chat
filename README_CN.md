# duckduckgo-ai-chat

![JSR Version](https://img.shields.io/jsr/v/%40mumulhl/duckduckgo-ai-chat)

[English](./README.md) | 中文

duckduckgo-ai-chat 为 JavaScript/TypeScript 提供 [Duckduckgo AI Chat](https://duckduckgo.com/aichat) API，可以免费使用 gpt-4o-mini。

## 安装

```sh
npx jsr add @mumulhl/duckduckgo-ai-chat
# or
pnpm dlx jsr add @mumulhl/duckduckgo-ai-chat
# or
yarn dlx jsr add @mumulhl/duckduckgo-ai-chat
# or
deno add @mumulhl/duckduckgo-ai-chat
```

## 使用示例

```javascript
import { initChat } from "@mumulhl/duckduckgo-ai-chat";

// 初始化，可选模型有 gpt-4o-mini, claude-3-haiku, llama, mixtral
const chat = await initChat("gpt-4o-mini");

// 一次性获取完整的回复
let message = await chat.fetchFull("Hello");
console.log(message)

// 重新回复
chat.redo()
message = await chat.fetchFull("Hello");
console.log(message)

// 获取流式回复
const stream = chat.fetchStream("Hello");
for await (let data of stream) {
  console.log(data)
}
```
