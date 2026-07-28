import hljs from 'highlight.js';
import katex from 'katex';
import { marked } from 'marked';
import markedKatex from 'marked-katex-extension';

import { mermaidCodeToHtml } from './mermaid-render';

let markedReady = false;

/**
 * `breaks: true` folds adjacent lines into one paragraph, which prevents the
 * KaTeX block tokenizer from seeing `$$ ... $$`. Ensure a blank line before
 * opening display-math fences.
 */
function isolateDisplayMath(markdown: string): string {
  return markdown.replace(/([^\n])\n(\$\$)\n/g, '$1\n\n$2\n');
}

function ensureMarkedConfigured() {
  if (markedReady) return;

  // Keep katex in the client bundle (avoids missing vendor-chunks/katex.js).
  void katex;

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

  marked.use(
    markedKatex({
      throwOnError: false,
      nonStandard: true,
    }),
  );
  marked.use({ renderer });
  markedReady = true;
}

export async function convertMarkdownToHtml(markdown: string): Promise<string> {
  ensureMarkedConfigured();
  return marked.parse(isolateDisplayMath(markdown)) as string;
}
