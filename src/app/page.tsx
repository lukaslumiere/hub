import Link from "next/link";
import { books } from "@/data/books";
import { journey } from "@/data/journey";
import { fetchLatestPosts } from "@/services/notion/posts";
import { Footer } from "../components/layout/Footer";

export const revalidate = 60

export default async function Home() {
  const posts = await fetchLatestPosts();
  return (
    <main className="flex flex-col gap-9 container mx-auto px-5 py-16">
      <section>
        <h1>just a tech guy who {">>loves<<"} product design</h1>
      </section>
      <section>
        <div className="flex flex-col gap-1">
          <div>
            <Link
              href="https://x.com/lukaslumiere"
              target="_blank"
              className="inline"
            >
              <span className="underline">https://www.x.com/lukaslumiere</span>
            </Link>{" "}
            (find me here)
          </div>
          <div>
            <Link
              href="https://github.com/lukaslumiere"
              target="_blank"
              className="inline"
            >
              <span className="underline">
                https://www.github.com/lukaslumiere
              </span>
            </Link>
          </div>
        </div>
      </section>
      <section className="flex flex-col gap-2">
        <h1>check out my latest posts</h1>
        <div className="flex flex-col gap-1">
          {posts.map((post) => (
            <div key={post.url}>
              -{" "}
              <Link href={`/posts/${post.url}`} className="underline">
                {post.name}
              </Link>
            </div>
          ))}
          - coming soon...
        </div>
      </section>
      <section className="flex flex-col gap-2">
        <h1>good reads imo</h1>
        <div className="flex flex-col gap-1">
          {books.map((book) => (
            <div key={book.link}>
              <Link href={book.link} target="_blank">
                - <span className="underline">{book.title}</span>
              </Link>{" "}
              {book.note && `(${book.note})`}
            </div>
          ))}
        </div>
      </section>
      <section className="flex flex-col gap-2">
        <h1>what i've been up to</h1>
        <div className="flex flex-col gap-1">
          {journey.map((journey) => (
            <div className="flex items-center gap-3" key={journey.role}>
              {journey.start}-{journey.end}: {journey.role}
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
