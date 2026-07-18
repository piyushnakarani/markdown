import { MetadataRoute } from 'next';

import { blogPosts } from '@/content/blog';
import { locales } from '@/i18n/locales';
import { buildAlternateLanguages, localizedPath, SITE_URL } from '@/lib/site';

const BASE_URL = SITE_URL;

/** UI-translated product pages — safe to list in every locale. */
const LOCALIZED_PAGES = [
  '',
  '/markdown-to-pdf',
  '/markdown-to-html',
  '/markdown-to-txt',
  '/markdown-live-preview',
  '/editor',
  '/about',
  '/contact',
  '/help',
  '/free-markdown-converter',
  '/privacy',
  '/terms',
];

/**
 * Blog has no per-locale content. Index only English paths:
 * /blog and /blog/{slug} — never /es/blog/... etc.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const page of LOCALIZED_PAGES) {
    for (const locale of locales) {
      const path = localizedPath(locale, page);
      entries.push({
        url: `${BASE_URL}${path}`,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'daily' : 'weekly',
        priority: page === '' ? 1.0 : page.includes('markdown') ? 0.9 : 0.7,
        alternates: {
          languages: buildAlternateLanguages(page),
        },
      });
    }
  }

  entries.push({
    url: `${BASE_URL}/blog`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  });

  for (const post of blogPosts) {
    entries.push({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.dateModified),
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  }

  return entries;
}
