import bookmarkPlugin from "@notion-render/bookmark-plugin";
import { NotionRenderer } from "@notion-render/client";
import hljsPlugin from "@notion-render/hljs-plugin";
import type { BlockObjectResponse } from "@notionhq/client";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchPageBlocks, getPageByUrl } from "@/features/notion/repository";
import { NotionClient } from "@/shared/lib/notion-client";
import { calculateReadingTime } from "@/shared/utils/calculate-reading-time";
import { formatDate } from "@/shared/utils/format-date";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await getPageByUrl(
    process.env.NOTION_DATABASE_ID as string,
    slug,
  );

  if (!page) return notFound();

  const blocks = await fetchPageBlocks(page.id);

  const renderer = new NotionRenderer({ client: NotionClient });
  renderer.use(hljsPlugin({}));
  renderer.use(bookmarkPlugin(undefined));

  const html = await renderer.render(...(blocks as BlockObjectResponse[]));
  const htmlWithBlankLinks = html.replace(
    /<a\s+href=/gi,
    '<a target="_blank" rel="noopener noreferrer" href=',
  );

  const readingTime = calculateReadingTime(blocks as BlockObjectResponse[]);
  const createdTime = page.properties.created.created_time;

  return (
    <main className="container mx-auto px-10 py-16 font-montserrat">
      <Link href="/" className="underline">
        back home
      </Link>
      <h3 className="my-4">
        {readingTime} · {formatDate(createdTime)}
      </h3>
      <div
        className="prose prose-headings:text-black prose-a:text-black prose-p:text-black prose-h3:font-medium max-w-full"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: sanitized html from notion renderer
        dangerouslySetInnerHTML={{ __html: htmlWithBlankLinks }}
      />
    </main>
  );
}
