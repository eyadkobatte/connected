import { getPromptsWithResponseMetadata } from "@/app/domains/prompt";
import Link from "next/link";
import PromptHeading from "./prompt-heading";
import { auth } from "@clerk/nextjs";
import Button from "@/app/components/button";

export default async function RoomConnection({
  params,
}: {
  params: { connectionId: string };
}) {
  const { userId } = auth();
  if (!userId) {
    return <>Unauthenticated!</>;
  }
  const prompts = await getPromptsWithResponseMetadata(
    params.connectionId,
    userId
  );
  return (
    <>
      <Button>
        <Link href={`${params.connectionId}/new`}>Start new Conversation!</Link>
      </Button>

      <h2>Conversations</h2>
      {prompts.map((prompt, index) => (
        <PromptHeading prompt={prompt} key={index}></PromptHeading>
      ))}
    </>
  );
}
