import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";

const prisma = new PrismaClient();

export async function getPromptsWithResponseCount(connectionId: string) {
  return prisma.prompt.findMany({
    where: {
      connectionId,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: { _count: true },
    take: 10,
  });
}

export async function getPromptsWithResponses(promptId: string) {
  return prisma.prompt.findFirst({
    where: { promptId },
    include: { Response: true },
  });
}

export async function createPromptInDB(
  title: string,
  body: string,
  connectionId: string,
  createdBy: string
) {
  const promptId = randomUUID();
  return prisma.prompt.create({
    data: {
      connectionId,
      createdBy,
      body,
      title,
      promptId,
      createdAt: new Date(),
    },
  });
}
