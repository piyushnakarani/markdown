import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Sparkles } from 'lucide-react';
import { buildPageMetadata } from '@/lib/site';
import PageHero from '@/components/PageHero';
import AboutClient from '@/components/AboutClient';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return buildPageMetadata({
    title: 'About MarkdownTools - Free Markdown Converter & Editor',
    description: 'Learn about MarkdownTools — free, fast, and private Markdown tools for developers worldwide.',
    path: `/${locale}/about`,
    locale,
  });
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AboutContent />;
}

function AboutContent() {
  const t = useTranslations('about');

  return (
    <>
      <PageHero
        badge="Platform Overview"
        badgeIcon={Sparkles}
        title={t('title')}
        subtitle={t('subtitle')}
        accentColor="#3b82f6"
        glowColor="rgba(59, 130, 246, 0.08)"
      />

      <AboutClient />
    </>

);
}
