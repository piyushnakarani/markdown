import type { Locale } from '@/i18n/locales';
import { locales } from '@/i18n/locales';

/**
 * Single source of truth for indexable product/tool URLs in the sitemap.
 * Blog paths are English-only and listed separately in sitemap.ts.
 */
export const INDEXABLE_PRODUCT_PATHS = [
  '',
  '/markdown-to-pdf',
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
  '/pandoc-alternative',
  '/markdown-fixer',
  '/privacy',
  '/terms',
] as const;

export type ProductPath = (typeof INDEXABLE_PRODUCT_PATHS)[number];

/** Tool routes linked from header/footer hubs (excludes legal & static resource pages). */
export const PRODUCT_TOOL_PATHS: readonly ProductPath[] = [
  '/markdown-to-pdf',
  '/markdown-to-html',
  '/markdown-to-txt',
  '/markdown-to-docx',
  '/obsidian-to-pdf',
  '/notion-to-pdf',
  '/github-readme-to-pdf',
  '/markdown-to-pdf-resume',
  '/markdown-live-preview',
  '/editor',
  '/free-markdown-converter',
  '/chatgpt-to-pdf',
  '/ai-markdown-to-pdf',
  '/mermaid-markdown-to-pdf',
  '/pandoc-alternative',
  '/markdown-fixer',
];

export const PRODUCT_RESOURCE_PATHS: readonly ProductPath[] = ['/help', '/about', '/contact'];

export const PRODUCT_LEGAL_PATHS: readonly ProductPath[] = ['/privacy', '/terms'];

/** ISO date of the last sitewide internal-linking / route revision (sitemap lastmod). */
export const SITE_CONTENT_REVISION = '2026-10-16';

export function lastModifiedForProductPath(_path: ProductPath): Date {
  return new Date(SITE_CONTENT_REVISION);
}

export const ALL_INDEXABLE_LOCALES: readonly Locale[] = locales;
