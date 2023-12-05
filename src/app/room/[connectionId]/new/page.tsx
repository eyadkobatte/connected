import { auth } from "@clerk/nextjs";
import { createPrompt } from "./actions";
import { redirect } from "next/navigation";
import Button from "@/app/components/button";
import Link from "next/link";
import BackIcon from "@/app/svg/back-icon.svg";

export default function NewPromptInRoom({
  params,
}: {
  params: { connectionId: string };
}) {
  const { userId } = auth();
  if (!userId) {
    redirect("/");
  }

  const createPromptWithContext = createPrompt.bind(
    null,
    params.connectionId,
    userId
  );

  return (
    <>
      <Link className="block my-8" href="./">
        <BackIcon></BackIcon>
      </Link>

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
    </>
  );
}
