import { getPromptsWithResponseCount } from "@/app/domains/prompt";
import CommentIcon from "@/app/svg/comment-icon.svg";
import Link from "next/link";

export default async function RoomConnection({
  params,
}: {
  params: { connectionId: string };
}) {
  const prompts = await getPromptsWithResponseCount(params.connectionId);
  return (
    <>
      <h3>Questions between you</h3>
      {prompts.map((prompt, index) => (
        <div
          key={index}
          className="p-8 border-2 border-violet-900 dark:border-violet-100"
        >
          <Link href={`${prompt.connectionId}/${prompt.promptId}`}>
            <h4>{prompt.title}</h4>
            <CommentIcon></CommentIcon> {prompt._count.Response}
          </Link>
        </div>
      ))}
    </>
  );
}
