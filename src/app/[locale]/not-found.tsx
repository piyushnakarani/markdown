'use client';

import { FileQuestion, Home, Search } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/navigation';

export default function NotFound() {
  const t = useTranslations('notFound');

  return (
    <section className="relative flex min-h-[70vh] flex-col items-center justify-center px-4 py-20 text-center">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)]">
        <FileQuestion className="h-8 w-8 text-[var(--accent)]" aria-hidden />
      </div>

      <p className="mb-2 font-mono text-sm font-semibold uppercase tracking-widest text-[var(--accent)]">
        {t('code')}
      </p>

      <h1 className="mb-3 text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
        {t('title')}
      </h1>

      <p className="mb-8 max-w-md text-sm leading-relaxed text-[var(--text-secondary)]">
        {t('description')}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link href="/" className="btn-primary">
          <Home className="h-4 w-4" aria-hidden />
          {t('home')}
        </Link>
        <Link href="/free-markdown-converter" className="btn-secondary">
          <Search className="h-4 w-4" aria-hidden />
          {t('tools')}
        </Link>
      </div>
    </section>
  );
}
