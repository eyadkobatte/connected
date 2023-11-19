import { getConnectionLinkById } from "@/app/domains/connection-link";
import { auth, clerkClient } from "@clerk/nextjs";
import { handleConnectionRequest } from "./actions";
import { redirect } from "next/navigation";
import { getUser } from "@/app/lib/users";

export default async function AcceptConnectionId({
  params,
}: {
  params: { connectionId: string };
}) {
  const connectionLink = await getConnectionLinkById(params.connectionId);
  if (!connectionLink) {
    return <div>Invalid Connection Id</div>;
  }

  const { userId } = auth();
  if (!userId) {
    redirect("/");
  }

  if (connectionLink.fromUserId === userId) {
    return <div>You cannot accept your own connection!</div>;
  }

  const otherUser = await getUser(connectionLink.fromUserId);
  if (!otherUser) {
    return <div>Invalid Connection request</div>;
  }

  return (
    <section>
      Do you want to accept connection from {otherUser.firstName}?
      <form action={handleConnectionRequest}>
        <input
          type="hidden"
          name="connectionId"
          value={connectionLink.connectionId}
        />
        <input
          type="hidden"
          name="userIdOne"
          value={connectionLink.fromUserId}
        />
        <input type="hidden" name="userIdTwo" value={userId} />
        <button type="submit" name="accept" value="yes">
          Yes
        </button>
        <button type="submit" name="accept" value="no">
          No
        </button>
      </form>
    </section>
  );
}
