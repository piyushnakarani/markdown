import { marked } from 'marked';
import { mermaidCodeToHtml } from './mermaid-render';

type Hljs = typeof import('highlight.js').default;

let hljsInstance: Hljs | null = null;

/** Lazy-load highlight.js to avoid Next.js vendor-chunk naming conflict (highlight.js.js). */
function getHljs(): Hljs {
  if (!hljsInstance) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    hljsInstance = require('highlight.js') as Hljs;
  }
  return hljsInstance;
}

marked.setOptions({
  gfm: true,
  breaks: true,
});

const renderer = new marked.Renderer();

renderer.code = function ({ text, lang }: { text: string; lang?: string }) {
  if (lang === 'mermaid') {
    return mermaidCodeToHtml(text);
  }

  const hljs = getHljs();
  const language = lang && hljs.getLanguage(lang) ? lang : 'plaintext';
  const highlighted = hljs.highlight(text, { language }).value;
  return `<pre><code class="hljs language-${language}">${highlighted}</code></pre>`;
};

marked.use({ renderer });

export function convertMarkdownToHtml(markdown: string): string {
  return marked.parse(markdown, { async: false }) as string;
}
