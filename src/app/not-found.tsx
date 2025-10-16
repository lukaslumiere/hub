import Link from "next/link";

export default function NotFound() {
  return (
    <main className="h-screen flex items-center justify-center">
      <section className="flex items-center gap-2">
        <span>oops, this page doesn’t exist...</span>
        <Link href="/" className="underline">
          back home
        </Link>
      </section>
    </main>
  );
}
