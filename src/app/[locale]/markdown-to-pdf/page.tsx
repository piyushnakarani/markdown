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
import { getMessages, setRequestLocale } from 'next-intl/server';
import type { CSSProperties } from 'react';
import { Fragment } from 'react';

import ConverterTool from '@/components/ConverterTool';
import FAQAccordion from '@/components/FAQAccordion';
import PageHero from '@/components/PageHero';
import ScrollReveal from '@/components/ScrollReveal';
import SectionHeading from '@/components/SectionHeading';
import { Link } from '@/i18n/navigation';
import { absoluteUrl, buildLocalizedPageMetadata } from '@/lib/site';
import { buildFaqPageJsonLd, buildToolPageJsonLd } from '@/lib/structured-data';

const PDF_OG_IMAGE = {
  url: '/convert-markdown-file-to-pdf.webp',
  width: 1536,
  height: 1024,
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  let ogImageAlt = 'Convert markdown documents instantly into PDF online';
  try {
    const messages = await getMessages();
    const value = (messages as Record<string, Record<string, string>>).markdownToPdf?.ogImageAlt;
    if (value) ogImageAlt = value;
  } catch {
    // use default alt
  }

  return buildLocalizedPageMetadata({
    locale,
    path: `/${locale}/markdown-to-pdf`,
    titleKey: 'markdownToPdf.title',
    descriptionKey: 'markdownToPdf.description',
    titleSuffix: ' — Free Online with Live Preview',
    keywords: [
      'markdown to pdf',
      'md to pdf',
      '.md to pdf',
      'markdown pdf',
      'convert markdown to pdf',
      'markdown to pdf converter',
      'markdown to pdf online',
      'free markdown to pdf',
      'md to pdf with mermaid',
      'markdown diagram to pdf',
      'github readme to pdf',
      'pdfwritter',
    ],
    image: {
      url: absoluteUrl(PDF_OG_IMAGE.url),
      width: PDF_OG_IMAGE.width,
      height: PDF_OG_IMAGE.height,
      alt: ogImageAlt,
    },
  });
}

export default async function MarkdownToPdfPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <MarkdownToPdfContent locale={locale} />;
}

