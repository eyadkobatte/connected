import Button from "@/app/components/button";
import { getPromptsWithResponses } from "@/app/domains/prompt";
import AttachIcon from "@/app/svg/attach-icon.svg";
import BackIcon from "@/app/svg/back-icon.svg";
import { auth } from "@clerk/nextjs";
import Link from "next/link";
import { createResponse } from "./actions";

export default async function Prompt({
  params,
}: {
  params: { promptId: string };
}) {
  const { userId: _userId } = auth();
  const userId = _userId!;

  const promptWithResponses = await getPromptsWithResponses(params.promptId);
  if (!promptWithResponses) {
    return <div>Conversation not found</div>;
  }

  const responses = promptWithResponses.Response.map((response, index) => (
    <div key={index}>{response.text}</div>
  ));

  const createResponseWithContext = createResponse.bind(
    null,
    params.promptId,
    userId
  );
  return (
    <>
      <Link className="block mb-8" href="./">
        <BackIcon></BackIcon>
      </Link>
      <h2>{promptWithResponses.title}</h2>
      <small>{promptWithResponses.body}</small>
      {...responses.map((response) => response)}
      <form action={createResponseWithContext}>
        <div className="mt-8 relative">
          <textarea
            name="text"
            id="text"
            rows={4}
            className="p-4 pt-12 border-violet-900 dark:border-violet-100 border-2 bg-violet-100 dark:bg-violet-900 outline-violet-900 dark:outline-violet-100 w-full"
          />
          <div className="absolute top-4 right-0 w-full h-8">
            <span className="ms-4 cursor-pointer">
              <AttachIcon></AttachIcon>
            </span>
          </div>
        </div>
        <div className="flex flex-row-reverse">
          <Button>Send</Button>
        </div>
      </form>
    </>
  );
}
