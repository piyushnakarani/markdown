import type { LucideIcon } from 'lucide-react';

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
  title: 'ChatGPT to PDF — Convert ChatGPT Markdown Free',
  description:
    'Paste ChatGPT answers (Markdown) and download a clean PDF. Live preview, code, tables, Mermaid diagrams — free, private, no sign-up.',
  keywords: [
    'chatgpt to pdf',
    'chatgpt markdown to pdf',
    'convert chatgpt to pdf',
    'chatgpt answer to pdf',
    'export chatgpt to pdf',
    'ai markdown to pdf',
    'paste chatgpt pdf',
    'pdfwritter',
  ],
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
  title: 'Mermaid Markdown to PDF — Diagrams in PDF Free',
  description:
    'Convert Markdown with Mermaid diagrams to PDF online. Flowcharts, sequence diagrams, and charts render in live preview — free, private, no CLI.',
  keywords: [
    'mermaid markdown to pdf',
    'markdown to pdf mermaid',
    'mermaid to pdf',
    'mermaid diagram to pdf',
    'convert mermaid to pdf',
    'flowchart markdown pdf',
    'mermaid pdf online',
    'pdfwritter',
  ],
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
  title: 'AI Markdown to PDF — ChatGPT, Claude, Gemini Free',
  description:
    'Convert AI Markdown from ChatGPT, Claude, or Gemini to PDF online. Live preview, Mermaid, KaTeX — free and private in your browser.',
  keywords: [
    'ai markdown to pdf',
    'chatgpt to pdf',
    'claude to pdf',
    'gemini to pdf',
    'convert ai answer to pdf',
    'llm markdown to pdf',
    'ai chat to pdf',
    'pdfwritter',
  ],
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

export const SEO_LANDINGS = [CHATGPT_TO_PDF, MERMAID_TO_PDF, AI_MARKDOWN_TO_PDF] as const;
