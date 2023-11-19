import { ButtonHTMLAttributes } from "react";

export default function Button({ children }: { children: React.ReactNode }) {
  return (
    <button className="p-4 my-4 bg-violet-100 dark:bg-violet-900 border-2 border-violet-900 dark:border-violet-100">
      {children}
    </button>
  );
}
