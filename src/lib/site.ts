import type { Metadata } from 'next';
import { getMessages, setRequestLocale } from 'next-intl/server';

import { defaultLocale, type Locale,locales } from '@/i18n/locales';
import { ALL_LANGUAGE_KEYWORDS, languageKeywordsForLocale } from '@/lib/locale-keywords';

export const SITE_URL =
  process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, '') || 'https://www.pdfwritter.com';
export const SITE_NAME = 'PDFWritter';
export const SITE_TAGLINE = 'Markdown Converter with Diagram';
export const SITE_EMAIL = 'pdfwritter@gmail.com';
export const SITE_REDDIT_URL = 'https://www.reddit.com/user/pdfwritter/';
/** Public brand profiles for Organization/Person `sameAs` (entity linking). */
export const SITE_SAME_AS = [SITE_REDDIT_URL] as const;
export const BLOG_AUTHOR_NAME = 'PDFWritter Editorial Team';
export const BLOG_AUTHOR_ROLE = 'Technical Writing Team';
export const BLOG_AUTHOR_URL = `${SITE_URL}/about`;
export const SITE_LOGO_PATH = '/logo.webp';
export const SITE_LOGO_DARK_PATH = '/logo-dark.webp';
export const SITE_LOGO_ICON_PATH = '/logo-icon-512.png';
export const SITE_OG_IMAGE_PATH = '/og-default.webp';
export const SITE_OG_IMAGE_WIDTH = 1200;
export const SITE_OG_IMAGE_HEIGHT = 630;

const OG_LOCALE_MAP: Record<Locale, string> = {
  en: 'en_US',
  es: 'es_ES',
  fr: 'fr_FR',
  de: 'de_DE',
  pt: 'pt_BR',
  ar: 'ar_SA',
  'zh-Hans': 'zh_CN',
  ja: 'ja_JP',
  ko: 'ko_KR',
  bn: 'bn_BD',
  ru: 'ru_RU',
};

/**
 * Keep meta keywords lean. Google does not use them for ranking; long stuffed
 * lists are a spam/quality risk for small sites.
 */
export const BRAND_KEYWORDS = ['pdfwritter', 'pdfwritter.com'] as const;

/** Optional brand hint per tool — one short phrase max, not keyword dumps. */
export const TOOL_BRAND_KEYWORDS = {
  pdf: ['pdfwritter markdown to pdf'],
  html: ['pdfwritter markdown to html'],
  txt: ['pdfwritter markdown to txt'],
  docx: ['pdfwritter markdown to word'],
  editor: ['pdfwritter markdown editor'],
  preview: ['pdfwritter markdown live preview'],
  converter: ['pdfwritter free markdown converter'],
} as const;

export type ToolBrandKey = keyof typeof TOOL_BRAND_KEYWORDS;

const META_KEYWORDS_MAX = 22;

/** Merge page keywords with a single brand hint; cap length for quality. */
export function withToolBrandKeywords(
  keywords: string[],
  tool?: ToolBrandKey,
): string[] {
  const toolKeywords = tool ? [...TOOL_BRAND_KEYWORDS[tool]] : ['pdfwritter'];
  return [...new Set([...toolKeywords, ...keywords])].slice(0, META_KEYWORDS_MAX);
}

export const DEFAULT_KEYWORDS = [
  'markdown to pdf online free',
  'md to pdf',
  'markdown to pdf with mermaid',
  'markdown to pdf with latex',
  'mermaid flowchart to pdf',
  'mermaid sequence diagram to pdf',
  'katex markdown to pdf',
  'chatgpt to pdf',
  'mermaid to pdf',
  'markdown to word',
  'markdown live preview',
  'pdfwritter',
];

/**
 * Small-site ranking focus: index English first. Other locales stay usable in
 * the UI but are noindex until demand and unique content justify them.
 */
export const INDEXABLE_LOCALES: readonly Locale[] = [defaultLocale];

export function isIndexableLocale(locale: string): boolean {
  return INDEXABLE_LOCALES.includes(locale as Locale);
}

export const SUPPORTED_LANGUAGES_KEYWORDS = [...ALL_LANGUAGE_KEYWORDS];

export function absoluteUrl(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}

export function getDefaultOgImage() {
  return {
    url: absoluteUrl(SITE_OG_IMAGE_PATH),
    width: SITE_OG_IMAGE_WIDTH,
    height: SITE_OG_IMAGE_HEIGHT,
    alt: `${SITE_NAME} — Free Markdown to PDF converter with Mermaid diagram support`,
  };
}

