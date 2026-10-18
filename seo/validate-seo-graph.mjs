/**
 * Simulates internal-link discoverability for sitemap URLs (orphan-page audit).
 * Keep INDEXABLE_PRODUCT_PATHS in sync with src/lib/site-routes.ts.
 *
 * Run: npm run validate:seo
 */

const LOCALES = ['en', 'es', 'fr', 'de', 'pt', 'ar', 'zh-Hans', 'ja', 'ko', 'bn', 'ru'];
const DEFAULT_LOCALE = 'en';

const INDEXABLE_PRODUCT_PATHS = [
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
];

const PRODUCT_TOOL_PATHS = INDEXABLE_PRODUCT_PATHS.filter(
  (p) =>
    p &&
    !['/about', '/contact', '/help', '/privacy', '/terms'].includes(p),
);

function localizedPath(locale, path) {
  const suffix = path || '';
  if (locale === DEFAULT_LOCALE) return suffix || '/';
  return `/${locale}${suffix}`;
}

function parsePath(url) {
  if (url === '/') return { locale: DEFAULT_LOCALE, suffix: '' };
  const parts = url.split('/').filter(Boolean);
  if (LOCALES.includes(parts[0])) {
    return { locale: parts[0], suffix: parts.length > 1 ? `/${parts.slice(1).join('/')}` : '' };
  }
  return { locale: DEFAULT_LOCALE, suffix: `/${parts.join('/')}` };
}

function outgoingLinks(url) {
  const { locale, suffix } = parsePath(url);
  const out = new Set();

  for (const loc of LOCALES) {
    out.add(localizedPath(loc, ''));
  }

  const isBlog = suffix === '/blog' || suffix.startsWith('/blog/');
  if (!isBlog && suffix !== '') {
    for (const loc of LOCALES) {
      out.add(localizedPath(loc, suffix));
    }
  }

  for (const tool of PRODUCT_TOOL_PATHS) {
    out.add(localizedPath(locale, tool));
  }

  for (const resource of ['/help', '/about', '/contact', '/privacy', '/terms']) {
    out.add(localizedPath(locale, resource));
  }

  out.add('/blog');

  return out;
}

function allSitemapProductUrls() {
  const urls = new Set();
  for (const page of INDEXABLE_PRODUCT_PATHS) {
    for (const locale of LOCALES) {
      urls.add(localizedPath(locale, page));
    }
  }
  return urls;
}

function bfsReachable(start) {
  const seen = new Set([start]);
  const queue = [start];
  while (queue.length) {
    const current = queue.shift();
    for (const next of outgoingLinks(current)) {
      if (!seen.has(next)) {
        seen.add(next);
        queue.push(next);
      }
    }
  }
  return seen;
}

const sitemapUrls = allSitemapProductUrls();
const reachable = bfsReachable('/');
const orphans = [...sitemapUrls].filter((u) => !reachable.has(u));

if (orphans.length > 0) {
  console.error(`SEO graph validation FAILED: ${orphans.length} orphaned product URLs`);
  orphans.slice(0, 30).forEach((u) => console.error(`  - ${u}`));
  if (orphans.length > 30) console.error(`  ... and ${orphans.length - 30} more`);
  process.exit(1);
}

console.log(
  `SEO graph validation OK: ${sitemapUrls.size} localized product URLs reachable from / via footer/locale nav model.`,
);
