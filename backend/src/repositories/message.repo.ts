import { prisma } from "../db/prisma";

export type Sender = "user" | "ai";

export async function createMessage(
  conversationId: string,
  sender: Sender,
  text: string
) {
  return prisma.message.create({
    data: {
      conversationId,
      sender,
      text,
    },
  });
}

export async function getMessagesByConversation(
  conversationId: string
) {
  return prisma.message.findMany({
    where: { conversationId },
    orderBy: { createdAt: "asc" },
  });
}
