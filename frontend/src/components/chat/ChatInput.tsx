import { useState } from "react";
const MAX_LENGTH = 500;
interface Props {
  onSend: (text: string) => void;
  disabled?: boolean;
}

export default function ChatInput({ onSend, disabled }: Props) {
  const [text, setText] = useState("");

  function handleSend() {
    if (!text.trim()) return;
    onSend(text);
    setText("");
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="p-3 border-t bg-white">
      <div className="flex items-center gap-2">
        <textarea
          rows={1}
          maxLength={MAX_LENGTH}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder="Type your message…"
          className="
            flex-1 resize-none rounded-lg border px-3 py-2 text-sm
            focus:outline-none focus:ring-2 focus:ring-blue-500
            disabled:bg-gray-100
          "
        />
        <div className="text-xs text-gray-400 text-right mt-1">
          {text.length}/{MAX_LENGTH}
        </div>

        <button
          onClick={handleSend}
          disabled={disabled || !text.trim()}
          className="
  px-4 py-2 rounded-lg text-sm font-medium
  bg-blue-600 text-white
  hover:bg-blue-700 transition
  disabled:opacity-50 disabled:cursor-not-allowed
"
        >
          Send
        </button>
      </div>
    </div>
  );
}
