import {
  absoluteUrl,
  BLOG_AUTHOR_NAME,
  BLOG_AUTHOR_ROLE,
  BLOG_AUTHOR_URL,
  buildWebApplicationJsonLd,
  localizedPath,
  SITE_EMAIL,
  SITE_NAME,
  SITE_OG_IMAGE_HEIGHT,
  SITE_OG_IMAGE_PATH,
  SITE_OG_IMAGE_WIDTH,
  SITE_SAME_AS,
  SITE_TAGLINE,
  SITE_URL,
} from '@/lib/site';

const SITE_SUMMARY =
  'Free online Markdown converter with Mermaid diagram support. Convert Markdown to PDF, HTML, and TXT in your browser at pdfwritter.com.';

/** Single @graph document — avoids duplicate/conflicting JSON-LD blocks. */
export function buildSiteJsonLdGraph(locale: string) {
  const webApp = buildWebApplicationJsonLd(locale);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        email: SITE_EMAIL,
        logo: {
          '@type': 'ImageObject',
          url: absoluteUrl('/logo.webp'),
          width: 909,
          height: 279,
        },
        description: SITE_TAGLINE,
        sameAs: [...SITE_SAME_AS],
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'customer support',
          email: SITE_EMAIL,
          url: absoluteUrl('/contact'),
        },
      },
      {
        '@type': 'Person',
        '@id': `${SITE_URL}#editorial-team`,
        name: BLOG_AUTHOR_NAME,
        jobTitle: BLOG_AUTHOR_ROLE,
        url: BLOG_AUTHOR_URL,
        email: SITE_EMAIL,
        sameAs: [...SITE_SAME_AS],
        worksFor: { '@id': `${SITE_URL}#organization` },
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}#website`,
        name: SITE_NAME,
        alternateName: SITE_TAGLINE,
        url: SITE_URL,
        description: SITE_SUMMARY,
        inLanguage: ['en', 'es', 'fr', 'de', 'pt', 'ar', 'zh-Hans', 'ja', 'ko', 'bn', 'ru'],
        publisher: { '@id': `${SITE_URL}#organization` },
      },
      {
        '@type': 'SoftwareApplication',
        '@id': `${SITE_URL}#software`,
        name: SITE_NAME,
        applicationCategory: 'DeveloperApplication',
        applicationSubCategory: 'Markdown Converter',
        operatingSystem: 'Web Browser',
        url: absoluteUrl(localizedPath(locale, '/')),
        description: SITE_SUMMARY,
        image: {
          '@type': 'ImageObject',
          url: absoluteUrl(SITE_OG_IMAGE_PATH),
          width: SITE_OG_IMAGE_WIDTH,
          height: SITE_OG_IMAGE_HEIGHT,
        },
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        featureList: webApp.featureList,
        isAccessibleForFree: true,
      },
    ],
  };
}

export function buildToolPageJsonLd(
  name: string,
  description: string,
  locale: string,
  pathSuffix: string,
) {
  const path = localizedPath(locale, pathSuffix);
  const url = absoluteUrl(path);
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    name,
    description,
    url,
    isPartOf: { '@id': `${SITE_URL}#website` },
    about: { '@id': `${SITE_URL}#software` },
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: absoluteUrl(SITE_OG_IMAGE_PATH),
      width: SITE_OG_IMAGE_WIDTH,
      height: SITE_OG_IMAGE_HEIGHT,
    },
  };
}

export function buildSpeakableJsonLd(
  cssSelectors: string[],
  locale: string,
  pathSuffix: string,
) {
  const path = localizedPath(locale, pathSuffix);
  const url = absoluteUrl(path);
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}#speakable`,
    url,
    isPartOf: { '@id': `${SITE_URL}#website` },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: cssSelectors,
    },
  };
}
