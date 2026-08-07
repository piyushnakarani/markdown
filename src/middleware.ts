import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';

import { defaultLocale, locales } from './i18n/locales';
import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

const CANONICAL_HOST = (
  process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, '') || 'https://www.pdfwritter.com'
).replace(/^https?:\/\//, '');

const ROOT_FILES = new Set(['/robots.txt', '/sitemap.xml', '/llms.txt', '/llms-full.txt']);

const NON_DEFAULT_LOCALES = locales.filter((l) => l !== defaultLocale).join('|');

/** Blog is English-only — /es/blog/... must not exist as indexable locale variants. */
const LOCALE_BLOG_RE = new RegExp(
  `^/(${locales.join('|')})(/blog(?:/.*)?)$`,
);

/**
 * Legacy bad hreflang URLs: /ar/en/about → /ar/about.
 * Keep 301s until Search Console drops the indexed 404s.
 */
const DOUBLE_EN_LOCALE_RE = new RegExp(
  `^/(${NON_DEFAULT_LOCALES})/en(?:/(.*))?$`,
);

export default function middleware(request: NextRequest) {
  const host = request.headers.get('host')?.split(':')[0];

  if (host && host !== CANONICAL_HOST && host.replace(/^www\./, '') === CANONICAL_HOST.replace(/^www\./, '')) {
    const url = request.nextUrl.clone();
    url.host = CANONICAL_HOST;
    url.protocol = 'https:';
    return NextResponse.redirect(url, 301);
  }

  if (ROOT_FILES.has(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  const localeBlog = request.nextUrl.pathname.match(LOCALE_BLOG_RE);
  if (localeBlog) {
    const url = request.nextUrl.clone();
    url.pathname = localeBlog[2];
    return NextResponse.redirect(url, 301);
  }

  const doubleEn = request.nextUrl.pathname.match(DOUBLE_EN_LOCALE_RE);
  if (doubleEn) {
    const url = request.nextUrl.clone();
    const rest = doubleEn[2] ? `/${doubleEn[2]}` : '';
    url.pathname = `/${doubleEn[1]}${rest}`;
    return NextResponse.redirect(url, 301);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    '/((?!api|_next|_vercel|.*\\..*).*)',
    '/llms.txt',
    '/llms-full.txt',
    '/robots.txt',
    '/sitemap.xml',
  ],
};
