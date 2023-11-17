import { auth, currentUser, redirectToSignIn } from "@clerk/nextjs";
import Connections from "../connections/page";

export default async function Home() {
  const user = (await currentUser())!;

  return (
    <section className="p-24">
      <div>Hi, {user.firstName}</div>
      <Connections></Connections>
    </section>
  );
}
