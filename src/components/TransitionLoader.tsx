'use client';

import Image from 'next/image';
import { usePathname, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import { useTheme } from '@/components/ThemeProvider';

export default function TransitionLoader() {
  const t = useTranslations('common');
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setLoading(false);
  }, [pathname, searchParams]);

  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');

      if (!anchor) return;

      const href = anchor.getAttribute('href');
      const targetAttr = anchor.getAttribute('target');

      if (
        href &&
        (href.startsWith('/') || href.startsWith(window.location.origin)) &&
        targetAttr !== '_blank' &&
        !e.defaultPrevented &&
        e.button === 0 &&
        !e.metaKey &&
        !e.ctrlKey &&
        !e.shiftKey &&
        !e.altKey
      ) {
        try {
          const currentUrl = new URL(window.location.href);
          const targetUrl = new URL(href, window.location.href);

          if (
            currentUrl.pathname !== targetUrl.pathname ||
            currentUrl.search !== targetUrl.search
          ) {
            setLoading(true);
          }
        } catch {
          // Fallback if URL parsing fails
        }
      }
    };

    window.addEventListener('click', handleAnchorClick);
    return () => {
      window.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  if (!loading) return null;

  const iconSrc = theme === 'dark' ? '/logo-icon-dark-192.webp' : '/logo-icon-192.webp';

  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[var(--bg-primary)]/80 backdrop-blur-sm animate-fade-in select-none">
      <div className="relative flex items-center justify-center">
        <div className="absolute w-14 h-14 rounded-full border-2 border-[var(--border-color)] border-t-[var(--accent)] animate-spin" />
        <Image
          src={iconSrc}
          alt="PDFWritter"
          width={96}
          height={96}
          className="relative h-8 w-8 object-contain"
        />
      </div>
      <p className="mt-4 text-[10px] font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">
        {t('loading')}
      </p>
    </div>
  );
}
