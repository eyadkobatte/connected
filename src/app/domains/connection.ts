import { PrismaClient } from "@prisma/client";
import { deleteConnectionLinkDB } from "./connection-link";

const prisma = new PrismaClient();

export async function getConnectionsForUser(userId: string) {
  return prisma.connection.findMany({
    where: { OR: [{ userIdOne: userId }, { userIdTwo: userId }] },
  });
}

export async function getConnectionById(connectionId: string) {
  return prisma.connection.findFirst({
    where: { connectionId },
  });
}

export async function createConnectionBetweenUsers(
  connectionId: string,
  userIdOne: string,
  userIdTwo: string
) {
  await deleteConnectionLinkDB(connectionId);
  return prisma.connection.create({
    data: {
      connectionId,
      userIdOne,
      userIdTwo,
    },
  });
}
