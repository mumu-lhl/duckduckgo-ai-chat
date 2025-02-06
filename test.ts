// deno-lint-ignore-file no-explicit-any
import { initChat } from "./index.ts";

async function test(name: string, fn: any) {
  console.log(name);
  await fn();
  console.log();
}

await test("Init chat", async () => {
  await initChat("o3-mini");
});

await test("fetchFull", async () => {
  const chat = await initChat("o3-mini");
  const message = await chat.fetchFull("Who are you?");
  console.log(message);
});

await test("fetchStream", async () => {
  const chat = await initChat("o3-mini");
  const stream = chat.fetchStream("Who are you?");
  let text = "";
  for await (const data of stream) {
    text += data;
  }
  console.log(text);
});

await test("redo", async () => {
  const chat = await initChat("o3-mini");
  await chat.fetchFull("Hello");

  let message = await chat.fetchFull(
    "Recommend a famous place for me, please.",
  );
  console.log(message, chat.messages);

  chat.redo();
  message = await chat.fetchFull("Recommend a famous place for me, please.");
  console.log(message, chat.messages);
});

await test("Chat", async () => {
  const chat = await initChat("o3-mini");

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
