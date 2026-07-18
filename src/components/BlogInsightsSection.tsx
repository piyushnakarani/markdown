'use client';

import {
  ArrowRight,
  BookOpen,
  Calendar,
  Clock,
  Sparkles,
} from 'lucide-react';
import { useLocale,useTranslations } from 'next-intl';

import { type BlogPost,blogPosts } from '@/content/blog';
import { Link } from '@/i18n/navigation';
import { buildHomeBlogJsonLd, formatBlogDate } from '@/lib/blog-seo';

import ScrollReveal from './ScrollReveal';

const CATEGORY_STYLE: Record<string, { color: string; bg: string }> = {
  Tutorial: { color: '#3b82f6', bg: 'from-blue-500/15 to-indigo-500/5' },
  Guide: { color: '#8b5cf6', bg: 'from-violet-500/15 to-purple-500/5' },
  Tools: { color: '#f59e0b', bg: 'from-amber-500/15 to-yellow-500/5' },
  Productivity: { color: '#10b981', bg: 'from-emerald-500/15 to-green-500/5' },
};

function categoryStyle(category: string) {
  return CATEGORY_STYLE[category] ?? { color: '#6366f1', bg: 'from-indigo-500/15 to-blue-500/5' };
}

function BlogMeta({ post, readTimeLabel }: { post: BlogPost; readTimeLabel: string }) {
  const style = categoryStyle(post.category);
  return (
    <div className="flex flex-wrap items-center gap-2.5 text-xs text-[var(--text-tertiary)]">
      <span
        className="blog-category-pill"
        style={{
          color: style.color,
          borderColor: `${style.color}33`,
          background: `${style.color}14`,
        }}
      >
        {post.category}
      </span>
      <time dateTime={post.date} className="inline-flex items-center gap-1">
        <Calendar className="w-3.5 h-3.5" />
        {formatBlogDate(post.date)}
      </time>
      <span className="inline-flex items-center gap-1">
        <Clock className="w-3.5 h-3.5" />
        {post.readTime} {readTimeLabel}
      </span>
    </div>
  );
}

function FeaturedPost({ post, readTimeLabel, ctaLabel }: { post: BlogPost; readTimeLabel: string; ctaLabel: string }) {
  const style = categoryStyle(post.category);
  return (
    <Link
      href={`/blog/${post.slug}`}
      locale="en"
      className="blog-card blog-card-featured group h-full"
      style={{ '--blog-accent': style.color } as React.CSSProperties}
    >
      <div className="blog-card-accent" style={{ background: style.color }} aria-hidden />
      <div className="blog-card-glow" style={{ '--blog-accent': style.color } as React.CSSProperties} aria-hidden />

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center gap-2 mb-4">
          <span className="blog-featured-badge">
            <Sparkles className="w-3 h-3" />
            Featured
          </span>
        </div>

        <BlogMeta post={post} readTimeLabel={readTimeLabel} />

        <h3 className="blog-card-title blog-card-title-lg mt-4 mb-3 group-hover:text-[var(--blog-accent,#3b82f6)] transition-colors">
          {post.titleKey}
        </h3>
        <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed flex-1 line-clamp-3">
          {post.excerptKey}
        </p>

        <div className="blog-card-footer">
          <span className="blog-card-cta-label">{ctaLabel}</span>
          <span className="blog-card-cta-icon">
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

function CompactPost({ post, readTimeLabel, ctaLabel, index }: { post: BlogPost; readTimeLabel: string; ctaLabel: string; index: number }) {
  const style = categoryStyle(post.category);
  return (
    <Link
      href={`/blog/${post.slug}`}
      locale="en"
      className="blog-card blog-card-compact group h-full"
      style={{ '--blog-accent': style.color } as React.CSSProperties}
    >
      <div className="flex gap-4 h-full">
        <div className={`blog-card-thumb bg-gradient-to-br ${style.bg} shrink-0`}>
          <BookOpen className="w-5 h-5" style={{ color: style.color }} />
          <span className="blog-card-index">{String(index + 2).padStart(2, '0')}</span>
        </div>
        <div className="flex flex-col min-w-0 flex-1">
          <BlogMeta post={post} readTimeLabel={readTimeLabel} />
          <h3 className="blog-card-title mt-2 mb-2 line-clamp-2 group-hover:text-[var(--blog-accent,#3b82f6)] transition-colors">
            {post.titleKey}
          </h3>
          <p className="text-xs text-[var(--text-secondary)] line-clamp-2 leading-relaxed mb-3 flex-1">
            {post.excerptKey}
          </p>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--text-tertiary)] group-hover:text-[var(--blog-accent,#3b82f6)] transition-colors">
            {ctaLabel}
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </div>
      </div>
    </Link>
  );
}

type BlogInsightsSectionProps = {
  jsonLd?: object;
};

export default function BlogInsightsSection({ jsonLd: jsonLdProp }: BlogInsightsSectionProps) {
  const th = useTranslations('home');
  const tb = useTranslations('blog');
  const locale = useLocale();
  const latestPosts = blogPosts.slice(0, 3);
  const [featured, ...rest] = latestPosts;
  const jsonLd = jsonLdProp ?? buildHomeBlogJsonLd(latestPosts, locale);

  return (
    <section className="section-py section-divider relative overflow-hidden" aria-labelledby="blog-section-title">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(139,92,246,0.05),transparent_55%)] pointer-events-none" />

      <div className="relative page-container">
        <ScrollReveal>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10 sm:mb-12">
            <div className="max-w-2xl">
              <span className="section-badge mb-3 inline-flex">
                <BookOpen className="w-3.5 h-3.5 text-[#8b5cf6]" />
                {th('blogBadge')}
              </span>
              <h2 id="blog-section-title" className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight leading-tight mb-3">
                {th('blogTitle')}
              </h2>
              <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                {th('blogSubtitle')}
              </p>
            </div>
            <Link href="/blog" locale="en" className="btn-secondary shrink-0 self-start lg:self-auto">
              {th('blogViewAll')}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </ScrollReveal>

        <div className="blog-home-layout">
          {featured && (
            <ScrollReveal className="blog-home-featured">
              <FeaturedPost post={featured} readTimeLabel={tb('readTime')} ctaLabel={th('readArticle')} />
            </ScrollReveal>
          )}

          <div className="blog-home-grid">
            {rest.map((post, i) => (
              <ScrollReveal key={post.slug} delay={(i + 1) * 80}>
                <CompactPost post={post} readTimeLabel={tb('readTime')} ctaLabel={th('readArticle')} index={i} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
    </section>
  );
}

export { BlogMeta, categoryStyle, CompactPost, FeaturedPost, formatBlogDate };
