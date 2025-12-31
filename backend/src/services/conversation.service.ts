import {
  createConversation,
  findConversationById,
} from "../repositories/conversation.repo";

export async function getOrCreateConversation(
  sessionId?: string
) {
  if (sessionId) {
    const existing = await findConversationById(sessionId);
    if (existing) {
      return existing;
    }
  }

  return createConversation();
}
