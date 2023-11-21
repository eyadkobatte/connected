"use server";

import { createResponseInPrompt } from "@/app/domains/response";
import { uploadFileToBucket } from "@/app/lib/file-storage";
import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";

export async function createResponse(
  promptId: string,
  createdBy: string,
  formData: FormData
) {
  const text = formData.get("text")?.toString() || "";
  const files = formData.getAll("file") as File[];

  if (!text || files.length === 0) {
    return;
  }

  const imagePaths = await Promise.all(
    files.map((file) => {
      const fileExt = file.name.split(".").pop();
      const filePath = `${randomUUID()}-${Math.random()}.${fileExt}`;

      return uploadFileToBucket(filePath, file);
    })
  );

  await createResponseInPrompt(promptId, text, imagePaths.join(","), createdBy);
  revalidatePath(`/room/[connectionId/${promptId}`, "page");
}
