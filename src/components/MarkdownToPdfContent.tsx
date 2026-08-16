import {
  ArrowRight,
  Check,
  Download,
  Eye,
  FileText,
  GitBranch,
  Monitor,
  MousePointerClick,
  Shield,
  Sparkles,
  Upload,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import type { CSSProperties } from 'react';
import { Fragment } from 'react';

import ConverterTool from '@/components/ConverterTool';
import FAQAccordion from '@/components/FAQAccordion';
import PageHero from '@/components/PageHero';
import RelatedBlogGuides from '@/components/RelatedBlogGuides';
import ScrollReveal from '@/components/ScrollReveal';
import SectionHeading from '@/components/SectionHeading';
import { Link } from '@/i18n/navigation';
import { buildFaqPageJsonLd, buildHowToJsonLd, buildToolPageJsonLd } from '@/lib/structured-data';

type MarkdownToPdfContentProps = {
  locale: string;
  path: string;
};

export default function MarkdownToPdfContent({ locale, path }: MarkdownToPdfContentProps) {
  const t = useTranslations('markdownToPdf');

  const accent = '#ef4444';

  const howSteps = [
    {
      icon: Upload,
      num: '01',
      title: t('howStep1Title'),
      desc: t('howStep1Desc'),
    },
    {
      icon: Eye,
      num: '02',
      title: t('howStep2Title'),
      desc: t('howStep2Desc'),
    },
    {
      icon: Download,
      num: '03',
      title: t('howStep3Title'),
      desc: t('howStep3Desc'),
    },
  ];

  const features = [
    { icon: Monitor, title: t('feature1Title'), desc: t('feature1Desc') },
    { icon: GitBranch, title: t('feature2Title'), desc: t('feature2Desc') },
    { icon: Shield, title: t('feature3Title'), desc: t('feature3Desc') },
    { icon: Upload, title: t('feature4Title'), desc: t('feature4Desc') },
    { icon: FileText, title: t('feature5Title'), desc: t('feature5Desc') },
    { icon: Sparkles, title: t('feature6Title'), desc: t('feature6Desc') },
  ];

  const compareRows = [
    { us: t('compare1Us'), them: t('compare1Them') },
    { us: t('compare2Us'), them: t('compare2Them') },
    { us: t('compare3Us'), them: t('compare3Them') },
    { us: t('compare4Us'), them: t('compare4Them') },
  ];

  const faqs = [
    { q: t('faq1Q'), a: t('faq1A') },
    { q: t('faq2Q'), a: t('faq2A') },
    { q: t('faq3Q'), a: t('faq3A') },
    { q: t('faq4Q'), a: t('faq4A') },
    { q: t('faq5Q'), a: t('faq5A') },
    { q: t('faq6Q'), a: t('faq6A') },
    { q: t('faq7Q'), a: t('faq7A') },
    { q: t('faq8Q'), a: t('faq8A') },
    { q: t('faq9Q'), a: t('faq9A') },
    { q: t('faq10Q'), a: t('faq10A') },
  ];

  return (
    <>
      <PageHero
        badge={t('badge')}
        badgeIcon={Sparkles}
        title={
          <>
            {t('heroBefore')}
            <span style={{ color: accent }}>{t('heroHighlight')}</span>
            {t('heroAfter')}
          </>
        }
        subtitle={t('description')}
        accentColor={accent}
      />

      <ConverterTool type="pdf" />

      <section className="section-py relative">
        <div className="relative page-container">
          <ScrollReveal>
            <SectionHeading
              size="compact"
              badge={t('howBadge')}
              title={t('howTitle')}
              subtitle={t('howSubtitle')}
            />
          </ScrollReveal>

          <div className="workflow-steps">
            {howSteps.map((step, i) => (
              <Fragment key={step.num}>
                <ScrollReveal delay={i * 80}>
                  <article
                    className="workflow-step group h-full"
                    data-step={step.num}
                    style={{ '--step-color': accent } as CSSProperties}
                  >
                    <div className="relative z-10">
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <div className="workflow-step-icon" style={{ color: accent }}>
                          <step.icon className="w-5 h-5" strokeWidth={2} />
                        </div>
                        <span className="workflow-step-badge">{step.num}</span>
                      </div>
                      <h3 className="workflow-step-title text-base font-semibold mb-1.5 tracking-tight">
                        {step.title}
                      </h3>
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{step.desc}</p>
                    </div>
                  </article>
                </ScrollReveal>
                {i < howSteps.length - 1 && (
                  <div className="workflow-connector hidden md:flex" aria-hidden>
                    <div className="workflow-connector-line" />
                    <MousePointerClick className="workflow-connector-arrow w-4 h-4 shrink-0 opacity-40" />
                  </div>
                )}
              </Fragment>
            ))}
          </div>
        </div>
      </section>

      <section className="section-py section-divider relative">
        <div className="page-container">
          <ScrollReveal>
            <SectionHeading
              size="compact"
              title={t('featuresTitle')}
              subtitle={t('featuresSubtitle')}
            />
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {features.map((feature, i) => (
              <ScrollReveal key={feature.title} delay={i * 60}>
                <div className="card-glass group h-full">
                  <div
                    className="w-8 h-8 rounded-md flex items-center justify-center mb-3 border border-[var(--border-color)]"
                    style={{ background: `color-mix(in srgb, ${accent} 10%, transparent)` }}
                  >
                    <feature.icon className="w-4 h-4" style={{ color: accent }} />
                  </div>
                  <h3 className="text-sm font-semibold mb-1.5">{feature.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{feature.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-py relative">
        <div className="page-container max-w-4xl">
          <ScrollReveal>
            <SectionHeading size="compact" title={t('compareTitle')} />
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <div className="rounded-lg border border-[var(--border-color)] bg-[var(--bg-primary)] overflow-hidden">
              <div className="grid grid-cols-2 border-b border-[var(--border-color)] bg-[var(--bg-tertiary)]">
                <div className="px-4 py-2.5 text-sm font-semibold" style={{ color: accent }}>{t('compareUs')}</div>
                <div className="px-4 py-2.5 text-sm font-semibold text-[var(--text-tertiary)] border-l border-[var(--border-color)]">
                  {t('compareThem')}
                </div>
              </div>
              {compareRows.map((row) => (
                <div key={row.us} className="grid grid-cols-2 border-b border-[var(--border-color)] last:border-b-0">
                  <div className="px-4 py-2.5 text-sm text-[var(--text-secondary)] flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-[var(--accent)] shrink-0 mt-0.5" />
                    {row.us}
                  </div>
                  <div className="px-4 py-2.5 text-sm text-[var(--text-tertiary)] border-l border-[var(--border-color)]">
                    {row.them}
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-py section-divider relative">
        <div className="page-container max-w-4xl">
          <ScrollReveal>
            <SectionHeading
              size="compact"
              title="Popular Markdown to PDF workflows"
              subtitle="Capture the searches competitors rank for — same converter, clearer intent pages."
            />
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              {
                href: '/chatgpt-to-pdf',
                title: 'ChatGPT to PDF',
                desc: 'Paste ChatGPT answers and export a clean PDF.',
              },
              {
                href: '/ai-markdown-to-pdf',
                title: 'AI Markdown to PDF',
                desc: 'ChatGPT, Claude, and Gemini → PDF in one place.',
              },
              {
                href: '/mermaid-markdown-to-pdf',
                title: 'Mermaid to PDF',
                desc: 'Keep flowcharts and sequence diagrams in the PDF.',
              },
              {
                href: '/obsidian-to-pdf',
                title: 'Obsidian to PDF',
                desc: 'Export Obsidian notes with Mermaid diagrams and math.',
              },
              {
                href: '/notion-to-pdf',
                title: 'Notion to PDF',
                desc: 'Convert Notion pages (Markdown export) to PDF.',
              },
              {
                href: '/github-readme-to-pdf',
                title: 'GitHub README to PDF',
                desc: 'README.md to PDF with badges, code, and diagrams.',
              },
              {
                href: '/markdown-to-pdf-resume',
                title: 'Markdown Resume to PDF',
                desc: 'Turn a Markdown CV into a clean, ATS-friendly PDF.',
              },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="card-glass block hover:border-[var(--border-hover)] transition-colors cursor-pointer"
              >
                <h3 className="text-sm font-semibold mb-1" style={{ color: accent }}>{item.title}</h3>
                <p className="text-sm text-[var(--text-secondary)]">{item.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <RelatedBlogGuides toolKey="markdown-to-pdf" accentColor={accent} />

      <section className="section-py relative">
        <div className="page-container max-w-3xl">
          <ScrollReveal>
            <SectionHeading size="compact" title={t('faqTitle')} />
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <FAQAccordion items={faqs} />
          </ScrollReveal>
        </div>
      </section>

      <section className="pb-16">
        <div className="page-container max-w-4xl">
          <div className="card-glass p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-semibold mb-1">{t('ctaTitle')}</h2>
              <p className="text-sm text-[var(--text-secondary)]">{t('ctaDescription')}</p>
            </div>
            <Link href="/markdown-live-preview" className="btn-primary shrink-0">
              {t('ctaButton')}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildToolPageJsonLd(
              'Markdown to PDF Converter',
              'Free markdown to PDF and md to pdf converter online. Export Markdown with Mermaid diagrams and KaTeX math to PDF in your browser — no sign-up.',
              locale,
              path,
            ),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildFaqPageJsonLd(faqs, locale, path)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildHowToJsonLd(t('howTitle'), howSteps, locale, path)),
        }}
      />
    </>
  );
}