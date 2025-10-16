import type { BlogPost, NotionPage } from "./types";

function getFirstPlainText(field?: { plain_text: string }[]): string {
  if (!field || field.length === 0) return "";
  return field[0].plain_text;
}

export function mapNotionPageToBlogPost(page: NotionPage): BlogPost {
  return {
    name: getFirstPlainText(page.properties.name.title),
    title: getFirstPlainText(page.properties.title.rich_text),
    url: getFirstPlainText(page.properties.url.rich_text),
    created: page.properties.created.created_time,
  };
}

export function mapNotionPagesToBlogPosts(pages: NotionPage[]): BlogPost[] {
  return pages.map(mapNotionPageToBlogPost);
}
