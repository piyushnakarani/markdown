import { type BlogPost,blogPosts } from '@/content/blog';

/** Curated blog slugs per tool route — strengthens internal linking from tool pages. */
export const TOOL_BLOG_LINKS: Record<string, string[]> = {
  'markdown-to-pdf': [
    'how-to-convert-markdown-to-pdf-without-losing-formatting',
    'make-beautiful-pdf-from-markdown',
    'best-markdown-to-pdf-tools-for-resumes',
  ],
  'markdown-to-html': [
    'convert-markdown-to-html-online',
    'markdown-vs-html',
    'documentation-tools-developers',
  ],
  'markdown-to-txt': [
    'how-to-convert-markdown-to-txt-online',
    'developers-use-markdown',
    'beginner-guide-markdown',
  ],
  'markdown-live-preview': [
    'markdown-live-preview-complete-guide',
    'best-online-markdown-editor-with-preview',
    'markdown-tutorial-beginners',
  ],
  editor: [
    'best-online-markdown-editor-with-preview',
    'best-markdown-to-pdf-tools-for-resumes',
    'markdown-tutorial-beginners',
  ],
  'free-markdown-converter': [
    'free-markdown-converter-online-complete-guide',
    'how-to-convert-markdown-to-pdf-without-losing-formatting',
    'make-beautiful-pdf-from-markdown',
  ],
};

export function getRelatedBlogPosts(toolKey: string): BlogPost[] {
  const slugs = TOOL_BLOG_LINKS[toolKey] ?? [];
  return slugs
    .map((slug) => blogPosts.find((p) => p.slug === slug))
    .filter((p): p is BlogPost => p != null);
}
