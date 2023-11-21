import { getPromptsWithResponses } from "@/app/domains/prompt";
import BackIcon from "@/app/svg/back-icon.svg";
import { auth } from "@clerk/nextjs";
import Link from "next/link";
import ResponseComment from "./comment";
import Image from "next/image";
import { getFilePathFromBucket } from "@/app/lib/file-storage";

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

  const responses = promptWithResponses.Response.map(
    (response, responseIndex) => (
      <div
        className="my-4 pb-4 border-b-violet-900 dark:border-b-violet-100 border-b-2"
        key={responseIndex}
      >
        <p>{response.text}</p>
        {response.imagePaths.length > 0 &&
          response.imagePaths
            .split(",")
            .map((imagePath, imageIndex) => (
              <Image
                className="inline"
                key={`${responseIndex}-${imageIndex}`}
                alt="image"
                src={getFilePathFromBucket(imagePath)}
                width={120}
                height={120}
              ></Image>
            ))}
        <br />
        <small>{response.createdBy.firstName}</small>
      </div>
    )
  );

  return (
    <>
      <Link className="block mb-8" href="./">
        <BackIcon></BackIcon>
      </Link>
      <h2>{promptWithResponses.title}</h2>
      <small>{promptWithResponses.body}</small>
      {...responses.map((response) => response)}
      <ResponseComment
        promptId={params.promptId}
        userId={userId}
      ></ResponseComment>
    </>
  );
}
