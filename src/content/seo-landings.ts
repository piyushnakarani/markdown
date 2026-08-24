import type { LucideIcon } from 'lucide-react';

import {
  AI_MARKDOWN_TO_PDF_KEYWORDS,
  CHATGPT_TO_PDF_KEYWORDS,
  GITHUB_README_TO_PDF_KEYWORDS,
  MERMAID_TO_PDF_KEYWORDS,
  NOTION_TO_PDF_KEYWORDS,
  OBSIDIAN_TO_PDF_KEYWORDS,
  RESUME_TO_PDF_KEYWORDS,
} from '@/lib/locale-keywords';

export type SeoLandingContent = {
  path: string;
  title: string;
  description: string;
  keywords: string[];
  badge: string;
  h1Before: string;
  h1Highlight: string;
  h1After: string;
  accentColor: string;
  glowColor: string;
  intro: string[];
  howTitle: string;
  howSubtitle: string;
  steps: { title: string; desc: string }[];
  featuresTitle: string;
  features: { title: string; desc: string }[];
  faqs: { q: string; a: string }[];
  ctaTitle: string;
  ctaDescription: string;
  ctaHref: string;
  ctaLabel: string;
  related: { href: string; label: string }[];
};

export const CHATGPT_TO_PDF: SeoLandingContent = {
  path: '/chatgpt-to-pdf',
  title: 'ChatGPT to PDF — Free Converter, No Sign-Up',
  description:
    'Convert ChatGPT to PDF free: paste Markdown answers and download a clean PDF. Live preview, code, tables, Mermaid — private, no sign-up.',
  keywords: [...CHATGPT_TO_PDF_KEYWORDS],
  badge: 'AI → PDF',
  h1Before: 'ChatGPT to ',
  h1Highlight: 'PDF',
  h1After: ' Converter',
  accentColor: '#10a37f',
  glowColor: 'rgba(16,163,127,0.10)',
  intro: [
    'ChatGPT replies are usually Markdown. Humans still share PDFs. PDFWritter is the short path: paste the answer, proof the live preview, download a PDF — in your browser.',
    'No account, no watermark, and normal conversion stays on your device. Code blocks, tables, lists, Mermaid fences, and KaTeX math render before export.',
  ],
  howTitle: 'How to convert ChatGPT to PDF',
  howSubtitle: 'Three steps from chat reply to a shareable document',
  steps: [
    {
      title: 'Copy the ChatGPT answer',
      desc: 'Use Copy from ChatGPT (or select the Markdown). Include headings, lists, and code if you need them in the PDF.',
    },
    {
      title: 'Paste into PDFWritter',
      desc: 'Drop the text into the editor below. The live preview shows exactly how the PDF will look.',
    },
    {
      title: 'Download PDF',
      desc: 'Click Export PDF. Your file downloads instantly — no email gate and no upload to our servers for normal use.',
    },
  ],
  featuresTitle: 'Why use PDFWritter for ChatGPT PDFs?',
  features: [
    {
      title: 'Built for AI Markdown',
      desc: 'ChatGPT output is Markdown-first. We render GFM tables, fences, and task lists cleanly.',
    },
    {
      title: 'Diagrams & math',
      desc: 'If the model returned Mermaid or LaTeX/KaTeX, we render it in preview and keep it in the PDF.',
    },
    {
      title: 'Private by default',
      desc: 'Paste confidential drafts without sending them to an upload converter.',
    },
    {
      title: 'Free forever',
      desc: 'No Pro watermark for basic export. Convert as often as you need.',
    },
  ],
  faqs: [
    {
      q: 'How do I turn a ChatGPT answer into a PDF?',
      a: 'Copy the reply from ChatGPT, paste it into PDFWritter, check the live preview, then click Export PDF. The download happens in your browser.',
    },
    {
      q: 'Does this work with ChatGPT Plus / Team answers?',
      a: 'Yes. Any Markdown-formatted answer works — free or paid ChatGPT. Formatting depends on what the model outputted.',
    },
    {
      q: 'Will code blocks stay readable?',
      a: 'Yes. Fenced code blocks keep monospace formatting and syntax highlighting in the preview before PDF export.',
    },
    {
      q: 'Is my ChatGPT content uploaded?',
      a: 'For normal conversion, processing stays in your browser. Nothing is stored in a PDFWritter account.',
    },
    {
      q: 'Can I convert Claude or Gemini answers too?',
      a: 'Yes. Use the same editor, or open our AI Markdown to PDF hub for Claude and Gemini workflows.',
    },
  ],
  ctaTitle: 'Need Claude or Gemini too?',
  ctaDescription: 'Same private Markdown → PDF workflow for every major AI assistant.',
  ctaHref: '/ai-markdown-to-pdf',
  ctaLabel: 'Open AI Markdown to PDF',
  related: [
    { href: '/markdown-to-pdf', label: 'Markdown to PDF converter' },
    { href: '/ai-markdown-to-pdf', label: 'AI Markdown to PDF hub' },
    { href: '/mermaid-markdown-to-pdf', label: 'Mermaid Markdown to PDF' },
    { href: '/markdown-live-preview', label: 'Live Markdown preview' },
  ],
};

