import type { Metadata } from 'next';
import { getMessages, setRequestLocale } from 'next-intl/server';

import type { BlogPost } from '@/content/blog';
import {
  absoluteUrl,
  buildPageMetadata,
  DEFAULT_KEYWORDS,
  localizedPath,
  SITE_LOGO_PATH,
  SITE_NAME,
  SITE_URL,
} from '@/lib/site';

export { SITE_NAME, SITE_URL };

export interface ArticleHeading {
  id: string;
  text: string;
  level: 2 | 3;
}

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/<[^>]+>/g, '')
    .replace(/&[a-z]+;/gi, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

function uniqueHeadingId(text: string, used: Set<string>): string {
  let id = slugifyHeading(text);
  if (!id) id = 'section';

  if (used.has(id)) {
    let i = 2;
    while (used.has(`${id}-${i}`)) i += 1;
    id = `${id}-${i}`;
  }

  used.add(id);
  return id;
}

/** Build TOC entries from markdown headings (h2/h3). */
export function extractArticleHeadings(markdown: string): ArticleHeading[] {
  const used = new Set<string>();
  const headings: ArticleHeading[] = [];

  for (const line of markdown.split('\n')) {
    const match = line.match(/^(#{2,3})\s+(.+)$/);
    if (!match) continue;

    const level = match[1].length as 2 | 3;
    const text = match[2].replace(/\*\*|__|`/g, '').trim();
    const id = uniqueHeadingId(text, used);
    headings.push({ id, text, level });
  }

  return headings;
}

/** Add stable anchor ids to rendered h2/h3 for TOC and deep links. */
export function injectHeadingIds(html: string): string {
  const used = new Set<string>();

  return html.replace(/<h([23])([^>]*)>([\s\S]*?)<\/h\1>/gi, (match, level, attrs, content) => {
    if (/\bid\s*=/.test(attrs)) return match;

    const plain = content.replace(/<[^>]+>/g, '').trim();
    const id = uniqueHeadingId(plain, used);
    return `<h${level}${attrs} id="${id}">${content}</h${level}>`;
  });
}

export function getPostUrl(locale: string, slug: string): string {
  return absoluteUrl(localizedPath(locale, `/blog/${slug}`));
}

export function getBlogIndexUrl(locale: string): string {
  return absoluteUrl(localizedPath(locale, '/blog'));
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
    image: post.coverImage
      ? {
          url: absoluteUrl(post.coverImage.src),
          width: post.coverImage.width,
          height: post.coverImage.height,
          alt: post.coverImage.alt,
        }
      : undefined,
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
    
    const getNestedValue = (obj: Record<string, unknown>, keyPath: string): string => {
      const value = keyPath.split('.').reduce<unknown>((prev, curr) => {
        if (prev !== null && typeof prev === 'object' && curr in prev) {
          return (prev as Record<string, unknown>)[curr];
        }
        return undefined;
      }, obj);
      return typeof value === 'string' ? value : '';
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
    '@id': `${url}#article`,
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
      '@id': `${SITE_URL}#organization`,
    },
    image: post.coverImage
      ? {
          '@type': 'ImageObject',
          url: absoluteUrl(post.coverImage.src),
          width: post.coverImage.width,
          height: post.coverImage.height,
          caption: post.coverImage.alt,
        }
      : {
          '@type': 'ImageObject',
          url: absoluteUrl(SITE_LOGO_PATH),
          width: 909,
          height: 279,
        },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    url,
    articleSection: post.category,
    keywords: post.keywords.join(', '),
    wordCount: estimateWordCount(post.content),
    timeRequired: `PT${post.readTime}M`,
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
