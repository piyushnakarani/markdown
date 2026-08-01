import { Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

import ConverterTool from '@/components/ConverterTool';
import PageHero from '@/components/PageHero';
import ToolSeoSections from '@/components/ToolSeoSections';
import { txtKeywordsForLocale } from '@/lib/locale-keywords';
import { buildLocalizedPageMetadata, withToolBrandKeywords } from '@/lib/site';
import { buildToolPageJsonLd } from '@/lib/structured-data';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return buildLocalizedPageMetadata({
    locale,
    path: `/${locale}/markdown-to-txt`,
    titleKey: 'tools.txtTitle',
    descriptionKey: 'tools.txtDescription',
    titleSuffix: ' — Free Plain Text Online',
    keywords: withToolBrandKeywords(txtKeywordsForLocale(locale), 'txt'),
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
