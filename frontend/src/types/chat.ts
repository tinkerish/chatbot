export type Sender = "user" | "ai";

export interface ChatMessage {
  id: string;
  sender: Sender;
  text: string;
}

export interface ChatResponse {
  reply: string;
  sessionId: string;
}
