import { getTranslations, setRequestLocale } from 'next-intl/server';

import SeoIntentLanding from '@/components/SeoIntentLanding';
import { absoluteUrl, buildPageMetadata } from '@/lib/site';
import { buildFaqPageJsonLd, buildHowToJsonLd, buildToolPageJsonLd } from '@/lib/structured-data';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'resumeToPdf' });

  return buildPageMetadata({
    title: t('badge') + ' — ' + t('h1Before') + t('h1Highlight') + t('h1After'),
    description: 'Convert Markdown resume/CV files to a clean, ATS-friendly PDF with typography, bullet lists, and links intact. Live preview, private browser export.',
    path: '/markdown-to-pdf-resume',
    locale,
    keywords: [
      'markdown resume to pdf',
      'convert markdown resume to pdf',
      'markdown cv to pdf',
      'markdown to pdf resume',
      'typewritten resume markdown',
      'markdown resume pdf converter',
      'markdown to pdf',
      'pdfwritter',
    ],
    image: {
      url: absoluteUrl('/convert-markdown-file-to-pdf.webp'),
      width: 1200,
      height: 800,
      alt: 'Convert a Markdown resume to an ATS-friendly PDF in your browser',
    },
  });
}

export default async function ResumeMarkdownToPdfPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'resumeToPdf' });

  const content = {
    path: '/markdown-to-pdf-resume',
    title: t('badge') + ' — ' + t('h1Before') + t('h1Highlight') + t('h1After'),
    description: 'Convert Markdown resume/CV files to a clean, ATS-friendly PDF with typography, bullet lists, and links intact. Live preview, private browser export.',
    keywords: [
      'markdown resume to pdf',
      'convert markdown resume to pdf',
      'markdown cv to pdf',
      'markdown to pdf resume',
      'typewritten resume markdown',
      'markdown resume pdf converter',
      'markdown to pdf',
      'pdfwritter',
    ],
    badge: t('badge'),
    h1Before: t('h1Before'),
    h1Highlight: t('h1Highlight'),
    h1After: t('h1After'),
    accentColor: '#0f4c3a',
    glowColor: 'rgba(15,76,58,0.12)',
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
      { href: '/obsidian-to-pdf', label: t('related2Label') },
      { href: '/github-readme-to-pdf', label: t('related3Label') },
      { href: '/markdown-to-docx', label: t('related4Label') },
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildFaqPageJsonLd(content.faqs, locale, content.path)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildHowToJsonLd(content.howTitle, content.steps, locale, content.path)),
        }}
      />
    </>
  );
}