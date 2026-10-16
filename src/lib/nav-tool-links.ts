import type { LucideIcon } from 'lucide-react';
import {
  AlignLeft,
  BookMarked,
  Bot,
  Briefcase,
  Code2,
  Eye,
  FileSpreadsheet,
  FileText,
  Layers,
  Network,
  PenLine,
  Sparkles,
  StickyNote,
  Wand2,
  Workflow,
} from 'lucide-react';

import type { ProductPath } from '@/lib/site-routes';
import { PRODUCT_TOOL_PATHS } from '@/lib/site-routes';

export type NavToolLabelKey =
  | 'markdownToPdf'
  | 'markdownToHtml'
  | 'markdownToTxt'
  | 'markdownToDocx'
  | 'markdownLivePreview'
  | 'editor'
  | 'freeConverter'
  | 'chatgptToPdf'
  | 'mermaidToPdf'
  | 'aiToPdf'
  | 'obsidianToPdf'
  | 'notionToPdf'
  | 'githubReadmeToPdf'
  | 'resumeToPdf'
  | 'pandocAlternative'
  | 'markdownFixer';

/** Semantic icon styling — paired with `.tool-nav-icon[data-variant]` in globals.css */
export type ToolIconVariant =
  | 'pdf'
  | 'ai'
  | 'diagram'
  | 'workflow'
  | 'hub'
  | 'html'
  | 'text'
  | 'doc'
  | 'preview'
  | 'edit'
  | 'notes'
  | 'brand'
  | 'resume'
  | 'fix';

export type NavToolGroupId = 'pdf' | 'sources' | 'formats' | 'workspace';

export type NavToolGroup = {
  id: NavToolGroupId;
  titleKey: 'toolGroupPdf' | 'toolGroupSources' | 'toolGroupFormats' | 'toolGroupWorkspace';
  toolHrefs: NavToolHref[];
};

export type NavToolHref =
  | '/markdown-to-pdf'
  | '/chatgpt-to-pdf'
  | '/mermaid-markdown-to-pdf'
  | '/ai-markdown-to-pdf'
  | '/pandoc-alternative'
  | '/free-markdown-converter'
  | '/markdown-to-html'
  | '/markdown-to-txt'
  | '/markdown-to-docx'
  | '/markdown-live-preview'
  | '/editor'
  | '/obsidian-to-pdf'
  | '/notion-to-pdf'
  | '/github-readme-to-pdf'
  | '/markdown-to-pdf-resume'
  | '/markdown-fixer';

export type NavToolLink = {
  href: NavToolHref;
  labelKey: NavToolLabelKey;
  icon: LucideIcon;
  variant: ToolIconVariant;
  /** Short hint for mega menu (nav.toolDesc* keys) */
  descKey?: string;
};

const TOOL_REGISTRY: Record<NavToolHref, NavToolLink> = {
  '/markdown-to-pdf': {
    href: '/markdown-to-pdf',
    labelKey: 'markdownToPdf',
    icon: FileText,
    variant: 'pdf',
    descKey: 'toolDescMarkdownToPdf',
  },
  '/chatgpt-to-pdf': {
    href: '/chatgpt-to-pdf',
    labelKey: 'chatgptToPdf',
    icon: Bot,
    variant: 'ai',
    descKey: 'toolDescChatgptToPdf',
  },
  '/mermaid-markdown-to-pdf': {
    href: '/mermaid-markdown-to-pdf',
    labelKey: 'mermaidToPdf',
    icon: Network,
    variant: 'diagram',
    descKey: 'toolDescMermaidToPdf',
  },
  '/ai-markdown-to-pdf': {
    href: '/ai-markdown-to-pdf',
    labelKey: 'aiToPdf',
    icon: Sparkles,
    variant: 'ai',
    descKey: 'toolDescAiToPdf',
  },
  '/pandoc-alternative': {
    href: '/pandoc-alternative',
    labelKey: 'pandocAlternative',
    icon: Workflow,
    variant: 'workflow',
    descKey: 'toolDescPandocAlternative',
  },
  '/free-markdown-converter': {
    href: '/free-markdown-converter',
    labelKey: 'freeConverter',
    icon: Layers,
    variant: 'hub',
    descKey: 'toolDescFreeConverter',
  },
  '/markdown-to-html': {
    href: '/markdown-to-html',
    labelKey: 'markdownToHtml',
    icon: Code2,
    variant: 'html',
    descKey: 'toolDescMarkdownToHtml',
  },
  '/markdown-to-txt': {
    href: '/markdown-to-txt',
    labelKey: 'markdownToTxt',
    icon: AlignLeft,
    variant: 'text',
    descKey: 'toolDescMarkdownToTxt',
  },
  '/markdown-to-docx': {
    href: '/markdown-to-docx',
    labelKey: 'markdownToDocx',
    icon: FileSpreadsheet,
    variant: 'doc',
    descKey: 'toolDescMarkdownToDocx',
  },
  '/markdown-live-preview': {
    href: '/markdown-live-preview',
    labelKey: 'markdownLivePreview',
    icon: Eye,
    variant: 'preview',
    descKey: 'toolDescLivePreview',
  },
  '/editor': {
    href: '/editor',
    labelKey: 'editor',
    icon: PenLine,
    variant: 'edit',
    descKey: 'toolDescEditor',
  },
  '/obsidian-to-pdf': {
    href: '/obsidian-to-pdf',
    labelKey: 'obsidianToPdf',
    icon: StickyNote,
    variant: 'notes',
    descKey: 'toolDescObsidianToPdf',
  },
  '/notion-to-pdf': {
    href: '/notion-to-pdf',
    labelKey: 'notionToPdf',
    icon: StickyNote,
    variant: 'notes',
    descKey: 'toolDescNotionToPdf',
  },
  '/github-readme-to-pdf': {
    href: '/github-readme-to-pdf',
    labelKey: 'githubReadmeToPdf',
    icon: BookMarked,
    variant: 'brand',
    descKey: 'toolDescGithubReadmeToPdf',
  },
  '/markdown-to-pdf-resume': {
    href: '/markdown-to-pdf-resume',
    labelKey: 'resumeToPdf',
    icon: Briefcase,
    variant: 'resume',
    descKey: 'toolDescResumeToPdf',
  },
  '/markdown-fixer': {
    href: '/markdown-fixer',
    labelKey: 'markdownFixer',
    icon: Wand2,
    variant: 'fix',
    descKey: 'toolDescMarkdownFixer',
  },
};

