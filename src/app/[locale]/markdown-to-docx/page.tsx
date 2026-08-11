import { Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

import ConverterTool from '@/components/ConverterTool';
import PageHero from '@/components/PageHero';
import ToolSeoSections from '@/components/ToolSeoSections';
import { docxKeywordsForLocale } from '@/lib/locale-keywords';
import { buildLocalizedPageMetadata, withToolBrandKeywords } from '@/lib/site';
import { buildToolPageJsonLd } from '@/lib/structured-data';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return buildLocalizedPageMetadata({
    locale,
    path: '/markdown-to-docx',
    titleKey: 'tools.docxTitle',
    descriptionKey: 'tools.docxDescription',
    titleSuffix: ' — Free Word Export Online',
    keywords: withToolBrandKeywords(docxKeywordsForLocale(locale), 'docx'),
  });
}

export default async function MarkdownToDocxPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <MarkdownToDocxContent locale={locale} />;
}

function MarkdownToDocxContent({ locale }: { locale: string }) {
  const t = useTranslations();
  const faqs = [
    {
      q: 'What is the Markdown to DOCX tool?',
      a: 'It is a free online converter that turns Markdown into an editable Microsoft Word (.docx) document you can open in Word, Google Docs, LibreOffice, and other word processors.',
    },
    {
      q: 'How do I convert Markdown to DOCX?',
      a: 'Paste Markdown into the editor or upload a .md file, preview the rendered output, then click Download DOCX to save a Word document.',
    },
    {
      q: 'Does it support headings, lists, and tables?',
      a: 'Yes. Headings, bullet and numbered lists, tables, blockquotes, links, inline formatting, and fenced code blocks are exported into the Word document.',
    },
    {
      q: 'Are Mermaid diagrams included in the DOCX file?',
      a: 'Yes. Mermaid flowcharts and sequence diagrams render in preview and are embedded as images in the exported .docx file when possible.',
    },
    {
      q: 'Is my Markdown uploaded to a server?',
      a: 'No. Conversion runs in your browser, so your content stays private on your device.',
    },
    {
      q: 'Is this Markdown to DOCX converter free?',
      a: 'Yes. PDFWritter is free online and does not require signup, installation, or watermarks.',
    },
  ];

  return (
    <>
      <PageHero
        badge={t('tools.docxBadge')}
        badgeIcon={Sparkles}
        title={
          <>
            Convert Markdown to{' '}
            <span className="bg-linear-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
              DOCX
            </span>
          </>
        }
        subtitle={t('tools.docxDescription')}
        accentColor="#60a5fa"
        glowColor="rgba(59,130,246,0.08)"
      />
      <ConverterTool type="docx" />
      <ToolSeoSections
        whatTitle="What is this Markdown to DOCX tool?"
        whatDescription="PDFWritter converts Markdown into an editable Word document directly in your browser. It is built for writers, students, and teams who need a .docx file for resumes, reports, submissions, and collaboration — without installing desktop software or uploading private drafts to a server."
        howTitle="How to convert Markdown to DOCX"
        howSubtitle="Turn any .md document into a Word file in three quick steps."
        steps={[
          {
            title: 'Paste or upload Markdown',
            description: 'Add Markdown manually, paste notes from ChatGPT or GitHub, or upload a .md or .txt file.',
          },
          {
            title: 'Preview rendered content',
            description: 'Check headings, lists, tables, code blocks, and Mermaid diagrams before exporting to Word.',
          },
          {
            title: 'Download DOCX instantly',
            description: 'Save the .docx file and open it in Microsoft Word, Google Docs, or LibreOffice for editing.',
          },
        ]}
        featuresTitle="Features of the Markdown to DOCX converter"
        featuresSubtitle="Everything needed to move Markdown content into an editable Word document."
        features={[
          {
            title: 'Editable Word output',
            description: 'Generate a real .docx file with headings, paragraphs, lists, links, and tables you can edit further.',
          },
          {
            title: 'Live preview',
            description: 'See how your Markdown renders before downloading the Word document.',
          },
          {
            title: 'GitHub Flavored Markdown',
            description: 'Supports common documentation syntax including tables, fenced code blocks, and task lists.',
          },
          {
            title: 'Browser-side conversion',
            description: 'Convert locally for fast results and better privacy than upload-only converter sites.',
          },
          {
            title: 'Mermaid diagram support',
            description: 'Flowcharts and sequence diagrams from Mermaid code blocks are embedded in the exported document.',
          },
          {
            title: 'No signup required',
            description: 'Use the converter instantly with no account, extension, or installation.',
          },
        ]}
        compareTitle="PDFWritter vs other Markdown to DOCX converters"
        compareUs="PDFWritter"
        compareThem="Typical upload converters"
        comparisons={[
          { ours: 'Live Markdown editor with preview', theirs: 'Often upload-only with no editing experience' },
          { ours: 'Mermaid diagrams embedded in DOCX', theirs: 'Usually no diagram support' },
          { ours: 'Client-side conversion for privacy', theirs: 'May upload content to a server' },
          { ours: 'Free online with no signup', theirs: 'May require an account or add limits' },
        ]}
        mermaidTitle="Supports Mermaid diagrams"
        mermaidDescription="Use Mermaid code blocks for flowcharts and sequence diagrams in technical Markdown. PDFWritter renders diagrams in preview and includes them in the exported Word document."
        faqTitle="Markdown to DOCX FAQ"
        faqs={faqs}
        relatedGuidesToolKey="markdown-to-docx"
        accentColor="#3b82f6"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildToolPageJsonLd(
              'Markdown to DOCX Converter',
              'Convert Markdown to editable Word DOCX online for free with Mermaid diagram support.',
              locale,
              '/markdown-to-docx',
            ),
          ),
        }}
      />
    </>
  );
}
