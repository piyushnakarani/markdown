'use client';

import NextLink from 'next/link';
import { useLocale, useTranslations } from 'next-intl';

import { type Locale, localeNames, locales } from '@/i18n/locales';
import { getPathname, usePathname } from '@/i18n/navigation';

const linkClass =
  'text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors duration-150';

/**
 * Crawlable locale links for SEO (real <a href>).
 * Complements the JS language switcher so every sitemap locale URL gets inbound internal links.
 */
type Props = {
  variant?: 'default' | 'footer';
};

export default function CrawlableLocaleNav({ variant = 'default' }: Props) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const t = useTranslations('footer');

  const isBlogPath = pathname === '/blog' || pathname.startsWith('/blog/');
  const isFooter = variant === 'footer';
  const wrapClass = isFooter ? 'site-footer-locale-block' : 'space-y-4';
  const labelClass = isFooter ? 'site-footer-locale-label' : 'text-xs font-semibold text-[var(--text-tertiary)] uppercase tracking-wider mb-2';
  const listClass = isFooter ? 'site-footer-locale-list' : 'flex flex-wrap gap-x-3 gap-y-1.5';

  return (
    <div className={wrapClass}>
      <div>
        <p className={labelClass}>{t('languageHomes')}</p>
        <ul className={listClass}>
          {locales.map((loc) => {
            const href = getPathname({ href: '/', locale: loc });
            const isCurrent = loc === locale && pathname === '/';
            return (
              <li key={loc}>
                <NextLink
                  href={href}
                  hrefLang={loc}
                  lang={loc}
                  className={`${linkClass} ${isCurrent ? 'text-[var(--accent)] font-medium' : ''}`}
                  aria-current={isCurrent ? 'page' : undefined}
                >
                  {localeNames[loc]}
                </NextLink>
              </li>
            );
          })}
        </ul>
      </div>

      {!isBlogPath && pathname !== '/' && (
        <div className={isFooter ? 'site-footer-locale-block-secondary' : undefined}>
          <p className={labelClass}>{t('languageThisPage')}</p>
          <ul className={listClass}>
            {locales.map((loc) => {
              const href = getPathname({ href: pathname, locale: loc });
              const isCurrent = loc === locale;
              return (
                <li key={loc}>
                  <NextLink
                    href={href}
                    hrefLang={loc}
                    lang={loc}
                    className={`${linkClass} ${isCurrent ? 'text-[var(--accent)] font-medium' : ''}`}
                    aria-current={isCurrent ? 'page' : undefined}
                  >
                    {localeNames[loc]}
                  </NextLink>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
