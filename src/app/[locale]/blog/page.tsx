import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { blogPosts } from '@/content/blog';
import { buildBlogIndexMetadata, buildBlogIndexJsonLd } from '@/lib/blog-seo';
import { BookOpen } from 'lucide-react';
import PageHero from '@/components/PageHero';
import BlogClient from '@/components/BlogClient';

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
        badge="Developer Blog"
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
