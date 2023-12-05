import { getPromptsWithResponses } from "@/app/domains/prompt";
import BackIcon from "@/app/svg/back-icon.svg";
import { auth } from "@clerk/nextjs";
import Link from "next/link";
import ResponseComment from "./response-comment";
import ResponseView from "./response-view";

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

  const responses = promptWithResponses.Response.map((response) => (
    <ResponseView response={response} key={response.responseId}></ResponseView>
  ));

  return (
    <>
      <Link className="block my-8" href="./">
        <BackIcon></BackIcon>
      </Link>
      <div className="header">
        <h2>{promptWithResponses.title}</h2>
        <small>{promptWithResponses.body}</small>
      </div>
      <div className="responses">
        {...responses.map((response) => response)}
      </div>
      <div className="reply">
        <ResponseComment
          promptId={params.promptId}
          userId={userId}
        ></ResponseComment>
      </div>
    </>
  );
}
