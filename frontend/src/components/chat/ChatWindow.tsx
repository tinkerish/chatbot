import { useChat } from "../../hooks/useChat";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import TypingIndicator from "./TypingIndicator";

export default function ChatWindow() {
  const { messages, loading, error, sendMessage } = useChat();

  return (
    <div className="w-full max-w-md h-150 bg-white rounded-xl shadow-lg flex flex-col overflow-hidden">
      <div className="px-4 py-3 border-b bg-gray-50">
        <h2 className="font-semibold text-gray-800">Support Chat</h2>
        <p className="text-xs text-gray-500">
          We usually reply within a few seconds
        </p>
      </div>

      <MessageList messages={messages} />

      {loading && <TypingIndicator />}

      {error && (
        <div className="px-4 py-2 text-sm text-red-600 bg-red-50">
          {error}
        </div>
      )}

      <ChatInput onSend={sendMessage} disabled={loading} />
    </div>
  );
}
