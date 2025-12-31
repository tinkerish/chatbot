import Groq from "groq-sdk";
import { env } from "../../config/env";
import { buildPrompt } from "./prompt.builder";

const groq = new Groq({
  apiKey: env.groqKey,
});

export async function generateAIReply(
  history: { sender: string; text: string }[],
  userMessage: string
): Promise<string> {
  try {
    const messages = buildPrompt(history, userMessage);

    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages,
      temperature: 0.3,
      max_tokens: 300,
    });

    return (
      response.choices[0]?.message?.content ||
      "Sorry, I couldn't generate a response."
    );
  } catch (error: any) {
    console.error("Groq LLM error:", error);

    if (error?.status === 429) {
      return "I'm currently receiving too many requests. Please try again shortly.";
    }

    return "Sorry, I'm having trouble responding right now.";
  }
}