export const MERMAID_TO_PDF: SeoLandingContent = {
  path: '/mermaid-markdown-to-pdf',
  title: 'Mermaid to PDF — Flowchart, Sequence & More',
  description:
    'Convert Mermaid to PDF online free. Flowcharts, sequence, Gantt, class, state, and pie charts render in live preview — no CLI, private browser export.',
  keywords: [...MERMAID_TO_PDF_KEYWORDS],
  badge: 'Mermaid → PDF',
  h1Before: 'Mermaid Markdown to ',
  h1Highlight: 'PDF',
  h1After: '',
  accentColor: '#8b5cf6',
  glowColor: 'rgba(139,92,246,0.10)',
  intro: [
    'Most Markdown-to-PDF tools print Mermaid source as a code block. PDFWritter renders the diagram first, then exports the PDF — so flowcharts and sequence diagrams actually appear.',
    'Paste a README or doc with ```mermaid fences, wait for the SVG in preview, then download. No Mermaid CLI, Pandoc filters, or local Chromium setup.',
  ],
  howTitle: 'How to export Mermaid diagrams to PDF',
  howSubtitle: 'Preview-first export so diagrams never get dropped',
  steps: [
    {
      title: 'Paste Markdown with Mermaid fences',
      desc: 'Include ```mermaid blocks for flowcharts, sequence, class, state, Gantt, or pie charts.',
    },
    {
      title: 'Confirm diagrams in live preview',
      desc: 'Wait until each diagram replaces the code fence with a rendered chart.',
    },
    {
      title: 'Export PDF',
      desc: 'Download a PDF that keeps headings, code, tables, math, and Mermaid graphics together.',
    },
  ],
  featuresTitle: 'Why PDFWritter for Mermaid PDFs?',
  features: [
    {
      title: 'Native Mermaid rendering',
      desc: 'Diagrams are part of the same preview pipeline used for PDF — not a separate afterthought.',
    },
    {
      title: 'Works with full GFM docs',
      desc: 'Keep the surrounding README: tables, task lists, syntax highlighting, and KaTeX.',
    },
    {
      title: 'No local toolchain',
      desc: 'Skip Puppeteer scripts and VS Code extension tweaks when you need one clean PDF now.',
    },
    {
      title: 'Private browser export',
      desc: 'Ideal for internal architecture diagrams you do not want uploaded to a third-party server.',
    },
  ],
  faqs: [
    {
      q: 'Can Mermaid diagrams be included in a Markdown PDF?',
      a: 'Yes. PDFWritter renders Mermaid to graphics in the live preview, then exports that rendered view to PDF.',
    },
    {
      q: 'Which Mermaid diagram types work?',
      a: 'Flowcharts, sequence diagrams, class diagrams, state diagrams, Gantt charts, and pie charts are supported. If a specific chart fails, send an example via contact.',
    },
    {
      q: 'Why does my PDF show Mermaid source instead of a diagram?',
      a: 'That usually means the tool lacks Mermaid support or you exported before rendering finished. Use PDFWritter and wait for the preview SVG first.',
    },
    {
      q: 'Do I need the Mermaid CLI?',
      a: 'No. Everything runs in the browser for normal documents.',
    },
    {
      q: 'Can I also export HTML with Mermaid?',
      a: 'Yes. Use Markdown to HTML after you confirm the diagrams look correct in preview.',
    },
  ],
  ctaTitle: 'Convert any Markdown to PDF',
  ctaDescription: 'Same engine for READMEs, reports, and docs — with or without diagrams.',
  ctaHref: '/markdown-to-pdf',
  ctaLabel: 'Open Markdown to PDF',
  related: [
    { href: '/markdown-to-pdf', label: 'Markdown to PDF converter' },
    { href: '/blog/render-mermaid-diagrams-markdown', label: 'Mermaid in Markdown guide' },
    { href: '/chatgpt-to-pdf', label: 'ChatGPT to PDF' },
    { href: '/editor', label: 'Online Markdown editor' },
  ],
};

