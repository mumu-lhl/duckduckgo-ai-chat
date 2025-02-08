/**
 * A module provides the [Duckduckgo AI Chat](https://duckduckgo.com/aichat) API for JavaScript/TypeScript, which can use o3-mini for free.
 * @example
 * ```ts
 * import { initChat } from "@mumulhl/duckduckgo-ai-chat";
 *
 * // Initialize, optional models are gpt-4o-mini, claude-3-haiku, llama, mixtral, o3-mini
 * const chat = await initChat("o3-mini");
 *
 * // Fetch the full reply in one go
 * let message = await chat.fetchFull("Hello");
 * console.log(message)
 *
 * // Redo
 * chat.redo()
 * message = await chat.fetchFull("Hello");
 * console.log(message)
 *
 * // Fetch the streamed reply
 * const stream = chat.fetchStream("Hello");
 * for await (let data of stream) {
 *   console.log(data)
 * }
 * ```

 * @module
 */
export * from "./index.ts";