function MarkdownToPdfContent({ locale }: { locale: string }) {
  const t = useTranslations('markdownToPdf');

  const howSteps = [
    {
      icon: Upload,
      num: '01',
      color: '#3b82f6',
      bg: 'from-blue-500/15 to-indigo-500/5',
      title: t('howStep1Title'),
      desc: t('howStep1Desc'),
    },
    {
      icon: Eye,
      num: '02',
      color: '#8b5cf6',
      bg: 'from-violet-500/15 to-purple-500/5',
      title: t('howStep2Title'),
      desc: t('howStep2Desc'),
    },
    {
      icon: Download,
      num: '03',
      color: '#ef4444',
      bg: 'from-red-500/15 to-orange-500/5',
      title: t('howStep3Title'),
      desc: t('howStep3Desc'),
    },
  ];

  const features = [
    { icon: Monitor, title: t('feature1Title'), desc: t('feature1Desc'), color: '#3b82f6' },
    { icon: GitBranch, title: t('feature2Title'), desc: t('feature2Desc'), color: '#f59e0b' },
    { icon: Shield, title: t('feature3Title'), desc: t('feature3Desc'), color: '#10b981' },
    { icon: Upload, title: t('feature4Title'), desc: t('feature4Desc'), color: '#6366f1' },
    { icon: FileText, title: t('feature5Title'), desc: t('feature5Desc'), color: '#ec4899' },
    { icon: Sparkles, title: t('feature6Title'), desc: t('feature6Desc'), color: '#06b6d4' },
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
  ];

  return (
    <>
      <PageHero
        badge={t('badge')}
        badgeIcon={Sparkles}
        title={
          <>
            {t('heroBefore')}
            <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              {t('heroHighlight')}
            </span>
            {t('heroAfter')}
          </>
        }
        subtitle={t('description')}
        accentColor="#f87171"
        glowColor="rgba(239,68,68,0.08)"
      />

      <ConverterTool type="pdf" />

      <section className="section-py relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(239,68,68,0.05),transparent_65%)] pointer-events-none" />
        <div className="relative page-container">
          <ScrollReveal>
            <SectionHeading
              badge={t('howBadge')}
              title={t('howTitle')}
              subtitle={t('howSubtitle')}
            />
          </ScrollReveal>

          <div className="workflow-steps">
            {howSteps.map((step, i) => (
              <Fragment key={step.num}>
                <ScrollReveal delay={i * 100}>
                  <article
                    className="workflow-step group h-full"
                    data-step={step.num}
                    style={{ '--step-color': step.color } as CSSProperties}
                  >
                    <div className="workflow-step-glow" aria-hidden />
                    <div className="relative z-10">
                      <div className="flex items-start justify-between gap-4 mb-5">
                        <div
                          className={`workflow-step-icon bg-gradient-to-br ${step.bg}`}
                          style={{ color: step.color }}
                        >
                          <step.icon className="w-6 h-6" strokeWidth={2} />
                        </div>
                        <span className="workflow-step-badge">{step.num}</span>
                      </div>
                      <h3 className="workflow-step-title text-lg font-bold mb-2 tracking-tight">
                        {step.title}
                      </h3>
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{step.desc}</p>
                    </div>
                  </article>
                </ScrollReveal>
                {i < howSteps.length - 1 && (
                  <div className="workflow-connector hidden md:flex" aria-hidden>
                    <div className="workflow-connector-line" />
                    <MousePointerClick className="workflow-connector-arrow w-5 h-5 shrink-0 opacity-40" />
                  </div>
                )}
              </Fragment>
            ))}
          </div>
        </div>
      </section>

      <section className="section-py relative">
        <div className="page-container">
          <ScrollReveal>
            <SectionHeading
              size="compact"
              title={t('featuresTitle')}
              subtitle={t('featuresSubtitle')}
            />
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
            {features.map((feature, i) => (
              <ScrollReveal key={feature.title} delay={i * 60}>
                <div className="card-glass group p-6 hover-lift h-full">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                    style={{ background: `${feature.color}14` }}
                  >
                    <feature.icon className="w-5 h-5" style={{ color: feature.color }} />
                  </div>
                  <h3 className="text-base font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{feature.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-py relative bg-[var(--bg-secondary)]/30">
        <div className="page-container max-w-4xl">
          <ScrollReveal>
            <SectionHeading size="compact" title={t('compareTitle')} />
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <div className="card-glass overflow-hidden mt-8">
              <div className="grid grid-cols-2 border-b border-[var(--border-color)] bg-[var(--bg-secondary)]/50">
                <div className="px-5 py-4 text-sm font-bold text-[#ef4444]">{t('compareUs')}</div>
                <div className="px-5 py-4 text-sm font-bold text-[var(--text-tertiary)] border-l border-[var(--border-color)]">
                  {t('compareThem')}
                </div>
              </div>
              {compareRows.map((row) => (
                <div key={row.us} className="grid grid-cols-2 border-b border-[var(--border-color)] last:border-b-0">
                  <div className="px-5 py-4 text-sm text-[var(--text-secondary)] flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#10b981] shrink-0 mt-0.5" />
                    {row.us}
                  </div>
                  <div className="px-5 py-4 text-sm text-[var(--text-tertiary)] border-l border-[var(--border-color)]">
                    {row.them}
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

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

      <section className="pb-20">
        <div className="page-container max-w-4xl">
          <div className="card-glass p-8 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h2 className="text-xl font-bold mb-2">{t('ctaTitle')}</h2>
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
              'Convert Markdown to PDF online for free with live preview, Mermaid diagram support, and instant browser-side download.',
              `/${locale}/markdown-to-pdf`,
            ),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildFaqPageJsonLd(faqs, `/${locale}/markdown-to-pdf`)),
        }}
      />
    </>
  );
}
