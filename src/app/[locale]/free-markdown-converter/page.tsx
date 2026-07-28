import { ArrowRight, Check, Code2, Eye, FileText, FileType, PenLine, Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

import RelatedBlogGuides from '@/components/RelatedBlogGuides';
import { Link } from '@/i18n/navigation';
import { buildLocalizedPageMetadata, withToolBrandKeywords } from '@/lib/site';
import { buildToolPageJsonLd } from '@/lib/structured-data';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return buildLocalizedPageMetadata({
    locale,
    path: `/${locale}/free-markdown-converter`,
    titleKey: 'freeConverter.title',
    descriptionKey: 'freeConverter.subtitle',
    titleSuffix: ' — PDF, HTML, TXT',
    keywords: withToolBrandKeywords([
      'free markdown converter',
      'markdown converter online',
      'convert markdown file',
      'markdown file converter',
      'markdown converter tool',
      'online markdown converter',
      'convert markdown to pdf html txt',
      'markdown file convert',
      'markdown conversion',
      'best markdown converter',
      // Spanish
      'convertir markdown a pdf',
      'convertidor md a pdf online gratis',
      'pasar archivo md a pdf vs code',
      'exportar markdown a pdf obsidian',
      'convertir de markdown a pdf sin perder formato',
      'herramienta para cambiar markdown a pdf',
      'descargar md como pdf gratis',
      'conversor de archivos md a pdf',
      'codigo de markdown a pdf',
      'convertir github readme a pdf',
      // Chinese
      'md文件转换成pdf',
      'vscode markdown导出pdf',
      'markdown转pdf工具 离线',
      'obsidian md 导出 pdf',
      'markdown转pdf 代码高亮',
      'markdown转pdf 自定义css',
      'gitbook markdown 批量转 pdf',
      'jupyter markdown 转换 pdf',
      '免费 markdown 转 pdf 网页',
      // Hindi / Hinglish
      'markdown ko pdf me kaise convert kare',
      'md file to pdf converter free',
      'markdown to pdf online tool download',
      'vs code se markdown pdf kaise banaye',
      'markdown format to pdf conversion',
      'best md to pdf converter software',
      'markdown note ko pdf kaise kare',
      'mobile me markdown to pdf convert',
      'markdown code to pdf file',
      'github md file to pdf download',
      // Japanese
      'markdown pdf 変換',
      'md pdf 変換 フリー',
      'vsコード markdown pdf 出力',
      'markdown pdf 変換 コマンドライン',
      'obsidian markdown pdf エクスポート',
      'markdownをpdfに変換 レイアウト崩れない',
      'github readme md pdf 変換',
      'markdown pdf 変換 css テンプレート',
      'jupterノートブック markdown pdf 変換',
      'ノーション markdown pdf 出力',
      // German
      'markdown in pdf umwandeln',
      'md zu pdf konverter kostenlos',
      'markdown pdf exportieren vscode',
      'md datei in pdf konvertieren offline',
      'obsidian notizen als pdf speichern',
      'markdown zu pdf mit eigenem css',
      'pandoc markdown in pdf umwandeln',
      'markdown lebenslauf als pdf exportieren',
      'sicherer markdown zu pdf online konverter',
      'markdown text in pdf umwandeln',
      // Portuguese
      'converter markdown em pdf',
      'md para pdf online grátis',
      'exportar markdown para pdf vscode',
      'extensão md para pdf visual studio code',
      'converter notas do obsidian para pdf',
      'transformar arquivo md em pdf',
      'conversor de markdown para pdf seguro',
      'gerar pdf a partir de markdown',
      'markdown para pdf com estilo css',
      'automatizar markdown para pdf linha de comando',
      // French
      'convertir markdown en pdf',
      'convertisseur md en pdf en ligne',
      'exporter markdown vers pdf gratuitement',
      'visual studio code extension markdown pdf',
      'convertir fichier md en pdf sans telechargement',
      'mise en page markdown vers pdf',
      'convertir cv markdown en pdf',
      'obsidian exporter note en pdf',
      'outil en ligne markdown vers pdf',
      'pandoc markdown en pdf commande',
    ], 'converter'),
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

      <RelatedBlogGuides toolKey="free-markdown-converter" accentColor="#3b82f6" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildToolPageJsonLd(
              'Free Markdown Converter',
              'Free online Markdown converter hub — PDF, HTML, TXT export with Mermaid diagram support.',
              locale,
              '/free-markdown-converter',
            ),
          ),
        }}
      />
    </>
  );
}
