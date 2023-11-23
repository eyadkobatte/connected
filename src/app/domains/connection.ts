import { prisma } from "./_prisma";
import { deleteConnectionLinkDB } from "./connection-link";

export async function getConnectionsForUser(userId: string) {
  return prisma.connection.findMany({
    where: { OR: [{ createdUserId: userId }, { acceptedUserId: userId }] },
    include: { acceptedUser: true, createdUser: true },
  });
}

export async function getConnectionById(connectionId: string) {
  return prisma.connection.findFirst({
    where: { connectionId },
    include: {
      createdUser: true,
      acceptedUser: true,
    },
  });
}

export async function createConnectionBetweenUsers(
  connectionId: string,
  createdUserId: string,
  acceptedUserId: string
) {
  await deleteConnectionLinkDB(connectionId);
  return prisma.connection.create({
    data: {
      connectionId,
      createdUserId,
      acceptedUserId,
    },
  });
}
