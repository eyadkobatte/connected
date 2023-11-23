import { getPromptsWithResponseCount } from "@/app/domains/prompt";
import CommentIcon from "@/app/svg/comment-icon.svg";
import Link from "next/link";
import PromptHeading from "./prompt-heading";

export default async function RoomConnection({
  params,
}: {
  params: { connectionId: string };
}) {
  const prompts = await getPromptsWithResponseCount(params.connectionId);
  return (
    <>
      <h2>Conversations</h2>
      {prompts.map((prompt, index) => (
        <PromptHeading prompt={prompt} key={index}></PromptHeading>
      ))}
    </>
  );
}
