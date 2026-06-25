import { MetadataRoute } from 'next';

import { blogPosts } from '@/content/blog';
import { locales } from '@/i18n/locales';
import { buildAlternateLanguages, localizedPath,SITE_URL } from '@/lib/site';

const BASE_URL = SITE_URL;

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    '',
    '/markdown-to-pdf',
    '/markdown-to-html',
    '/markdown-to-txt',
    '/markdown-live-preview',
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

  // Blog posts for each locale
  for (const post of blogPosts) {
    for (const locale of locales) {
      const blogPath = `/blog/${post.slug}`;
      const path = localizedPath(locale, blogPath);
      entries.push({
        url: `${BASE_URL}${path}`,
        lastModified: new Date(post.dateModified),
        changeFrequency: 'monthly',
        priority: 0.7,
        alternates: {
          languages: buildAlternateLanguages(blogPath),
        },
      });
    }
  }

  return entries;
}
