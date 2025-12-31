import {
  createMessage,
  getMessagesByConversation,
  Sender,
} from "../repositories/message.repo";

export async function saveMessage(
  conversationId: string,
  sender: Sender,
  text: string
) {
  return createMessage(conversationId, sender, text);
}

export async function getConversationHistory(
  conversationId: string
) {
  return getMessagesByConversation(conversationId);
}
