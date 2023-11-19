"use server";

import { createConnectionBetweenUsers } from "@/app/domains/connection";
import { deleteConnectionLinkDB } from "@/app/domains/connection-link";
import { redirect } from "next/navigation";

export async function handleConnectionRequest(formData: FormData) {
  const accept = formData.get("accept");
  const connectionId = formData.get("connectionId");
  const userIdOne = formData.get("userIdOne");
  const userIdTwo = formData.get("userIdTwo");
  if (!connectionId || !userIdOne || !userIdTwo) {
    return;
  }
  if (accept === "yes") {
    await createConnectionBetweenUsers(
      connectionId.toString(),
      userIdOne.toString(),
      userIdTwo.toString()
    );
  } else {
    await deleteConnectionLinkDB(connectionId.toString());
  }
  redirect("/home");
}
