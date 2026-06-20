import type { Metadata } from 'next';
import type { BlogPost } from '@/content/blog';

export const SITE_URL = 'https://markdowntools.com';
export const SITE_NAME = 'MarkdownTools';

export function getPostUrl(locale: string, slug: string): string {
  return `${SITE_URL}/${locale}/blog/${slug}`;
}

export function getBlogIndexUrl(locale: string): string {
  return `${SITE_URL}/${locale}/blog`;
}

/** Remove duplicate H1 when the page header already renders the title. */
export function stripLeadingH1(markdown: string): string {
  return markdown.replace(/^#\s+.+\n+/, '');
}

export function buildPostMetadata(post: BlogPost, locale: string): Metadata {
  const url = getPostUrl(locale, post.slug);
  const title = post.metaTitle;
  const description = post.metaDescription;

  return {
    title,
    description,
    keywords: post.keywords,
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    alternates: { canonical: `/${locale}/blog/${post.slug}` },
    openGraph: {
      title,
      description,
      type: 'article',
      url,
      siteName: SITE_NAME,
      publishedTime: post.date,
      modifiedTime: post.dateModified,
      section: post.category,
      tags: post.keywords,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export function buildBlogIndexMetadata(locale: string): Metadata {
  const title = 'Markdown Blog — Tutorials, Guides & Developer Tips | MarkdownTools';
  const description =
    'Free Markdown tutorials and guides: convert MD to PDF, learn syntax, pick editors, and improve developer documentation workflows.';
  const url = getBlogIndexUrl(locale);

  return {
    title,
    description,
    keywords: [
      'markdown blog',
      'markdown tutorial',
      'markdown guide',
      'markdown to pdf',
      'developer documentation',
    ],
    alternates: { canonical: `/${locale}/blog` },
    openGraph: {
      title,
      description,
      type: 'website',
      url,
      siteName: SITE_NAME,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export function buildArticleJsonLd(post: BlogPost, locale: string) {
  const url = getPostUrl(locale, post.slug);
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.titleKey,
    description: post.metaDescription,
    datePublished: post.date,
    dateModified: post.dateModified,
    author: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    url,
    articleSection: post.category,
    keywords: post.keywords.join(', '),
    wordCount: estimateWordCount(post.content),
    inLanguage: locale,
  };
}

export function buildBreadcrumbJsonLd(post: BlogPost, locale: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${SITE_URL}/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: getBlogIndexUrl(locale),
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.titleKey,
        item: getPostUrl(locale, post.slug),
      },
    ],
  };
}

export function buildBlogIndexJsonLd(posts: BlogPost[], locale: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: `${SITE_NAME} Developer Blog`,
    description: 'Markdown tutorials, conversion guides, and productivity tips for developers.',
    url: getBlogIndexUrl(locale),
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    blogPost: posts.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.titleKey,
      description: post.metaDescription,
      datePublished: post.date,
      dateModified: post.dateModified,
      url: getPostUrl(locale, post.slug),
      articleSection: post.category,
    })),
  };
}

export function buildHomeBlogJsonLd(posts: BlogPost[], locale: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Latest MarkdownTools blog articles',
    itemListElement: posts.map((post, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: getPostUrl(locale, post.slug),
      name: post.titleKey,
    })),
  };
}

function estimateWordCount(markdown: string): number {
  const plain = markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/[#*_[\]`>-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return plain ? plain.split(/\s+/).length : 0;
}

export function formatBlogDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}
