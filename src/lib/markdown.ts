import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import GithubSlugger from "github-slugger";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkRehype from "remark-rehype";
import rehypeKatex from "rehype-katex";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeStringify from "rehype-stringify";

const CONTENT_ROOT = path.join(process.cwd(), "src", "content", "lessons");

const SUIT_REGEX = /([♥♦])/g;

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkMath)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeSlug)
  .use(rehypeAutolinkHeadings, {
    behavior: "append",
    properties: { className: ["heading-link"], ariaHidden: "true", tabIndex: -1 },
    content: { type: "text", value: "#" },
  })
  .use(rehypeKatex, { strict: "ignore", output: "html" })
  .use(rehypeStringify, { allowDangerousHtml: true });

export type Frontmatter = {
  title?: string;
  description?: string;
  [key: string]: unknown;
};

export type RenderedLesson = {
  html: string;
  frontmatter: Frontmatter;
  raw: string;
  toc: TocEntry[];
};

export type TocEntry = {
  id: string;
  text: string;
  depth: number;
};

export async function loadLessonMarkdown(file: string): Promise<RenderedLesson> {
  const filepath = path.join(CONTENT_ROOT, `${file}.md`);
  const raw = await fs.readFile(filepath, "utf8");
  const parsed = matter(raw);
  const file_node = await processor.process(parsed.content);
  let html = String(file_node);
  html = html.replace(SUIT_REGEX, '<span class="suit-red">$1</span>');
  // Wrap raw tables in a horizontally scrollable container so wide range
  // charts don't overflow the page on small screens.
  html = html.replace(
    /<table>([\s\S]*?)<\/table>/g,
    '<div class="table-scroll"><table>$1</table></div>',
  );

  const toc = extractToc(parsed.content);
  return { html, frontmatter: parsed.data as Frontmatter, raw: parsed.content, toc };
}

function extractToc(markdown: string): TocEntry[] {
  // Use GithubSlugger to match the deduplication behaviour that
  // rehype-slug applies to the rendered HTML, so anchor links match.
  const slugger = new GithubSlugger();
  const lines = markdown.split("\n");
  const entries: TocEntry[] = [];
  let inCodeFence = false;
  for (const line of lines) {
    if (line.startsWith("```")) {
      inCodeFence = !inCodeFence;
      continue;
    }
    if (inCodeFence) continue;
    const match = /^(##|###)\s+(.+)$/.exec(line);
    if (!match) continue;
    const depth = match[1].length;
    const text = match[2].replace(/`/g, "").trim();
    entries.push({ id: slugger.slug(text), text, depth });
  }
  return entries;
}
