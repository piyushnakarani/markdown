import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Sparkles } from 'lucide-react';
import ConverterTool from '@/components/ConverterTool';
import PageHero from '@/components/PageHero';
import { buildLocalizedPageMetadata } from '@/lib/site';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return buildLocalizedPageMetadata({
    locale,
    path: `/${locale}/markdown-to-pdf`,
    titleKey: 'tools.pdfTitle',
    descriptionKey: 'tools.pdfDescription',
    titleSuffix: ' — Free Online Converter',
    keywords: [
      'markdown to pdf',
      'md to pdf',
      '.md to pdf',
      'markdown pdf',
      'md to pdf with mermaid',
      'convert markdown to pdf',
      'markdown diagram to pdf',
      'pdfwritter',
    ],
  });
}

export default async function MarkdownToPdfPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <MarkdownToPdfContent />;
}

function MarkdownToPdfContent() {
  const t = useTranslations();

  return (
    <>
      <PageHero
        badge={t('tools.pdfBadge')}
        badgeIcon={Sparkles}
        title={
          <>
            Convert Markdown to{' '}
            <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              PDF
            </span>
          </>
        }
        subtitle={t('tools.pdfDescription')}
        accentColor="#f87171"
        glowColor="rgba(239,68,68,0.08)"
      />
      <ConverterTool type="pdf" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Markdown to PDF Converter',
        description: 'Convert Markdown to PDF online for free', applicationCategory: 'UtilityApplication',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }
      })}} />
    </>
  );
}
