import { auth } from "@clerk/nextjs";
import { getConnectionsForUser } from "../domains/connection";
import Link from "next/link";
import { redirect } from "next/navigation";
import AvatarIcons from "../components/avatar-icons";
import ForwardIcon from "../svg/forward-icon.svg";

export default async function Connections() {
  const { userId } = auth();

  if (!userId) {
    redirect("/");
  }

  const connections = await getConnectionsForUser(userId);

  const connectionsList = connections.map((connection) => {
    return (
      <div
        className="p-4 border-l-8 border-l-violet-900 dark:border-l-violet-100"
        key={connection.connectionId}
      >
        <Link
          href={`room/${connection.connectionId}`}
          className="flex flex-row justify-start items-center"
        >
          <AvatarIcons
            imageUrls={[
              connection.createdUser.imageUrl,
              connection.acceptedUser.imageUrl,
            ]}
          ></AvatarIcons>
          <span className="ms-4 leading-10 flex-grow">
            {connection.createdUser.firstName},{" "}
            {connection.acceptedUser.firstName}
          </span>
          <ForwardIcon></ForwardIcon>
        </Link>
      </div>
    );
  });

  return (
    <section>
      <h2 className="my-4">Your Connections</h2>

      <div className="flex flex-col gap-2">
        {connectionsList.length === 0
          ? "You have not set up any connections"
          : connectionsList}
      </div>
    </section>
  );
}