export const AI_MARKDOWN_TO_PDF: SeoLandingContent = {
  path: '/ai-markdown-to-pdf',
  title: 'AI Markdown to PDF — Claude, Gemini & ChatGPT',
  description:
    'Convert AI Markdown to PDF free from Claude, Gemini, or ChatGPT. Live preview with Mermaid and KaTeX — private browser export, no sign-up.',
  keywords: [...AI_MARKDOWN_TO_PDF_KEYWORDS],
  badge: 'ChatGPT · Claude · Gemini',
  h1Before: 'AI Markdown to ',
  h1Highlight: 'PDF',
  h1After: '',
  accentColor: '#3b82f6',
  glowColor: 'rgba(59,130,246,0.10)',
  intro: [
    'Every major assistant speaks Markdown. PDFWritter turns those answers into clean, shareable PDFs without Word paste disasters or upload converters.',
    'One editor for ChatGPT, Claude, Gemini, and other LLM output — plus Mermaid diagrams and KaTeX math when the model includes them.',
  ],
  howTitle: 'Convert any AI answer to PDF',
  howSubtitle: 'Works the same for ChatGPT, Claude, and Gemini',
  steps: [
    {
      title: 'Copy Markdown from the chat',
      desc: 'Copy the assistant message. Prefer the raw Markdown view when the UI offers it.',
    },
    {
      title: 'Paste and proof',
      desc: 'Preview headings, tables, code, and diagrams. Fix anything that looks off before export.',
    },
    {
      title: 'Download the PDF',
      desc: 'Export instantly. Use ChatGPT to PDF or Mermaid Markdown to PDF for intent-specific tips.',
    },
  ],
  featuresTitle: 'Built for AI → document workflows',
  features: [
    {
      title: 'Assistant-agnostic',
      desc: 'ChatGPT, Claude, Gemini, Cursor chats, or local LLMs — if it is Markdown, it converts.',
    },
    {
      title: 'Preview before share',
      desc: 'Catch broken tables or unfinished Mermaid blocks before you send the PDF to a client.',
    },
    {
      title: 'Developer-friendly output',
      desc: 'Syntax-highlighted code and selectable text — not a flattened screenshot.',
    },
    {
      title: 'No signup friction',
      desc: 'Paste once, download once. Free for everyday use.',
    },
  ],
  faqs: [
    {
      q: 'How do I convert Claude output to PDF?',
      a: 'Copy the Claude reply, paste it into the editor on this page, verify the preview, then Export PDF.',
    },
    {
      q: 'How do I convert Gemini answers to PDF?',
      a: 'Same steps: copy Markdown from Gemini, paste here, export. Use live preview to confirm formatting.',
    },
    {
      q: 'Is this better than printing the chat page?',
      a: 'Yes. You get a document-styled PDF with proper headings, code, and optional diagrams — not a browser print of the chat UI.',
    },
    {
      q: 'Can I include Mermaid from an AI answer?',
      a: 'If the model returned a mermaid fence, PDFWritter renders it. See Mermaid Markdown to PDF for details.',
    },
    {
      q: 'Is there a ChatGPT-specific page?',
      a: 'Yes — open ChatGPT to PDF for a focused walkthrough of that workflow.',
    },
  ],
  ctaTitle: 'Start with ChatGPT → PDF',
  ctaDescription: 'Most people paste ChatGPT answers first. Use the dedicated guide if that is your flow.',
  ctaHref: '/chatgpt-to-pdf',
  ctaLabel: 'Open ChatGPT to PDF',
  related: [
    { href: '/chatgpt-to-pdf', label: 'ChatGPT to PDF' },
    { href: '/mermaid-markdown-to-pdf', label: 'Mermaid Markdown to PDF' },
    { href: '/markdown-to-pdf', label: 'Markdown to PDF converter' },
    { href: '/free-markdown-converter', label: 'All free converters' },
  ],
};

