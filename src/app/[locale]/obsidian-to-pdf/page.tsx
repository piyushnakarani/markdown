import { getTranslations, setRequestLocale } from 'next-intl/server';

import SeoIntentLanding from '@/components/SeoIntentLanding';
import { obsidianToPdfKeywordsForLocale } from '@/lib/keywords';
import { absoluteUrl, buildPageMetadata, withToolBrandKeywords } from '@/lib/site';
import { buildToolPageJsonLd } from '@/lib/structured-data';

const META_DESCRIPTION =
  'Export Obsidian to PDF free with Mermaid and KaTeX intact. Convert Obsidian Markdown notes in your browser — private, no Publish plan.';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'obsidianToPdf' });

  return buildPageMetadata({
    title: t('title'),
    description: META_DESCRIPTION,
    path: '/obsidian-to-pdf',
    locale,
    keywords: withToolBrandKeywords(obsidianToPdfKeywordsForLocale(locale), 'pdf'),
    image: {
      url: absoluteUrl('/convert-markdown-file-to-pdf.webp'),
      width: 1200,
      height: 800,
      alt: 'Export Obsidian Markdown notes to PDF with Mermaid diagrams and math',
    },
  });
}

export default async function ObsidianToPdfPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'obsidianToPdf' });

  const content = {
    path: '/obsidian-to-pdf',
    title: t('title'),
    description: META_DESCRIPTION,
    keywords: obsidianToPdfKeywordsForLocale(locale),
    badge: t('badge'),
    h1Before: t('h1Before'),
    h1Highlight: t('h1Highlight'),
    h1After: t('h1After'),
    accentColor: '#4b3f72',
    glowColor: 'rgba(75,63,114,0.12)',
    intro: [t('intro.0'), t('intro.1')],
    howTitle: t('howTitle'),
    howSubtitle: t('howSubtitle'),
    steps: [
      { title: t('step1Title'), desc: t('step1Desc') },
      { title: t('step2Title'), desc: t('step2Desc') },
      { title: t('step3Title'), desc: t('step3Desc') },
    ],
    featuresTitle: t('featuresTitle'),
    features: [
      { title: t('feature1Title'), desc: t('feature1Desc') },
      { title: t('feature2Title'), desc: t('feature2Desc') },
      { title: t('feature3Title'), desc: t('feature3Desc') },
      { title: t('feature4Title'), desc: t('feature4Desc') },
    ],
    faqs: [
      { q: t('faq1Q'), a: t('faq1A') },
      { q: t('faq2Q'), a: t('faq2A') },
      { q: t('faq3Q'), a: t('faq3A') },
      { q: t('faq4Q'), a: t('faq4A') },
      { q: t('faq5Q'), a: t('faq5A') },
    ],
    ctaTitle: t('ctaTitle'),
    ctaDescription: t('ctaDescription'),
    ctaHref: '/markdown-to-pdf',
    ctaLabel: t('ctaLabel'),
    related: [
      { href: '/markdown-to-pdf', label: t('related1Label') },
      { href: '/mermaid-markdown-to-pdf', label: t('related2Label') },
      { href: '/markdown-live-preview', label: t('related3Label') },
      { href: '/free-markdown-converter', label: t('related4Label') },
    ],
  };

  return (
    <>
      <SeoIntentLanding content={content} locale={locale} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildToolPageJsonLd(content.title, content.description, locale, content.path),
          ),
        }}
      />
    </>
  );
}