import { PenLine } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

import EditorClient from '@/components/EditorClient';
import PageHero from '@/components/PageHero';
import { buildLocalizedPageMetadata } from '@/lib/site';
import { buildToolPageJsonLd } from '@/lib/structured-data';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return buildLocalizedPageMetadata({
    locale,
    path: `/${locale}/editor`,
    titleKey: 'editor.title',
    descriptionKey: 'editor.description',
    titleSuffix: ' — Split-Pane Live Preview',
    keywords: [
      'markdown live preview',
      'live preview markdown',
      'markdown editor with preview',
      'split pane markdown editor',
      'online markdown editor',
      'markdown preview online',
      'markdown viewer',
      'md viewer',
      'mermaid markdown editor',
      'pdfwritter',
    ],
  });
}

export default async function EditorPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <EditorPageContent locale={locale} />;
}

function EditorPageContent({ locale }: { locale: string }) {
  const t = useTranslations('editor');

  return (
    <>
      <PageHero
        badge={t('badge')}
        badgeIcon={PenLine}
        title={<span className="gradient-text">{t('title')}</span>}
        subtitle={t('description')}
        accentColor="#3b82f6"
        glowColor="rgba(59,130,246,0.08)"
      />
      <EditorClient />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildToolPageJsonLd(
              'Online Markdown Editor',
              'Write Markdown with split-pane live preview, sync scroll, syntax highlighting, and Mermaid diagram support.',
              `/${locale}/editor`,
            ),
          ),
        }}
      />
    </>
  );
}
