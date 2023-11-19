import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "./components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Connected",
  description: "Stay connected!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={
            inter.className +
            "bg-white dark:bg-black text-violet-900 dark:text-violet-100"
          }
        >
          <Navbar></Navbar>
          <section className="m-24">{children}</section>
        </body>
      </html>
    </ClerkProvider>
  );
}
