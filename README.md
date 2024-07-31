# duckduckgo-ai-chat

English | [中文](./README_CN.md)

duckduckgo-ai-chat provides the [Duckduckgo AI Chat](https://duckduckgo.com/aichat) API for JavaScript/TypeScript, which can use gpt-4o-mini for free.

## Install

```sh
npm install duckduckgo-ai-chat
# or
pnpm install duckduckgo-ai-chat
# or
yarn add duckduckgo-ai-chat
# or
bun add duckduckgo-ai-chat
```

## Usage example

```javascript
import { initChat } from "duckduckgo-ai-chat";

// Initialize, optional models are gpt-4o-mini, claude-3-haiku-20240307, meta-llama/Llama-3-70b-chat-hf, mistralai/Mixtral-8x7B-Instruct-v0.1
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
