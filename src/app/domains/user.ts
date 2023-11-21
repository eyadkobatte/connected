import { prisma } from "./_prisma";

export async function createUserInDB(
  id: string,
  firstName: string,
  lastName: string,
  imageUrl: string,
  email: string
) {
  return prisma.user.upsert({
    create: {
      id,
      firstName,
      lastName,
      email,
      imageUrl,
    },
    where: {
      id,
    },
    update: {
      firstName,
      lastName,
      imageUrl,
      email,
    },
  });
}