export const OBSIDIAN_TO_PDF: SeoLandingContent = {
  path: '/obsidian-to-pdf',
  title: 'Obsidian to PDF — Export Notes Free Online',
  description:
    'Export Obsidian to PDF free with Mermaid and KaTeX intact. Convert Obsidian Markdown notes in your browser — private, no Publish plan.',
  keywords: [...OBSIDIAN_TO_PDF_KEYWORDS],
  badge: 'Obsidian → PDF',
  h1Before: 'Obsidian to ',
  h1Highlight: 'PDF',
  h1After: ' Export',
  accentColor: '#4b3f72',
  glowColor: 'rgba(75,63,114,0.12)',
  intro: [
    'Obsidian stores notes as Markdown, but sharing still needs PDFs. PDFWritter turns your vault into clean PDFs without the Publish subscription, plugins, or server uploads.',
    'Mermaid code blocks, KaTeX math ($$) , tables, and task lists all render in a live preview first. Export a single note or a merged PDF of many notes in your browser.',
  ],
  howTitle: 'How to convert Obsidian notes to PDF',
  howSubtitle: 'No Publish, no community plugins, no account required',
  steps: [
    {
      title: 'Copy the Markdown from Obsidian',
      desc: 'Open a note in Edit mode and copy the raw Markdown — including ```mermaid and $$ math blocks — into the editor below.',
    },
    {
      title: 'Check the live preview',
      desc: 'Diagrams render as SVGs and equations render with KaTeX before you export, so nothing is lost to code-fence printing.',
    },
    {
      title: 'Download the PDF',
      desc: 'Click Export PDF. The file downloads instantly in your browser — no logins and your notes stay on your device.',
    },
  ],
  featuresTitle: 'Why PDFWritter for Obsidian PDFs?',
  features: [
    {
      title: 'Renders Obsidian-flavored content',
      desc: 'Mermaid diagrams, KaTeX math, task lists, tables, and embedded callouts all preview before export.',
    },
    {
      title: 'No Obsidian Publish needed',
      desc: 'Skip the $25/year Publish plan and the export plugin when you just need a private PDF.',
    },
    {
      title: 'Merged export friendly',
      desc: 'Combine multiple notes into one PDF by concatenating Markdown before export.',
    },
    {
      title: 'Private by design',
      desc: 'Your notes never leave the browser — ideal for personal journals and internal docs.',
    },
  ],
  faqs: [
    {
      q: 'How do I export an Obsidian note to PDF?',
      a: 'Copy the note Markdown (or drag the .md file into the converter), verify the live preview, then click Export PDF. The download runs in your browser.',
    },
    {
      q: 'Are Mermaid diagrams preserved when exporting Obsidian to PDF?',
      a: 'Yes. We render Mermaid to SVG in the preview and embed it in the PDF — not as ugly code blocks.',
    },
    {
      q: 'Does this work for an entire vault?',
      a: 'Concatenate your notes into one Markdown document (or one per file) and export each. We do not crawl your vault for you.',
    },
    {
      q: 'Is Obsidian Publish required to make a PDF?',
      a: 'No. This is a browser tool. Publish is only for making a public website.',
    },
    {
      q: 'Will my math equations render?',
      a: 'Yes. KaTeX math ($inline$ and $$block$$) renders in preview and exports into the PDF alongside your text.',
    },
  ],
  ctaTitle: 'Convert any Markdown to PDF',
  ctaDescription: 'Same engine works for GitHub READMEs, ChatGPT answers, and general Markdown docs.',
  ctaHref: '/markdown-to-pdf',
  ctaLabel: 'Open Markdown to PDF',
  related: [
    { href: '/markdown-to-pdf', label: 'Markdown to PDF converter' },
    { href: '/mermaid-markdown-to-pdf', label: 'Mermaid to PDF' },
    { href: '/markdown-live-preview', label: 'Live Markdown preview' },
    { href: '/free-markdown-converter', label: 'All free converters' },
  ],
};

