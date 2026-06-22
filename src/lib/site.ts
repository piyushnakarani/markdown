import type { Metadata } from 'next';
import { locales } from '@/i18n/locales';
import { getMessages, setRequestLocale } from 'next-intl/server';

export const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || (process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://pdfwritter.com');
export const SITE_NAME = 'PDFWritter';
export const SITE_TAGLINE = 'Markdown Convertor with Diagram';
export const SITE_EMAIL = 'hello@pdfwritter.com';
export const SITE_LOGO_PATH = '/logo.png';
export const SITE_LOGO_DARK_PATH = '/logo-dark.png';
export const SITE_LOGO_ICON_PATH = '/logo-icon-512.png';

export const DEFAULT_KEYWORDS = [
  'markdown viewer',
  'md viewer',
  'md file viewer',
  'markdown online',
  'markdown preview',
  'markdown to pdf',
  'md to pdf',
  '.md to pdf',
  'markdown pdf',
  'md to pdf with mermaid',
  'markdown convertor with diagram',
  'markdown converter with diagram',
  'markdown to pdf with diagrams',
  'mermaid markdown converter',
  'markdown diagram to pdf',
  'markdown editor',
  'free markdown tools',
  'pdfwritter',
];

export function absoluteUrl(path: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}

export function swapLocaleInPath(path: string, locale: string): string {
  const match = path.match(/^\/([a-z]{2})(\/.*)?$/);
  const suffix = match?.[2] ?? '';
  return `/${locale}${suffix}`;
}

type BuildPageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  locale: string;
  keywords?: string[];
  type?: 'website' | 'article';
};

export function buildPageMetadata({
  title,
  description,
  path,
  locale,
  keywords = DEFAULT_KEYWORDS,
  type = 'website',
}: BuildPageMetadataOptions): Metadata {
  const url = absoluteUrl(path);
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;

  return {
    metadataBase: new URL(SITE_URL),
    title: fullTitle,
    description,
    keywords,
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
      canonical: `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`,
      languages: {
        ...Object.fromEntries(
          locales.map((l) => [l, `${SITE_URL}${swapLocaleInPath(path, l)}`])
        ),
        'x-default': `${SITE_URL}${swapLocaleInPath(path, 'en')}`,
      },
    },
    openGraph: {
      title: fullTitle,
      description,
      type,
      url,
      siteName: SITE_NAME,
      locale,
      images: [
        {
          url: SITE_LOGO_PATH,
          width: 909,
          height: 279,
          alt: `${SITE_NAME} — ${SITE_TAGLINE}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [SITE_LOGO_PATH],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
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
};

export async function buildLocalizedPageMetadata({
  locale,
  path,
  titleKey,
  descriptionKey,
  titleSuffix = '',
  keywords,
  type = 'website',
}: BuildLocalizedPageMetadataOptions): Promise<Metadata> {
  setRequestLocale(locale);
  let title = '';
  let description = '';
  let finalKeywords = keywords;

  try {
    const messages = await getMessages();

    const getNestedValue = (obj: any, keyPath: string): string => {
      return keyPath.split('.').reduce((prev, curr) => prev?.[curr], obj) as string || '';
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
    else if (titleKey === 'tools.pdfTitle') title = 'Markdown to PDF';
    else if (titleKey === 'tools.htmlTitle') title = 'Markdown to HTML';
    else if (titleKey === 'tools.txtTitle') title = 'Markdown to TXT';
    else if (titleKey === 'privacy.title') title = 'Privacy Policy';
    else if (titleKey === 'terms.title') title = 'Terms of Service';
    else title = 'MarkdownTools';
  }

  if (!description) {
    if (descriptionKey === 'about.subtitle') description = 'Free Markdown convertor with diagram support for developers.';
    else if (descriptionKey === 'contact.subtitle') description = 'Get in touch with the PDFWritter team.';
    else if (descriptionKey === 'editor.description') description = 'Write Markdown with live preview and diagram rendering.';
    else if (descriptionKey === 'help.subtitle') description = 'Everything you need to know about using PDFWritter.';
    else if (descriptionKey === 'freeConverter.subtitle') description = 'Convert Markdown to any format in your browser.';
    else if (descriptionKey === 'tools.pdfDescription') description = 'Convert Markdown to PDF online for free.';
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
  });
}


export function buildWebApplicationJsonLd(locale: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: SITE_NAME,
    alternateName: SITE_TAGLINE,
    description:
      'Free online Markdown convertor with diagram support. Convert Markdown with Mermaid flowcharts, sequence diagrams, and charts to PDF, HTML, and TXT at pdfwritter.com.',
    url: absoluteUrl(`/${locale}`),
    image: absoluteUrl(SITE_LOGO_PATH),
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: [
      'Markdown convertor with diagram support',
      'Mermaid flowchart and sequence diagram rendering',
      'Markdown to PDF conversion',
      'Markdown to HTML conversion',
      'Markdown to TXT conversion',
      'Online Markdown editor with live preview',
      'Syntax highlighting',
    ],
  };
}

export function buildOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    email: SITE_EMAIL,
    logo: absoluteUrl(SITE_LOGO_PATH),
    description: SITE_TAGLINE,
    sameAs: [],
  };
}
