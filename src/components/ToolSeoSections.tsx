import {
  Check,
  GitBranch,
  HelpCircle,
  Lock,
  MousePointerClick,
  Shield,
  Sparkles,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { CSSProperties } from 'react';

import FAQAccordion from '@/components/FAQAccordion';
import RelatedBlogGuides from '@/components/RelatedBlogGuides';
import ScrollReveal from '@/components/ScrollReveal';
import SectionHeading from '@/components/SectionHeading';
import { buildFaqPageJsonLd, buildHowToJsonLd } from '@/lib/structured-data';

type Step = {
  title: string;
  description: string;
};

type Feature = {
  title: string;
  description: string;
};

type Comparison = {
  ours: string;
  theirs: string;
};

type Faq = {
  q: string;
  a: string;
};

type ToolSeoSectionsProps = {
  whatTitle: string;
  whatDescription: string;
  howTitle: string;
  howSubtitle: string;
  steps: Step[];
  featuresTitle: string;
  featuresSubtitle: string;
  features: Feature[];
  compareTitle: string;
  compareUs: string;
  compareThem: string;
  comparisons: Comparison[];
  mermaidTitle: string;
  mermaidDescription: string;
  faqTitle: string;
  faqs: Faq[];
  relatedGuidesToolKey?: string;
  relatedGuidesTitle?: string;
  accentColor: string;
  locale: string;
  path: string;
};

export default function ToolSeoSections({
  whatTitle,
  whatDescription,
  howTitle,
  howSubtitle,
  steps,
  featuresTitle,
  featuresSubtitle,
  features,
  compareTitle,
  compareUs,
  compareThem,
  comparisons,
  mermaidTitle,
  mermaidDescription,
  faqTitle,
  faqs,
  relatedGuidesToolKey,
  relatedGuidesTitle,
  accentColor,
  locale,
  path,
}: ToolSeoSectionsProps) {
  const t = useTranslations('common');
  return (
    <>
      <section className="section-py relative">
        <div className="page-container max-w-4xl">
          <ScrollReveal>
            <div className="card-glass p-5 sm:p-6">
              <div className="flex items-start gap-3.5">
                <div
                  className="w-10 h-10 rounded-md flex items-center justify-center shrink-0 border border-[var(--border-color)]"
                  style={{ background: `color-mix(in srgb, ${accentColor} 10%, transparent)` }}
                >
                  <HelpCircle className="w-5 h-5" style={{ color: accentColor }} />
                </div>
                <div>
                  <h2 className="text-lg font-semibold mb-2">{whatTitle}</h2>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{whatDescription}</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-py relative">
        <div className="relative page-container">
          <ScrollReveal>
            <SectionHeading size="compact" title={howTitle} subtitle={howSubtitle} />
          </ScrollReveal>

          <div className="workflow-steps">
            {steps.map((step, index) => (
              <div key={step.title} className="contents">
                <ScrollReveal delay={index * 80}>
                  <article
                    className="workflow-step group h-full"
                    data-step={String(index + 1).padStart(2, '0')}
                    style={{ '--step-color': accentColor } as CSSProperties}
                  >
                    <div className="relative z-10">
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <div className="workflow-step-icon" style={{ color: accentColor }}>
                          <MousePointerClick className="w-5 h-5" strokeWidth={2} />
                        </div>
                        <span className="workflow-step-badge">{String(index + 1).padStart(2, '0')}</span>
                      </div>
                      <h3 className="workflow-step-title text-base font-semibold mb-1.5 tracking-tight">{step.title}</h3>
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{step.description}</p>
                    </div>
                  </article>
                </ScrollReveal>
                {index < steps.length - 1 && (
                  <div className="workflow-connector hidden md:flex" aria-hidden>
                    <div className="workflow-connector-line" />
                    <MousePointerClick className="workflow-connector-arrow w-4 h-4 shrink-0 opacity-40" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-py relative">
        <div className="page-container">
          <ScrollReveal>
            <SectionHeading size="compact" title={featuresTitle} subtitle={featuresSubtitle} />
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {features.map((feature, index) => (
              <ScrollReveal key={feature.title} delay={index * 60}>
                <div className="card-glass group h-full">
                  <div
                    className="w-8 h-8 rounded-md flex items-center justify-center mb-3 border border-[var(--border-color)]"
                    style={{ background: `color-mix(in srgb, ${accentColor} 10%, transparent)` }}
                  >
                    <Sparkles className="w-4 h-4" style={{ color: accentColor }} />
                  </div>
                  <h3 className="text-sm font-semibold mb-1.5">{feature.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{feature.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-py section-divider relative">
        <div className="page-container max-w-4xl">
          <ScrollReveal>
            <SectionHeading size="compact" title={compareTitle} />
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <div className="rounded-lg border border-[var(--border-color)] bg-[var(--bg-primary)] overflow-hidden">
              <div className="grid grid-cols-2 border-b border-[var(--border-color)] bg-[var(--bg-tertiary)]">
                <div className="px-4 py-2.5 text-sm font-semibold" style={{ color: accentColor }}>{compareUs}</div>
                <div className="px-4 py-2.5 text-sm font-semibold text-[var(--text-tertiary)] border-l border-[var(--border-color)]">
                  {compareThem}
                </div>
              </div>
              {comparisons.map((row) => (
                <div key={row.ours} className="grid grid-cols-2 border-b border-[var(--border-color)] last:border-b-0">
                  <div className="px-4 py-2.5 text-sm text-[var(--text-secondary)] flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-[var(--accent)] shrink-0 mt-0.5" />
                    {row.ours}
                  </div>
                  <div className="px-4 py-2.5 text-sm text-[var(--text-tertiary)] border-l border-[var(--border-color)]">
                    {row.theirs}
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-py relative">
        <div className="page-container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            <ScrollReveal>
              <div className="card-glass h-full">
                <Shield className="w-6 h-6 text-[var(--accent)] mb-3" />
                <h2 className="text-sm font-semibold mb-1.5">{t('privacyCardTitle')}</h2>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {t('privacyCardDesc')}
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <div className="card-glass h-full">
                <GitBranch className="w-6 h-6 text-[var(--accent)] mb-3" />
                <h2 className="text-sm font-semibold mb-1.5">{mermaidTitle}</h2>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{mermaidDescription}</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={160}>
              <div className="card-glass h-full">
                <Lock className="w-6 h-6 text-[var(--accent)] mb-3" />
                <h2 className="text-sm font-semibold mb-1.5">{t('noSignupCardTitle')}</h2>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {t('noSignupCardDesc')}
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {relatedGuidesToolKey && (
        <RelatedBlogGuides
          toolKey={relatedGuidesToolKey}
          title={relatedGuidesTitle}
          accentColor={accentColor}
        />
      )}

      <section className="section-py relative">
        <div className="page-container max-w-3xl">
          <ScrollReveal>
            <SectionHeading size="compact" title={faqTitle} />
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <FAQAccordion items={faqs} />
          </ScrollReveal>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildFaqPageJsonLd(faqs, locale, path)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildHowToJsonLd(howTitle, steps, locale, path)),
        }}
      />
    </>
  );
}
