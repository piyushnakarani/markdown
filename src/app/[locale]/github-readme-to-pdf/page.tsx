import { getTranslations, setRequestLocale } from 'next-intl/server';

import SeoIntentLanding from '@/components/SeoIntentLanding';
import { githubReadmeToPdfKeywordsForLocale } from '@/lib/keywords';
import { absoluteUrl, buildPageMetadata, withToolBrandKeywords } from '@/lib/site';
import { buildToolPageJsonLd } from '@/lib/structured-data';

const META_DESCRIPTION =
  'Convert GitHub README to PDF free. README.md with badges, code, Mermaid, and math — live preview, no signup, private browser export.';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'githubReadmeToPdf' });

  return buildPageMetadata({
    title: t('title'),
    description: META_DESCRIPTION,
    path: '/github-readme-to-pdf',
    locale,
    keywords: withToolBrandKeywords(githubReadmeToPdfKeywordsForLocale(locale), 'pdf'),
    image: {
      url: absoluteUrl('/convert-markdown-file-to-pdf.webp'),
      width: 1200,
      height: 800,
      alt: 'Convert a GitHub README.md to PDF with badges, code blocks, and Mermaid diagrams',
    },
  });
}

export default async function GithubReadmeToPdfPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: 'githubReadmeToPdf' });

  const content = {
    path: '/github-readme-to-pdf',
    title: t('title'),
    description: META_DESCRIPTION,
    keywords: githubReadmeToPdfKeywordsForLocale(locale),
    badge: t('badge'),
    h1Before: t('h1Before'),
    h1Highlight: t('h1Highlight'),
    h1After: t('h1After'),
    accentColor: '#6e5494',
    glowColor: 'rgba(110,84,148,0.12)',
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
    ctaHref: '/mermaid-markdown-to-pdf',
    ctaLabel: t('ctaLabel'),
    related: [
      { href: '/markdown-to-pdf', label: t('related1Label') },
      { href: '/mermaid-markdown-to-pdf', label: t('related2Label') },
      { href: '/markdown-to-html', label: t('related3Label') },
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