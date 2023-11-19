import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";
const prisma = new PrismaClient();

export async function getConnectionLinksForUser(fromUserId: string) {
  return prisma.connectionLink.findMany({ where: { fromUserId }, take: 10 });
}

export async function getConnectionLinkById(connectionId: string) {
  return prisma.connectionLink.findFirst({ where: { connectionId } });
}

export async function createConnectionLinkDB(fromUserId: string) {
  const connectionId = randomUUID();
  const connectionLink = prisma.connectionLink.create({
    data: { connectionId, fromUserId },
  });
  return connectionLink;
}

export async function deleteConnectionLinkDB(connectionId: string) {
  return prisma.connectionLink.delete({ where: { connectionId } });
}
