import type { MetadataRoute } from 'next';

import { SITE_URL } from '@/lib/site';

const allowAll = {
  userAgent: '*',
  allow: ['/', '/_next/static/', '/llms.txt', '/llms-full.txt'],
  disallow: ['/api/'],
};

const aiBots = [
  'GPTBot',
  'ChatGPT-User',
  'OAI-SearchBot',
  'ClaudeBot',
  'anthropic-ai',
  'PerplexityBot',
  'Google-Extended',
  'Applebot-Extended',
  'cohere-ai',
  'Bytespider',
  'CCBot',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      allowAll,
      ...aiBots.map((userAgent) => ({
        userAgent,
        allow: '/',
        disallow: ['/api/'],
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
