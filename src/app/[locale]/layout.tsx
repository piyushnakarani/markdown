import { Suspense } from 'react';
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
import TransitionLoader from '@/components/TransitionLoader';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import { GoogleTagManagerHead, GoogleTagManagerNoScript } from '@/components/GoogleTagManager';
import {
  SITE_URL,
} from '@/lib/site';
import { LLMS_TXT_URL } from '@/lib/ai-seo';
import { buildSiteJsonLdGraph } from '@/lib/structured-data';
import '../globals.css';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata() {
  return {
    metadataBase: new URL(SITE_URL),
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
        <GoogleTagManagerHead />
        <link rel="alternate" type="text/plain" href={LLMS_TXT_URL} title="LLM Content Index" />
        <meta name="ai-content-note" content="Machine-readable site index available at /llms.txt and /llms-full.txt for AI assistants and search systems." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0B0D12" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('markdowntools-theme');
                  var theme;
                  if (saved === 'light' || saved === 'dark') {
                    theme = saved;
                  } else {
                    theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                  }
                  document.documentElement.setAttribute('data-theme', theme);
                } catch (e) {}
              })();
            `,
          }}
        />

        {/* Schema markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(buildSiteJsonLdGraph(locale)),
          }}
        />
      </head>
      <body
        className={`${GeistSans.className} min-h-screen flex flex-col antialiased`}
        suppressHydrationWarning
      >
        <GoogleTagManagerNoScript />
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <GoogleAnalytics />
            <Suspense fallback={null}>
              <TransitionLoader />
            </Suspense>
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
