import { auth, clerkClient } from "@clerk/nextjs";
import { getConnectionsForUser } from "../domains/connection";
import { createConnectionLink } from "./actions";
import { getConnectionLinksForUser } from "../domains/connection-link";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getUsers } from "../lib/users";
import Image from "next/image";
import AvatarIcons from "../components/avatar-icons";

export default async function Connections() {
  const { userId } = auth();

  if (!userId) {
    redirect("/");
  }

  const currentUser = await clerkClient.users.getUser(userId);

  const connections = await getConnectionsForUser(userId);
  const connectionLinks = await getConnectionLinksForUser(userId);

  const allUserIds = new Set(
    connections
      .map((connection) => {
        return [connection.userIdOne, connection.userIdTwo];
      })
      .flat(2)
  );

  const users = await getUsers(...allUserIds);

  const connectionsList = connections.map((connection, index) => {
    const userOne = users.find((user) => user.id === connection.userIdOne)!;
    const userTwo = users.find((user) => user.id === connection.userIdTwo)!;

    return (
      <div key={index}>
        <Link href={`room/${connection.connectionId}`}>
          <AvatarIcons imageUrls={[userOne.imageUrl]}></AvatarIcons>
          <span className="ms-4">{userOne.firstName}</span> -{" "}
          <span className="me-4">{userTwo.firstName}</span>
          <AvatarIcons imageUrls={[userTwo.imageUrl]}></AvatarIcons>
        </Link>
      </div>
    );
  });

  const connectionLinkList = connectionLinks.map((connectionLink, index) => (
    <div key={index}>{connectionLink.connectionId}</div>
  ));

  return (
    <section>
      <h2 className="my-4">Your Connections</h2>
      <div className="flex flex-row">
        <div className="inline-block flex-1">
          <h3>Connections</h3>
          {connectionsList.length === 0
            ? "You have not set up any connections"
            : connectionsList}
        </div>
        <div className="inline-block flex-1">
          <h3>Links to send</h3>
          {connectionLinkList.length === 0
            ? "You have not created any connection links"
            : connectionLinkList}
        </div>
      </div>
      <div className="my-4">
        <form action={createConnectionLink}>
          <input type="hidden" name="userId" value={userId} />
          <button role="submit">Create New Connection</button>
        </form>
      </div>
    </section>
  );
}
