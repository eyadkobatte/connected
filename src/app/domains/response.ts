import { randomUUID } from "crypto";
import { prisma } from "./_prisma";

export async function createResponseInPrompt(
  promptId: string,
  text: string,
  createdById: string
) {
  const responseId = randomUUID();
  return prisma.response.create({
    data: {
      createdById,
      responseId,
      text,
      createdAt: new Date(),
      promptId,
    },
  });
}
