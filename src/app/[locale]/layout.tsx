import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { routing } from '@/i18n/routing';
import { isRtl, Locale, locales } from '@/i18n/locales';
import { ThemeProvider } from '@/components/ThemeProvider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
  buildPageMetadata,
  buildOrganizationJsonLd,
  buildWebApplicationJsonLd,
} from '@/lib/site';
import '../globals.css';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const messages = await getMessages({ locale });
  const meta = (messages as Record<string, Record<string, string>>).metadata;

  return {
    metadataBase: new URL(SITE_URL),
    title: meta?.title || 'MarkdownTools',
    description: meta?.description || 'Free online Markdown converter and editor',
    keywords: meta?.keywords,
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(
        locales.map((l) => [l, `/${l}`])
      ),
    },
    openGraph: {
      title: meta?.title,
      description: meta?.description,
      type: 'website',
      locale: locale,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();
  const rtl = isRtl(locale as Locale);

  return (
    <html
      lang={locale}
      dir={rtl ? 'rtl' : 'ltr'}
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <head>
        {/* Hreflang tags */}
        {locales.map((l) => (
          <link key={l} rel="alternate" hrefLang={l} href={`/${l}`} />
        ))}
        <link rel="alternate" hrefLang="x-default" href="/en" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0B0D12" />

        {/* Schema markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(buildWebApplicationJsonLd(locale)),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(buildOrganizationJsonLd()),
          }}
        />
      </head>
      <body
        className={`${GeistSans.className} min-h-screen flex flex-col antialiased`}
        suppressHydrationWarning
      >
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <a href="#main-content" className="skip-to-content">
              Skip to content
            </a>
            <Header />
            <main id="main-content" className="flex-1 w-full pt-[72px]">
              {children}
            </main>
            <Footer />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