function pathWithoutLocale(path: string): string {
  let normalized = path.startsWith('/') ? path : `/${path}`;

  // Strip every leading locale segment, including default `en`
  // (localePrefix: 'as-needed'). Loop so accidental doubles like
  // `/ar/en/about` collapse to `/about`. Longest codes first (`zh-Hans`).
  const sorted = [...locales].sort((a, b) => b.length - a.length);
  let stripped = true;
  while (stripped) {
    stripped = false;
    for (const locale of sorted) {
      if (normalized === `/${locale}`) return '';
      if (normalized.startsWith(`/${locale}/`)) {
        normalized = normalized.slice(`/${locale}`.length) || '/';
        stripped = true;
        break;
      }
    }
  }

  return normalized === '/' ? '' : normalized;
}

export function localizedPath(locale: string, path: string): string {
  const suffix = pathWithoutLocale(path);
  if (locale === defaultLocale) {
    return suffix || '/';
  }

  return `/${locale}${suffix}`;
}

export function swapLocaleInPath(path: string, locale: string): string {
  return localizedPath(locale, path);
}

/** Hreflang alternate URLs — only for indexable locales (avoids pointing at noindex URLs). */
export function buildAlternateLanguages(path: string): Record<string, string> {
  return {
    ...Object.fromEntries(
      INDEXABLE_LOCALES.map((l) => [l, absoluteUrl(localizedPath(l, path))])
    ),
    'x-default': absoluteUrl(localizedPath(defaultLocale, path)),
  };
}

type BuildPageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  locale: string;
  keywords?: string[];
  type?: 'website' | 'article';
  image?: {
    url: string;
    width: number;
    height: number;
    alt: string;
  };
};

/** Strip trailing brand suffix so root layout title template does not duplicate it. */
export function normalizePageTitle(title: string): string {
  return title.replace(new RegExp(`\\s*\\|\\s*${SITE_NAME}\\s*$`, 'i'), '').trim();
}

/** Keep Open Graph titles within ~60 characters to avoid social preview truncation. */
export function truncateOgTitle(title: string, maxLength = 60): string {
  if (title.length <= maxLength) return title;
  const trimmed = title.slice(0, maxLength - 1);
  const lastSpace = trimmed.lastIndexOf(' ');
  const truncated = (lastSpace > 40 ? trimmed.slice(0, lastSpace) : trimmed).trim();
  return truncated.replace(/\s*[|\-]\s*$/, '');
}