export const NOTION_TO_PDF: SeoLandingContent = {
  path: '/notion-to-pdf',
  title: 'Notion to PDF — Export Pages Free Online',
  description:
    'Convert Notion to PDF free via Markdown export. Tables, callouts, and Mermaid in live preview — private browser export, no API.',
  keywords: [...NOTION_TO_PDF_KEYWORDS],
  badge: 'Notion → PDF',
  h1Before: 'Notion to ',
  h1Highlight: 'PDF',
  h1After: ' Export',
  accentColor: '#000000',
  glowColor: 'rgba(0,0,0,0.06)',
  intro: [
    'Notion does not export great PDFs. The cleanest path is Export → Markdown, then PDFWritter converts that Markdown into a real document.',
    'Tables, toggle lists, callouts, code blocks, and Mermaid diagrams render in a live preview before export. No API keys and no uploads for private pages.',
  ],
  howTitle: 'How to convert Notion pages to PDF',
  howSubtitle: 'From Export to Markdown to PDF in three steps',
  steps: [
    {
      title: 'Export Notion as Markdown',
      desc: 'In Notion, open the page menu → Export → choose Markdown & CSV. Unzip and open the .md file.',
    },
    {
      title: 'Paste into the converter',
      desc: 'Paste the Markdown (or drag the .md file) into the editor. The preview confirms tables, callouts, and diagrams render correctly.',
    },
    {
      title: 'Download PDF',
      desc: 'Click Export PDF. The document downloads to your browser with your Notion formatting intact.',
    },
  ],
  featuresTitle: 'Why PDFWritter for Notion PDFs?',
  features: [
    {
      title: 'Handles Notion-export Markdown',
      desc: 'Renders toggle lists, callouts, databases-as-tables, and fenced code blocks cleanly.',
    },
    {
      title: 'Mermaid + KaTeX',
      desc: 'If your Notion has embedded Mermaid or math, it renders in preview and stays in the PDF.',
    },
    {
      title: 'Private export',
      desc: 'Processing stays in the browser — safe for internal Notion pages you do not want to upload.',
    },
    {
      title: 'No Notion API needed',
      desc: 'We work with the exported .md file, so no integration or token setup is required.',
    },
  ],
  faqs: [
    {
      q: 'How do I convert a Notion page to PDF?',
      a: 'Export the page from Notion as Markdown, paste it into PDFWritter, preview, then Export PDF. The download is generated in your browser.',
    },
    {
      q: 'Does Notion export tables to PDF?',
      a: 'Yes — Notion exports tables as Markdown tables, which we render and include in the PDF.',
    },
    {
      q: 'Can Mermaid diagrams from Notion be in the PDF?',
      a: 'Yes. Any ```mermaid fences you have render as graphics in the preview and are embedded in the PDF.',
    },
    {
      q: 'Is my Notion content uploaded somewhere?',
      a: 'No. Conversion happens in your browser only. Your content is not sent to our servers.',
    },
    {
      q: 'Do I need the Notion desktop app?',
      a: 'No. Any device with a browser can convert — desktop, tablet, or phone.',
    },
  ],
  ctaTitle: 'Convert any Markdown to PDF',
  ctaDescription: 'Same engine for Obsidian notes, GitHub READMEs, and general Markdown docs.',
  ctaHref: '/markdown-to-pdf',
  ctaLabel: 'Open Markdown to PDF',
  related: [
    { href: '/markdown-to-pdf', label: 'Markdown to PDF converter' },
    { href: '/mermaid-markdown-to-pdf', label: 'Mermaid to PDF' },
    { href: '/obsidian-to-pdf', label: 'Obsidian to PDF' },
    { href: '/free-markdown-converter', label: 'All free converters' },
  ],
};

