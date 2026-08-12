import {
  Code2,
  Eye,
  FileSpreadsheet,
  FileText,
  FileType,
  GitBranch,
  PenLine,
  Sparkles,
} from 'lucide-react';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';

import BlogInsightsSection from '@/components/BlogInsightsSection';

const EditorClient = dynamic(() => import('@/components/EditorClient'));

import FAQAccordion from '@/components/FAQAccordion';
import HowItWorksSection from '@/components/HowItWorksSection';
import ScrollReveal from '@/components/ScrollReveal';
import SectionHeading from '@/components/SectionHeading';
import { Link } from '@/i18n/navigation';
import { buildPageMetadata } from '@/lib/site';
import { buildSpeakableJsonLd } from '@/lib/structured-data';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();
  const meta = (messages as Record<string, Record<string, string>>).metadata;

  return buildPageMetadata({
    title: meta?.title || 'PDFWritter',
    description: meta?.description || 'Free online Markdown converter and editor',
    path: '/',
    locale,
    keywords: meta?.keywords?.split(',').map((k) => k.trim()),
  });
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <HomeContent locale={locale} />;
}

function HomeContent({ locale }: { locale: string }) {
  const t = useTranslations();
  const th = useTranslations('home');

  const tools = [
    {
      href: '/markdown-to-pdf',
      icon: FileText,
      color: '#ef4444',
      title: t('tools.pdfTitle'),
      desc: t('tools.pdfDescription'),
    },
    {
      href: '/chatgpt-to-pdf',
      icon: Sparkles,
      color: '#10a37f',
      title: t('nav.chatgptToPdf'),
      desc: t('tools.chatgptDescription'),
    },
    {
      href: '/mermaid-markdown-to-pdf',
      icon: GitBranch,
      color: '#8b5cf6',
      title: t('nav.mermaidToPdf'),
      desc: t('tools.mermaidDescription'),
    },
    {
      href: '/ai-markdown-to-pdf',
      icon: Sparkles,
      color: '#3b82f6',
      title: t('nav.aiToPdf'),
      desc: t('tools.aiDescription'),
    },
    {
      href: '/markdown-to-html',
      icon: Code2,
      color: '#f59e0b',
      title: t('tools.htmlTitle'),
      desc: t('tools.htmlDescription'),
    },
    {
      href: '/markdown-to-txt',
      icon: FileType,
      color: '#10b981',
      title: t('tools.txtTitle'),
      desc: t('tools.txtDescription'),
    },
    {
      href: '/markdown-to-docx',
      icon: FileSpreadsheet,
      color: '#3b82f6',
      title: t('tools.docxTitle'),
      desc: t('tools.docxDescription'),
    },
    {
      href: '/markdown-live-preview',
      icon: Eye,
      color: '#8b5cf6',
      title: t('tools.livePreviewTitle'),
      desc: t('tools.livePreviewDescription'),
    },
    {
      href: '/editor',
      icon: PenLine,
      color: '#6366f1',
      title: t('tools.editorTitle'),
      desc: t('tools.editorDescription'),
    },
  ];

  const faqs = [
    { q: t('faq.q1'), a: t('faq.a1') },
    { q: t('faq.q2'), a: t('faq.a2') },
    { q: t('faq.q3'), a: t('faq.a3') },
    { q: t('faq.q4'), a: t('faq.a4') },
    { q: t('faq.q5'), a: t('faq.a5') },
    { q: t('faq.q6'), a: t('faq.a6') },
    { q: t('faq.q7'), a: t('faq.a7') },
  ];

  return (
    <>
      {/* ===== HERO + LIVE EDITOR ===== */}
      <section className="home-hero relative overflow-hidden border-b border-[var(--border-color)]">
        <div className="home-hero-bg" aria-hidden />

        <div className="relative home-hero-inner">
          <header className="home-hero-copy">
            <h1 className="home-hero-title">
              <span>{t('hero.title')}</span>
              <span className="home-hero-title-accent"> {t('hero.titleHighlight')}</span>
            </h1>
            <p className="home-hero-subtitle">{t('hero.subtitle')}</p>
          </header>

          <div className="home-hero-editor">
            <EditorClient variant="hero" />
          </div>
        </div>
      </section>

      {/* ===== TOOLS ===== */}
      <section className="section-py relative">
        <div className="page-container">
          <ScrollReveal>
            <SectionHeading
              size="compact"
              title={t('tools.sectionTitle')}
              subtitle={t('tools.sectionSubtitle')}
            />
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {tools.map((tool, i) => (
              <ScrollReveal key={tool.href} delay={i * 60}>
                <Link href={tool.href} className="tool-card group block h-full cursor-pointer">
                  <div className="flex items-center justify-start gap-2.5 mb-3">
                    <div className="w-9 h-9 rounded-md flex items-center justify-center shrink-0 border border-[var(--border-color)] bg-[var(--bg-secondary)]">
                      <tool.icon className="w-4 h-4" style={{ color: tool.color }} />
                    </div>
                    <h3 className="text-sm font-semibold group-hover:text-[var(--accent)] transition-colors">
                      {tool.title}
                    </h3>
                  </div>

                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed line-clamp-2">
                    {tool.desc}
                  </p>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TRUST ===== */}
      {/* <TrustSection /> */}

      {/* ===== STATISTICS ===== */}
      {/* <StatsSection /> */}

      {/* ===== FEATURES ===== */}
      {/* <section className="section-py section-divider relative">
        <div className="page-container">
          <ScrollReveal>
            <SectionHeading
              size="compact"
              title={t('features.sectionTitle')}
              subtitle={t('features.sectionSubtitle')}
            />
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feat, i) => (
              <ScrollReveal key={i} delay={i * 60}>
                <div className="card-glass group p-6 hover-lift h-full">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                    style={{ background: `${feat.color}14` }}
                  >
                    <feat.icon className="w-5 h-5" style={{ color: feat.color }} />
                  </div>
                  <h3 className="text-base font-semibold mb-2">{feat.title}</h3>
                  <p className="text-sm text-(--text-secondary) leading-relaxed">{feat.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section> */}

      {/* ===== HOW IT WORKS ===== */}
      <HowItWorksSection />

      {/* ===== ABOUT ===== */}
      {/* <section className="section-py relative">
        <div className="page-container max-w-3xl">
          <ScrollReveal>
            <SectionHeading
              size="compact"
              title={th('aboutTitle')}
              subtitle={th('aboutSubtitle')}
            />
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <div className="card-glass p-8 sm:p-10 space-y-4 text-sm sm:text-base text-(--text-secondary) leading-relaxed">
              <p className="speakable-definition">{th('aboutParagraph1')}</p>
              <p>{th('aboutParagraph2')}</p>
              <p>
                {th('aboutParagraph3')}{' '}
                <Link href="/blog/how-to-convert-markdown-to-pdf-online" locale="en" className="text-[var(--accent)] hover:underline">
                  {th('aboutLinkPdf')}
                </Link>
                {', '}
                <Link href="/blog/render-mermaid-diagrams-markdown" locale="en" className="text-[var(--accent)] hover:underline">
                  {th('aboutLinkMermaid')}
                </Link>
                {', and '}
                <Link href="/blog/beginner-guide-markdown" locale="en" className="text-[var(--accent)] hover:underline">
                  {th('aboutLinkBeginner')}
                </Link>
                .
              </p>
              <p>
                PDFWritter builds upon open standards. We fully support the <a href="https://github.github.com/gfm/" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline">GitHub Flavored Markdown (GFM)</a> specification for core formatting and integrate <a href="https://mermaid.js.org/" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline">Mermaid.js</a> for native diagram generation. For command-line desktop alternatives, consider <a href="https://pandoc.org/" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline">Pandoc</a>.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section> */}

      {/* ===== GEO COMPARISON ===== */}
      <section className="section-py section-divider relative">
        <div className="page-container max-w-4xl">
          <ScrollReveal>
            <SectionHeading
              size="compact"
              title={th('compareTitle')}
              subtitle={th('compareSubtitle')}
            />
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <div className="overflow-x-auto rounded-lg border border-[var(--border-color)] bg-[var(--bg-primary)]">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead>
                  <tr className="border-b border-[var(--border-color)] text-[var(--text-secondary)]">
                    <th className="px-3 py-2.5 font-semibold">{th('compareColFeature')}</th>
                    <th className="px-3 py-2.5 font-semibold text-[var(--accent)]">{th('compareColPdfwritter')}</th>
                    <th className="px-3 py-2.5 font-semibold">{th('compareColUpload')}</th>
                    <th className="px-3 py-2.5 font-semibold">{th('compareColDesktop')}</th>
                  </tr>
                </thead>
                <tbody className="text-[var(--text-secondary)]">
                  {(
                    [
                      ['compareRowAccount', 'compareRowAccountPw', 'compareRowAccountUpload', 'compareRowAccountDesktop'],
                      ['compareRowPrivacy', 'compareRowPrivacyPw', 'compareRowPrivacyUpload', 'compareRowPrivacyDesktop'],
                      ['compareRowMermaid', 'compareRowMermaidPw', 'compareRowMermaidUpload', 'compareRowMermaidDesktop'],
                      ['compareRowPreview', 'compareRowPreviewPw', 'compareRowPreviewUpload', 'compareRowPreviewDesktop'],
                      ['compareRowFormats', 'compareRowFormatsPw', 'compareRowFormatsUpload', 'compareRowFormatsDesktop'],
                      ['compareRowInstall', 'compareRowInstallPw', 'compareRowInstallUpload', 'compareRowInstallDesktop'],
                    ] as const
                  ).map((row) => (
                    <tr key={row[0]} className="border-b border-[var(--border-color)] last:border-0">
                      <th scope="row" className="px-3 py-2.5 font-medium text-[var(--text-primary)]">
                        {th(row[0])}
                      </th>
                      <td className="px-3 py-2.5">{th(row[1])}</td>
                      <td className="px-3 py-2.5">{th(row[2])}</td>
                      <td className="px-3 py-2.5">{th(row[3])}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <BlogInsightsSection />

      {/* ===== FAQ ===== */}
      <section className="section-py relative">
        <div className="page-container max-w-3xl">
          <ScrollReveal>
            <SectionHeading
              size="compact"
              title={th('faqTitle')}
            />
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <FAQAccordion items={faqs} speakableAnswerIndex={[0, 1, 5, 6]} />
          </ScrollReveal>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildSpeakableJsonLd(
              ['.home-hero-subtitle', '.speakable-definition', '.speakable-faq-answer'],
              locale,
              '/',
            ),
          ),
        }}
      />
    </>
  );
}
