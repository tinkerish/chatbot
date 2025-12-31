import { useEffect, useRef } from "react";
import type { ChatMessage } from "../../types/chat";
import MessageBubble from "./MessageBubble";

interface Props {
  messages: ChatMessage[];
}

export default function MessageList({ messages }: Props) {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-gray-100">
      {messages.length === 0 && (
        <div className="text-center text-sm text-gray-400 mt-10">
          Start the conversation by asking a question 👋
        </div>
      )}

      {messages.map((msg) => (
        <MessageBubble key={msg.id} message={msg} />
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
