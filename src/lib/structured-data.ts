import {
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
  absoluteUrl,
  buildWebApplicationJsonLd,
  localizedPath,
} from '@/lib/site';

const SITE_SUMMARY =
  'Free online Markdown convertor with Mermaid diagram support. Convert Markdown to PDF, HTML, and TXT in your browser at pdfwritter.com.';

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
        logo: {
          '@type': 'ImageObject',
          url: absoluteUrl('/logo.png'),
          width: 909,
          height: 279,
        },
        description: SITE_TAGLINE,
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'customer support',
          url: absoluteUrl('/contact'),
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}#website`,
        name: SITE_NAME,
        alternateName: SITE_TAGLINE,
        url: SITE_URL,
        description: SITE_SUMMARY,
        inLanguage: ['en', 'es', 'fr', 'de', 'pt', 'ar', 'zh', 'ja', 'ko', 'bn', 'ru'],
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
          url: absoluteUrl('/logo.png'),
          width: 909,
          height: 279,
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
  path: string,
) {
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
      url: absoluteUrl('/logo.png'),
    },
  };
}

export function buildFaqPageJsonLd(
  faqs: { q: string; a: string }[],
  path: string,
) {
  const url = absoluteUrl(path);
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${url}#faq`,
    url,
    isPartOf: { '@id': `${SITE_URL}#website` },
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  };
}
