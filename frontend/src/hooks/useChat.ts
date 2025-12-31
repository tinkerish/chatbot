import { useEffect, useState } from "react";
import type { ChatMessage } from "../types/chat";
import { sendMessageMock } from "../services/chat.mock";
import { fetchChatHistory, sendMessageApi } from "../services/chat.api";

const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";

function sendMessageService(message: string, sessionId?: string) {
  return USE_MOCK
    ? sendMessageMock(message, sessionId)
    : sendMessageApi(message, sessionId);
}

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | undefined>(
    localStorage.getItem("sessionId") ?? undefined
  );
  const [isLoadingHistory, setIsLoadingHistory] = useState(Boolean(sessionId));

  useEffect(() => {
    if (!sessionId) {
      setIsLoadingHistory(false);
      return;
    }

    async function loadHistory() {
      if (!sessionId) {
        setIsLoadingHistory(false);
        return;
      }
      try {
        const history = await fetchChatHistory(sessionId);

        if (history.length > 0) {
          setMessages(
            history.map((m: { id: string; sender: string; text: string }) => ({
              id: m.id,
              sender: m.sender,
              text: m.text,
            }))
          );
        }
      } catch (err) {
        console.error("Failed to load history", err);
      } finally {
        setIsLoadingHistory(false);
      }
    }

    loadHistory();
  }, [sessionId]);

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
    isLoadingHistory,
  };
}
