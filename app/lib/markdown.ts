import fs from "node:fs";
import path from "node:path";

export type MarkdownMeta = {
  title: string;
  orderId: number;
};

export type MarkdownPage = {
  meta: MarkdownMeta;
  html: string;
  slug: string[];
};

const CONTENT_ROOT = path.join(process.cwd(), "public-md");
const FRONT_MATTER_PATTERN = /^---\s*\n([\s\S]*?)\n---\s*\n?/;

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const renderInline = (value: string) => {
  let output = escapeHtml(value);
  output = output.replace(/`([^`]+)`/g, "<code>$1</code>");
  output = output.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  output = output.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  output = output.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2">$1</a>',
  );
  return output;
};

const renderMarkdown = (markdown: string) => {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const blocks: string[] = [];
  let paragraph: string[] = [];
  let listType: "ul" | "ol" | null = null;
  let inCodeBlock = false;
  let codeBlock: string[] = [];

  const flushParagraph = () => {
    if (paragraph.length) {
      blocks.push(`<p>${renderInline(paragraph.join(" "))}</p>`);
      paragraph = [];
    }
  };

  const closeList = () => {
    if (listType) {
      blocks.push(`</${listType}>`);
      listType = null;
    }
  };

  const flushCodeBlock = () => {
    if (codeBlock.length) {
      blocks.push(
        `<pre><code>${escapeHtml(codeBlock.join("\n"))}</code></pre>`,
      );
      codeBlock = [];
    }
  };

  lines.forEach((rawLine) => {
    const line = rawLine.trimEnd();

    if (line.startsWith("```")) {
      if (inCodeBlock) {
        flushCodeBlock();
        inCodeBlock = false;
      } else {
        flushParagraph();
        closeList();
        inCodeBlock = true;
      }
      return;
    }

    if (inCodeBlock) {
      codeBlock.push(rawLine);
      return;
    }

    if (!line) {
      flushParagraph();
      closeList();
      return;
    }

    const headingMatch = line.match(/^(#{1,3})\s+(.*)$/);
    if (headingMatch) {
      flushParagraph();
      closeList();
      const level = headingMatch[1].length;
      blocks.push(`<h${level}>${renderInline(headingMatch[2])}</h${level}>`);
      return;
    }

    const orderedMatch = line.match(/^\d+\.\s+(.*)$/);
    if (orderedMatch) {
      flushParagraph();
      if (listType !== "ol") {
        closeList();
        listType = "ol";
        blocks.push("<ol>");
      }
      blocks.push(`<li>${renderInline(orderedMatch[1])}</li>`);
      return;
    }

    const unorderedMatch = line.match(/^[-*]\s+(.*)$/);
    if (unorderedMatch) {
      flushParagraph();
      if (listType !== "ul") {
        closeList();
        listType = "ul";
        blocks.push("<ul>");
      }
      blocks.push(`<li>${renderInline(unorderedMatch[1])}</li>`);
      return;
    }

    if (line.startsWith("> ")) {
      flushParagraph();
      closeList();
      blocks.push(`<blockquote>${renderInline(line.slice(2))}</blockquote>`);
      return;
    }

    paragraph.push(line);
  });

  if (inCodeBlock) {
    flushCodeBlock();
  }

  flushParagraph();
  closeList();

  return blocks.join("\n");
};

const parseFrontMatter = (source: string) => {
  const match = source.match(FRONT_MATTER_PATTERN);
  if (!match) {
    throw new Error("Markdown file is missing front matter.");
  }

  const rawMeta = match[1];
  const body = source.slice(match[0].length);
  const metaLines = rawMeta
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const meta: Record<string, string> = {};
  metaLines.forEach((line) => {
    const [key, ...rest] = line.split(":");
    if (!key || rest.length === 0) {
      return;
    }
    meta[key.trim()] = rest.join(":").trim();
  });

  const title = meta.title;
  const orderId = Number(meta.order_id);
  if (!title) {
    throw new Error("Markdown front matter requires a title.");
  }
  if (!Number.isFinite(orderId)) {
    throw new Error("Markdown front matter requires numeric order_id.");
  }

  return {
    meta: {
      title,
      orderId,
    },
    body,
  };
};

const isSafeSegment = (segment: string) =>
  !segment.includes("..") && !segment.includes("/") && !segment.includes("\\");

const normalizeSlug = (slug?: string[]) =>
  Array.isArray(slug)
    ? slug
        .filter((segment): segment is string => typeof segment === "string")
        .map((segment) => segment.replace(/\.md$/i, ""))
        .filter((segment) => segment.length > 0)
    : [];

const resolveMarkdownPath = (slug?: string[]) => {
  const safeSlug = normalizeSlug(slug);
  if (safeSlug.length === 0 || !safeSlug.every(isSafeSegment)) {
    return null;
  }

  return {
    slug: safeSlug,
    filePath: `${path.join(CONTENT_ROOT, ...safeSlug)}.md`,
  };
};

export const getMarkdownBySlug = (slug: string[]): MarkdownPage | null => {
  const resolved = resolveMarkdownPath(slug);
  if (!resolved) {
    return null;
  }

  if (!fs.existsSync(resolved.filePath)) {
    return null;
  }

  let source = "";
  let meta: MarkdownMeta;
  let body = "";
  try {
    source = fs.readFileSync(resolved.filePath, "utf8");
    ({ meta, body } = parseFrontMatter(source));
  } catch {
    return null;
  }

  return {
    meta,
    html: renderMarkdown(body),
    slug: resolved.slug,
  };
};

export const getMarkdownEntriesInDir = (
  dirSlug: string[],
): Array<{
  meta: MarkdownMeta;
  slug: string[];
}> => {
  const resolved = resolveMarkdownPath([...dirSlug, "placeholder"]);
  if (!resolved) {
    return [];
  }

  const dirPath = path.dirname(resolved.filePath);
  if (!fs.existsSync(dirPath)) {
    return [];
  }

  const entries = fs
    .readdirSync(dirPath, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
    .map((entry) => {
      const source = fs.readFileSync(path.join(dirPath, entry.name), "utf8");
      const { meta } = parseFrontMatter(source);
      const slug = [...dirSlug, entry.name.replace(/\.md$/i, "")];
      return { meta, slug };
    })
    .sort((a, b) => a.meta.orderId - b.meta.orderId);

  return entries;
};

export const getAllMarkdownSlugs = (): string[][] => {
  if (!fs.existsSync(CONTENT_ROOT)) {
    return [];
  }

  const slugs: string[][] = [];

  const walk = (dir: string, segments: string[]) => {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    entries.forEach((entry) => {
      if (entry.isDirectory()) {
        walk(path.join(dir, entry.name), [...segments, entry.name]);
        return;
      }
      if (!entry.isFile() || !entry.name.endsWith(".md")) {
        return;
      }
      slugs.push([...segments, entry.name.replace(/\.md$/i, "")]);
    });
  };

  walk(CONTENT_ROOT, []);
  return slugs;
};
