import { marked } from 'marked';

import { mermaidCodeToHtml } from './mermaid-render';

type Hljs = typeof import('highlight.js').default;

marked.setOptions({
  gfm: true,
  breaks: true,
});

const renderer = new marked.Renderer();

// @ts-expect-error marked types don't officially support async renderer methods yet, but marked runtime does when { async: true } is used
renderer.code = async function ({ text, lang }: { text: string; lang?: string }) {
  if (lang === 'mermaid') {
    return mermaidCodeToHtml(text);
  }

  const hljs = (await import('highlight.js')).default as Hljs;
  const language = lang && hljs.getLanguage(lang) ? lang : 'plaintext';
  const highlighted = hljs.highlight(text, { language }).value;
  return `<pre><code class="hljs language-${language}">${highlighted}</code></pre>`;
};

marked.use({ renderer });

export async function convertMarkdownToHtml(markdown: string): Promise<string> {
  return (await marked.parse(markdown, { async: true })) as string;
}
