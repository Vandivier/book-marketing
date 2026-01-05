import fs from "node:fs";
import path from "node:path";
import dotenv from "dotenv";

const CONTENT_ROOT = path.join(process.cwd(), "public-md");
const PUBLIC_ROOT = path.join(process.cwd(), "public");

const getSiteUrl = () => {
  dotenv.config();
  const siteUrl = process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL;
  return siteUrl && siteUrl.length > 0 ? siteUrl.replace(/\/$/, "") : null;
};

const collectMarkdownSlugs = () => {
  if (!fs.existsSync(CONTENT_ROOT)) {
    return [];
  }

  const slugs: string[] = [];

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
      const slug = [...segments, entry.name.replace(/\.md$/i, "")].join("/");
      slugs.push(`/${slug}`);
    });
  };

  walk(CONTENT_ROOT, []);
  return slugs;
};

const buildSitemap = (urls: string[], siteUrl: string) => {
  const now = new Date().toISOString();
  const urlset = urls
    .map(
      (url) => `  <url>
    <loc>${siteUrl}${url}</loc>
    <lastmod>${now}</lastmod>
  </url>`,
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlset}
</urlset>`;
};

const run = () => {
  const siteUrl = getSiteUrl();
  if (!siteUrl) {
    throw new Error("Set SITE_URL or NEXT_PUBLIC_SITE_URL to generate sitemap.");
  }

  const markdownUrls = collectMarkdownSlugs();
  const staticUrls = ["/", "/about", "/updates"];
  const urls = Array.from(new Set([...staticUrls, ...markdownUrls])).sort();

  const sitemap = buildSitemap(urls, siteUrl);
  fs.mkdirSync(PUBLIC_ROOT, { recursive: true });
  fs.writeFileSync(path.join(PUBLIC_ROOT, "sitemap.xml"), sitemap, "utf8");
  console.log(`Sitemap generated with ${urls.length} URLs.`);
};

run();
