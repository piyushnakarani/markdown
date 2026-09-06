import type { Metadata } from "next";
import { getMessages, setRequestLocale } from "next-intl/server";

import type { BlogPost } from "@/content/blog";
import { defaultLocale } from "@/i18n/locales";
import {
  absoluteUrl,
  BLOG_AUTHOR_NAME,
  BLOG_AUTHOR_ROLE,
  BLOG_AUTHOR_URL,
  buildPageMetadata,
  DEFAULT_KEYWORDS,
  SITE_EMAIL,
  SITE_LOGO_PATH,
  SITE_NAME,
  SITE_SAME_AS,
  SITE_URL,
} from "@/lib/site";

/** Blog is English-only — always /blog and /blog/{slug}, never locale-prefixed. */
function blogCanonical(path: string) {
  const url = absoluteUrl(path.startsWith("/") ? path : `/${path}`);
  return { canonical: url };
}

export { SITE_NAME, SITE_URL };

export interface ArticleHeading {
  id: string;
  text: string;
  level: 2 | 3;
}

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/&[a-z]+;/gi, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function uniqueHeadingId(text: string, used: Set<string>): string {
  let id = slugifyHeading(text);
  if (!id) id = "section";

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

  for (const line of markdown.split("\n")) {
    const match = line.match(/^(#{2,3})\s+(.+)$/);
    if (!match) continue;

    const level = match[1].length as 2 | 3;
    const text = match[2].replace(/\*\*|__|`/g, "").trim();
    const id = uniqueHeadingId(text, used);
    headings.push({ id, text, level });
  }

  return headings;
}

/** Add stable anchor ids to rendered h2/h3 for TOC and deep links. */
export function injectHeadingIds(html: string): string {
  const used = new Set<string>();

  return html.replace(
    /<h([23])([^>]*)>([\s\S]*?)<\/h\1>/gi,
    (match, level, attrs, content) => {
      if (/\bid\s*=/.test(attrs)) return match;

      const plain = content.replace(/<[^>]+>/g, "").trim();
      const id = uniqueHeadingId(plain, used);
      return `<h${level}${attrs} id="${id}">${content}</h${level}>`;
    },
  );
}

export function getPostUrl(_locale: string, slug: string): string {
  return absoluteUrl(`/blog/${slug}`);
}

export function getBlogIndexUrl(_locale?: string): string {
  return absoluteUrl("/blog");
}

/** Remove duplicate H1 when the page header already renders the title. */
export function stripLeadingH1(markdown: string): string {
  return markdown.replace(/^#\s+.+\n+/, "");
}

export function buildPostMetadata(post: BlogPost, _locale: string): Metadata {
  // Blog pages always resolve as English (/blog/slug); ignore UI locale for SEO.
  setRequestLocale(defaultLocale);
  const articlePath = `/blog/${post.slug}`;

  const base = buildPageMetadata({
    title: post.metaTitle,
    description: post.metaDescription,
    path: articlePath,
    locale: defaultLocale,
    keywords: post.keywords,
    type: "article",
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
    // No hreflang — blog is not localized.
    alternates: blogCanonical(articlePath),
    openGraph: {
      ...base.openGraph,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.dateModified,
      section: post.category,
      tags: post.keywords,
      locale: "en_US",
      alternateLocale: undefined,
    },
  };
}

export async function buildBlogIndexMetadata(
  _locale: string,
): Promise<Metadata> {
  setRequestLocale(defaultLocale);
  const blogPath = "/blog";
  let title = "Markdown Blog — Tutorials, Guides & Diagram Tips";
  let description =
    "Free Markdown tutorials and guides: convert MD with diagrams to PDF, learn Mermaid syntax, pick editors, and improve developer documentation workflows.";
  let keywords = [
    ...DEFAULT_KEYWORDS,
    "markdown blog",
    "markdown tutorial",
    "mermaid diagram guide",
    "developer documentation",
  ];

  try {
    const messages = await getMessages();

    const getNestedValue = (
      obj: Record<string, unknown>,
      keyPath: string,
    ): string => {
      const value = keyPath.split(".").reduce<unknown>((prev, curr) => {
        if (prev !== null && typeof prev === "object" && curr in prev) {
          return (prev as Record<string, unknown>)[curr];
        }
        return undefined;
      }, obj);
      return typeof value === "string" ? value : "";
    };

    const transTitle = getNestedValue(messages, "blog.title");
    const transSubtitle = getNestedValue(messages, "blog.subtitle");
    if (transTitle) {
      title = `${transTitle} — Tutorials & Guides`;
    }
    if (transSubtitle) {
      description = `${transSubtitle} — Learn Mermaid syntax, Markdown formatting, and PDF export workflows.`;
    }

    const transKeywords = getNestedValue(messages, "metadata.keywords");
    if (transKeywords) {
      keywords = [
        ...transKeywords.split(",").map((k) => k.trim()),
        "markdown blog",
        "markdown tutorial",
        "mermaid diagram guide",
        "developer documentation",
      ];
    }
  } catch (error) {
    console.error("Failed to load localized blog index metadata:", error);
  }

  const base = buildPageMetadata({
    title,
    description,
    path: blogPath,
    locale: defaultLocale,
    keywords,
  });

  return {
    ...base,
    alternates: blogCanonical(blogPath),
    openGraph: {
      ...base.openGraph,
      locale: "en_US",
      alternateLocale: undefined,
    },
  };
}

export function buildArticleJsonLd(post: BlogPost, _locale?: string) {
  const url = getPostUrl(defaultLocale, post.slug);
  const blogPostingSchema = {
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: post.titleKey,
    description: post.metaDescription,
    datePublished: post.date,
    dateModified: post.dateModified,
    author: {
      "@type": "Person",
      "@id": `${SITE_URL}#editorial-team`,
      name: BLOG_AUTHOR_NAME,
      jobTitle: BLOG_AUTHOR_ROLE,
      url: BLOG_AUTHOR_URL,
      email: SITE_EMAIL,
      sameAs: [...SITE_SAME_AS],
      worksFor: { "@id": `${SITE_URL}#organization` },
    },
    publisher: {
      "@id": `${SITE_URL}#organization`,
    },
    image: post.coverImage
      ? {
          "@type": "ImageObject",
          url: absoluteUrl(post.coverImage.src),
          width: post.coverImage.width,
          height: post.coverImage.height,
          caption: post.coverImage.alt,
        }
      : {
          "@type": "ImageObject",
          url: absoluteUrl(SITE_LOGO_PATH),
          width: 909,
          height: 279,
        },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    articleSection: post.category,
    keywords: post.keywords.join(", "),
    wordCount: estimateWordCount(post.content),
    timeRequired: `PT${post.readTime}M`,
    inLanguage: "en",
  };

  // FAQ visible in article HTML; FAQPage JSON-LD omitted (commercial sites ineligible).
  return {
    "@context": "https://schema.org",
    ...blogPostingSchema,
  };
}

export function buildBreadcrumbJsonLd(post: BlogPost, _locale?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: absoluteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: getBlogIndexUrl(),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.titleKey,
        item: getPostUrl(defaultLocale, post.slug),
      },
    ],
  };
}

