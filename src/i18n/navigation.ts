import NextLink from 'next/link';
import { createNavigation } from 'next-intl/navigation';
import { type ComponentProps,createElement } from 'react';

import { routing } from './routing';

const nav = createNavigation(routing);

export const { redirect, usePathname, useRouter, getPathname } = nav;

export function Link({ href, locale, ...rest }: ComponentProps<typeof nav.Link>) {
  if (typeof href === 'string' && href.startsWith('/blog')) {
    // Blog is English-only — skip locale prefixing from next-intl Link.
    return createElement(NextLink, { href, ...rest });
  }
  return createElement(nav.Link, { href, locale, ...rest });
}
