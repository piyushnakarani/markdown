import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Sparkles } from 'lucide-react';
import ConverterTool from '@/components/ConverterTool';
import PageHero from '@/components/PageHero';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return {
    title: `Markdown to HTML - Free Online Converter | MarkdownTools`,
    description: 'Convert Markdown to clean, semantic HTML instantly in your browser. Free and private.',
    alternates: { canonical: `/${locale}/markdown-to-html` },
  };
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
