import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { notFound } from 'next/navigation';
import { blogPosts, getBlogPost, getRelatedPosts } from '@/content/blog';
import { convertMarkdownToHtml } from '@/lib/converters';
import {
  buildArticleJsonLd,
  buildBreadcrumbJsonLd,
  buildPostMetadata,
  formatBlogDate,
  stripLeadingH1,
} from '@/lib/blog-seo';
import { Calendar, Clock, ArrowLeft, ArrowRight, Tag } from 'lucide-react';
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

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale } = await params;
  setRequestLocale(locale);

  const post = getBlogPost(slug);
  if (!post) notFound();

  const html = convertMarkdownToHtml(stripLeadingH1(post.content));
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

  return (
    <>
      <header className="relative overflow-hidden pt-12 pb-10 sm:pt-16 sm:pb-12 border-b border-[var(--border-color)]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.06),transparent_60%)] pointer-events-none" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-[var(--text-tertiary)]">
              <li>
                <Link href="/" className="hover:text-[#3b82f6] transition-colors">Home</Link>
              </li>
              <li aria-hidden className="text-[var(--text-tertiary)]">/</li>
              <li>
                <Link href="/blog" className="hover:text-[#3b82f6] transition-colors">Blog</Link>
              </li>
              <li aria-hidden className="text-[var(--text-tertiary)]">/</li>
              <li className="text-[var(--text-secondary)] font-medium truncate max-w-[200px] sm:max-w-none">
                {post.titleKey}
              </li>
            </ol>
          </nav>

          <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-[#3b82f6] hover:underline mb-6 font-medium">
            <ArrowLeft className="w-4 h-4" />
            {t('backToBlog')}
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-[#3b82f6]/10 text-[#3b82f6] border border-[#3b82f6]/20">
              {post.category}
            </span>
            <time dateTime={post.date} className="flex items-center gap-1 text-xs text-[var(--text-tertiary)]">
              <Calendar className="w-3.5 h-3.5" />
              {formatBlogDate(post.date)}
            </time>
            <span className="flex items-center gap-1 text-xs text-[var(--text-tertiary)]">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime} {t('readTime')}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold mb-5 leading-[1.12] tracking-tight">
            {post.titleKey}
          </h1>
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed">{post.excerptKey}</p>

          {post.keywords.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mt-6 pt-6 border-t border-[var(--border-color)]">
              <Tag className="w-4 h-4 text-[var(--text-tertiary)] shrink-0" aria-hidden />
              <ul className="flex flex-wrap gap-2" aria-label="Article topics">
                {post.keywords.slice(0, 5).map((keyword) => (
                  <li key={keyword}>
                    <span className="blog-keyword-pill">{keyword}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </header>

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
          className="markdown-preview prose-lg blog-article-body"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </article>

      {relatedPosts.length > 0 && (
        <section className="bg-[var(--bg-secondary)] border-t border-[var(--border-color)] py-16 sm:py-20" aria-labelledby="related-posts-heading">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal>
              <h2 id="related-posts-heading" className="text-2xl sm:text-3xl font-extrabold mb-8 tracking-tight">
                {t('relatedPosts')}
              </h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((rp, i) => (
                <ScrollReveal key={rp.slug} delay={i * 80}>
                  <Link href={`/blog/${rp.slug}`} className="group blog-card h-full flex flex-col">
                    <span className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-secondary)] w-fit mb-3">
                      {rp.category}
                    </span>
                    <h3 className="blog-card-title mb-2 group-hover:text-[#3b82f6] transition-colors leading-snug line-clamp-2">
                      {rp.titleKey}
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)] line-clamp-3 flex-1 leading-relaxed">
                      {rp.excerptKey}
                    </p>
                    <span className="inline-flex items-center gap-1 text-sm text-[#3b82f6] mt-4 font-semibold">
                      {t('readMore')}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
    </>
  );
}
