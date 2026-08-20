import type { MetadataRoute } from 'next';
import { blogPosts } from '@/content/blog';

const TODAY = new Date().toISOString().split('T')[0];

export default function sitemapBlog(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  // Blog index
  entries.push({
    url: '/blog',
    lastModified: TODAY,
    changeFrequency: 'weekly',
    priority: 0.8,
  });

  // Blog posts - 21 posts with their actual lastmod dates
  for (const post of blogPosts) {
    const slug = post.slug;
    const lastMod = post.dateModified ? new Date(post.dateModified).toISOString().split('T')[0] : TODAY;

    entries.push({
      url: `/blog/${slug}`,
      lastModified: lastMod,
      changeFrequency: 'monthly',
      priority: 0.7,
    });
  }

  return entries;
}