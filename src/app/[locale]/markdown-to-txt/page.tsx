import { Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

import ConverterTool from '@/components/ConverterTool';
import PageHero from '@/components/PageHero';
import ToolSeoSections from '@/components/ToolSeoSections';
import { buildLocalizedPageMetadata, withToolBrandKeywords } from '@/lib/site';
import { buildToolPageJsonLd } from '@/lib/structured-data';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return buildLocalizedPageMetadata({
    locale,
    path: `/${locale}/markdown-to-txt`,
    titleKey: 'tools.txtTitle',
    descriptionKey: 'tools.txtDescription',
    titleSuffix: ' — Free Online Converter',
    keywords: withToolBrandKeywords([
      'markdown to txt',
      'convert markdown to txt',
      'md to txt',
      'online markdown to txt converter',
      'markdown to txt converter',
      'markdown to txt online',
      'free markdown to txt',
      'converting markdown to txt',
      'markdown-to-txt converter',
      'strip markdown formatting',
      'convert md to txt',
      'remove markdown markdown to plain text',
      'markdown to plain text converter',
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
    ], 'txt'),
  });
}

export default async function MarkdownToTxtPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <MarkdownToTxtContent locale={locale} />;
}

function MarkdownToTxtContent({ locale }: { locale: string }) {
  const t = useTranslations();
  const faqs = [
    {
      q: 'What is the Markdown to TXT tool?',
      a: 'It is a free online converter that strips Markdown formatting and exports clean plain text for notes, emails, support replies, and content reuse.',
    },
    {
      q: 'How do I convert Markdown to TXT?',
      a: 'Paste Markdown or upload a .md file, preview the stripped plain-text output, then download the result as a .txt file.',
    },
    {
      q: 'Does it remove Markdown syntax?',
      a: 'Yes. The converter removes formatting markers such as heading symbols, links, emphasis syntax, and code fences where plain text is more useful.',
    },
    {
      q: 'Does Mermaid content work in TXT export?',
      a: 'Mermaid diagrams are text-based code blocks, so the source remains available as plain text even though TXT cannot visually render diagrams.',
    },
    {
      q: 'Is the Markdown to TXT converter private?',
      a: 'Yes. Conversion happens in your browser, so your file content stays on your device.',
    },
  ];

  return (
    <>
      <PageHero
        badge={t('tools.txtBadge')}
        badgeIcon={Sparkles}
        title={
          <>
            Convert Markdown to{' '}
            <span className="bg-linear-to-r from-emerald-500 to-green-500 bg-clip-text text-transparent">
              TXT
            </span>
          </>
        }
        subtitle={t('tools.txtDescription')}
        accentColor="#34d399"
        glowColor="rgba(16,185,129,0.08)"
      />
      <ConverterTool type="txt" />
      <ToolSeoSections
        whatTitle="What is this Markdown to TXT tool?"
        whatDescription="PDFWritter converts Markdown into clean plain text when you need readable content without Markdown syntax. It is useful for emails, support docs, content migration, notes, AI prompts, and any workflow where formatting markers get in the way."
        howTitle="How to convert Markdown to TXT"
        howSubtitle="Strip Markdown formatting and download a plain-text file in seconds."
        steps={[
          {
            title: 'Paste or upload Markdown',
            description: 'Add Markdown directly to the editor or upload a .md, .markdown, or .txt file.',
          },
          {
            title: 'Review plain-text output',
            description: 'Check the converted text for headings, lists, links, and code content before saving.',
          },
          {
            title: 'Download TXT instantly',
            description: 'Export the result as a .txt file or copy it for email, notes, documentation, or publishing workflows.',
          },
        ]}
        featuresTitle="Features of the Markdown to TXT converter"
        featuresSubtitle="Simple plain-text export for Markdown content."
        features={[
          {
            title: 'Clean plain text',
            description: 'Remove Markdown formatting syntax while keeping the readable document content.',
          },
          {
            title: 'Fast browser conversion',
            description: 'See TXT output instantly without waiting for an upload or server queue.',
          },
          {
            title: 'Useful for content reuse',
            description: 'Prepare Markdown content for email, support replies, text editors, CMS fields, and AI prompts.',
          },
          {
            title: 'File upload support',
            description: 'Drag and drop Markdown files and convert them directly in the browser.',
          },
          {
            title: 'Copy or download',
            description: 'Copy the plain text or download a .txt file with one click.',
          },
          {
            title: 'No account required',
            description: 'Use the converter free online with no signup, watermarks, or installation.',
          },
        ]}
        compareTitle="PDFWritter vs other Markdown to TXT converters"
        compareUs="PDFWritter"
        compareThem="Typical upload converters"
        comparisons={[
          { ours: 'Instant editor and output preview', theirs: 'Often only returns a download' },
          { ours: 'Browser-side conversion for privacy', theirs: 'May upload files to a server' },
          { ours: 'Copy and download workflows', theirs: 'Limited export options' },
          { ours: 'Free online with no signup', theirs: 'May add usage limits or account gates' },
        ]}
        mermaidTitle="Supports Mermaid source text"
        mermaidDescription="TXT files cannot display diagrams visually, but Mermaid code blocks remain available as plain text so technical documentation can still be copied, searched, and reused."
        faqTitle="Markdown to TXT FAQ"
        faqs={faqs}
        relatedGuidesToolKey="markdown-to-txt"
        accentColor="#10b981"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildToolPageJsonLd(
              'Markdown to TXT Converter',
              'Convert Markdown to plain text online for free — strip formatting instantly.',
              locale,
              '/markdown-to-txt',
            ),
          ),
        }}
      />
    </>
  );
}
