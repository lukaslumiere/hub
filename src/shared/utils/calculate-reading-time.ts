import type { BlockObjectResponse } from "@notionhq/client";

export function calculateReadingTime(blocks: BlockObjectResponse[]): string {
  const WORDS_PER_MINUTE = 200;
  const CODE_LINES_PER_MINUTE = 100;

  let wordCount = 0;
  let codeLineCount = 0;

  for (const block of blocks) {
    if ("code" in block) {
      const code = block.code.rich_text.map((rt) => rt.plain_text).join("");
      codeLineCount += code.split("\n").filter((line) => line.trim()).length;
      continue;
    }

    let text = "";
    if ("paragraph" in block)
      text = block.paragraph.rich_text.map((rt) => rt.plain_text).join("");
    else if ("heading_1" in block)
      text = block.heading_1.rich_text.map((rt) => rt.plain_text).join("");
    else if ("heading_2" in block)
      text = block.heading_2.rich_text.map((rt) => rt.plain_text).join("");
    else if ("heading_3" in block)
      text = block.heading_3.rich_text.map((rt) => rt.plain_text).join("");

    if (text) {
      wordCount += text
        .trim()
        .split(/\s+/)
        .filter((w) => w.length > 0).length;
    }
  }

  const minutes = Math.ceil(
    wordCount / WORDS_PER_MINUTE + codeLineCount / CODE_LINES_PER_MINUTE,
  );

  return `${minutes} min de leitura`;
}
