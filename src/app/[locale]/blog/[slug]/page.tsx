import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { notFound } from 'next/navigation';
import { blogPosts, getBlogPost, getRelatedPosts } from '@/content/blog';
import { convertMarkdownToHtml } from '@/lib/converters';
import { locales } from '@/i18n/locales';
import {
  buildArticleJsonLd,
  buildBreadcrumbJsonLd,
  buildPostMetadata,
  formatBlogDate,
  stripLeadingH1,
} from '@/lib/blog-seo';
import { Calendar, Clock, ArrowLeft, ArrowRight, Tag, ChevronRight } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return buildPostMetadata(post, locale);
}

function prefixInternalLinks(html: string, locale: string): string {
  return html.replace(/href="(\/[^"]*)"/g, (match, path) => {
    const isPrefixed = locales.some((l) => path.startsWith(`/${l}/`) || path === `/${l}`);
    if (isPrefixed || path.startsWith('//') || path.startsWith('/api')) {
      return match;
    }
    const cleanPath = path === '/' ? '' : path;
    return `href="/${locale}${cleanPath}"`;
  });
}

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale } = await params;
  setRequestLocale(locale);

  const post = getBlogPost(slug);
  if (!post) notFound();

  const rawHtml = convertMarkdownToHtml(stripLeadingH1(post.content));
  const html = prefixInternalLinks(rawHtml, locale);
  const relatedPosts = getRelatedPosts(slug, 3);

  return (
    <BlogArticleContent
      post={post}
      html={html}
      relatedPosts={relatedPosts}
      locale={locale}
    />
  );
}

