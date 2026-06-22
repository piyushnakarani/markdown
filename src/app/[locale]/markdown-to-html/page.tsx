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
    path: `/${locale}/markdown-to-html`,
    titleKey: 'tools.htmlTitle',
    descriptionKey: 'tools.htmlDescription',
    titleSuffix: ' — Free Online Converter',
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
        badge={t('tools.htmlBadge')}
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
