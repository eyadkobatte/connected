import { randomUUID } from "crypto";
import { prisma } from "./_prisma";

export async function createResponseInPrompt(
  promptId: string,
  text: string,
  imagePaths: string,
  createdById: string
) {
  const responseId = randomUUID();
  return prisma.response.create({
    data: {
      createdById,
      responseId,
      text,
      imagePaths,
      createdAt: new Date(),
      promptId,
    },
  });
}
