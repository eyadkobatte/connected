import { getPromptsWithResponses } from "@/app/domains/prompt";
import Link from "next/link";

export default async function Prompt({
  params,
}: {
  params: { promptId: string };
}) {
  const promptWithResponses = await getPromptsWithResponses(params.promptId);
  if (!promptWithResponses) {
    return <div>Conversation not found</div>;
  }
  return (
    <>
      <div>
        <Link href="./">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
        </Link>
      </div>
      <h2>{promptWithResponses.title}</h2>
      <small>{promptWithResponses.body}</small>
    </>
  );
}
