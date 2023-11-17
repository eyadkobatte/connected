import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex flex-row p-8 border-b-2 border-b-violet-300">
      <h1 className="font-sans font-light text-xl">
        <Link href="/">Connected</Link>
      </h1>
      <div className="flex-1"></div>
      <UserButton afterSignOutUrl="/" />
    </nav>
  );
}
