"use client";
import Button from "@/app/components/button";
import AttachIcon from "@/app/svg/attach-icon.svg";
import { createResponse } from "./actions";
import { useState, createRef } from "react";
import Image from "next/image";

export default function ResponseComment({
  promptId,
  userId,
}: {
  promptId: string;
  userId: string;
}) {
  const createResponseWithContext = createResponse.bind(null, promptId, userId);
  const fileInput = createRef<HTMLInputElement>();

  const [images, setImages] = useState<File[]>([]);
  const [thumbnails, setThumbnails] = useState<string[]>([]);

  const onAttachClick = () => {
    fileInput.current?.click();
  };

  const onAttachChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (!files) {
      return;
    }

    setImages([]);
    setThumbnails([]);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      setImages((images) => [...images, file]);
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const result = event.target.result;
          if (typeof result === "string") {
            setThumbnails((thumbnails) => [...thumbnails, result]);
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form className="sticky bottom-0" action={createResponseWithContext}>
      <div className="mt-8 relative">
        <textarea
          name="text"
          id="text"
          rows={4}
          className="p-4 pt-12 border-0 border-b-2 border-violet-500 dark:border-violet-100 focus:ring-0 focus:border-black dark:focus:border-violet-500 bg-transparent"
        />
        <div className="absolute top-4 right-0 w-full h-8">
          <input
            type="file"
            name="file"
            id="file"
            hidden
            multiple
            ref={fileInput}
            onChange={onAttachChange}
            accept="image/*"
          />
          <AttachIcon
            className="cursor-pointer ms-4 me-4"
            onClick={onAttachClick}
          ></AttachIcon>
          {...thumbnails.map((thumbnail, index) => (
            <Image
              key={index}
              src={thumbnail}
              width={24}
              height={24}
              className="w-6 h-6 mr-1 inline hover:brightness-50 hover:cursor-pointer"
              alt="Thumbnail"
            ></Image>
          ))}
        </div>
      </div>
      <div className="flex flex-row-reverse">
        <Button>Send</Button>
      </div>
    </form>
  );
}
