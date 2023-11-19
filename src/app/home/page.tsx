import { currentUser } from "@clerk/nextjs";
import Connections from "../connections/component";

export default async function Home() {
  const user = (await currentUser())!;

  return (
    <section>
      <div>Hi, {user.firstName}</div>
      <Connections></Connections>
    </section>
  );
}
