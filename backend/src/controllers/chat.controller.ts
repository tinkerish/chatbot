import { Request, Response } from "express";
import { getOrCreateConversation } from "../services/conversation.service";
import {
  saveMessage,
  getConversationHistory,
} from "../services/message.service";
import { generateAIReply } from "../services/llm/llm.service";

export async function postChatMessage(req: Request, res: Response) {
  try {
    const { message, sessionId } = req.body;

    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({
        error: "Message must be a non-empty string",
      });
    }

    const trimmedMessage = message.trim();

    const conversation = await getOrCreateConversation(sessionId);

    await saveMessage(conversation.id, "user", trimmedMessage);

    const history = await getConversationHistory(conversation.id);

    const reply = await generateAIReply(history, trimmedMessage);

    await saveMessage(conversation.id, "ai", reply);

    return res.json({
      reply,
      sessionId: conversation.id,
    });
  } catch (err) {
    console.error("Chat controller error:", err);

    return res.status(500).json({
      error: "Something went wrong. Please try again later.",
    });
  }
}
