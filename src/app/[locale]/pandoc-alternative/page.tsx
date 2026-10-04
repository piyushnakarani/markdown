import { setRequestLocale } from 'next-intl/server';

import SeoIntentLanding from '@/components/SeoIntentLanding';
import { PANDOC_ALTERNATIVE } from '@/content/seo-landings';
import { pandocAlternativeKeywordsForLocale } from '@/lib/keywords';
import { absoluteUrl, buildPageMetadata, withToolBrandKeywords } from '@/lib/site';
import { buildToolPageJsonLd } from '@/lib/structured-data';

const content = PANDOC_ALTERNATIVE;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return buildPageMetadata({
    title: content.title,
    description: content.description,
    path: content.path,
    locale,
    keywords: withToolBrandKeywords(pandocAlternativeKeywordsForLocale(locale), 'pdf'),
    image: {
      url: absoluteUrl('/convert-markdown-file-to-pdf.webp'),
      width: 1200,
      height: 800,
      alt: 'Pandoc alternative — convert Markdown to PDF online in the browser',
    },
  });
}

export default async function PandocAlternativePage({ params }: { params: Promise<{ locale: string }> }) {
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
