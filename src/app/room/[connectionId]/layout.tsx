import { getConnectionById } from "@/app/domains/connection";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { createPrompt } from "./actions";
import AvatarIcons from "@/app/components/avatar-icons";
import Button from "@/app/components/button";

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

  const createPromptWithContext = createPrompt.bind(
    null,
    connection.connectionId,
    userId
  );

  return (
    <section>
      <AvatarIcons
        imageUrls={[
          connection.createdUser.imageUrl,
          connection.acceptedUser.imageUrl,
        ]}
      ></AvatarIcons>

      <div className="flex flex-col-reverse lg:flex-row justify-between gap-4">
        <form action={createPromptWithContext}>
          <h2 className="my-4">Ask a question!</h2>
          <label className="block" htmlFor="prompt">
            Title
          </label>
          <input
            type="text"
            name="prompt"
            id="prompt"
            defaultValue="Enter a title for discussion"
            className="p-4 my-2 w-full border-0 border-b-2 border-violet-500 dark:border-violet-100 focus:ring-0 focus:border-black dark:focus:border-violet-500 bg-transparent"
          />
          <label htmlFor="details">Add more details!</label>
          <textarea
            name="details"
            id="details"
            maxLength={500}
            rows={4}
            className="p-4 my-2 w-full border-0 border-b-2 border-violet-500 dark:border-violet-100 focus:ring-0 focus:border-black dark:focus:border-violet-500 bg-transparent"
          />
          <Button>Send!</Button>
        </form>
      </div>
      <div className="flex-grow">{children}</div>
    </section>
  );
}
