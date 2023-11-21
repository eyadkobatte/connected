"use server";

import { createPromptInDB } from "@/app/domains/prompt";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createPrompt = async (
  connectionId: string,
  userId: string,
  formData: FormData
) => {
  const prompt = formData.get("prompt")?.toString();
  const details = formData.get("details")?.toString();

  if (!prompt || !details) {
    return;
  }

  await createPromptInDB(prompt, details, connectionId, userId);

  revalidatePath(`/room/${connectionId}`, "layout");
  redirect(`/room/${connectionId}`);
};
