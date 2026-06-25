import { ArrowRight, Check, Code2, Eye, FileText, FileType, PenLine, Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

import { Link } from '@/i18n/navigation';
import { buildLocalizedPageMetadata } from '@/lib/site';
import { buildToolPageJsonLd } from '@/lib/structured-data';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return buildLocalizedPageMetadata({
    locale,
    path: `/${locale}/free-markdown-converter`,
    titleKey: 'freeConverter.title',
    descriptionKey: 'freeConverter.subtitle',
    titleSuffix: ' — PDF, HTML, TXT',
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
    { href: '/markdown-to-html', icon: Code2, color: '#f59e0b', title: t('tools.htmlTitle'), desc: t('tools.htmlDescription') },
    { href: '/markdown-to-txt', icon: FileType, color: '#10b981', title: t('tools.txtTitle'), desc: t('tools.txtDescription') },
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
      <section className="relative overflow-hidden py-16 sm:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-[#6366f1]/5 via-transparent to-[#ec4899]/5" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#6366f1]/10 to-[#8b5cf6]/5 mb-6">
            <Sparkles className="w-8 h-8 text-[#6366f1]" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4">{t('freeConverter.title')}</h1>
          <p className="text-[var(--text-secondary)] text-lg max-w-xl mx-auto">{t('freeConverter.subtitle')}</p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-16">
        {/* Converter Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {converters.map((c) => (
            <Link key={c.href} href={c.href} className="group card-glass flex items-start gap-4">
              <div className="w-14 h-14 shrink-0 rounded-2xl flex items-center justify-center" style={{ background: `${c.color}15` }}>
                <c.icon className="w-7 h-7" style={{ color: c.color }} />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-1 group-hover:text-[#6366f1] transition-colors">{c.title}</h3>
                <p className="text-sm text-[var(--text-secondary)]">{c.desc}</p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-[#6366f1] mt-2">
                  {t('tools.tryNow')} <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Benefits */}
        <div className="card-glass p-8 sm:p-12">
          <h2 className="text-2xl font-bold mb-8 text-center">{t('freeConverter.whyTitle')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {benefits.map((b, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-[#10b981]/10 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 text-[#10b981]" />
                </div>
                <span className="text-sm text-[var(--text-secondary)]">{b}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildToolPageJsonLd(
              'Free Markdown Converter',
              'Free online Markdown converter hub — PDF, HTML, TXT export with Mermaid diagram support.',
              `/${locale}/free-markdown-converter`,
            ),
          ),
        }}
      />
    </>
  );
}
