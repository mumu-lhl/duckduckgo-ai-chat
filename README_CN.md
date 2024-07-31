# duckduckgo-ai-chat

[English](./README.md) | 中文

duckduckgo-ai-chat 为 JavaScript/TypeScript 提供 [Duckduckgo AI Chat](https://duckduckgo.com/aichat) API，可以免费使用 gpt4-4o-mini。

## 安装

```sh
npm install duckduckgo-ai-chat
# or
pnpm install duckduckgo-ai-chat
# or
yarn add duckduckgo-ai-chat
# or
bun add duckduckgo-ai-chat
```

## 使用示例

```javascript
import { initChat } from "duckduckgo-ai-chat";

// 初始化，可选模型有 gpt-4o-mini, claude-3-haiku-20240307, meta-llama/Llama-3-70b-chat-hf, mistralai/Mixtral-8x7B-Instruct-v0.1
const chat = await initChat("gpt-4o-mini");

// 一次性获取完整的回复
const message = await chat.fetchFull("Hello");
console.log(message)

// 获取流式回复
const stream = chat.fetchStream("Hello");
for await (let data of stream) {
  console.log(data)
}
```
