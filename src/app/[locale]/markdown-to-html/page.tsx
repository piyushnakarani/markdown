import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Sparkles } from 'lucide-react';
import ConverterTool from '@/components/ConverterTool';
import PageHero from '@/components/PageHero';
import { buildPageMetadata } from '@/lib/site';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return buildPageMetadata({
    title: 'Markdown to HTML — Free Convertor with Diagram Support',
    description:
      'Convert Markdown to clean HTML with rendered Mermaid diagrams. Free Markdown convertor with diagram support at pdfwritter.com.',
    path: `/${locale}/markdown-to-html`,
    locale,
    keywords: [
      'markdown to html',
      'markdown convertor with diagram',
      'mermaid to html',
      'markdown html converter',
      'pdfwritter',
    ],
  });
}

export default async function MarkdownToHtmlPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <MarkdownToHtmlContent />;
}

function MarkdownToHtmlContent() {
  const t = useTranslations();

  return (
    <>
      <PageHero
        badge="Semantic Engine Compiler"
        badgeIcon={Sparkles}
        title={
          <>
            Convert Markdown to{' '}
            <span className="bg-gradient-to-r from-amber-500 to-yellow-500 bg-clip-text text-transparent">
              HTML
            </span>
          </>
        }
        subtitle={t('tools.htmlDescription')}
        accentColor="#fbbf24"
        glowColor="rgba(245,158,11,0.08)"
      />
      <ConverterTool type="html" />
    </>
  );
}
