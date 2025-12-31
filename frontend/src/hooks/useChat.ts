import { useState } from "react";
import type { ChatMessage } from "../types/chat";
import { sendMessageMock } from "../services/chat.mock";
import { sendMessageApi } from "../services/chat.api";

const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";

function sendMessageService(message: string, sessionId?: string) {
  return USE_MOCK
    ? sendMessageMock(message, sessionId)
    : sendMessageApi(message, sessionId);
}

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      sender: "ai",
      text: "Hi! 👋 How can I help you today?",
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | undefined>(
    localStorage.getItem("sessionId") ?? undefined
  );

  async function sendMessage(text: string) {
    if (!text.trim() || loading) return;

    setError(null);
    setLoading(true);

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      sender: "user",
      text,
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      const res = await sendMessageService(text, sessionId);

      setSessionId(res.sessionId);
      localStorage.setItem("sessionId", res.sessionId);

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          sender: "ai",
          text: res.reply,
        },
      ]);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return {
    messages,
    loading,
    error,
    sendMessage,
  };
}
