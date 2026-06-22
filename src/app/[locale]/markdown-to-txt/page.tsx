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
    path: `/${locale}/markdown-to-txt`,
    titleKey: 'tools.txtTitle',
    descriptionKey: 'tools.txtDescription',
    titleSuffix: ' — Free Online Converter',
  });
}

export default async function MarkdownToTxtPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <MarkdownToTxtContent />;
}

function MarkdownToTxtContent() {
  const t = useTranslations();

  return (
    <>
      <PageHero
        badge={t('tools.txtBadge')}
        badgeIcon={Sparkles}
        title={
          <>
            Convert Markdown to{' '}
            <span className="bg-gradient-to-r from-emerald-500 to-green-500 bg-clip-text text-transparent">
              TXT
            </span>
          </>
        }
        subtitle={t('tools.txtDescription')}
        accentColor="#34d399"
        glowColor="rgba(16,185,129,0.08)"
      />
      <ConverterTool type="txt" />
    </>
  );
}