export const NAV_TOOL_GROUPS: NavToolGroup[] = [
  {
    id: 'pdf',
    titleKey: 'toolGroupPdf',
    toolHrefs: [
      '/markdown-to-pdf',
      '/chatgpt-to-pdf',
      '/mermaid-markdown-to-pdf',
      '/ai-markdown-to-pdf',
      '/pandoc-alternative',
    ],
  },
  {
    id: 'sources',
    titleKey: 'toolGroupSources',
    toolHrefs: [
      '/obsidian-to-pdf',
      '/notion-to-pdf',
      '/github-readme-to-pdf',
      '/markdown-to-pdf-resume',
    ],
  },
  {
    id: 'formats',
    titleKey: 'toolGroupFormats',
    toolHrefs: [
      '/free-markdown-converter',
      '/markdown-fixer',
      '/markdown-to-html',
      '/markdown-to-txt',
      '/markdown-to-docx',
    ],
  },
  {
    id: 'workspace',
    titleKey: 'toolGroupWorkspace',
    toolHrefs: ['/editor', '/markdown-live-preview'],
  },
];

/** Header mega-menu & mobile drawer — primary tools only (full list in footer + hub). */
export const NAV_MEGA_FEATURED_HREFS: NavToolHref[] = [
  '/markdown-to-pdf',
  '/free-markdown-converter',
  '/editor',
  '/markdown-live-preview',
  '/markdown-fixer',
  '/chatgpt-to-pdf',
  '/mermaid-markdown-to-pdf',
  '/ai-markdown-to-pdf',
];

export const NAV_MEGA_FEATURED: NavToolLink[] = NAV_MEGA_FEATURED_HREFS.map(
  (href) => TOOL_REGISTRY[href],
);

/** Footer — primary links only (3×3); full catalog via hub + sitemap. */
export const NAV_FOOTER_GROUPS: NavToolGroup[] = [
  {
    id: 'pdf',
    titleKey: 'toolGroupPdf',
    toolHrefs: ['/markdown-to-pdf', '/chatgpt-to-pdf', '/mermaid-markdown-to-pdf'],
  },
  {
    id: 'formats',
    titleKey: 'toolGroupFormats',
    toolHrefs: ['/free-markdown-converter', '/markdown-fixer', '/markdown-to-html'],
  },
  {
    id: 'workspace',
    titleKey: 'toolGroupWorkspace',
    toolHrefs: ['/editor', '/markdown-live-preview', '/ai-markdown-to-pdf'],
  },
];

/** Flat list — same order as grouped menu (sitemap alignment). */
export const NAV_TOOL_LINKS: NavToolLink[] = NAV_TOOL_GROUPS.flatMap((g) =>
  g.toolHrefs.map((href) => TOOL_REGISTRY[href]),
);

export function getNavTool(href: NavToolHref): NavToolLink {
  return TOOL_REGISTRY[href];
}

export function assertNavToolsMatchSitemap(): void {
  const navHrefs = new Set(NAV_TOOL_LINKS.map((t) => t.href));
  const missing = PRODUCT_TOOL_PATHS.filter((p) => p && !navHrefs.has(p as NavToolHref));
  if (missing.length > 0 && process.env.NODE_ENV !== 'production') {
    console.warn('[nav-tool-links] PRODUCT_TOOL_PATHS not in NAV_TOOL_LINKS:', missing);
  }
}

assertNavToolsMatchSitemap();
