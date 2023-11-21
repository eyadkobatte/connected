"use server";

import { createResponseInPrompt } from "@/app/domains/response";
import { revalidatePath } from "next/cache";

export async function createResponse(
  promptId: string,
  createdBy: string,
  formData: FormData
) {
  const text = formData.get("text");

  if (!text) {
    return;
  }
  await createResponseInPrompt(promptId, text.toString(), createdBy);
  revalidatePath(`/room/[connectionId/${promptId}`, "page");
}
