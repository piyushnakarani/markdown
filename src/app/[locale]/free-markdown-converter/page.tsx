import { ArrowRight, Check, Code2, Eye, FileSpreadsheet, FileText, FileType, GitBranch, PenLine, Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

import RelatedBlogGuides from '@/components/RelatedBlogGuides';
import { Link } from '@/i18n/navigation';
import { converterKeywordsForLocale } from '@/lib/locale-keywords';
import { buildLocalizedPageMetadata, withToolBrandKeywords } from '@/lib/site';
import { buildToolPageJsonLd } from '@/lib/structured-data';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return buildLocalizedPageMetadata({
    locale,
    path: '/free-markdown-converter',
    titleKey: 'freeConverter.title',
    descriptionKey: 'freeConverter.subtitle',
    titleSuffix: ' — Free PDF, HTML, TXT & DOCX',
    keywords: withToolBrandKeywords(converterKeywordsForLocale(locale), 'converter'),
  });
}

export default async function FreeConverterPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <FreeConverterContent locale={locale} />;
}

function FreeConverterContent({ locale }: { locale: string }) {
  const t = useTranslations();

  const converters = [
    { href: '/markdown-to-pdf', icon: FileText, color: '#ef4444', title: t('tools.pdfTitle'), desc: t('tools.pdfDescription') },
    { href: '/md-to-pdf', icon: FileText, color: '#ef4444', title: 'MD to PDF', desc: 'Convert Markdown (.md) to PDF with Mermaid diagrams and live preview.' },
    { href: '/chatgpt-to-pdf', icon: Sparkles, color: '#10a37f', title: t('nav.chatgptToPdf'), desc: t('tools.chatgptDescription') },
    { href: '/ai-markdown-to-pdf', icon: Sparkles, color: '#3b82f6', title: t('nav.aiToPdf'), desc: t('tools.aiDescription') },
    { href: '/mermaid-markdown-to-pdf', icon: GitBranch, color: '#8b5cf6', title: t('nav.mermaidToPdf'), desc: t('tools.mermaidDescription') },
    { href: '/obsidian-to-pdf', icon: GitBranch, color: '#4b3f72', title: 'Obsidian to PDF', desc: 'Export Obsidian Markdown notes to PDF with Mermaid diagrams.' },
    { href: '/notion-to-pdf', icon: GitBranch, color: '#000', title: 'Notion to PDF', desc: 'Convert Notion pages (Markdown export) to clean PDF.' },
    { href: '/github-readme-to-pdf', icon: FileText, color: '#6e5494', title: 'GitHub README to PDF', desc: 'Convert README.md to PDF with badges and code blocks.' },
    { href: '/markdown-to-pdf-resume', icon: FileText, color: '#0f4c3a', title: 'Markdown Resume to PDF', desc: 'Turn a Markdown CV into a clean, ATS-friendly PDF.' },
    { href: '/markdown-to-html', icon: Code2, color: '#f59e0b', title: t('tools.htmlTitle'), desc: t('tools.htmlDescription') },
    { href: '/markdown-to-txt', icon: FileType, color: '#10b981', title: t('tools.txtTitle'), desc: t('tools.txtDescription') },
    { href: '/markdown-to-docx', icon: FileSpreadsheet, color: '#3b82f6', title: t('tools.docxTitle'), desc: t('tools.docxDescription') },
    { href: '/markdown-live-preview', icon: Eye, color: '#8b5cf6', title: t('tools.livePreviewTitle'), desc: t('tools.livePreviewDescription') },
    { href: '/editor', icon: PenLine, color: '#6366f1', title: t('tools.editorTitle'), desc: t('tools.editorDescription') },
  ];

  const benefits = [
    t('freeConverter.benefit1'),
    t('freeConverter.benefit2'),
    t('freeConverter.benefit3'),
    t('freeConverter.benefit4'),
    t('freeConverter.benefit5'),
    t('freeConverter.benefit6'),
    t('freeConverter.benefit7'),
    t('freeConverter.benefit8'),
  ];

  return (
    <>
      <section className="relative border-b border-[var(--border-color)] py-10 sm:py-14">
        <div className="relative page-container max-w-3xl text-center">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-md border border-[var(--border-color)] bg-[var(--accent-muted)] mb-4">
            <Sparkles className="w-5 h-5 text-[var(--accent)]" />
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-3">{t('freeConverter.title')}</h1>
          <p className="text-[var(--text-secondary)] text-sm sm:text-base max-w-xl mx-auto">{t('freeConverter.subtitle')}</p>
          <p className="text-sm text-[var(--text-tertiary)] max-w-xl mx-auto mt-3">
            {t('freeConverter.pdfHintBefore')}{' '}
            <Link href="/markdown-to-pdf" className="text-[var(--accent)] font-medium hover:underline">
              {t('freeConverter.pdfHintLink')}
            </Link>
            {t('freeConverter.pdfHintAfter')}
          </p>
        </div>
      </section>

      <section className="page-container py-10 space-y-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {converters.map((c) => (
            <Link key={c.href} href={c.href} className="group card-glass flex items-start gap-3.5 cursor-pointer">
              <div className="w-9 h-9 shrink-0 rounded-md flex items-center justify-center border border-[var(--border-color)] bg-[var(--bg-secondary)]">
                <c.icon className="w-4 h-4" style={{ color: c.color }} />
              </div>
              <div>
                <h3 className="text-sm font-semibold mb-1 group-hover:text-[var(--accent)] transition-colors">{c.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{c.desc}</p>
                <span className="inline-flex items-center gap-1 text-xs font-medium text-[var(--accent)] mt-2">
                  {t('tools.tryNow')} <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="card-glass p-5 sm:p-6">
          <h2 className="text-base font-semibold mb-5 text-center">{t('freeConverter.whyTitle')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {benefits.map((b, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-[var(--accent-muted)] flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-[var(--accent)]" />
                </div>
                <span className="text-sm text-[var(--text-secondary)]">{b}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <RelatedBlogGuides toolKey="free-markdown-converter" accentColor="var(--accent)" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildToolPageJsonLd(
              'Free Markdown Converter',
              'Free online Markdown converter hub. Pick PDF, HTML, or TXT export — Mermaid diagrams supported. For Markdown to PDF specifically, use the dedicated PDF tool.',
              locale,
              '/free-markdown-converter',
            ),
          ),
        }}
      />
    </>
  );
}
