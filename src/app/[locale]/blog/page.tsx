import { BookOpen } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

import BlogClient from '@/components/BlogClient';
import PageHero from '@/components/PageHero';
import { blogPosts } from '@/content/blog';
import { buildBlogIndexJsonLd,buildBlogIndexMetadata } from '@/lib/blog-seo';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return buildBlogIndexMetadata(locale);
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <BlogContent locale={locale} />;
}

function BlogContent({ locale }: { locale: string }) {
  const t = useTranslations('blog');
  const jsonLd = buildBlogIndexJsonLd(blogPosts, locale);

  return (
    <>
      <PageHero
        badge={t('badge')}
        badgeIcon={BookOpen}
        title={t('title')}
        subtitle={t('subtitle')}
        accentColor="#8b5cf6"
        glowColor="rgba(139,92,246,0.08)"
      />

      <BlogClient posts={blogPosts} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
