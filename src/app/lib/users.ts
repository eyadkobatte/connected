"use server";

import { clerkClient } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";

const storage = new Map<string, User>();

export async function getUsers(...userIds: string[]) {
  const users = await clerkClient.users.getUserList({ userId: userIds });
  users.forEach((user) => {
    storage.set(user.id, user);
  });
  return users;
}
export async function getUser(userId: string) {
  if (storage.has(userId)) {
    return storage.get(userId);
  }
  const user = await getUsers(userId);
  return user[0];
}
