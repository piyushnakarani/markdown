import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';

import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

const CANONICAL_HOST = (
  process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, '') || 'https://www.pdfwritter.com'
).replace(/^https?:\/\//, '');

const ROOT_FILES = new Set(['/robots.txt', '/sitemap.xml', '/llms.txt', '/llms-full.txt']);

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
