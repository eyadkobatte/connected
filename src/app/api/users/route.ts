import { createUserInDB } from "@/app/domains/user";
import type { WebhookEvent } from "@clerk/clerk-sdk-node";
import { Webhook } from "svix";
import { headers } from "next/headers";

export async function GET(request: Request) {
  return Response.json({ ok: true });
}

export async function POST(request: Request) {
  const body = await request.json();
  const payload = body as WebhookEvent;
  const headersList = headers();

  switch (payload.type) {
    case "user.created":
    case "user.updated":
      handleUserEvent(payload, headersList);
      break;
    default:
      console.log("Received webhook for user", payload);
      break;
  }

  return Response.json({ ok: true });
}

async function handleUserEvent(payload: WebhookEvent, headers: Headers) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  const svix_id = headers.get("svix-id");
  const svix_timestamp = headers.get("svix-timestamp");
  const svix_signature = headers.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    throw Error("Invalid headers");
  }

  try {
    new Webhook(WEBHOOK_SECRET).verify(JSON.stringify(payload), {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    throw Error("Error while validating webhook payload");
  }

  if (payload.type === "user.created") {
    const { first_name, last_name, image_url, id, primary_email_address_id } =
      payload.data;
    const emailAddress =
      payload.data.email_addresses.find(
        (email) => email.id === primary_email_address_id
      )?.email_address || payload.data.email_addresses[0].email_address;
    await createUserInDB(id, first_name, last_name, image_url, emailAddress);
    console.log("User created in DB", first_name, id);
  }
}
