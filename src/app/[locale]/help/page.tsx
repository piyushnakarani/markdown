import { BookOpen, FileText, HelpCircle, Keyboard } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import FAQAccordion from '@/components/FAQAccordion';
import SectionHeading from '@/components/SectionHeading';
import { buildLocalizedPageMetadata } from '@/lib/site';
import { buildFaqPageJsonLd } from '@/lib/structured-data';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return buildLocalizedPageMetadata({
    locale,
    path: '/help',
    titleKey: 'help.title',
    descriptionKey: 'help.metaDescription',
  });
}

export default async function HelpPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('help');
  const tFaq = await getTranslations('faq');

  const faqs = [
    { q: tFaq('q1'), a: tFaq('a1') },
    { q: tFaq('q2'), a: tFaq('a2') },
    { q: tFaq('q3'), a: tFaq('a3') },
    { q: tFaq('q4'), a: tFaq('a4') },
    { q: tFaq('q5'), a: tFaq('a5') },
    { q: tFaq('q6'), a: tFaq('a6') },
  ];

  const syntaxRef = [
    { syntax: '# Heading 1', result: 'H1 heading' },
    { syntax: '## Heading 2', result: 'H2 heading' },
    { syntax: '**bold**', result: 'Bold text' },
    { syntax: '*italic*', result: 'Italic text' },
    { syntax: '[link](url)', result: 'Hyperlink' },
    { syntax: '![alt](url)', result: 'Image' },
    { syntax: '`code`', result: 'Inline code' },
    { syntax: '```lang', result: 'Code block' },
    { syntax: '- item', result: 'Unordered list' },
    { syntax: '1. item', result: 'Ordered list' },
    { syntax: '> quote', result: 'Blockquote' },
    { syntax: '---', result: 'Horizontal rule' },
    { syntax: '| A | B |', result: 'Table' },
  ];

  const shortcuts = [
    { key: 'Ctrl/⌘ + B', action: 'Bold' },
    { key: 'Ctrl/⌘ + I', action: 'Italic' },
    { key: 'Ctrl/⌘ + K', action: 'Link' },
    { key: 'Ctrl/⌘ + Shift + C', action: 'Code block' },
    { key: 'Ctrl/⌘ + S', action: 'Save/Download' },
  ];

  return (
    <>
      <section className="relative overflow-hidden py-16 sm:py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-[#6366f1]/5 via-transparent to-[#ec4899]/5" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#6366f1]/10 to-[#8b5cf6]/5 mb-6">
            <HelpCircle className="w-8 h-8 text-[#6366f1]" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4">{t('title')}</h1>
          <p className="text-[var(--text-secondary)] text-lg max-w-xl mx-auto">{t('subtitle')}</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-12">
        <div className="card-glass p-8">
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="w-6 h-6 text-[#6366f1]" />
            <h2 className="text-xl font-bold">{t('gettingStarted')}</h2>
          </div>
          <ol className="space-y-4 text-[var(--text-secondary)]">
            <li className="flex gap-3"><span className="font-bold text-[#6366f1]">1.</span> Navigate to any converter tool or the editor</li>
            <li className="flex gap-3"><span className="font-bold text-[#6366f1]">2.</span> Paste your Markdown content or upload a .md file</li>
            <li className="flex gap-3"><span className="font-bold text-[#6366f1]">3.</span> Click Convert to process your document</li>
            <li className="flex gap-3"><span className="font-bold text-[#6366f1]">4.</span> Download or copy the converted output</li>
          </ol>
        </div>

        <div className="card-glass p-8">
          <SectionHeading size="compact" title={t('faq')} />
          <div className="mt-6">
            <FAQAccordion items={faqs} speakableAnswerIndex={0} />
          </div>
        </div>

        <div className="card-glass p-8">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="w-6 h-6 text-[#f59e0b]" />
            <h2 className="text-xl font-bold">{t('syntaxRef')}</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--border-color)]">
                  <th className="text-left py-3 px-4 font-semibold">Markdown</th>
                  <th className="text-left py-3 px-4 font-semibold">Result</th>
                </tr>
              </thead>
              <tbody>
                {syntaxRef.map((item, i) => (
                  <tr key={i} className="border-b border-[var(--border-color)]">
                    <td className="py-3 px-4 font-mono text-[#6366f1]">{item.syntax}</td>
                    <td className="py-3 px-4 text-[var(--text-secondary)]">{item.result}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card-glass p-8">
          <div className="flex items-center gap-3 mb-6">
            <Keyboard className="w-6 h-6 text-[#10b981]" />
            <h2 className="text-xl font-bold">{t('shortcuts')}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {shortcuts.map((s, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-[var(--bg-tertiary)]">
                <span className="text-sm text-[var(--text-secondary)]">{s.action}</span>
                <kbd className="px-2.5 py-1 text-xs font-mono font-semibold rounded-lg bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)]">{s.key}</kbd>
              </div>
            ))}
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildFaqPageJsonLd(faqs, locale, '/help')),
        }}
      />
    </>
  );
}
