import { expect, test, describe } from "bun:test";

import { initChat } from "./index.ts";

describe("Init chat", () => {
  test("get vqd", async () => {
    const chat = await initChat("gpt-4o-mini");
    expect(chat !== null).toBe(true);
  });
});

describe("Fetch", () => {
  test("fetchFull", async () => {
    const chat = await initChat("gpt-4o-mini");
    const message = await chat.fetchFull("Hello");
    console.log(message);
  });

  test("fetchStream", async () => {
    const chat = await initChat("gpt-4o-mini");
    const stream = chat.fetchStream("Hello");
    let text = "Hello";
    for await (let data of stream) {
      text += data;
    }
    console.log(text);
  });

  test("redo", async () => {
    const chat = await initChat("gpt-4o-mini");
    await chat.fetchFull("Hello");

    let message = await chat.fetchFull(
      "Recommend a famous place for me, please.",
    );
    console.log(message, chat.messages);

    chat.redo();
    message = await chat.fetchFull("Recommend a famous place for me, please.");
    console.log(message, chat.messages);
  });

  test("Chat", async () => {
    const chat = await initChat("gpt-4o-mini");

    let message = await chat.fetchFull("Hello");
    console.log(message);

    message = await chat.fetchFull(
      "Your name is TypeScript. What's your name?",
    );
    console.log(message);

    message = await chat.fetchFull("Assistant, give me a cup of coffee.");
    console.log(message);

    message = await chat.fetchFull("Yes, I need.");
    console.log(message);
  });
});
