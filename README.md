# duckduckgo-ai-chat

![JSR Version](https://img.shields.io/jsr/v/%40mumulhl/duckduckgo-ai-chat)

English | [中文](./README_CN.md)

duckduckgo-ai-chat provides the [Duckduckgo AI Chat](https://duckduckgo.com/aichat) API for JavaScript/TypeScript, which can use gpt-4o-mini for free.

## Install

```sh
npx jsr add @mumulhl/duckduckgo-ai-chat
# or
pnpm dlx jsr add @mumulhl/duckduckgo-ai-chat
# or
yarn dlx jsr add @mumulhl/duckduckgo-ai-chat
# or
deno add @mumulhl/duckduckgo-ai-chat
```

## Usage example

```javascript
import { initChat } from "@mumulhl/duckduckgo-ai-chat";

// Initialize, optional models are gpt-4o-mini, claude-3-haiku, llama, mixtral
const chat = await initChat("gpt-4o-mini");

// Fetch the full reply in one go
let message = await chat.fetchFull("Hello");
console.log(message)

// Redo
chat.redo()
message = await chat.fetchFull("Hello");
console.log(message)

// Fetch the streamed reply
const stream = chat.fetchStream("Hello");
for await (let data of stream) {
  console.log(data)
}
```
