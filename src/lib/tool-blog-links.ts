import { type BlogPost,blogPosts } from '@/content/blog';

/** Curated blog slugs per tool route — strengthens internal linking from tool pages. */
export const TOOL_BLOG_LINKS: Record<string, string[]> = {
  'markdown-to-pdf': [
    'how-to-convert-markdown-to-pdf-online',
    'how-to-convert-markdown-to-pdf-without-losing-formatting',
    'make-beautiful-pdf-from-markdown',
  ],
  'md-to-pdf': [
    'how-to-convert-markdown-to-pdf-online',
    'free-markdown-tools',
    'markdown-to-pdf-no-registration',
  ],
  'markdown-to-html': [
    'convert-markdown-to-html-online',
    'markdown-vs-html',
    'github-readme-best-practices',
  ],
  'markdown-to-txt': [
    'how-to-convert-markdown-to-txt-online',
    'developers-use-markdown',
    'beginner-guide-markdown',
  ],
  'markdown-to-docx': [
    'best-markdown-to-pdf-tools-for-resumes',
    'make-beautiful-pdf-from-markdown',
    'free-markdown-converter-online-complete-guide',
  ],
  'markdown-live-preview': [
    'mermaid-diagrams-in-markdown-preview',
    'markdown-live-preview-complete-guide',
    'best-online-markdown-editor-with-preview',
  ],
  'mermaid-markdown-to-pdf': [
    'render-mermaid-diagrams-to-pdf',
    'render-flowcharts-from-markdown-to-pdf',
    'print-markdown-with-diagrams',
  ],
  editor: [
    'best-online-markdown-editor-with-preview',
    'mermaid-diagrams-in-markdown-preview',
    'technical-documentation-markdown-to-pdf',
  ],
  'free-markdown-converter': [
    'free-markdown-tools',
    'free-markdown-converter-online-complete-guide',
    'how-to-convert-markdown-to-pdf-online',
  ],
};

export function getRelatedBlogPosts(toolKey: string): BlogPost[] {
  const slugs = TOOL_BLOG_LINKS[toolKey] ?? [];
  return slugs
    .map((slug) => blogPosts.find((p) => p.slug === slug))
    .filter((p): p is BlogPost => p != null);
}
