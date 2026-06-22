import { MetadataRoute } from 'next';
import { locales } from '@/i18n/locales';
import { blogPosts } from '@/content/blog';
import { SITE_URL } from '@/lib/site';

const BASE_URL = SITE_URL;

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    '',
    '/markdown-to-pdf',
    '/markdown-to-html',
    '/markdown-to-txt',
    '/editor',
    '/blog',
    '/about',
    '/contact',
    '/help',
    '/free-markdown-converter',
    '/privacy',
    '/terms',
  ];

  const entries: MetadataRoute.Sitemap = [];

  // Static pages for each locale
  for (const page of pages) {
    for (const locale of locales) {
      entries.push({
        url: `${BASE_URL}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'daily' : 'weekly',
        priority: page === '' ? 1.0 : page.includes('markdown-to') ? 0.9 : 0.7,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${BASE_URL}/${l}${page}`])
          ),
        },
      });
    }
  }

  // Blog posts for each locale
  for (const post of blogPosts) {
    for (const locale of locales) {
      entries.push({
        url: `${BASE_URL}/${locale}/blog/${post.slug}`,
        lastModified: new Date(post.dateModified),
        changeFrequency: 'monthly',
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${BASE_URL}/${l}/blog/${post.slug}`])
          ),
        },
      });
    }
  }

  return entries;
}