export const GITHUB_README_TO_PDF: SeoLandingContent = {
  path: '/github-readme-to-pdf',
  title: 'GitHub README to PDF — Convert Readme.md Free',
  description:
    'Convert GitHub README to PDF free. README.md with badges, code, Mermaid, and math — live preview, no signup, private browser export.',
  keywords: [...GITHUB_README_TO_PDF_KEYWORDS],
  badge: 'README → PDF',
  h1Before: 'GitHub README to ',
  h1Highlight: 'PDF',
  h1After: '',
  accentColor: '#6e5494',
  glowColor: 'rgba(110,84,148,0.12)',
  intro: [
    'A GitHub README is Markdown, and Markdown is our thing. PDFWritter takes a README.md and outputs a print-ready PDF that keeps badges, tables, code blocks, Mermaid diagrams, and math.',
    'Drag the file in or paste the raw README. The live preview shows exactly what the PDF will look like before you download.',
  ],
  howTitle: 'How to convert a GitHub README to PDF',
  howSubtitle: 'From raw README.md to downloadable PDF in three steps',
  steps: [
    {
      title: 'Get the README Markdown',
      desc: 'Download README.md from GitHub (Raw button) or copy it from the repo page.',
    },
    {
      title: 'Preview in the converter',
      desc: 'Paste or drag the .md file. Badges, tables, code highlighting, Mermaid, and KaTeX all render before export.',
    },
    {
      title: 'Download PDF',
      desc: 'Click Export PDF. The file downloads to your browser — no login and your README stays private.',
    },
  ],
  featuresTitle: 'Why PDFWritter for README → PDF?',
  features: [
    {
      title: 'GitHub Flavored Markdown',
      desc: 'Tables, task lists, badges, mentions, and fenced code blocks render exactly like GitHub.',
    },
    {
      title: 'Badges stay visible',
      desc: 'Remote badge images render in preview so they appear in the PDF instead of as broken links.',
    },
    {
      title: 'Diagrams & math',
      desc: 'Mermaid charts and KaTeX equations render and export alongside your README content.',
    },
    {
      title: 'No repo access needed',
      desc: 'We only process the Markdown text you paste — we do not connect to your GitHub account.',
    },
  ],
  faqs: [
    {
      q: 'How do I convert a README.md to PDF?',
      a: 'Download the raw README.md from GitHub, paste it into PDFWritter, check the live preview, then click Export PDF. The PDF downloads in your browser.',
    },
    {
      q: 'Do GitHub badges render in the PDF?',
      a: 'Yes. Badge image URLs resolve in the preview and are embedded as images in the exported PDF.',
    },
    {
      q: 'Can I include Mermaid diagrams from the README?',
      a: 'Yes. ```mermaid fences render as graphics in the live preview and are embedded in the PDF.',
    },
    {
      q: 'Do I need a GitHub account?',
      a: 'No. Use the raw .md file content only. We never ask for GitHub access tokens.',
    },
    {
      q: 'Is my README uploaded to a server?',
      a: 'No. All conversion happens in your browser. Your README is not stored or transmitted.',
    },
  ],
  ctaTitle: 'Need Mermaid in the README?',
  ctaDescription: 'Same converter keeps diagrams and math in the exported PDF.',
  ctaHref: '/mermaid-markdown-to-pdf',
  ctaLabel: 'Open Mermaid to PDF',
  related: [
    { href: '/markdown-to-pdf', label: 'Markdown to PDF converter' },
    { href: '/mermaid-markdown-to-pdf', label: 'Mermaid to PDF' },
    { href: '/markdown-to-html', label: 'Markdown to HTML' },
    { href: '/free-markdown-converter', label: 'All free converters' },
  ],
};

