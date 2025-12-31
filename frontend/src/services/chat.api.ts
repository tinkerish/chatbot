import type { ChatResponse } from "../types/chat";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function sendMessageApi(
  message: string,
  sessionId?: string
): Promise<ChatResponse> {
  const res = await fetch(`${API_BASE_URL}/chat/message`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message,
      sessionId,
    }),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => null);
    throw new Error(error?.error || "Request failed");
  }

  return res.json();
}