export function buildBlogIndexJsonLd(posts: BlogPost[], locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${SITE_NAME} Developer Blog`,
    description:
      "Markdown tutorials, diagram conversion guides, and productivity tips for developers.",
    url: getBlogIndexUrl(locale),
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      email: SITE_EMAIL,
      sameAs: [...SITE_SAME_AS],
    },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
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
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Latest ${SITE_NAME} blog articles`,
    itemListElement: posts.map((post, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: getPostUrl(locale, post.slug),
      name: post.titleKey,
    })),
  };
}

function estimateWordCount(markdown: string): number {
  const plain = markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/[#*_[\]`>-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return plain ? plain.split(/\s+/).length : 0;
}

export interface ParsedFaq {
  q: string;
  a: string;
}

/** Extract FAQ pairs from a ## Frequently Asked Questions section. */
export function extractArticleFaqs(markdown: string): ParsedFaq[] {
  const faqMatch = markdown.match(
    /## Frequently Asked Questions\s*\n([\s\S]*?)(?:\n## |\n---|\s*$)/,
  );
  if (!faqMatch) return [];

  const faqs: ParsedFaq[] = [];
  const faqBody = faqMatch[1];
  const blocks = faqBody.split(/\n### /).filter(Boolean);

  for (const block of blocks) {
    const lines = block.split("\n");
    const question = lines[0].replace(/^#+\s*/, "").trim();
    const answer = lines
      .slice(1)
      .join("\n")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/\*\*|__|`/g, "")
      .replace(/\s+/g, " ")
      .trim();
    if (question && answer) faqs.push({ q: question, a: answer });
  }

  return faqs;
}

export interface ParsedHowToStep {
  name: string;
  text: string;
}

/** Extract HowTo steps from a ## Step-by-Step Guide section. */
export function extractHowToSteps(markdown: string): ParsedHowToStep[] {
  const guideMatch = markdown.match(
    /## Step-by-Step Guide[^\n]*\s*\n([\s\S]*?)(?:\n## |\n---)/,
  );
  if (!guideMatch) return [];

  const steps: ParsedHowToStep[] = [];
  const stepRegex =
    /### (Step \d+[^\n]*)\n([\s\S]*?)(?=\n### Step \d+|\n## |\n---|$)/g;
  let match: RegExpExecArray | null;

  while ((match = stepRegex.exec(guideMatch[1])) !== null) {
    const name = match[1].trim();
    const text = match[2]
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/\*\*|__|`/g, "")
      .replace(/\s+/g, " ")
      .trim();
    if (name && text) steps.push({ name, text });
  }

  return steps;
}

export function formatBlogDate(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
