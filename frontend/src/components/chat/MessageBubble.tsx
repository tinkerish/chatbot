import type { ChatMessage } from "../../types/chat";

interface Props {
  message: ChatMessage;
}

export default function MessageBubble({ message }: Props) {
  const isUser = message.sender === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`
    max-w-[75%] px-4 py-2 rounded-2xl text-sm leading-relaxed
    whitespace-pre-wrap wrap-break-word
    ${
      isUser
        ? "bg-blue-600 text-white rounded-br-sm"
        : "bg-white text-gray-800 rounded-bl-sm shadow-sm"
    }
  `}
      >
        {message.text}
      </div>
    </div>
  );
}
