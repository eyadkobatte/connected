import { auth } from "@clerk/nextjs";

export default function Connections() {
  const { userId } = auth();

  return <div>Connections</div>;
}
