import { currentUser } from "@clerk/nextjs";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
  params: { connectionId: string };
}) {
  const user = (await currentUser())!;

  return (
    <section>
      <h2 className="my-4 text-xl">Hi {user.firstName}</h2>
      {children}
    </section>
  );
}
