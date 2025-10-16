import type {
  PageObjectResponse,
  RichTextItemResponse,
} from "@notionhq/client";

export type NotionPageProperties = {
  name: { title: RichTextItemResponse[] };
  title: { rich_text: RichTextItemResponse[] };
  url: { rich_text: RichTextItemResponse[] };
  created: { created_time: string };
  status: { select: { name: string } };
};

export interface NotionPage extends Omit<PageObjectResponse, "properties"> {
  properties: NotionPageProperties;
}

export interface BlogPost {
  name: string;
  title: string;
  url: string;
  created: string;
}
