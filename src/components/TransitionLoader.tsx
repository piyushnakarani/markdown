'use client';

import Image from 'next/image';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useTheme } from '@/components/ThemeProvider';

export default function TransitionLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();

  // Reset loader when pathname or search params change (meaning navigation completed)
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

      // Intercept left clicks on same-domain paths that are not targeted to new tabs
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

          // Only show loader if we are navigating to a different page or different query parameters
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
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[var(--bg-primary)]/75 backdrop-blur-sm animate-fade-in select-none">
      <div className="relative flex items-center justify-center">
        {/* Spinning outer loader ring */}
        <div className="absolute w-20 h-20 rounded-full border-2 border-t-[#3b82f6] border-r-transparent border-b-[#8b5cf6] border-l-transparent animate-spin duration-700" />
        <div className="absolute w-16 h-16 rounded-full bg-[#3b82f6]/5 blur-md" />
        <Image
          src={iconSrc}
          alt=""
          aria-hidden
          width={96}
          height={96}
          className="relative h-10 w-10 object-contain animate-pulse"
        />
      </div>
      <p className="mt-5 text-[9px] font-extrabold uppercase tracking-widest text-[var(--text-secondary)] animate-pulse">
        PDFWritter
      </p>
    </div>
  );
}
