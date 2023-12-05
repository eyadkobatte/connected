import { getConnectionById } from "@/app/domains/connection";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import AvatarIcons from "@/app/components/avatar-icons";
import Button from "@/app/components/button";
import Link from "next/link";

export default async function RoomConnectionLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { connectionId: string };
}) {
  const { userId } = auth();
  if (!userId) {
    redirect("/");
  }

  const connection = await getConnectionById(params.connectionId);
  if (!connection) {
    redirect("/");
  }

  if (![connection.createdUserId, connection.acceptedUserId].includes(userId)) {
    redirect("/");
  }

  return (
    <>
      <AvatarIcons
        imageUrls={[
          connection.createdUser.imageUrl,
          connection.acceptedUser.imageUrl,
        ]}
      ></AvatarIcons>

      <div>{children}</div>
    </>
  );
}
