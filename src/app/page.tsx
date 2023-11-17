import Link from "next/link";

export default function App() {
  return (
    <main className="p-24">
      <div>Welcome to connected!</div>
      <div>
        <Link href="/home">Try out the app</Link>
      </div>
    </main>
  );
}
