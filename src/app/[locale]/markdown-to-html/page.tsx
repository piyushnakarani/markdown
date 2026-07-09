import { Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

import ConverterTool from '@/components/ConverterTool';
import PageHero from '@/components/PageHero';
import ToolSeoSections from '@/components/ToolSeoSections';
import { buildLocalizedPageMetadata } from '@/lib/site';
import { buildToolPageJsonLd } from '@/lib/structured-data';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return buildLocalizedPageMetadata({
    locale,
    path: `/${locale}/markdown-to-html`,
    titleKey: 'tools.htmlTitle',
    descriptionKey: 'tools.htmlDescription',
    titleSuffix: ' — Free Online Converter',
    keywords: [
      'markdown to html',
      'convert markdown to html',
      'md to html',
      'online markdown to html converter',
      'markdown to html converter',
      'markdown to html online',
      'free markdown to html',
      'converting markdown to html',
      'markdown-to-html converter',
      'markdown html export',
      'export markdown to html',
      'convert md to html',
      'md to html online',
      'markdown to clean html',
      'pdfwritter',
    ],
  });
}

export default async function MarkdownToHtmlPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <MarkdownToHtmlContent locale={locale} />;
}

function MarkdownToHtmlContent({ locale }: { locale: string }) {
  const t = useTranslations();
  const faqs = [
    {
      q: 'What is the Markdown to HTML tool?',
      a: 'It is a free online converter that turns Markdown into clean, semantic HTML you can use in websites, blogs, email templates, documentation, and CMS pages.',
    },
    {
      q: 'How do I convert Markdown to HTML?',
      a: 'Paste Markdown into the editor or upload a .md file, check the live preview, then copy or download the generated HTML.',
    },
    {
      q: 'Does it support Mermaid diagrams?',
      a: 'Yes. Mermaid code blocks render in the preview and can be included in exported HTML, which is useful for technical documentation and flowcharts.',
    },
    {
      q: 'Is my Markdown uploaded to a server?',
      a: 'No. The conversion runs in your browser, so your Markdown stays private on your device.',
    },
    {
      q: 'Is this Markdown to HTML converter free?',
      a: 'Yes. PDFWritter is free online and does not require signup, installation, or watermarks.',
    },
  ];

  return (
    <>
      <PageHero
        badge={t('tools.htmlBadge')}
        badgeIcon={Sparkles}
        title={
          <>
            Convert Markdown to{' '}
            <span className="bg-linear-to-r from-amber-500 to-yellow-500 bg-clip-text text-transparent">
              HTML
            </span>
          </>
        }
        subtitle={t('tools.htmlDescription')}
        accentColor="#fbbf24"
        glowColor="rgba(245,158,11,0.08)"
      />
      <ConverterTool type="html" />
      <ToolSeoSections
        whatTitle="What is this Markdown to HTML tool?"
        whatDescription="PDFWritter converts Markdown into clean HTML directly in your browser. It is built for developers, writers, and documentation teams who need semantic HTML output without installing a desktop app or sending private documents to upload-based converters."
        howTitle="How to convert Markdown to HTML"
        howSubtitle="Turn any .md document into ready-to-use HTML in three quick steps."
        steps={[
          {
            title: 'Paste or upload Markdown',
            description: 'Add Markdown manually, paste README content, or upload a .md or .txt file into the converter.',
          },
          {
            title: 'Preview rendered content',
            description: 'Check headings, links, tables, code blocks, and Mermaid diagrams before exporting the HTML.',
          },
          {
            title: 'Copy or download HTML',
            description: 'Copy the generated HTML or download it as a standalone file for your site, blog, or email workflow.',
          },
        ]}
        featuresTitle="Features of the Markdown to HTML converter"
        featuresSubtitle="Everything needed to move Markdown content into web-ready HTML."
        features={[
          {
            title: 'Clean semantic HTML',
            description: 'Generate HTML for headings, paragraphs, lists, links, tables, blockquotes, and code blocks.',
          },
          {
            title: 'Live preview',
            description: 'See how your Markdown renders before copying or downloading the converted HTML.',
          },
          {
            title: 'GitHub Flavored Markdown',
            description: 'Supports common developer documentation syntax including tables, fenced code blocks, and task-list style content.',
          },
          {
            title: 'Browser-side conversion',
            description: 'Convert content locally for fast results and better privacy than upload-only converter sites.',
          },
          {
            title: 'Works without signup',
            description: 'Use the converter instantly with no account, no extension, and no installation.',
          },
          {
            title: 'Developer friendly',
            description: 'Great for README files, documentation pages, blog drafts, and static site content.',
          },
        ]}
        compareTitle="PDFWritter vs other Markdown to HTML converters"
        compareUs="PDFWritter"
        compareThem="Typical upload converters"
        comparisons={[
          { ours: 'Live Markdown editor with preview', theirs: 'Often upload-only with no editing experience' },
          { ours: 'Mermaid diagram support', theirs: 'Usually no diagram rendering' },
          { ours: 'Client-side conversion for privacy', theirs: 'May upload content to a server' },
          { ours: 'Free online with no signup', theirs: 'May require an account or add limits' },
        ]}
        mermaidTitle="Supports Mermaid diagrams"
        mermaidDescription="Use Mermaid code blocks for flowcharts, sequence diagrams, and charts in technical Markdown. PDFWritter renders diagrams so documentation stays understandable when converted."
        faqTitle="Markdown to HTML FAQ"
        faqs={faqs}
        relatedGuidesToolKey="markdown-to-html"
        accentColor="#f59e0b"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildToolPageJsonLd(
              'Markdown to HTML Converter',
              'Convert Markdown to clean semantic HTML online for free with Mermaid diagram support.',
              locale,
              '/markdown-to-html',
            ),
          ),
        }}
      />
    </>
  );
}
