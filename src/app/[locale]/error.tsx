'use client';

import { AlertTriangle, Home, RefreshCw } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

import { Link } from '@/i18n/navigation';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('error');

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="relative flex min-h-[70vh] flex-col items-center justify-center px-4 py-20 text-center">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)]">
        <AlertTriangle className="h-8 w-8 text-[var(--accent)]" aria-hidden />
      </div>

      <h1 className="mb-3 text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
        {t('title')}
      </h1>

      <p className="mb-8 max-w-md text-sm leading-relaxed text-[var(--text-secondary)]">
        {t('description')}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <button type="button" onClick={reset} className="btn-primary">
          <RefreshCw className="h-4 w-4" aria-hidden />
          {t('retry')}
        </button>
        <Link href="/" className="btn-secondary">
          <Home className="h-4 w-4" aria-hidden />
          {t('home')}
        </Link>
      </div>
    </section>
  );
}
