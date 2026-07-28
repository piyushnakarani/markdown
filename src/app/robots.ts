import type { MetadataRoute } from 'next';

import { SITE_URL } from '@/lib/site';

const allowAll = {
  userAgent: '*',
  allow: ['/', '/_next/static/', '/llms.txt', '/llms-full.txt'],
  disallow: ['/api/'],
};

/** AI search / assistant crawlers — keep open for GEO visibility. */
const aiSearchBots = [
  'GPTBot',
  'ChatGPT-User',
  'OAI-SearchBot',
  'ClaudeBot',
  'PerplexityBot',
  'Google-Extended',
  'Applebot-Extended',
  'FacebookBot',
  'Amazonbot',
];

/** Training-oriented crawlers — blocked; does not affect AI search bots above. */
const aiTrainingBots = ['CCBot', 'Bytespider', 'anthropic-ai', 'cohere-ai'];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      allowAll,
      ...aiSearchBots.map((userAgent) => ({
        userAgent,
        allow: '/',
        disallow: ['/api/'],
      })),
      ...aiTrainingBots.map((userAgent) => ({
        userAgent,
        disallow: ['/'],
      })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
