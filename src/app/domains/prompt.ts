import { randomUUID } from "crypto";
import { prisma } from "./_prisma";

export async function getPromptsWithResponseMetadata(
  connectionId: string,
  currentUserId: string
) {
  return prisma.prompt.findMany({
    where: {
      connectionId,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      _count: {
        select: {
          Response: {
            where: { createdById: currentUserId },
          },
        },
      },
      createdBy: true,
    },
    take: 10,
  });
}

export async function getPromptsWithResponses(promptId: string) {
  return prisma.prompt.findFirst({
    where: { promptId },
    include: {
      Response: {
        include: {
          createdBy: true,
        },
      },
    },
  });
}

export async function createPromptInDB(
  title: string,
  body: string,
  connectionId: string,
  createdById: string
) {
  const promptId = randomUUID();
  return prisma.prompt.create({
    data: {
      connectionId,
      createdById,
      body,
      title,
      promptId,
      createdAt: new Date(),
    },
  });
}
