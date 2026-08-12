import '../globals.css';
import 'katex/dist/katex.min.css';
import 'highlight.js/styles/github-dark.css';

import { SpeedInsights } from '@vercel/speed-insights/next';
import { GeistMono } from 'geist/font/mono';
import { Plus_Jakarta_Sans } from 'next/font/google';
import type { Viewport } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { Suspense } from 'react';

import Footer from '@/components/Footer';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import { GoogleTagManagerHead, GoogleTagManagerNoScript } from '@/components/GoogleTagManager';
import Header from '@/components/Header';
import PostHogProvider from '@/components/PostHogProvider';
import { ThemeProvider } from '@/components/ThemeProvider';
import TransitionLoader from '@/components/TransitionLoader';
import { isRtl, Locale, locales } from '@/i18n/locales';
import { routing } from '@/i18n/routing';
import { LLMS_TXT_URL } from '@/lib/ai-seo';
import {
  SITE_URL,
} from '@/lib/site';
import { buildSiteJsonLdGraph } from '@/lib/structured-data';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#09090B',
};

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
      data-theme="dark"
      suppressHydrationWarning
      className={`${jakarta.variable} ${GeistMono.variable}`}
    >
      <head>
        <GoogleTagManagerHead />
        <link rel="alternate" type="text/plain" href={LLMS_TXT_URL} title="LLM Content Index" />
        <meta name="ai-content-note" content="Machine-readable site index available at /llms.txt and /llms-full.txt for AI assistants and search systems." />
        <meta name="msvalidate.01" content="A20D7AEF9E821D0C20EAAE2F4C0CDD26" />
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
        className={`${jakarta.className} min-h-screen flex flex-col antialiased`}
        suppressHydrationWarning
      >
        <GoogleTagManagerNoScript />
        <NextIntlClientProvider messages={messages}>
          <PostHogProvider>
            <ThemeProvider>
              <GoogleAnalytics />
              <Suspense fallback={null}>
                <TransitionLoader />
              </Suspense>
              <a href="#main-content" className="skip-to-content">
                Skip to content
              </a>
              <Header />
              <main id="main-content" className="flex-1 w-full pt-[var(--header-height)]">
                {children}
              </main>
              <Footer />
            </ThemeProvider>
          </PostHogProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
