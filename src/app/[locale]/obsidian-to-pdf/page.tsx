import { setRequestLocale } from 'next-intl/server';

import SeoIntentLanding from '@/components/SeoIntentLanding';
import { OBSIDIAN_TO_PDF } from '@/content/seo-landings';
import { absoluteUrl, buildPageMetadata } from '@/lib/site';
import { buildFaqPageJsonLd, buildHowToJsonLd, buildToolPageJsonLd } from '@/lib/structured-data';

const content = OBSIDIAN_TO_PDF;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return buildPageMetadata({
    title: content.title,
    description: content.description,
    path: content.path,
    locale,
    keywords: content.keywords,
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
