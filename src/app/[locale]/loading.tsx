'use client';

import Image from 'next/image';

import { useTheme } from '@/components/ThemeProvider';

export default function Loading() {
  const { theme } = useTheme();
  const iconSrc = theme === 'dark' ? '/logo-icon-dark-192.png' : '/logo-icon-192.png';

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full p-6">
      <div className="relative flex items-center justify-center">
        <div className="absolute w-20 h-20 rounded-full bg-[#E53935]/10 blur-xl animate-pulse" />
        <Image
          key={iconSrc}
          src={iconSrc}
          alt=""
          width={192}
          height={192}
          unoptimized
          className="relative h-14 w-14 animate-pulse object-contain transition-opacity duration-300"
          aria-hidden
        />
      </div>

      <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-[var(--text-secondary)] animate-pulse">
        Loading Page
      </p>
    </div>
  );
}
