'use client';

import { ArrowRight, Check, Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';

import ConverterTool from '@/components/ConverterTool';
import FAQAccordion from '@/components/FAQAccordion';
import PageHero from '@/components/PageHero';
import ScrollReveal from '@/components/ScrollReveal';
import SectionHeading from '@/components/SectionHeading';
import type { SeoLandingContent } from '@/content/seo-landings';
import { Link } from '@/i18n/navigation';

type Props = {
  content: SeoLandingContent;
  locale: string;
};

export default function SeoIntentLanding({ content }: Props) {
  const t = useTranslations('common');
  return (
    <>
      <PageHero
        badge={content.badge}
        badgeIcon={Sparkles}
        title={
          <>
            {content.h1Before}
            <span style={{ color: content.accentColor }}>{content.h1Highlight}</span>
            {content.h1After}
          </>
        }
        subtitle={content.description}
        accentColor={content.accentColor}
        glowColor={content.glowColor}
      />

      <ConverterTool type="pdf" />

      <section className="section-py relative">
        <div className="page-container max-w-3xl space-y-3">
          {content.intro.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className="text-sm text-[var(--text-secondary)] leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <section className="section-py section-divider relative">
        <div className="page-container">
          <ScrollReveal>
            <SectionHeading size="compact" title={content.howTitle} subtitle={content.howSubtitle} />
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {content.steps.map((step, i) => (
              <ScrollReveal key={step.title} delay={i * 80}>
                <article className="card-glass h-full">
                  <div
                    className="text-xs font-semibold tracking-wide mb-2 font-mono"
                    style={{ color: content.accentColor }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <h2 className="text-sm font-semibold mb-1.5">{step.title}</h2>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{step.desc}</p>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-py relative">
        <div className="page-container">
          <ScrollReveal>
            <SectionHeading size="compact" title={content.featuresTitle} />
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {content.features.map((feat, i) => (
              <ScrollReveal key={feat.title} delay={i * 60}>
                <div className="flex gap-3 p-4 rounded-lg border border-[var(--border-color)] bg-[var(--bg-primary)]">
                  <Check className="w-4 h-4 shrink-0 mt-0.5" style={{ color: content.accentColor }} />
                  <div>
                    <h3 className="text-sm font-semibold mb-1">{feat.title}</h3>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{feat.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-py section-divider relative">
        <div className="page-container max-w-3xl">
          <ScrollReveal>
            <SectionHeading size="compact" title={t('faqSectionTitle')} />
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <FAQAccordion items={content.faqs} />
          </ScrollReveal>
        </div>
      </section>

      <section className="pb-10">
        <div className="page-container max-w-4xl">
          <div className="card-glass p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-semibold mb-1">{content.ctaTitle}</h2>
              <p className="text-sm text-[var(--text-secondary)]">{content.ctaDescription}</p>
            </div>
            <Link href={content.ctaHref} className="btn-primary shrink-0">
              {content.ctaLabel}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="page-container max-w-4xl">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-tertiary)] mb-3">
            {t('relatedToolsGuides')}
          </h2>
          <ul className="flex flex-wrap gap-2">
            {content.related.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-md border border-[var(--border-color)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors cursor-pointer"
                >
                  {item.label}
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
