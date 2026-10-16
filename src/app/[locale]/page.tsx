import { useTranslations } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';

import BlogInsightsSection from '@/components/BlogInsightsSection';
import EditorClientWrapper from '@/components/EditorClientWrapper';
import FAQAccordion from '@/components/FAQAccordion';
import HowItWorksSection from '@/components/HowItWorksSection';
import ScrollReveal from '@/components/ScrollReveal';
import SectionHeading from '@/components/SectionHeading';
import ToolNavIcon from '@/components/ToolNavIcon';
import { Link } from '@/i18n/navigation';
import { getNavTool, type NavToolHref } from '@/lib/nav-tool-links';
import { buildPageMetadata } from '@/lib/site';
import { buildSpeakableJsonLd } from '@/lib/structured-data';

const HOME_TOOL_CARDS: { href: NavToolHref; title: string; desc: string }[] = [
  { href: '/markdown-to-pdf', title: 'tools.pdfTitle', desc: 'tools.pdfDescription' },
  { href: '/chatgpt-to-pdf', title: 'nav.chatgptToPdf', desc: 'tools.chatgptDescription' },
  { href: '/mermaid-markdown-to-pdf', title: 'nav.mermaidToPdf', desc: 'tools.mermaidDescription' },
  { href: '/ai-markdown-to-pdf', title: 'nav.aiToPdf', desc: 'tools.aiDescription' },
  { href: '/markdown-to-html', title: 'tools.htmlTitle', desc: 'tools.htmlDescription' },
  { href: '/markdown-to-txt', title: 'tools.txtTitle', desc: 'tools.txtDescription' },
  { href: '/markdown-to-docx', title: 'tools.docxTitle', desc: 'tools.docxDescription' },
  { href: '/markdown-live-preview', title: 'tools.livePreviewTitle', desc: 'tools.livePreviewDescription' },
  { href: '/editor', title: 'tools.editorTitle', desc: 'tools.editorDescription' },
  { href: '/obsidian-to-pdf', title: 'nav.obsidianToPdf', desc: 'tools.obsidianDescription' },
  { href: '/notion-to-pdf', title: 'nav.notionToPdf', desc: 'tools.notionDescription' },
  { href: '/github-readme-to-pdf', title: 'nav.githubReadmeToPdf', desc: 'tools.githubReadmeDescription' },
  { href: '/markdown-to-pdf-resume', title: 'nav.resumeToPdf', desc: 'tools.resumeDescription' },
  { href: '/pandoc-alternative', title: 'tools.pandocTitle', desc: 'tools.pandocDescription' },
  { href: '/markdown-fixer', title: 'tools.fixerTitle', desc: 'tools.fixerDescription' },
];

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

  const tools = HOME_TOOL_CARDS.map((card) => {
    const nav = getNavTool(card.href);
    return {
      href: card.href,
      icon: nav.icon,
      variant: nav.variant,
      title: t(card.title),
      desc: t(card.desc),
    };
  });

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
            <EditorClientWrapper variant="hero" />
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
                  <div className="flex items-center justify-start gap-3 mb-3">
                    <ToolNavIcon icon={tool.icon} variant={tool.variant} />
                    <h3 className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors leading-snug">
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
            <p className="mt-3 text-xs text-[var(--text-tertiary)] leading-relaxed">
              First-hand comparison based on PDFWritter workflows versus typical upload converters and desktop tools such as{' '}
              <a href="https://pandoc.org/" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline">
                Pandoc
              </a>
              . Diagram support references{' '}
              <a href="https://mermaid.js.org/" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline">
                Mermaid
              </a>
              ; Markdown flavor follows{' '}
              <a href="https://github.github.com/gfm/" target="_blank" rel="noopener noreferrer" className="text-[var(--accent)] hover:underline">
                GitHub Flavored Markdown
              </a>
              .
            </p>
          </ScrollReveal>
        </div>
      </section>

      {locale === 'en' && (
        <section className="section-py section-divider relative" aria-labelledby="popular-workflows-heading">
          <div className="page-container max-w-4xl">
            <ScrollReveal>
              <SectionHeading
                size="compact"
                title="Popular Markdown workflows"
                subtitle="Tools and guides aligned with what developers search for — from online editors to PDF export and documentation."
              />
            </ScrollReveal>
            <ScrollReveal delay={60}>
              <ul className="grid gap-2 sm:grid-cols-2 text-sm text-[var(--text-secondary)]">
                {[
                  { href: '/editor', label: 'Markdown editor online' },
                  { href: '/markdown-to-pdf', label: 'Markdown to PDF' },
                  { href: '/md-to-pdf', label: 'Convert md to PDF' },
                  { href: '/markdown-live-preview', label: 'Markdown renderer online' },
                  { href: '/mermaid-markdown-to-pdf', label: 'Markdown to PDF with Mermaid' },
                  { href: '/pandoc-alternative', label: 'Pandoc alternative' },
                  { href: '/free-markdown-converter', label: 'Markdown converter online' },
                  { href: '/blog/best-markdown-editors', label: 'Best markdown apps' },
                  { href: '/blog/free-markdown-tools', label: 'Best free markdown apps' },
                  { href: '/blog/documentation-tools-developers', label: 'Software documentation tools' },
                  { href: '/blog/render-mermaid-diagrams-markdown', label: 'Markdown flowchart (Mermaid)' },
                  { href: '/blog/markdown-tutorial-beginners', label: 'Markdown tutorial' },
                ].map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-[var(--accent)] hover:underline">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>
        </section>
      )}

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
