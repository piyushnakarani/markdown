import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  ChevronRight,
  Clock,
  PenLine,
  Tag,
} from "lucide-react";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import {
  BlogArticleShare,
  BlogArticleTOC,
  BlogReadingProgress,
} from "@/components/BlogArticleClient";
import ScrollReveal from "@/components/ScrollReveal";
import {
  BLOG_CATEGORY_STYLES,
  blogPosts,
  getAdjacentPosts,
  getBlogPost,
  getRelatedPosts,
} from "@/content/blog";
import { locales } from "@/i18n/locales";
import { Link } from "@/i18n/navigation";
import {
  buildArticleJsonLd,
  buildBreadcrumbJsonLd,
  buildPostMetadata,
  extractArticleHeadings,
  formatBlogDate,
  getPostUrl,
  injectHeadingIds,
  stripLeadingH1,
} from "@/lib/blog-seo";
import { convertMarkdownToHtml } from "@/lib/converters";
import { BLOG_AUTHOR_NAME } from "@/lib/site";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return buildPostMetadata(post, locale);
}

function prefixInternalLinks(html: string, locale: string): string {
  return html.replace(/href="(\/[^"]*)"/g, (match, path) => {
    const isPrefixed = locales.some(
      (l) => path.startsWith(`/${l}/`) || path === `/${l}`,
    );
    if (isPrefixed || path.startsWith("//") || path.startsWith("/api")) {
      return match;
    }
    const cleanPath = path === "/" ? "" : path;
    return `href="/${locale}${cleanPath}"`;
  });
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  setRequestLocale(locale);

  const post = getBlogPost(slug);
  if (!post) notFound();

  const strippedContent = stripLeadingH1(post.content);
  const headings = extractArticleHeadings(strippedContent);
  const rawHtml = await convertMarkdownToHtml(strippedContent);
  const html = injectHeadingIds(prefixInternalLinks(rawHtml, locale));
  const relatedPosts = getRelatedPosts(slug, 3);
  const { prev, next } = getAdjacentPosts(slug);
  const shareUrl = getPostUrl(locale, slug);
  const t = await getTranslations("blog");
  const tNav = await getTranslations("nav");

  const labels = {
    backToBlog: t("backToBlog"),
    publisher: t("publisher"),
    author: t("author"),
    authorRole: t("authorRole"),
    readTime: t("readTime"),
    updated: t("updated"),
    topics: t("topics"),
    relatedPosts: t("relatedPosts"),
    previousArticle: t("previousArticle"),
    nextArticle: t("nextArticle"),
    articleNavigation: t("articleNavigation"),
    ctaTitle: t("ctaTitle"),
    ctaDescription: t("ctaDescription"),
    ctaButton: t("ctaButton"),
    home: tNav("home"),
    blog: tNav("blog"),
  };

  return (
    <BlogArticleContent
      post={post}
      html={html}
      headings={headings}
      relatedPosts={relatedPosts}
      prev={prev}
      next={next}
      locale={locale}
      shareUrl={shareUrl}
      labels={labels}
    />
  );
}

