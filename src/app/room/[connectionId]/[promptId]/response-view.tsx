import { getFilePathFromBucket } from "@/app/lib/file-storage";
import { Response, User } from "@prisma/client";
import Image from "next/image";

export default function ResponseView({
  response,
}: {
  response: Response & { createdBy: User };
}) {
  return (
    <div className="my-4 pb-4 border-b-violet-900 dark:border-b-violet-100 border-b-2">
      <p>{response.text}</p>
      {response.imagePaths.length > 0 &&
        response.imagePaths
          .split(",")
          .map((imagePath) => (
            <Image
              className="inline"
              key={`${imagePath}`}
              alt="image"
              src={getFilePathFromBucket(imagePath)}
              width={120}
              height={120}
            ></Image>
          ))}
      <br />
      <small>{response.createdBy.firstName}</small>
    </div>
  );
}
