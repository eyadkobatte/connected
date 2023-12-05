import CommentIcon from "@/app/svg/comment-icon.svg";
import Link from "next/link";
import { formatRelative } from "date-fns";

import { getPromptsWithResponseMetadata } from "../../domains/prompt";

export default function PromptHeading({
  prompt,
}: {
  prompt: Awaited<ReturnType<typeof getPromptsWithResponseMetadata>>[number];
}) {
  const createdAt = formatRelative(prompt.createdAt, new Date());

  let commentCountRow = (
    <>
      <CommentIcon></CommentIcon> {prompt._count.Response}
    </>
  );

  if (prompt._count.Response === 0) {
    commentCountRow = <>Awaiting your response...</>;
  }

  return (
    <Link
      className="p-8 flex flex-col border-2 border-violet-900 dark:border-violet-100 my-4 gap-1 bg-gradient-to-br from-violet-50 to-violet-100 hover:from-violet-200 hover:to-violet-300 dark:from-violet-900 dark:to-violet-950 hover:dark:from-violet-800 hover:dark:to-violet-900"
      href={`${prompt.connectionId}/${prompt.promptId}`}
    >
      <div className="row">
        <h4 className="font-semibold">{prompt.title}</h4>
      </div>
      <div className="row flex flex-row font-light text-sm">
        Asked by {prompt.createdBy.firstName} {createdAt}
      </div>
      <div className="row  font-light text-xs">{commentCountRow}</div>
    </Link>
  );
}
