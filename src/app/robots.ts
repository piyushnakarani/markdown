import type { MetadataRoute } from 'next';

import { SITE_URL } from '@/lib/site';

/** Explicit allow list for search + AI crawlers (GEO / AI search visibility). */
const ALLOWED_BOTS = [
  'GPTBot',
  'ChatGPT-User',
  'anthropic-ai',
  'Google-Extended',
  'Gemini-Deep-Research',
  'PerplexityBot',
  'CCBot',
  'Bytespider',
  'MistralAI-User',
  'DeepSeekBot',
  'cohere-ai',
  'Meta-ExternalAgent',
  'bedrockbot',
  'bigsur.ai',
  'Googlebot',
  'Googlebot-News',
  'Bingbot',
  'DuckDuckBot',
  'GigaBot',
  'Nutch',
  'AhrefsBot',
] as const;

/** Paths that should not be crawled (APIs, private endpoints). */
const DISALLOW = ['/api/'] as const;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [...DISALLOW],
      },
      ...ALLOWED_BOTS.map((userAgent) => ({
        userAgent,
        allow: '/',
        disallow: [...DISALLOW],
      })),
    ],
    sitemap: `${SITE_URL}/sitemap-index.xml`,
  };
}
