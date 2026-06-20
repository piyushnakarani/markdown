import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: ['/', '/(en|es|fr|de|pt|ar|hi|zh|ja|ko|bn|ru)/:path*'],
};