export const RESUME_MARKDOWN_TO_PDF: SeoLandingContent = {
  path: '/markdown-to-pdf-resume',
  title: 'Markdown Resume to PDF — Free CV Converter',
  description:
    'Convert Markdown resume to PDF free. Clean ATS-friendly CV from Markdown — typography, lists, and links intact. Private, no sign-up.',
  keywords: [...RESUME_TO_PDF_KEYWORDS],
  badge: 'Resume → PDF',
  h1Before: 'Markdown Resume to ',
  h1Highlight: 'PDF',
  h1After: '',
  accentColor: '#0f4c3a',
  glowColor: 'rgba(15,76,58,0.12)',
  intro: [
    'A Markdown resume gives you version control and clean diffs. PDFWritter converts it to a professional, ATS-friendly PDF without LaTeX, Word, or a design tool.',
    'Headings, bullet lists, links, and horizontal rules render in a live preview before export. Your resume never leaves your browser.',
  ],
  howTitle: 'How to convert a Markdown resume to PDF',
  howSubtitle: 'Version-controlled source, print-ready PDF',
  steps: [
    {
      title: 'Paste or upload your Markdown resume',
      desc: 'Add the .md file via drag-and-drop or paste. Supports YAML front matter, headings, lists, and links.',
    },
    {
      title: 'Proof the live preview',
      desc: 'Check that sections, bullet points, and links look correct before exporting the final document.',
    },
    {
      title: 'Download the PDF',
      desc: 'Click Export PDF. A clean, print-ready PDF downloads to your browser with no watermarks or signups.',
    },
  ],
  featuresTitle: 'Why PDFWritter for resume PDFs?',
  features: [
    {
      title: 'ATS-friendly layout',
      desc: 'Clean typography, real headings, and selectable text keep the PDF readable for both humans and parsing software.',
    },
    {
      title: 'Links stay clickable',
      desc: 'Email, portfolio, and GitHub links in your resume export as live links in the PDF.',
    },
    {
      title: 'No Word or LaTeX needed',
      desc: 'Write in Markdown and export a PDF directly — no template, no compilation step.',
    },
    {
      title: 'Private by default',
      desc: 'Your resume content stays in the browser. Nothing is uploaded or stored on our servers.',
    },
  ],
  faqs: [
    {
      q: 'How do I turn a Markdown resume into a PDF?',
      a: 'Paste or upload your .md resume, check the live preview, then click Export PDF. The download is generated entirely in your browser.',
    },
    {
      q: 'Is the resume PDF ATS-friendly?',
      a: 'Yes. We export clean headings, lists, and selectable text so parsing software can read your resume.',
    },
    {
      q: 'Do links work in the exported resume?',
      a: 'Yes. Email, portfolio, and GitHub links export as clickable links in the PDF.',
    },
    {
      q: 'Is my resume uploaded to a server?',
      a: 'No. All conversion is client-side in your browser. Your resume stays on your device.',
    },
    {
      q: 'Do I need a resume template?',
      a: 'No. Write Markdown headings and lists and we render a clean, print-ready layout automatically.',
    },
  ],
  ctaTitle: 'Start with Markdown to PDF',
  ctaDescription: 'Same engine works for READMEs, Obsidian notes, and general Markdown docs.',
  ctaHref: '/markdown-to-pdf',
  ctaLabel: 'Open Markdown to PDF',
  related: [
    { href: '/markdown-to-pdf', label: 'Markdown to PDF converter' },
    { href: '/obsidian-to-pdf', label: 'Obsidian to PDF' },
    { href: '/github-readme-to-pdf', label: 'GitHub README to PDF' },
    { href: '/markdown-to-docx', label: 'Markdown to DOCX' },
  ],
};

export const SECTIONS_LANDINGS = [
  CHATGPT_TO_PDF,
  MERMAID_TO_PDF,
  AI_MARKDOWN_TO_PDF,
  OBSIDIAN_TO_PDF,
  NOTION_TO_PDF,
  GITHUB_README_TO_PDF,
  RESUME_MARKDOWN_TO_PDF,
];

export const SEO_LANDINGS = SECTIONS_LANDINGS;