function BlogArticleContent({
  post,
  html,
  relatedPosts,
  locale,
}: {
  post: NonNullable<ReturnType<typeof getBlogPost>>;
  html: string;
  relatedPosts: ReturnType<typeof getRelatedPosts>;
  locale: string;
}) {
  const t = useTranslations('blog');
  const articleJsonLd = buildArticleJsonLd(post, locale);
  const breadcrumbJsonLd = buildBreadcrumbJsonLd(post, locale);

  const categoryColors: Record<string, { text: string; bg: string; border: string }> = {
    Tools: { text: '#ef4444', bg: 'rgba(239, 68, 68, 0.08)', border: 'rgba(239, 68, 68, 0.15)' },
    Tutorial: { text: '#f59e0b', bg: 'rgba(245, 158, 11, 0.08)', border: 'rgba(245, 158, 11, 0.15)' },
    Guide: { text: '#3b82f6', bg: 'rgba(59, 130, 246, 0.08)', border: 'rgba(59, 130, 246, 0.15)' },
    Productivity: { text: '#10b981', bg: 'rgba(16, 185, 129, 0.08)', border: 'rgba(16, 185, 129, 0.15)' },
  };

  const colors = categoryColors[post.category] ?? { text: '#3b82f6', bg: 'rgba(59, 130, 246, 0.08)', border: 'rgba(59, 130, 246, 0.15)' };

  return (
    <>
      {/* Inline styles to ensure tables and code snippets scale correctly on mobile */}
      <style>{`
        .blog-article-body table {
          display: block;
          width: 100%;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }
        .blog-article-body img {
          display: block;
          max-width: 100%;
          height: auto;
          margin: 1.5rem auto;
        }
      `}</style>

      <header className="relative overflow-hidden pt-12 pb-12 border-b border-[var(--border-color)]">
        {/* Glow Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.05),transparent_65%)] pointer-events-none" />
        <div className="absolute top-12 right-1/4 w-[400px] h-[400px] bg-gradient-to-br from-[#3b82f6]/5 to-[#8b5cf6]/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute inset-0 mesh-grid opacity-15 pointer-events-none" aria-hidden />

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          
          {/* Breadcrumb Trail */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-[var(--text-tertiary)]">
              <li>
                <Link href="/" className="hover:text-[#3b82f6] transition-colors">Home</Link>
              </li>
              <li aria-hidden className="text-[var(--text-tertiary)]">
                <ChevronRight className="w-3.5 h-3.5" />
              </li>
              <li>
                <Link href="/blog" className="hover:text-[#3b82f6] transition-colors">Blog</Link>
              </li>
              <li aria-hidden className="text-[var(--text-tertiary)]">
                <ChevronRight className="w-3.5 h-3.5" />
              </li>
              <li className="text-[var(--text-secondary)] font-extrabold truncate max-w-[150px] sm:max-w-none">
                {post.titleKey}
              </li>
            </ol>
          </nav>

          <Link href="/blog" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#3b82f6] hover:text-[#2563eb] transition-colors mb-6 uppercase tracking-wider">
            <ArrowLeft className="w-3.5 h-3.5" />
            {t('backToBlog')}
          </Link>

          {/* Title Header */}
          <h1 className="text-2xl sm:text-3.5xl lg:text-[2.65rem] font-extrabold mb-5 leading-[1.15] tracking-tight text-[var(--text-primary)]">
            {post.titleKey}
          </h1>

          {/* Article Info & Author Card */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-[var(--border-color)]">
            
            {/* Author info */}
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#3b82f6] to-[#8b5cf6] flex items-center justify-center text-white text-xs font-black shadow-sm">
                MT
              </div>
              <div>
                <span className="text-xs font-extrabold text-[var(--text-primary)] block leading-none">MarkdownTools Team</span>
                <span className="text-[10px] font-bold text-[var(--text-tertiary)] uppercase tracking-wider block mt-1">Publisher</span>
              </div>
            </div>

            {/* Meta statistics */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-[var(--text-secondary)]">
              <span
                className="px-2.5 py-0.5 rounded-lg text-[9px] font-extrabold uppercase tracking-widest border"
                style={{
                  color: colors.text,
                  backgroundColor: colors.bg,
                  borderColor: colors.border,
                }}
              >
                {post.category}
              </span>
              <time dateTime={post.date} className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[var(--text-tertiary)]" />
                {formatBlogDate(post.date)}
              </time>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[var(--text-tertiary)]" />
                {post.readTime} min read
              </span>
            </div>

          </div>

        </div>
      </header>

      {/* Article Content */}
      <article
        className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16"
        itemScope
        itemType="https://schema.org/BlogPosting"
      >
        <meta itemProp="headline" content={post.titleKey} />
        <meta itemProp="description" content={post.metaDescription} />
        <meta itemProp="datePublished" content={post.date} />
        <meta itemProp="dateModified" content={post.dateModified} />

        <div
          className="markdown-preview prose-lg blog-article-body text-sm sm:text-base leading-relaxed text-[var(--text-secondary)]"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        {/* Article Keywords/Tags */}
        {post.keywords.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mt-12 pt-8 border-t border-[var(--border-color)]">
            <Tag className="w-4 h-4 text-[var(--text-tertiary)] shrink-0" aria-hidden />
            <span className="text-xs font-bold text-[var(--text-tertiary)] uppercase tracking-wider mr-1">Tags:</span>
            <ul className="flex flex-wrap gap-1.5" aria-label="Article topics">
              {post.keywords.map((keyword) => (
                <li key={keyword}>
                  <span className="px-2.5 py-1 text-xs font-medium rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)]/50 text-[var(--text-secondary)]">
                    {keyword}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="bg-[var(--bg-secondary)] border-t border-[var(--border-color)] py-16 sm:py-20" aria-labelledby="related-posts-heading">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <h2 id="related-posts-heading" className="text-xl sm:text-2xl font-extrabold mb-8 tracking-tight text-[var(--text-primary)]">
                {t('relatedPosts')}
              </h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((rp, i) => {
                const rpColors = categoryColors[rp.category] ?? colors;
                return (
                  <ScrollReveal key={rp.slug} delay={i * 80}>
                    <Link href={`/blog/${rp.slug}`} className="group blog-card h-full flex flex-col justify-between rounded-2xl border border-[var(--border-color)] bg-[var(--bg-primary)]/40 p-5 hover:bg-[var(--bg-secondary)]/50 hover:border-[#3b82f6]/20 transition-all duration-300">
                      <div>
                        <span
                          className="px-2.5 py-0.5 text-[9px] font-extrabold uppercase tracking-widest rounded-lg border w-fit block mb-4"
                          style={{
                            color: rpColors.text,
                            backgroundColor: rpColors.bg,
                            borderColor: rpColors.border,
                          }}
                        >
                          {rp.category}
                        </span>
                        <h3 className="text-sm font-bold text-[var(--text-primary)] mb-2 group-hover:text-[#3b82f6] transition-colors leading-snug line-clamp-2">
                          {rp.titleKey}
                        </h3>
                        <p className="text-xs text-[var(--text-secondary)] line-clamp-3 leading-relaxed mb-4">
                          {rp.excerptKey}
                        </p>
                      </div>
                      <div className="flex items-center justify-between text-[10px] font-semibold text-[var(--text-tertiary)] pt-4 border-t border-[var(--border-color)]">
                        <time dateTime={rp.date} className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {formatBlogDate(rp.date)}
                        </time>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {rp.readTime} min
                        </span>
                      </div>
                    </Link>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
    </>
  );
}
