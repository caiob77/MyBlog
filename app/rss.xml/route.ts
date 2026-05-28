import { getAllPosts } from "@/lib/posts";

const SITE = "https://beniel.dev";
const TITLE = "BENIEL — Desenvolvedor de Software";
const DESCRIPTION =
  "Blog pessoal de Caio Beniel sobre desenvolvimento de software, arquitetura e tecnologia.";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function toRfc822(iso: string): string {
  if (!iso) return new Date().toUTCString();
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return new Date().toUTCString();
  return d.toUTCString();
}

export const dynamic = "force-static";

export async function GET() {
  const posts = await getAllPosts();
  const lastBuildDate = posts[0]?.date
    ? toRfc822(posts[0].date)
    : new Date().toUTCString();

  const items = posts
    .map((p) => {
      const link = `${SITE}/posts/${p.slug}`;
      const categories = [p.category, ...p.tags]
        .filter(Boolean)
        .map((c) => `    <category>${escapeXml(c)}</category>`)
        .join("\n");

      return `  <item>
    <title>${escapeXml(p.title)}</title>
    <link>${link}</link>
    <guid isPermaLink="true">${link}</guid>
    <pubDate>${toRfc822(p.date)}</pubDate>
    <description>${escapeXml(p.description)}</description>
${categories}
  </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>${escapeXml(TITLE)}</title>
  <link>${SITE}</link>
  <description>${escapeXml(DESCRIPTION)}</description>
  <language>pt-BR</language>
  <lastBuildDate>${lastBuildDate}</lastBuildDate>
  <atom:link href="${SITE}/rss.xml" rel="self" type="application/rss+xml" />
${items}
</channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
