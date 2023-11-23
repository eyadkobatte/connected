import Image from "next/image";

export default function AvatarIcons(params: { imageUrls: string[] }) {
  const { imageUrls } = params;

  return (
    <div className="inline-flex -space-x-1">
      {imageUrls.map((imageUrl, index) => (
        <Image
          key={index}
          className="inline-block rounded-full ring-2 ring-violet-900 dark:ring-violet-100"
          src={imageUrl}
          alt="User Image"
          width={50}
          height={50}
        />
      ))}
    </div>
  );
}
