import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Resolve SITE_URL from multiple env vars. Support NEXT_PUBLIC_BASE_URL,
// NEXT_SITEMAP_URL (full sitemap URL) and the accidental NEXT_PSITEMAP_URL typo.
const rawSite =
  process.env.NEXT_PUBLIC_BASE_URL ||
  process.env.NEXT_PUBLIC_SITEMAP_URL ||
  process.env.NEXT_SITEMAP_URL ||
  process.env.NEXT_PSITEMAP_URL ||
  "https://pandaads.ro";

// If an env contains the full sitemap (e.g. https://domain/sitemap.xml), strip the path.
const SITE_URL = rawSite.replace(/\/sitemap\.xml\/?$/, "");

// Static top-level routes
const staticRoutes = ["/", "/contact", "/blog", "/ebook", "/audit"];

function buildUrlEntry(url) {
  return `  <url>\n    <loc>${url}</loc>\n    <lastmod>${new Date().toISOString()}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.7</priority>\n  </url>`;
}

export async function GET() {
  const staticXml = staticRoutes.map((p) => buildUrlEntry(`${SITE_URL}${p}`)).join("\n");

  // Load blog posts from DB only (no hardcoded fallback)
  let posts = [];
  try {
    const record = await prisma.siteContent.findUnique({ where: { sectionKey: 'blog_posts' } });
    if (record && Array.isArray(record.content)) posts = record.content;
  } catch (e) {
    console.error('Sitemap: failed to load blog posts from DB', e);
  }
  const blogXml = posts.map((post) => buildUrlEntry(`${SITE_URL}/blog/${post.slug}`)).join("\n");

  const pagesXml = [staticXml, blogXml].filter(Boolean).join("\n");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pagesXml}\n</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  });
}