function BlogArticleContent({
  post,
  html,
  headings,
  relatedPosts,
  prev,
  next,
  locale,
  shareUrl,
  labels,
}: {
  post: NonNullable<ReturnType<typeof getBlogPost>>;
  html: string;
  headings: ReturnType<typeof extractArticleHeadings>;
  relatedPosts: ReturnType<typeof getRelatedPosts>;
  prev: ReturnType<typeof getAdjacentPosts>["prev"];
  next: ReturnType<typeof getAdjacentPosts>["next"];
  locale: string;
  shareUrl: string;
  labels: {
    backToBlog: string;
    publisher: string;
    author: string;
    authorRole: string;
    readTime: string;
    updated: string;
    topics: string;
    relatedPosts: string;
    previousArticle: string;
    nextArticle: string;
    articleNavigation: string;
    ctaTitle: string;
    ctaDescription: string;
    ctaButton: string;
    home: string;
    blog: string;
  };
}) {
  const articleJsonLd = buildArticleJsonLd(post, locale);
  const breadcrumbJsonLd = buildBreadcrumbJsonLd(post, locale);
  const colors =
    BLOG_CATEGORY_STYLES[post.category] ?? BLOG_CATEGORY_STYLES.Guide;

  return (
    <main className="blog-article-page">
      <BlogReadingProgress />

      {/* Hero */}
      <header className="blog-article-hero">
        <div className="blog-article-hero-bg" aria-hidden />
        <div className="blog-article-hero-glow" aria-hidden />
        <div
          className="absolute inset-0 mesh-grid opacity-15 pointer-events-none"
          aria-hidden
        />

        <div className="blog-article-hero-inner">
          <nav aria-label="Breadcrumb" className="blog-article-breadcrumb">
            <ol>
              <li>
                <Link href="/">{labels.home}</Link>
              </li>
              <li aria-hidden>
                <ChevronRight className="w-3.5 h-3.5" />
              </li>
              <li>
                <Link href="/blog">{labels.blog}</Link>
              </li>
              <li aria-hidden>
                <ChevronRight className="w-3.5 h-3.5" />
              </li>
              <li aria-current="page">{post.titleKey}</li>
            </ol>
          </nav>

          <Link href="/blog" className="blog-article-back">
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden />
            {labels.backToBlog}
          </Link>

          <span
            className="blog-article-category"
            style={{
              color: colors.text,
              backgroundColor: colors.bg,
              borderColor: colors.border,
            }}
          >
            {post.category}
          </span>

          <h1 className="blog-article-title">{post.titleKey}</h1>
          <p className="blog-article-excerpt">{post.excerptKey}</p>

          <div className="blog-article-meta">
            <div className="blog-article-author">
              <div
                className="blog-article-author-avatar"
                style={{
                  background: `linear-gradient(135deg, ${colors.accent}, #8b5cf6)`,
                }}
                aria-hidden
              >
                PW
              </div>
              <div>
                <span className="blog-article-author-name">
                  {labels.author}
                </span>
                <span className="blog-article-author-role">
                  {labels.authorRole}
                </span>
              </div>
            </div>

            <div className="blog-article-meta-stats">
              <time dateTime={post.date}>
                <Calendar className="w-4 h-4" aria-hidden />
                {formatBlogDate(post.date)}
              </time>
              <span>
                <Clock className="w-4 h-4" aria-hidden />
                {post.readTime} {labels.readTime}
              </span>
              {post.dateModified !== post.date && (
                <time
                  dateTime={post.dateModified}
                  className="blog-article-updated"
                >
                  {labels.updated}: {formatBlogDate(post.dateModified)}
                </time>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Content layout */}
      <div className="blog-article-layout">
        <BlogArticleTOC headings={headings} />

        <article
          className="blog-article-main"
          itemScope
          itemType="https://schema.org/BlogPosting"
        >
          <meta itemProp="headline" content={post.titleKey} />
          <meta itemProp="description" content={post.metaDescription} />
          <meta itemProp="datePublished" content={post.date} />
          <meta itemProp="dateModified" content={post.dateModified} />
          <meta itemProp="author" content={BLOG_AUTHOR_NAME} />

          <div
            className="markdown-preview blog-article-body"
            itemProp="articleBody"
            dangerouslySetInnerHTML={{ __html: html }}
          />

          {post.keywords.length > 0 && (
            <footer className="blog-article-tags">
              <Tag className="w-4 h-4 shrink-0" aria-hidden />
              <span className="blog-article-tags-label">{labels.topics}:</span>
              <ul aria-label={labels.topics}>
                {post.keywords.map((keyword) => (
                  <li key={keyword}>
                    <span className="blog-keyword-pill">{keyword}</span>
                  </li>
                ))}
              </ul>
            </footer>
          )}

          <BlogArticleShare shareUrl={shareUrl} shareTitle={post.titleKey} />

          <aside className="blog-article-cta" aria-label={labels.ctaTitle}>
            <div className="blog-article-cta-copy">
              <h2>{labels.ctaTitle}</h2>
              <p>{labels.ctaDescription}</p>
            </div>
            <Link href="/editor" className="blog-article-cta-btn">
              <PenLine className="w-4 h-4" aria-hidden />
              {labels.ctaButton}
            </Link>
          </aside>
        </article>
      </div>

      {/* Prev / Next */}
      {(prev || next) && (
        <nav
          className="blog-article-pagination"
          aria-label={labels.articleNavigation}
        >
          <div className="blog-article-pagination-inner">
            {prev ? (
              <Link
                href={`/blog/${prev.slug}`}
                className="blog-article-pagination-link blog-article-pagination-link--prev"
              >
                <span className="blog-article-pagination-label">
                  <ArrowLeft className="w-4 h-4" aria-hidden />
                  {labels.previousArticle}
                </span>
                <span className="blog-article-pagination-title">
                  {prev.titleKey}
                </span>
              </Link>
            ) : (
              <div />
            )}
            {next ? (
              <Link
                href={`/blog/${next.slug}`}
                className="blog-article-pagination-link blog-article-pagination-link--next"
              >
                <span className="blog-article-pagination-label">
                  {labels.nextArticle}
                  <ArrowRight className="w-4 h-4" aria-hidden />
                </span>
                <span className="blog-article-pagination-title">
                  {next.titleKey}
                </span>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </nav>
      )}

      {/* Related */}
      {relatedPosts.length > 0 && (
        <section
          className="blog-article-related"
          aria-labelledby="related-posts-heading"
        >
          <div className="blog-article-related-inner">
            <ScrollReveal>
              <h2
                id="related-posts-heading"
                className="blog-article-related-title"
              >
                {labels.relatedPosts}
              </h2>
            </ScrollReveal>
            <div className="blog-article-related-grid">
              {relatedPosts.map((rp, i) => {
                const rpColors = BLOG_CATEGORY_STYLES[rp.category] ?? colors;
                return (
                  <ScrollReveal key={rp.slug} delay={i * 80}>
                    <Link
                      href={`/blog/${rp.slug}`}
                      className="blog-card blog-card-compact group h-full flex flex-col"
                    >
                      <span
                        className="blog-category-pill mb-3 w-fit"
                        style={{
                          color: rpColors.text,
                          backgroundColor: rpColors.bg,
                          borderColor: rpColors.border,
                        }}
                      >
                        {rp.category}
                      </span>
                      <h3 className="blog-card-title mb-2 group-hover:text-[#3b82f6] transition-colors line-clamp-2">
                        {rp.titleKey}
                      </h3>
                      <p className="text-sm text-[var(--text-secondary)] line-clamp-3 leading-relaxed flex-1">
                        {rp.excerptKey}
                      </p>
                      <div className="blog-card-footer">
                        <time
                          dateTime={rp.date}
                          className="flex items-center gap-1.5 text-xs text-[var(--text-tertiary)]"
                        >
                          <Calendar className="w-3.5 h-3.5" aria-hidden />
                          {formatBlogDate(rp.date)}
                        </time>
                        <span className="blog-card-cta-icon" aria-hidden>
                          <ArrowRight className="w-3.5 h-3.5" />
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

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </main>
  );
}
