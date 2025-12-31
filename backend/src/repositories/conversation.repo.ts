import { prisma } from "../db/prisma";

export async function createConversation() {
  return prisma.conversation.create({
    data: {},
  });
}

export async function findConversationById(id: string) {
  return prisma.conversation.findUnique({
    where: { id },
  });
}
