import hljs from 'highlight.js';
import { marked } from 'marked';

import { mermaidCodeToHtml } from './mermaid-render';

marked.setOptions({
  gfm: true,
  breaks: true,
});

const renderer = new marked.Renderer();

renderer.code = function ({ text, lang }: { text: string; lang?: string }) {
  if (lang === 'mermaid') {
    return mermaidCodeToHtml(text);
  }

  const language = lang && hljs.getLanguage(lang) ? lang : 'plaintext';
  const highlighted = hljs.highlight(text, { language }).value;
  return `<pre><code class="hljs language-${language}">${highlighted}</code></pre>`;
};

marked.use({ renderer });

export async function convertMarkdownToHtml(markdown: string): Promise<string> {
  return marked.parse(markdown) as string;
}
