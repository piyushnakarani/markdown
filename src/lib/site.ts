import type { Metadata } from 'next';
import { locales } from '@/i18n/locales';

export const SITE_URL = 'https://pdfwritter.com';
export const SITE_NAME = 'PDFWritter';
export const SITE_TAGLINE = 'Markdown Convertor with Diagram';
export const SITE_EMAIL = 'hello@pdfwritter.com';
export const SITE_LOGO_PATH = '/logo.png';
export const SITE_LOGO_DARK_PATH = '/logo-dark.png';
export const SITE_LOGO_ICON_PATH = '/logo-icon-512.png';

export const DEFAULT_KEYWORDS = [
  'markdown convertor with diagram',
  'markdown converter with diagram',
  'markdown to pdf',
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
      canonical: path,
      languages: Object.fromEntries(locales.map((l) => [l, swapLocaleInPath(path, l)])),
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
