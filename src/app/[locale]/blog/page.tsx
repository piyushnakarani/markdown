import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { blogPosts } from '@/content/blog';
import { buildBlogIndexMetadata, buildBlogIndexJsonLd, formatBlogDate } from '@/lib/blog-seo';
import { Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react';
import PageHero from '@/components/PageHero';
import ScrollReveal from '@/components/ScrollReveal';

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
  const [featured, ...rest] = blogPosts;
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

      <section className="page-container pb-24">
        {featured && (
          <ScrollReveal className="mb-10">
            <Link href={`/blog/${featured.slug}`} className="group blog-card blog-card-featured block">
              <div className="blog-card-accent bg-[#8b5cf6]" aria-hidden />
              <div className="relative z-10">
                <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--text-tertiary)] mb-5">
                  <span className="px-3 py-1 rounded-full bg-[#8b5cf6]/10 text-[#8b5cf6] font-semibold border border-[#8b5cf6]/20">
                    Featured · {featured.category}
                  </span>
                  <time dateTime={featured.date} className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {formatBlogDate(featured.date)}
                  </time>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {featured.readTime} {t('readTime')}
                  </span>
                </div>
                <h2 className="blog-card-title blog-card-title-lg mb-3 group-hover:text-[#3b82f6] transition-colors">
                  {featured.titleKey}
                </h2>
                <p className="text-[var(--text-secondary)] text-sm sm:text-base leading-relaxed max-w-2xl mb-6 line-clamp-3">
                  {featured.excerptKey}
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#3b82f6]">
                  {t('readMore')}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          </ScrollReveal>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((post, i) => (
            <ScrollReveal key={post.slug} delay={i * 60}>
              <Link href={`/blog/${post.slug}`} className="group blog-card flex flex-col h-full">
                <span className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-secondary)] w-fit mb-4">
                  {post.category}
                </span>
                <h2 className="blog-card-title mb-2 group-hover:text-[#3b82f6] transition-colors line-clamp-2 leading-snug">
                  {post.titleKey}
                </h2>
                <p className="text-sm text-[var(--text-secondary)] mb-5 flex-1 line-clamp-3 leading-relaxed">
                  {post.excerptKey}
                </p>
                <div className="flex items-center justify-between text-xs text-[var(--text-tertiary)] pt-4 border-t border-[var(--border-color)]">
                  <div className="flex items-center gap-3">
                    <time dateTime={post.date} className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatBlogDate(post.date)}
                    </time>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime} {t('readTime')}
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#3b82f6] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
