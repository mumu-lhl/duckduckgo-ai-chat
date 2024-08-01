import { events } from "@lukeed/fetch-event-stream";

const STATUS_URL = "https://duckduckgo.com/duckchat/v1/status";
const CHAT_URL = "https://duckduckgo.com/duckchat/v1/chat";
const STATUS_HEADERS = { "x-vqd-accept": "1" };

type Model =
  | "gpt-4o-mini"
  | "claude-3-haiku-20240307"
  | "meta-llama/Llama-3-70b-chat-hf"
  | "mistralai/Mixtral-8x7B-Instruct-v0.1";

type Messages = { content: string; role: "user" | "assistant" }[];

type ChatPayload = {
  model: Model;
  messages: Messages;
};

class Chat {
  oldVqd: string;
  newVqd: string;
  model: Model;
  messages: Messages;

  constructor(vqd: string, model: Model) {
    this.oldVqd = vqd;
    this.newVqd = vqd;
    this.model = model;
    this.messages = [];
  }

  async fetch(content: string) {
    this.messages.push({ content, role: "user" });
    const payload: ChatPayload = {
      model: this.model,
      messages: this.messages,
    };
    await fetch(STATUS_URL);
    const message = await fetch(CHAT_URL, {
      headers: { "x-vqd-4": this.newVqd, "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(payload),
    });

    if (!message.ok) {
      throw new Error(
        `${message.status}: Failed to send message. ${message.statusText}`,
      );
    } else {
      return message;
    }
  }

  async fetchFull(content: string): Promise<string> {
    const message = await this.fetch(content);
    let text = "";
    const stream = events(message);
    for await (const event of stream) {
      if (event.data) {
        const messageData = JSON.parse(event.data);
        if (messageData["message"] == undefined) {
          break;
        } else {
          text += messageData["message"];
        }
      }
    }

    const newVqd = message.headers.get("x-vqd-4") as string;
    this.oldVqd = this.newVqd;
    this.newVqd = newVqd;

    this.messages.push({ content: text, role: "assistant" });

    return text;
  }

  async *fetchStream(content: string): AsyncGenerator<string, void> {
    const message = await this.fetch(content);
    const stream = events(message);
    let text = "";
    for await (const event of stream) {
      if (event.data) {
        const messageData = JSON.parse(event.data);
        if (messageData["message"] == undefined) {
          break;
        } else {
          const data = messageData["message"];
          text += data;
          yield data;
        }
      }
    }

    const newVqd = message.headers.get("x-vqd-4") as string;
    this.oldVqd = newVqd;
    this.newVqd = newVqd;

    this.messages.push({ content: text, role: "assistant" });
  }

  redo() {
    this.newVqd = this.oldVqd;
    this.messages.pop();
    this.messages.pop();
  }
}

async function initChat(model: Model): Promise<Chat> {
  const status = await fetch(STATUS_URL, { headers: STATUS_HEADERS });
  const vqd = status.headers.get("x-vqd-4");
  if (!vqd) {
    throw new Error(
      `${status.status}: Failed to initialize chat. ${status.statusText}`,
    );
  }
  return new Chat(vqd, model);
}

export { initChat };
