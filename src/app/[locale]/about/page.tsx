import { Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

import AboutClient from '@/components/AboutClient';
import PageHero from '@/components/PageHero';
import { buildLocalizedPageMetadata } from '@/lib/site';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return buildLocalizedPageMetadata({
    locale,
    path: '/about',
    titleKey: 'about.title',
    descriptionKey: 'about.subtitle',
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
        badge={t('badge')}
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
