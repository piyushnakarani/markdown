'use client';

import { ArrowRight, Check, Sparkles } from 'lucide-react';

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
  return (
    <>
      <PageHero
        badge={content.badge}
        badgeIcon={Sparkles}
        title={
          <>
            {content.h1Before}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: `linear-gradient(90deg, ${content.accentColor}, #f97316)`,
              }}
            >
              {content.h1Highlight}
            </span>
            {content.h1After}
          </>
        }
        subtitle={content.description}
        accentColor={content.accentColor}
        glowColor={content.glowColor}
      />

      <ConverterTool type="pdf" />

      <section className="section-py relative">
        <div className="page-container max-w-3xl space-y-4">
          {content.intro.map((paragraph) => (
            <p key={paragraph.slice(0, 24)} className="text-[var(--text-secondary)] leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <section className="section-py section-divider relative">
        <div className="page-container">
          <ScrollReveal>
            <SectionHeading title={content.howTitle} subtitle={content.howSubtitle} />
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
            {content.steps.map((step, i) => (
              <ScrollReveal key={step.title} delay={i * 80}>
                <article className="card-glass p-6 h-full">
                  <div
                    className="text-xs font-bold tracking-widest mb-3"
                    style={{ color: content.accentColor }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <h2 className="text-lg font-bold mb-2">{step.title}</h2>
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
            <SectionHeading title={content.featuresTitle} />
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-8">
            {content.features.map((feat, i) => (
              <ScrollReveal key={feat.title} delay={i * 60}>
                <div className="flex gap-3 p-5 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)]/40">
                  <Check className="w-5 h-5 shrink-0 mt-0.5" style={{ color: content.accentColor }} />
                  <div>
                    <h3 className="font-semibold mb-1">{feat.title}</h3>
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
            <SectionHeading title="Frequently asked questions" />
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <FAQAccordion items={content.faqs} />
          </ScrollReveal>
        </div>
      </section>

      <section className="pb-12">
        <div className="page-container max-w-4xl">
          <div className="card-glass p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h2 className="text-xl font-bold mb-2">{content.ctaTitle}</h2>
              <p className="text-sm text-[var(--text-secondary)]">{content.ctaDescription}</p>
            </div>
            <Link href={content.ctaHref} className="btn-primary shrink-0">
              {content.ctaLabel}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="page-container max-w-4xl">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[var(--text-tertiary)] mb-4">
            Related tools & guides
          </h2>
          <ul className="flex flex-wrap gap-3">
            {content.related.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-1.5 text-sm px-3 py-2 rounded-xl border border-[var(--border-color)] hover:border-[#3b82f6]/40 hover:text-[#3b82f6] transition-colors"
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
