"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createConnectionLinkDB } from "../domains/connection-link";

export const createConnectionLink = async (formData: FormData) => {
  const userId = formData.get("userId")?.toString();
  if (!userId) {
    return;
  }
  await createConnectionLinkDB(userId);
  revalidatePath("/home");
  redirect("/home");
};
