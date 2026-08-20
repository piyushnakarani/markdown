/**
 * Sitemap Index - References separate sitemaps for pages and blog
 * 
 * This route generates the sitemap index file that references:
 * - /sitemap-pages.xml (core product pages)
 * - /sitemap-blog.xml (blog index + posts)
 * 
 * robots.txt references: https://www.pdfwritter.com/sitemap-index.xml
 * 
 * See: https://www.sitemaps.org/protocol.php#sitemapindex
 */

import { SITEMAP_PAGES_URL, SITEMAP_BLOG_URL } from '@/lib/seo-constants';

export const dynamic = 'force-static';
export const revalidate = 3600; // hourly revalidation

export function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${SITEMAP_PAGES_URL}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${SITEMAP_BLOG_URL}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </sitemap>
</sitemapindex>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}