export function buildPageMetadata({
  title,
  description,
  path,
  locale,
  keywords = DEFAULT_KEYWORDS,
  type = 'website',
  image,
}: BuildPageMetadataOptions): Metadata {
  const pageTitle = normalizePageTitle(title);
  const fullTitle = `${pageTitle} | ${SITE_NAME}`;
  const normalizedPath = localizedPath(locale, path);
  const indexable = isIndexableLocale(locale);
  // Noindex locales must canonicalize to the English URL so crawl signals consolidate.
  const canonicalPath = indexable
    ? normalizedPath
    : localizedPath(defaultLocale, path);
  const url = absoluteUrl(canonicalPath);
  const ogLocale = OG_LOCALE_MAP[locale as Locale] || 'en_US';
  const ogImage = image ?? getDefaultOgImage();
  const ogTitle = truncateOgTitle(fullTitle);
  const finalKeywords = [
    ...new Set([...keywords, ...languageKeywordsForLocale(locale)]),
  ].slice(0, META_KEYWORDS_MAX);

  return {
    metadataBase: new URL(SITE_URL),
    title: pageTitle,
    description,
    keywords: finalKeywords,
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    applicationName: SITE_NAME,
    icons: {
      icon: [
        { url: '/favicon.ico' },
        { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
        { url: '/favicon-16.png', sizes: '16x16', type: 'image/png' },
      ],
      apple: '/apple-touch-icon.png',
    },
    alternates: {
      canonical: url,
      languages: buildAlternateLanguages(path),
    },
    openGraph: {
      title: ogTitle,
      description,
      type,
      url,
      siteName: SITE_NAME,
      locale: ogLocale,
      alternateLocale: INDEXABLE_LOCALES
        .filter((l) => l !== locale)
        .map((l) => OG_LOCALE_MAP[l]),
      images: [
        {
          url: ogImage.url,
          width: ogImage.width,
          height: ogImage.height,
          alt: ogImage.alt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description,
      images: [ogImage.url],
    },
    robots: {
      index: indexable,
      follow: true,
      googleBot: {
        index: indexable,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export type BuildLocalizedPageMetadataOptions = {
  locale: string;
  path: string;
  titleKey: string;
  descriptionKey: string;
  titleSuffix?: string;
  keywords?: string[];
  type?: 'website' | 'article';
  image?: BuildPageMetadataOptions['image'];
};

export async function buildLocalizedPageMetadata({
  locale,
  path,
  titleKey,
  descriptionKey,
  titleSuffix = '',
  keywords,
  type = 'website',
  image,
}: BuildLocalizedPageMetadataOptions): Promise<Metadata> {
  setRequestLocale(locale);
  let title = '';
  let description = '';
  let finalKeywords = keywords;

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

    title = getNestedValue(messages, titleKey);
    description = getNestedValue(messages, descriptionKey);

    if (!finalKeywords) {
      const transKeywords = getNestedValue(messages, 'metadata.keywords');
      if (transKeywords) {
        finalKeywords = transKeywords.split(',').map((k) => k.trim());
      }
    }
  } catch (error) {
    console.error('Failed to load localized metadata:', error);
  }

  // Fallback to English/default if translation failed or is missing
  if (!title) {
    if (titleKey === 'about.title') title = 'About PDFWritter';
    else if (titleKey === 'contact.title') title = 'Contact PDFWritter';
    else if (titleKey === 'editor.title') title = 'Online Markdown Editor';
    else if (titleKey === 'help.title') title = 'Help & Documentation';
    else if (titleKey === 'freeConverter.title') title = 'Free Markdown Converter Online';
    else if (titleKey === 'livePreview.title') title = 'Markdown Live Preview';
    else if (titleKey === 'markdownToPdf.title') title = 'Markdown to PDF Converter';
    else if (titleKey === 'tools.pdfTitle') title = 'Markdown to PDF';
    else if (titleKey === 'tools.htmlTitle') title = 'Markdown to HTML';
    else if (titleKey === 'tools.txtTitle') title = 'Markdown to TXT';
    else if (titleKey === 'privacy.title') title = 'Privacy Policy';
    else if (titleKey === 'terms.title') title = 'Terms of Service';
    else title = 'MarkdownTools';
  }

  if (!description) {
    if (descriptionKey === 'about.subtitle') description = 'Free Markdown converter with diagram support for developers.';
    else if (descriptionKey === 'contact.subtitle') description = 'Get in touch with the PDFWritter team.';
    else if (descriptionKey === 'editor.description') description = 'Write Markdown with live preview and diagram rendering.';
    else if (descriptionKey === 'help.subtitle') description = 'Everything you need to know about using PDFWritter.';
    else if (descriptionKey === 'help.metaDescription') {
      description =
        'PDFWritter help: convert Markdown to PDF, HTML, TXT, and DOCX in your browser. Getting started guide, syntax reference, keyboard shortcuts, Mermaid diagrams, and FAQs.';
    }
    else if (descriptionKey === 'freeConverter.subtitle') description = 'Convert Markdown to any format in your browser.';
    else if (descriptionKey === 'livePreview.description') {
      description =
        'Free online Markdown editor with live preview, sync scroll, Mermaid diagrams, and instant PDF export. No login required.';
    } else if (descriptionKey === 'markdownToPdf.description') {
      description =
        'Convert Markdown to PDF online for free with live preview, Mermaid diagram support, and instant download — 100% private in your browser.';
    } else if (descriptionKey === 'tools.pdfDescription') description = 'Convert Markdown to PDF online for free.';
    else if (descriptionKey === 'tools.htmlDescription') description = 'Convert Markdown to HTML online for free.';
    else if (descriptionKey === 'tools.txtDescription') description = 'Convert Markdown to plain text online for free.';
    else if (descriptionKey === 'privacy.subtitle') description = 'Read the PDFWritter privacy policy. Your file privacy is guaranteed.';
    else if (descriptionKey === 'terms.subtitle') description = 'Review the terms of service and conditions for using PDFWritter.';
    else description = 'Free online Markdown editor and converter.';
  }

  if (titleSuffix) {
    title = `${title}${titleSuffix}`;
  }

  return buildPageMetadata({
    title,
    description,
    path,
    locale,
    keywords: finalKeywords || DEFAULT_KEYWORDS,
    type,
    image,
  });
}


export function buildWebApplicationJsonLd(locale: string) {
  const url = absoluteUrl(localizedPath(locale, '/'));
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    '@id': `${url}#webapp`,
    name: SITE_NAME,
    alternateName: SITE_TAGLINE,
    description:
      'Free online Markdown converter with diagram support. Convert Markdown with Mermaid flowcharts, sequence diagrams, and charts to PDF, HTML, TXT, and DOCX at pdfwritter.com.',
    url,
    image: {
      '@type': 'ImageObject',
      url: absoluteUrl('/og-default.webp'),
      width: 1200,
      height: 630,
    },
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      'Markdown converter with diagram support',
      'Mermaid flowchart and sequence diagram rendering',
      'Markdown to PDF conversion',
      'Markdown to HTML conversion',
      'Markdown to TXT conversion',
      'Markdown to DOCX conversion',
      'Online Markdown editor with live preview',
      'Syntax highlighting',
    ],
  };
}
