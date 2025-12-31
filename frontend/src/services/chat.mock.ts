import type { ChatResponse } from "../types/chat";

function sleep(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

export async function sendMessageMock(
  message: string,
  sessionId?: string
): Promise<ChatResponse> {
  await sleep(800); 

  const lower = message.toLowerCase();

  let reply = "Thanks for reaching out! How can I help you today?";

  if (lower.includes("ship")) {
    reply = "Yes, we ship worldwide. Delivery to the USA takes 5–7 business days.";
  } else if (lower.includes("return")) {
    reply = "We offer a 30-day return policy on unused items in original packaging.";
  } else if (lower.includes("support")) {
    reply = "Our support hours are Monday to Friday, 9am–6pm IST.";
  }

  return {
    reply,
    sessionId: sessionId ?? crypto.randomUUID(),
  };
}
