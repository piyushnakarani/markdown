import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Sparkles } from 'lucide-react';
import ConverterTool from '@/components/ConverterTool';
import PageHero from '@/components/PageHero';
import { buildPageMetadata } from '@/lib/site';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return buildPageMetadata({
    title: 'Markdown to TXT — Free Plain Text Convertor',
    description:
      'Convert Markdown to plain text instantly. Strip formatting and export clean TXT from your Markdown documents at pdfwritter.com.',
    path: `/${locale}/markdown-to-txt`,
    locale,
    keywords: ['markdown to txt', 'markdown to plain text', 'md to txt', 'pdfwritter'],
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
        badge="Plain Text Stripper"
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
