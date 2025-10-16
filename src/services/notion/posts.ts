import { mapNotionPagesToBlogPosts } from "@/features/notion/mapper";
import { getLatestPages } from "@/features/notion/repository";
import type { BlogPost } from "@/features/notion/types";

const DATABASE_ID = process.env.NOTION_DATABASE_ID;

export async function fetchLatestPosts(limit = 5): Promise<BlogPost[]> {
  const notionPages = await getLatestPages(DATABASE_ID as string, limit);
  return mapNotionPagesToBlogPosts(notionPages);
}
