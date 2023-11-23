"use client";

import { useSnackbarStore } from "../store/snackbar";

export default function Snackbar() {
  const { messages, removeMessage } = useSnackbarStore();

  if (messages.length === 0) {
    return null;
  }

  const message = messages[0];

  setTimeout(() => removeMessage(message), 2000);

  return (
    <div className="fixed bottom-8 py-4 px-8 grid ms-4 place-items-center bg-slate-500">
      {message}
    </div>
  );
}
