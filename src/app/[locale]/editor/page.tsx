import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { PenLine } from 'lucide-react';
import EditorClient from '@/components/EditorClient';
import PageHero from '@/components/PageHero';
import { buildPageMetadata } from '@/lib/site';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return buildPageMetadata({
    title: 'Online Markdown Editor — Live Preview & Diagram Support',
    description:
      'Write Markdown with live preview, Mermaid diagram rendering, syntax highlighting, and export to PDF, HTML, or TXT. Free at pdfwritter.com.',
    path: `/${locale}/editor`,
    locale,
    keywords: [
      'markdown editor',
      'markdown convertor with diagram',
      'mermaid markdown editor',
      'live preview markdown',
      'pdfwritter',
    ],
  });
}

export default async function EditorPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <EditorPageContent />;
}

function EditorPageContent() {
  const t = useTranslations('editor');

  return (
    <>
      <PageHero
        badge="Live Preview Editor"
        badgeIcon={PenLine}
        title={<span className="gradient-text">{t('title')}</span>}
        subtitle={t('description')}
        accentColor="#3b82f6"
        glowColor="rgba(59,130,246,0.08)"
      />
      <EditorClient />
    </>
  );
}
