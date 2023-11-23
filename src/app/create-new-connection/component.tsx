import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { getConnectionLinksForUser } from "../domains/connection-link";
import { createConnectionLink } from "./actions";
import CopyableText from "../components/copyable-text";

export default async function CreateNewConnection() {
  const { userId } = auth();

  if (!userId) {
    redirect("/");
  }

  const connectionLinks = await getConnectionLinksForUser(userId);

  const connectionLinkList = connectionLinks.map((connectionLink) => {
    const hostname = process.env.HOSTNAME;
    const acceptUrl = `https://${hostname}/accept-connection/${connectionLink.connectionId}`;
    return (
      <li key={connectionLink.connectionId}>
        <CopyableText text={acceptUrl}></CopyableText>
      </li>
    );
  });

  return (
    <>
      <form className="mt-8 mb-4" action={createConnectionLink}>
        <button role="submit">+ Create New Connection</button>
        <input type="hidden" name="userId" value={userId} />
      </form>

      {connectionLinkList.length > 0 ? (
        <ul>{...connectionLinkList}</ul>
      ) : (
        <p>You do not have any new connection links!</p>
      )}
    </>
  );
}
