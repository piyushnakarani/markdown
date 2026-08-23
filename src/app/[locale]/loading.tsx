'use client';

import Image from 'next/image';

import { useTranslations } from 'next-intl';
import { useTheme } from '@/components/ThemeProvider';

export default function Loading() {
  const { theme } = useTheme();
  const t = useTranslations('common');
  const iconSrc = theme === 'dark' ? '/logo-icon-dark-192.webp' : '/logo-icon-192.webp';

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] w-full p-6">
      <div className="relative flex items-center justify-center">
        <div className="absolute w-12 h-12 rounded-full border-2 border-[var(--border-color)] border-t-[var(--accent)] animate-spin" />
        <Image
          key={iconSrc}
          src={iconSrc}
          alt="PDFWritter"
          width={192}
          height={192}
          className="relative h-8 w-8 object-contain"
        />
      </div>

      <p className="mt-4 text-[10px] font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">
        {t('loading')}
      </p>
    </div>
  );
}
