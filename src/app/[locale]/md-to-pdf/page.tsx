import { getMessages, setRequestLocale } from 'next-intl/server';

import MarkdownToPdfContent from '@/components/MarkdownToPdfContent';
import { pdfKeywordsForLocale } from '@/lib/locale-keywords';
import { absoluteUrl, buildLocalizedPageMetadata, withToolBrandKeywords } from '@/lib/site';

const PDF_OG_IMAGE = {
  url: '/convert-markdown-file-to-pdf.webp',
  width: 1200,
  height: 800,
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
    path: '/md-to-pdf',
    titleKey: 'markdownToPdf.title',
    descriptionKey: 'markdownToPdf.description',
    titleSuffix: ' — MD to PDF Free Online',
    keywords: withToolBrandKeywords(pdfKeywordsForLocale(locale), 'pdf'),
    image: {
      url: absoluteUrl(PDF_OG_IMAGE.url),
      width: PDF_OG_IMAGE.width,
      height: PDF_OG_IMAGE.height,
      alt: ogImageAlt,
    },
  });
}

export default async function MdToPdfPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <MarkdownToPdfContent locale={locale} path="/md-to-pdf" />;
}