import type { BlockObjectResponse } from "@notionhq/client";
import { unstable_cache } from "next/cache";
import { NotionClient } from "@/shared/lib/notion-client";
import type { NotionPage } from "./types";

const REVALIDATE_TIME = 3600;

export const getAllLivePages = unstable_cache(
  async (databaseId: string): Promise<NotionPage[]> => {
    const response = await NotionClient.dataSources.query({
      data_source_id: databaseId,
      filter: { property: "status", select: { equals: "Live" } },
      sorts: [{ property: "created", direction: "descending" }],
    });
    return response.results as NotionPage[];
  },
  ["all-live-pages"],
  { revalidate: REVALIDATE_TIME, tags: ["notion-pages"] },
);

export const getPageByUrl = unstable_cache(
  async (databaseId: string, url: string): Promise<NotionPage | undefined> => {
    const response = await NotionClient.dataSources.query({
      data_source_id: databaseId,
      filter: {
        and: [
          { property: "url", rich_text: { equals: url } },
          { property: "status", select: { equals: "Live" } },
        ],
      },
    });
    return response.results[0] as NotionPage | undefined;
  },
  ["page-by-url"],
  { revalidate: REVALIDATE_TIME, tags: ["notion-pages"] },
);

export const fetchPageBlocks = unstable_cache(
  async (id: string): Promise<BlockObjectResponse[]> => {
    const allBlocks = [];
    let hasMore = true;
    let startCursor: string | undefined;

    while (hasMore) {
      const res = await NotionClient.blocks.children.list({
        block_id: id,
        start_cursor: startCursor,
        page_size: 100,
      });

      allBlocks.push(...res.results);
      hasMore = res.has_more;
      startCursor = res.next_cursor || undefined;
    }

    return allBlocks as BlockObjectResponse[];
  },
  ["page-blocks"],
  { revalidate: REVALIDATE_TIME, tags: ["notion-blocks"] },
);

export async function getLatestPages(
  databaseId: string,
  limit = 3,
): Promise<NotionPage[]> {
  const pages = await getAllLivePages(databaseId);
  return pages.slice(0, limit);
}
