import { mermaidCodeToHtml } from './mermaid-render';

let markedInstance: typeof import('marked').marked | null = null;

async function getMarked() {
  if (markedInstance) return markedInstance;

  const [hljsModule, markedModule] = await Promise.all([
    import('highlight.js'),
    import('marked')
  ]);
  
  const hljs = hljsModule.default;
  const { marked } = markedModule;

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
  markedInstance = marked;
  return markedInstance;
}

export async function convertMarkdownToHtml(markdown: string): Promise<string> {
  const marked = await getMarked();
  return marked.parse(markdown) as string;
}
