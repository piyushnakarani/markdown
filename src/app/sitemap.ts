import { MetadataRoute } from 'next';

import { blogPosts } from '@/content/blog';
import {
  buildAlternateLanguages,
  INDEXABLE_LOCALES,
  localizedPath,
  SITE_URL,
} from '@/lib/site';
import {
  INDEXABLE_PRODUCT_PATHS,
  lastModifiedForProductPath,
  type ProductPath,
} from '@/lib/site-routes';

const BASE_URL = SITE_URL;

/**
 * Blog has no per-locale content. Index only English paths:
 * /blog and /blog/{slug} — never /es/blog/... etc.
 * Product pages include every INDEXABLE_LOCALE (all UI locales).
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  const seen = new Set<string>();

  for (const page of INDEXABLE_PRODUCT_PATHS) {
    for (const locale of INDEXABLE_LOCALES) {
      const path = localizedPath(locale, page);
      const url = `${BASE_URL}${path}`;
      if (seen.has(url)) continue;
      seen.add(url);

      entries.push({
        url,
        lastModified: lastModifiedForProductPath(page as ProductPath),
        changeFrequency: page === '' ? 'daily' : 'weekly',
        priority: page === '' ? 1.0 : page.includes('markdown') ? 0.9 : 0.7,
        alternates: {
          languages: buildAlternateLanguages(page),
        },
      });
    }
  }

  const blogIndexUrl = `${BASE_URL}/blog`;
  if (!seen.has(blogIndexUrl)) {
    seen.add(blogIndexUrl);
    entries.push({
      url: blogIndexUrl,
      lastModified: new Date(
        blogPosts.reduce(
          (max, p) => (p.dateModified > max ? p.dateModified : max),
          '2026-01-01',
        ),
      ),
      changeFrequency: 'weekly',
      priority: 0.8,
    });
  }

  for (const post of blogPosts) {
    const url = `${BASE_URL}/blog/${post.slug}`;
    if (seen.has(url)) continue;
    seen.add(url);
    entries.push({
      url,
      lastModified: new Date(post.dateModified),
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  }

  return entries;
}
