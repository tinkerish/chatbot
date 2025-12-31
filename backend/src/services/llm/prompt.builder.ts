type LLMMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

const STORE_CONTEXT = `
You are a helpful support agent for a small e-commerce store.

Store policies:
- Shipping: We ship worldwide. US delivery takes 5–7 business days.
- Returns: 30-day return policy. Items must be unused and in original packaging.
- Support hours: Monday to Friday, 9am–6pm IST.

Answer clearly and concisely. If you don't know something, say so politely.
`;

export function buildPrompt(
  history: { sender: string; text: string }[],
  userMessage: string
): LLMMessage[] {
  const messages: LLMMessage[] = [
    {
      role: "system",
      content: STORE_CONTEXT,
    },
  ];

  for (const msg of history) {
    messages.push({
      role: msg.sender === "user" ? "user" : "assistant",
      content: msg.text,
    });
  }

  messages.push({
    role: "user",
    content: userMessage,
  });

  return messages;
}
