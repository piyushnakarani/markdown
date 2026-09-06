import { setRequestLocale } from 'next-intl/server';

import SeoIntentLanding from '@/components/SeoIntentLanding';
import { MERMAID_TO_PDF } from '@/content/seo-landings';
import { mermaidToPdfKeywordsForLocale } from '@/lib/keywords';
import { absoluteUrl, buildPageMetadata, withToolBrandKeywords } from '@/lib/site';
import { buildToolPageJsonLd } from '@/lib/structured-data';

const content = MERMAID_TO_PDF;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return buildPageMetadata({
    title: content.title,
    description: content.description,
    path: content.path,
    locale,
    keywords: withToolBrandKeywords(mermaidToPdfKeywordsForLocale(locale), 'pdf'),
    image: {
      url: absoluteUrl('/convert-markdown-file-to-pdf.webp'),
      width: 1200,
      height: 800,
      alt: 'Convert Mermaid Markdown diagrams to PDF online',
    },
  });
}

export default async function MermaidMarkdownToPdfPage({
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
    </>
  );
}
