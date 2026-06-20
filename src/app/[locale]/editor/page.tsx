import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { PenLine } from 'lucide-react';
import EditorClient from '@/components/EditorClient';
import PageHero from '@/components/PageHero';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return {
    title: 'Online Markdown Editor - Free Live Preview | MarkdownTools',
    description: 'Write Markdown with live preview, syntax highlighting, and instant export to PDF, HTML, or TXT. Free online editor, no sign-up required.',
    alternates: { canonical: `/${locale}/editor` },
  };
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
