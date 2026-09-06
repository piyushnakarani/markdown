import { MetadataRoute } from 'next';

import { blogPosts } from '@/content/blog';
import {
  buildAlternateLanguages,
  INDEXABLE_LOCALES,
  localizedPath,
  SITE_URL,
} from '@/lib/site';

const BASE_URL = SITE_URL;

/** Product/static pages — all indexable locales with hreflang alternates. */
const LOCALIZED_PAGES = [
  '',
  '/markdown-to-pdf',
  '/md-to-pdf',
  '/markdown-to-html',
  '/markdown-to-txt',
  '/markdown-to-docx',
  '/obsidian-to-pdf',
  '/notion-to-pdf',
  '/github-readme-to-pdf',
  '/markdown-to-pdf-resume',
  '/markdown-live-preview',
  '/editor',
  '/about',
  '/contact',
  '/help',
  '/free-markdown-converter',
  '/chatgpt-to-pdf',
  '/ai-markdown-to-pdf',
  '/mermaid-markdown-to-pdf',
  '/privacy',
  '/terms',
];

/**
 * Blog has no per-locale content. Index only English paths:
 * /blog and /blog/{slug} — never /es/blog/... etc.
 * Product pages include every INDEXABLE_LOCALE (all UI locales).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const page of LOCALIZED_PAGES) {
    for (const locale of INDEXABLE_LOCALES) {
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
