import type { Metadata } from 'next';
import type { BlogPost } from '@/content/blog';
import { getMessages, setRequestLocale } from 'next-intl/server';
import {
  DEFAULT_KEYWORDS,
  SITE_EMAIL,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
  buildPageMetadata,
} from '@/lib/site';

export { SITE_NAME, SITE_URL };

export function getPostUrl(locale: string, slug: string): string {
  return absoluteUrl(`/${locale}/blog/${slug}`);
}

export function getBlogIndexUrl(locale: string): string {
  return absoluteUrl(`/${locale}/blog`);
}

/** Remove duplicate H1 when the page header already renders the title. */
export function stripLeadingH1(markdown: string): string {
  return markdown.replace(/^#\s+.+\n+/, '');
}

export function buildPostMetadata(post: BlogPost, locale: string): Metadata {
  setRequestLocale(locale);
  const path = `/${locale}/blog/${post.slug}`;
  const base = buildPageMetadata({
    title: post.metaTitle,
    description: post.metaDescription,
    path,
    locale,
    keywords: post.keywords,
    type: 'article',
  });

  return {
    ...base,
    openGraph: {
      ...base.openGraph,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.dateModified,
      section: post.category,
      tags: post.keywords,
    },
  };
}

export async function buildBlogIndexMetadata(locale: string): Promise<Metadata> {
  setRequestLocale(locale);
  const path = `/${locale}/blog`;
  let title = 'Markdown Blog — Tutorials, Guides & Diagram Tips';
  let description = 'Free Markdown tutorials and guides: convert MD with diagrams to PDF, learn Mermaid syntax, pick editors, and improve developer documentation workflows.';
  let keywords = [
    ...DEFAULT_KEYWORDS,
    'markdown blog',
    'markdown tutorial',
    'mermaid diagram guide',
    'developer documentation',
  ];

  try {
    const messages = await getMessages();
    
    const getNestedValue = (obj: any, keyPath: string): string => {
      return keyPath.split('.').reduce((prev, curr) => prev?.[curr], obj) as string || '';
    };

    const transTitle = getNestedValue(messages, 'blog.title');
    const transSubtitle = getNestedValue(messages, 'blog.subtitle');
    if (transTitle) {
      title = `${transTitle} — Tutorials & Guides`;
    }
    if (transSubtitle) {
      description = `${transSubtitle} — Learn Mermaid syntax, Markdown formatting, and PDF export workflows.`;
    }

    const transKeywords = getNestedValue(messages, 'metadata.keywords');
    if (transKeywords) {
      keywords = [
        ...transKeywords.split(',').map((k) => k.trim()),
        'markdown blog',
        'markdown tutorial',
        'mermaid diagram guide',
        'developer documentation',
      ];
    }
  } catch (error) {
    console.error('Failed to load localized blog index metadata:', error);
  }

  return buildPageMetadata({
    title,
    description,
    path,
    locale,
    keywords,
  });
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
      email: SITE_EMAIL,
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
        item: absoluteUrl(`/${locale}`),
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
    description: 'Markdown tutorials, diagram conversion guides, and productivity tips for developers.',
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
    name: `Latest ${SITE_NAME} blog articles`,
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
