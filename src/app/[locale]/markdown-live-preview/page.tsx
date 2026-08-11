import {
  ArrowRight,
  Check,
  Copy,
  Download,
  Eye,
  FileText,
  GitBranch,
  Monitor,
  MousePointerClick,
  RefreshCw,
  Shield,
  Sparkles,
} from 'lucide-react';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import type { CSSProperties } from 'react';
import { Fragment } from 'react';

const EditorClient = dynamic(() => import('@/components/EditorClient'));
import FAQAccordion from '@/components/FAQAccordion';
import PageHero from '@/components/PageHero';
import RelatedBlogGuides from '@/components/RelatedBlogGuides';
import ScrollReveal from '@/components/ScrollReveal';
import SectionHeading from '@/components/SectionHeading';
import { LIVE_PREVIEW_DEFAULT_MARKDOWN } from '@/content/live-preview-default';
import { Link } from '@/i18n/navigation';
import { previewKeywordsForLocale } from '@/lib/locale-keywords';
import { absoluteUrl, buildLocalizedPageMetadata, withToolBrandKeywords } from '@/lib/site';
import { buildToolPageJsonLd } from '@/lib/structured-data';

const LIVE_PREVIEW_OG_IMAGE = {
  url: '/markdown-live-preview-og.webp',
  width: 1200,
  height: 630,
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  let ogImageAlt = 'Free online Markdown live preview editor with sync scroll and PDF export';
  try {
    const messages = await getMessages();
    const value = (messages as Record<string, Record<string, string>>).livePreview?.ogImageAlt;
    if (value) ogImageAlt = value;
  } catch {
    // use default alt
  }

  return buildLocalizedPageMetadata({
    locale,
    path: '/markdown-live-preview',
    titleKey: 'livePreview.title',
    descriptionKey: 'livePreview.description',
    titleSuffix: ' — Free Live Preview Online',
    keywords: withToolBrandKeywords(previewKeywordsForLocale(locale), 'preview'),
    image: {
      url: absoluteUrl(LIVE_PREVIEW_OG_IMAGE.url),
      width: LIVE_PREVIEW_OG_IMAGE.width,
      height: LIVE_PREVIEW_OG_IMAGE.height,
      alt: ogImageAlt,
    },
  });
}

export default async function MarkdownLivePreviewPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <MarkdownLivePreviewContent locale={locale} />;
}

function MarkdownLivePreviewContent({ locale }: { locale: string }) {
  const t = useTranslations('livePreview');

  const accent = '#8b5cf6';

  const howSteps = [
    {
      icon: FileText,
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
    { icon: RefreshCw, title: t('feature2Title'), desc: t('feature2Desc') },
    { icon: Shield, title: t('feature3Title'), desc: t('feature3Desc') },
    { icon: Copy, title: t('feature4Title'), desc: t('feature4Desc') },
    { icon: GitBranch, title: t('feature5Title'), desc: t('feature5Desc') },
    { icon: Sparkles, title: t('feature6Title'), desc: t('feature6Desc') },
  ];

  const compareRows = [
    { us: t('compare1Us'), them: t('compare1Them') },
    { us: t('compare2Us'), them: t('compare2Them') },
    { us: t('compare3Us'), them: t('compare3Them') },
    { us: t('compare4Us'), them: t('compare4Them') },
    { us: t('compare5Us'), them: t('compare5Them') },
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
        badgeIcon={Eye}
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

      <EditorClient
        translationNamespace="livePreview"
        defaultMarkdown={LIVE_PREVIEW_DEFAULT_MARKDOWN}
      />

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

      <RelatedBlogGuides toolKey="markdown-live-preview" accentColor={accent} />

      <section className="section-py section-divider relative">
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
            <Link href="/markdown-to-pdf" className="btn-primary shrink-0">
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
              'Markdown Live Preview',
              'Free online Markdown editor with live preview, sync scroll, Mermaid diagrams, syntax highlighting, and instant PDF export. No login required.',
              locale,
              '/markdown-live-preview',
            ),
          ),
        }}
      />
    </>
  );
}
