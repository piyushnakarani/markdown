'use client';

import Image from 'next/image';

import { useTheme } from '@/components/ThemeProvider';
import { Link } from '@/i18n/navigation';

export const LOGO_WIDTH = 909;
export const LOGO_HEIGHT = 279;
export const LOGO_ASPECT = LOGO_WIDTH / LOGO_HEIGHT;

type SiteLogoProps = {
  variant?: 'header' | 'footer' | 'hero';
  className?: string;
  linked?: boolean;
};

const HEIGHTS = {
  header: 38,
  footer: 44,
  hero: 52,
} as const;

export default function SiteLogo({
  variant = 'header',
  className = '',
  linked = true,
}: SiteLogoProps) {
  const { theme } = useTheme();
  const height = HEIGHTS[variant];
  const width = Math.round(height * LOGO_ASPECT);
  const src = theme === 'dark' ? '/logo-dark.webp' : '/logo.webp';

  const image = (
    <Image
      key={src}
      src={src}
      alt="PDFWritter — Markdown converter with diagram"
      width={LOGO_WIDTH}
      height={LOGO_HEIGHT}
      priority={variant === 'header'}
      quality={100}
      unoptimized
      className={`block h-auto max-w-full object-contain object-left select-none transition-opacity duration-300 ${className}`}
      style={{ height, width }}
    />
  );

  if (!linked) {
    return image;
  }

  return (
    <Link
      href="/"
      className="inline-flex shrink-0 items-center transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3b82f6] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)] rounded-sm"
      aria-label="PDFWritter Home"
    >
      {image}
    </Link>
  );
}
