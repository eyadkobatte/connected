"use client";

import { useSnackbarStore } from "../store/snackbar";
import CopyIcon from "../svg/copy-icon.svg";

export default function CopyableText({ text }: { text: string }) {
  const { addMessage } = useSnackbarStore();

  const copyText = async (textToCopy: string) => {
    await navigator.clipboard.writeText(textToCopy);
    addMessage("ConnectionLink copied successfully");
  };

  return (
    <>
      <span className="text-sm">{text}</span>
      <span className="cursor-pointer m" onClick={copyText.bind(null, text)}>
        <CopyIcon></CopyIcon>
      </span>
    </>
  );
}
