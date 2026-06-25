'use client';

import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/navigation';

import EditorClient from './EditorClient';
import ScrollReveal from './ScrollReveal';

export default function EditorShowcase() {
  const t = useTranslations('editorShowcase');

  return (
    <section className="section-py relative overflow-hidden">
      <div className="relative page-container">
        <ScrollReveal>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
            <div className="max-w-xl">
              <span className="section-badge mb-3 inline-flex">{t('badge')}</span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight leading-tight mb-3">
                {t('title')}
              </h2>
              <p className="text-[var(--text-secondary)] text-sm sm:text-base leading-relaxed">
                {t('subtitle')}
              </p>
            </div>
            <Link href="/editor" className="btn-primary shrink-0 self-start lg:self-auto">
              {t('cta')}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={120}>
          <EditorClient variant="embedded" />
        </ScrollReveal>
      </div>
    </section>
  );
}
