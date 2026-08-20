import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

const TODAY = new Date().toISOString().split('T')[0];

// Core product pages - only English (INDEXABLE_LOCALES)
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

// Priority mapping based on SEO best practices 2026
const pagePriority: Record<string, number> = {
  '': 1.0, // homepage
  '/markdown-to-pdf': 0.9,
  '/md-to-pdf': 0.9,
  '/markdown-to-html': 0.9,
  '/obsidian-to-pdf': 0.8,
  '/notion-to-pdf': 0.8,
  '/github-readme-to-pdf': 0.8,
  '/free-markdown-converter': 0.8,
  '/chatgpt-to-pdf': 0.8,
  '/ai-markdown-to-pdf': 0.8,
  '/mermaid-markdown-to-pdf': 0.8,
  '/markdown-to-txt': 0.7,
  '/markdown-to-docx': 0.7,
  '/markdown-to-pdf-resume': 0.7,
  '/markdown-live-preview': 0.7,
  '/editor': 0.7,
  '/about': 0.5,
  '/contact': 0.5,
  '/help': 0.5,
  '/privacy': 0.5,
  '/terms': 0.5,
};

// Changefreq mapping based on SEO best practices 2026
const changefreq: Record<string, 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'> = {
  '': 'daily',
  '/markdown-to-pdf': 'weekly',
  '/md-to-pdf': 'weekly',
  '/markdown-to-html': 'weekly',
  '/obsidian-to-pdf': 'weekly',
  '/notion-to-pdf': 'weekly',
  '/github-readme-to-pdf': 'weekly',
  '/free-markdown-converter': 'weekly',
  '/chatgpt-to-pdf': 'weekly',
  '/ai-markdown-to-pdf': 'weekly',
  '/mermaid-markdown-to-pdf': 'weekly',
  '/markdown-to-txt': 'monthly',
  '/markdown-to-docx': 'monthly',
  '/markdown-to-pdf-resume': 'monthly',
  '/markdown-live-preview': 'monthly',
  '/editor': 'monthly',
  '/about': 'monthly',
  '/contact': 'monthly',
  '/help': 'monthly',
  '/privacy': 'monthly',
  '/terms': 'monthly',
};

export default function sitemapPages(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const page of LOCALIZED_PAGES) {
    const priority = pagePriority[page] || 0.5;
    const freq = changefreq[page] || 'monthly';
    const url = page === '' ? `${SITE_URL}/` : `${SITE_URL}${page}`;
    
    entries.push({
      url,
      lastModified: TODAY,
      changeFrequency: freq,
      priority,
    });
  }

  return entries;
}