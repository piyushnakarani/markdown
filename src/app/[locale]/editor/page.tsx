import { PenLine } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

const EditorClient = dynamic(() => import('@/components/EditorClient'));
import PageHero from '@/components/PageHero';
import ToolSeoSections from '@/components/ToolSeoSections';
import { buildLocalizedPageMetadata } from '@/lib/site';
import { buildToolPageJsonLd } from '@/lib/structured-data';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return buildLocalizedPageMetadata({
    locale,
    path: `/${locale}/editor`,
    titleKey: 'editor.title',
    descriptionKey: 'editor.description',
    titleSuffix: ' — Split-Pane Live Preview',
    keywords: [
      'markdown live preview',
      'live preview markdown',
      'markdown editor with preview',
      'split pane markdown editor',
      'online markdown editor',
      'markdown preview online',
      'markdown viewer',
      'md viewer',
      'mermaid markdown editor',
      'pdfwritter',
      'free markdown editor',
      'wysiwyg markdown editor',
      'github markdown editor',
      'markdown editor online',
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
    ],
  });
}

export default async function EditorPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <EditorPageContent locale={locale} />;
}

function EditorPageContent({ locale }: { locale: string }) {
  const t = useTranslations('editor');
  const faqs = [
    {
      q: 'What is the online Markdown editor?',
      a: 'It is a free browser-based Markdown editor with split-pane live preview, sync scroll, formatting shortcuts, Mermaid diagram support, and export options for PDF, HTML, and TXT.',
    },
    {
      q: 'How do I use the Markdown editor?',
      a: 'Write or paste Markdown in the editor, review the live preview, then export the document as PDF, HTML, or TXT when it looks right.',
    },
    {
      q: 'Can I convert Markdown to PDF from the editor?',
      a: 'Yes. The editor includes one-click PDF export, so you can write, preview, and download a formatted PDF from the same page.',
    },
    {
      q: 'Does the editor support Mermaid diagrams?',
      a: 'Yes. Add Mermaid code blocks to preview flowcharts, sequence diagrams, Gantt charts, and other diagrams inside your Markdown document.',
    },
    {
      q: 'Do I need to create an account?',
      a: 'No. PDFWritter is free online and works without signup, installation, or watermarks.',
    },
  ];

  return (
    <>
      <PageHero
        badge={t('badge')}
        badgeIcon={PenLine}
        title={<span className="gradient-text">{t('title')}</span>}
        subtitle={t('description')}
        accentColor="#3b82f6"
        glowColor="rgba(59,130,246,0.08)"
      />
      <EditorClient />
      <ToolSeoSections
        whatTitle="What is this online Markdown editor?"
        whatDescription="PDFWritter is a split-pane Markdown editor for writing, previewing, and exporting Markdown documents in your browser. It is designed for README files, technical documentation, blog drafts, notes, and Mermaid-powered diagrams."
        howTitle="How to write and export Markdown"
        howSubtitle="Create Markdown, preview it live, and export it to the format you need."
        steps={[
          {
            title: 'Write or upload Markdown',
            description: 'Start typing, paste existing content, or upload a Markdown file into the editor.',
          },
          {
            title: 'Preview as you work',
            description: 'Use the split-pane preview to check formatting, tables, code blocks, links, and Mermaid diagrams.',
          },
          {
            title: 'Export PDF, HTML, or TXT',
            description: 'Download a formatted PDF, clean HTML, or plain text version when your document is ready.',
          },
        ]}
        featuresTitle="Features of the online Markdown editor"
        featuresSubtitle="A complete browser workspace for Markdown writing and export."
        features={[
          {
            title: 'Split-pane live preview',
            description: 'Write Markdown on one side and see the rendered result update on the other side.',
          },
          {
            title: 'Sync scroll',
            description: 'Keep your editor and preview aligned while reviewing long documents.',
          },
          {
            title: 'PDF, HTML, and TXT export',
            description: 'Turn Markdown into the right output format without switching tools.',
          },
          {
            title: 'Formatting shortcuts',
            description: 'Quickly insert headings, lists, links, images, code blocks, quotes, and tables.',
          },
          {
            title: 'Browser privacy',
            description: 'Write and preview content locally without an account or cloud workspace.',
          },
          {
            title: 'Developer documentation friendly',
            description: 'Great for README files, changelogs, API notes, and technical publishing workflows.',
          },
        ]}
        compareTitle="PDFWritter vs other online Markdown editors"
        compareUs="PDFWritter"
        compareThem="Typical online editors"
        comparisons={[
          { ours: 'Live preview plus PDF/HTML/TXT export', theirs: 'Often preview-only or limited export' },
          { ours: 'Mermaid diagram rendering', theirs: 'Many editors do not render diagrams' },
          { ours: 'Free online with no signup', theirs: 'May require cloud login or account creation' },
          { ours: 'Focused Markdown workflow', theirs: 'Can be cluttered with unrelated workspace features' },
        ]}
        mermaidTitle="Supports Mermaid diagrams"
        mermaidDescription="Add Mermaid fenced code blocks and preview diagrams directly inside your Markdown. This helps technical writers document flows, architecture, and processes without leaving the editor."
        faqTitle="Online Markdown Editor FAQ"
        faqs={faqs}
        relatedGuidesToolKey="editor"
        accentColor="#3b82f6"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildToolPageJsonLd(
              'Online Markdown Editor',
              'Write Markdown with split-pane live preview, sync scroll, syntax highlighting, and Mermaid diagram support.',
              locale,
              '/editor',
            ),
          ),
        }}
      />
    </>
  );
}
