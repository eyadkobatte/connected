import { getConnectionById } from "@/app/domains/connection";
import { getPromptsWithResponseCount } from "@/app/domains/prompt";
import { getUsers } from "@/app/lib/users";
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

  const users = await getUsers(connection.userIdOne, connection.userIdTwo);

  const currentUser = users.find((user) => user.id === userId);
  const otherUser = users.find((user) => user.id !== userId);
  if (!currentUser || !otherUser) {
    redirect("/");
  }

  if (
    currentUser.id !== connection.userIdOne &&
    currentUser.id !== connection.userIdTwo
  ) {
    redirect("/");
  }

  const prompts = await getPromptsWithResponseCount(connection.connectionId);

  const createPromptWithContext = createPrompt.bind(
    null,
    connection.connectionId,
    currentUser.id
  );

  return (
    <section className="flex flex-row gap-12">
      <div className="flex-shrink">
        <AvatarIcons
          imageUrls={[currentUser.imageUrl, otherUser.imageUrl]}
        ></AvatarIcons>
        <br />
        Welcome!
        <div>
          <form action={createPromptWithContext}>
            <div>
              <div>Ask a question!</div>
              <input
                type="text"
                name="prompt"
                id="prompt"
                className="p-4 my-2 border-violet-900 dark:border-violet-100 border-2 bg-violet-100 dark:bg-violet-900 outline-violet-900 dark:outline-violet-100 w-96"
              />
            </div>
            <div>
              <div>Add more details!</div>
              <textarea
                name="details"
                id="details"
                rows={4}
                className="p-4 my-2 border-violet-900 dark:border-violet-100 border-2 bg-violet-100 dark:bg-violet-900 outline-violet-900 dark:outline-violet-100 w-96"
              />
            </div>
            <div>
              <Button>Send!</Button>
            </div>
          </form>
        </div>
      </div>
      <div className="flex-grow">{children}</div>
    </section>
  );
}
