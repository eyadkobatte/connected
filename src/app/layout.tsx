import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "./components/navbar";
import Snackbar from "./components/snackbar";
import { Analytics } from "@vercel/analytics/react";

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
      <html className="min-h-full" lang="en">
        <body
          className={
            inter.className +
            " min-h-full bg-white dark:bg-black text-violet-900 dark:text-violet-100"
          }
        >
          <Navbar></Navbar>
          <section className="m-8 lg:m-16">{children}</section>
          <Snackbar></Snackbar>
          <Analytics></Analytics>
        </body>
      </html>
    </ClerkProvider>
  );
}
