import { createRequire } from 'node:module';

import hljs from 'highlight.js';
import { Marked, Renderer } from 'marked';
import { chromium } from 'playwright';
import sanitizeHtml from 'sanitize-html';

const require = createRequire(import.meta.url);
const mermaidBrowserPath = require.resolve('mermaid/dist/mermaid.min.js');

const PDF_WIDTH_PX = 794;
const PDF_PAGE_CONTENT_HEIGHT = 1040;
const PDF_LARGE_BLOCK_THRESHOLD = Math.round(PDF_PAGE_CONTENT_HEIGHT * 0.4);
const PDF_PADDING_X = 32;
const PDF_CONTENT_WIDTH = PDF_WIDTH_PX - PDF_PADDING_X * 2;
const MERMAID_PLACEHOLDER = '___MERMAID_BLOCK___';

let browserPromise;
let browserContext;

const PAGE_LOAD_WAIT = 'domcontentloaded';

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const markdownParser = new Marked({
  gfm: true,
  breaks: true,
});

const markedRenderer = new Renderer();

markedRenderer.code = ({ text, lang }) => {
  if (lang === 'mermaid') {
    return `<div class="mermaid pdf-diagram-block">${escapeHtml(text)}</div>`;
  }

  const language = lang && hljs.getLanguage(lang) ? lang : 'plaintext';
  const highlighted = hljs.highlight(text, { language }).value;
  return `<pre><code class="hljs language-${language}">${highlighted}</code></pre>`;
};

markdownParser.use({ renderer: markedRenderer });

const allowedTags = [
  ...sanitizeHtml.defaults.allowedTags,
  'style',
  'img',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'table',
  'thead',
  'tbody',
  'tfoot',
  'tr',
  'th',
  'td',
  'pre',
  'code',
  'span',
  'hr',
  'div',
  'svg',
  'g',
  'path',
  'rect',
  'circle',
  'ellipse',
  'line',
  'polyline',
  'polygon',
  'text',
  'tspan',
  'defs',
  'marker',
  'pattern',
  'clipPath',
  'symbol',
  'use',
  'linearGradient',
  'radialGradient',
  'stop',
  'mask',
  'filter',
  'feGaussianBlur',
  'feOffset',
  'feMerge',
  'feMergeNode',
  'feColorMatrix',
  'feBlend',
  'feFlood',
  'feComposite',
  'foreignObject',
];

const allowedAttributes = {
  ...sanitizeHtml.defaults.allowedAttributes,
  '*': ['class', 'id', 'align', 'style', 'data-*', 'aria-*'],
  a: ['href', 'name', 'target', 'rel'],
  img: ['src', 'alt', 'title', 'width', 'height'],
  style: ['type'],
  code: ['class'],
  svg: [
    'xmlns',
    'xmlns:xlink',
    'viewBox',
    'width',
    'height',
    'role',
    'aria-*',
    'style',
    'class',
    'preserveAspectRatio',
  ],
  g: ['transform', 'class', 'style'],
  path: ['d', 'fill', 'fill-opacity', 'stroke', 'stroke-width', 'stroke-opacity', 'stroke-linecap', 'stroke-linejoin', 'stroke-dasharray', 'marker-end', 'marker-start', 'class', 'style', 'opacity', 'clip-path', 'transform'],
  rect: ['x', 'y', 'width', 'height', 'rx', 'ry', 'fill', 'fill-opacity', 'stroke', 'stroke-width', 'stroke-opacity', 'stroke-dasharray', 'class', 'style', 'opacity', 'clip-path', 'transform'],
  circle: ['cx', 'cy', 'r', 'fill', 'fill-opacity', 'stroke', 'stroke-width', 'stroke-opacity', 'class', 'style', 'opacity', 'clip-path', 'transform'],
  ellipse: ['cx', 'cy', 'rx', 'ry', 'fill', 'fill-opacity', 'stroke', 'stroke-width', 'stroke-opacity', 'class', 'style', 'opacity', 'clip-path', 'transform'],
  line: ['x1', 'y1', 'x2', 'y2', 'stroke', 'stroke-width', 'stroke-opacity', 'stroke-linecap', 'stroke-dasharray', 'class', 'style', 'opacity', 'clip-path', 'transform'],
  polyline: ['points', 'fill', 'fill-opacity', 'stroke', 'stroke-width', 'stroke-opacity', 'stroke-linecap', 'stroke-linejoin', 'stroke-dasharray', 'class', 'style', 'opacity', 'clip-path', 'transform'],
  polygon: ['points', 'fill', 'fill-opacity', 'stroke', 'stroke-width', 'stroke-opacity', 'stroke-linecap', 'stroke-linejoin', 'stroke-dasharray', 'class', 'style', 'opacity', 'clip-path', 'transform'],
  text: ['x', 'y', 'dx', 'dy', 'fill', 'fill-opacity', 'font-size', 'font-family', 'font-weight', 'text-anchor', 'dominant-baseline', 'class', 'style', 'opacity', 'transform'],
  tspan: ['x', 'y', 'dx', 'dy', 'class', 'style'],
  marker: ['id', 'viewBox', 'refX', 'refY', 'markerWidth', 'markerHeight', 'orient', 'class', 'style'],
  clipPath: ['id', 'class', 'style', 'clipPathUnits'],
  symbol: ['id', 'viewBox', 'class', 'style', 'preserveAspectRatio'],
  use: ['href', 'xlink:href', 'x', 'y', 'width', 'height', 'class', 'style', 'transform'],
  linearGradient: ['id', 'x1', 'y1', 'x2', 'y2', 'gradientUnits', 'gradientTransform', 'class', 'style'],
  radialGradient: ['id', 'cx', 'cy', 'r', 'fx', 'fy', 'gradientUnits', 'gradientTransform', 'class', 'style'],
  stop: ['offset', 'stop-color', 'stop-opacity', 'class', 'style'],
  mask: ['id', 'x', 'y', 'width', 'height', 'maskUnits', 'maskContentUnits', 'class', 'style'],
  filter: ['id', 'x', 'y', 'width', 'height', 'filterUnits', 'primitiveUnits', 'class', 'style'],
  feGaussianBlur: ['in', 'stdDeviation', 'result', 'class', 'style'],
  feOffset: ['in', 'dx', 'dy', 'result', 'class', 'style'],
  feMerge: ['class', 'style'],
  feMergeNode: ['in', 'class', 'style'],
  feColorMatrix: ['in', 'type', 'values', 'result', 'class', 'style'],
  feBlend: ['in', 'in2', 'mode', 'result', 'class', 'style'],
  feFlood: ['flood-color', 'flood-opacity', 'result', 'class', 'style'],
  feComposite: ['in', 'in2', 'operator', 'k1', 'k2', 'k3', 'k4', 'result', 'class', 'style'],
  foreignObject: ['x', 'y', 'width', 'height', 'class', 'style'],
};

const CONTENT_STYLES = `
  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; background: #ffffff; color: #1e293b; }
  body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  .pdf-document {
    width: ${PDF_WIDTH_PX}px;
    padding: 28px ${PDF_PADDING_X}px 36px;
    background: #ffffff;
    color: #1e293b;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    line-height: 1.65;
  }
  h1, h2, h3, h4, h5, h6 { color: #0f172a; break-after: avoid; }
  h1 { font-size: 1.65rem; font-weight: 800; margin: 0 0 0.85rem; padding-bottom: 0.5rem; border-bottom: 2px solid #e2e8f0; line-height: 1.25; }
  h2 { font-size: 1.3rem; font-weight: 700; margin: 1.35rem 0 0.55rem; line-height: 1.3; }
  h3 { font-size: 1.1rem; font-weight: 600; margin: 1rem 0 0.45rem; line-height: 1.35; }
  p { margin: 0.45rem 0 0.65rem; font-size: 0.9rem; line-height: 1.65; }
  a { color: #4f46e5; text-decoration: underline; }
  strong, b { font-weight: 700; color: #0f172a; }
  ul, ol { margin: 0.45rem 0 0.75rem; padding-left: 1.35rem; }
  li { margin: 0.2rem 0; font-size: 0.9rem; line-height: 1.55; }
  li > ul, li > ol { margin-top: 0.2rem; }
  blockquote {
    margin: 0.75rem 0;
    padding: 0.55rem 0.9rem;
    border-left: 4px solid #6366f1;
    background: #f8fafc;
    border-radius: 0 8px 8px 0;
    color: #334155;
    break-inside: auto;
    page-break-inside: auto;
  }
  .pdf-nested-quote {
    margin: 0.35rem 0 0;
    padding: 0.55rem 0.9rem;
    border-left: 4px solid #6366f1;
    background: #f8fafc;
    border-radius: 0 8px 8px 0;
    color: #334155;
    break-inside: auto;
    page-break-inside: auto;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 0.75rem 0 1rem;
    font-size: 0.82rem;
    break-inside: auto;
  }
  th, td { border: 1px solid #cbd5e1; padding: 0.45rem 0.6rem; text-align: left; vertical-align: top; }
  th { background: #f1f5f9; font-weight: 700; color: #0f172a; }
  tr { break-inside: avoid-page; }
  code {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    font-size: 0.82em;
    background: #f1f5f9;
    color: #1e293b;
    padding: 0.1em 0.35em;
    border-radius: 4px;
  }
  pre {
    margin: 0.65rem 0 0.85rem;
    padding: 0.85rem 1rem;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    overflow: visible;
    white-space: pre-wrap;
    word-wrap: break-word;
    overflow-wrap: anywhere;
  }
  pre code { background: none; padding: 0; font-size: 0.78rem; line-height: 1.5; color: #1e293b !important; }
  .hljs, pre, pre code, code { color: #1e293b !important; }
  .hljs-comment, .hljs-quote { color: #64748b !important; }
  .hljs-keyword, .hljs-selector-tag, .hljs-built_in { color: #7c3aed !important; }
  .hljs-string, .hljs-attr, .hljs-symbol { color: #059669 !important; }
  .hljs-title, .hljs-section { color: #2563eb !important; }
  hr { border: none; border-top: 1px solid #e2e8f0; margin: 1.25rem 0; }
  img { max-width: 100%; height: auto; border-radius: 6px; }
  .pdf-avoid-break { break-inside: avoid-page; page-break-inside: avoid; }
  .mermaid, .mermaid-rendered, .pdf-diagram-block, .pdf-diagram-rasterized {
    margin: 16px 0;
    text-align: center;
    overflow: visible;
    break-inside: auto;
    page-break-inside: auto;
  }
  .mermaid svg, .mermaid-rendered svg {
    max-width: 100%;
    width: 100%;
    height: auto;
    overflow: visible;
    display: block;
    margin: 0 auto;
  }
  .pdf-diagram-img {
    max-width: 100%;
    height: auto;
    display: block;
    margin: 12px auto;
    object-fit: contain;
  }
  .mermaid-error { background: #fef2f2; color: #991b1b; padding: 12px; border-radius: 8px; font-size: 12px; overflow-x: auto; white-space: pre-wrap; }
`;

function extractMermaidBlocks(html) {
  const blocks = [];
  let result = '';
  let index = 0;

  while (index < html.length) {
    const start = html.indexOf('<div', index);
    if (start === -1) {
      result += html.slice(index);
      break;
    }

    result += html.slice(index, start);
    const tagEnd = html.indexOf('>', start);
    if (tagEnd === -1) {
      result += html.slice(start);
      break;
    }

    const openTag = html.slice(start, tagEnd + 1);
    const isRenderedMermaid =
      /\bclass="[^"]*\bmermaid(?:-rendered)?\b/.test(openTag) &&
      /data-rendered="true"/.test(openTag);

    if (!isRenderedMermaid) {
      result += openTag;
      index = tagEnd + 1;
      continue;
    }

    let depth = 1;
    let pos = tagEnd + 1;
    let end = -1;

    while (depth > 0 && pos < html.length) {
      const nextOpen = html.indexOf('<div', pos);
      const nextClose = html.indexOf('</div>', pos);
      if (nextClose === -1) break;

      if (nextOpen !== -1 && nextOpen < nextClose) {
        depth += 1;
        pos = nextOpen + 4;
        continue;
      }

      depth -= 1;
      if (depth === 0) {
        end = nextClose + 6;
        break;
      }
      pos = nextClose + 6;
    }

    if (end === -1) {
      result += html.slice(start);
      break;
    }

    blocks.push(html.slice(start, end));
    result += `${MERMAID_PLACEHOLDER}${blocks.length - 1}___`;
    index = end;
  }

  return { html: result, blocks };
}

function restoreMermaidBlocks(html, blocks) {
  return blocks.reduce(
    (output, block, blockIndex) => output.replace(`${MERMAID_PLACEHOLDER}${blockIndex}___`, block),
    html,
  );
}

function sanitizeRenderedHtml(html) {
  const { html: htmlWithoutMermaid, blocks } = extractMermaidBlocks(html);
  const sanitized = sanitizeHtml(htmlWithoutMermaid, {
    allowedTags,
    allowedAttributes,
    allowedSchemes: ['http', 'https', 'mailto', 'tel', 'data'],
    allowedSchemesByTag: {
      img: ['data'],
    },
    allowProtocolRelative: false,
    allowVulnerableTags: true,
    transformTags: {
      a: sanitizeHtml.simpleTransform('a', { rel: 'noopener noreferrer' }, true),
    },
  });

  return restoreMermaidBlocks(sanitized, blocks);
}

function markdownToSafeHtml(markdown) {
  const unsafeHtml = markdownParser.parse(markdown);
  return sanitizeRenderedHtml(unsafeHtml);
}

function buildDocumentFromBody(body, title) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=${PDF_WIDTH_PX}">
  <title>${escapeHtml(title)}</title>
  <style>${CONTENT_STYLES}</style>
</head>
<body>
  <main class="pdf-document">${body}</main>
</body>
</html>`;
}

function buildDocument(markdown, title) {
  return buildDocumentFromBody(markdownToSafeHtml(markdown), title);
}

function buildDocumentFromHtml(html, title) {
  return buildDocumentFromBody(sanitizeRenderedHtml(html), title);
}

async function getBrowserContext() {
  const browser = await getBrowser();
  if (!browserContext) {
    browserContext = await browser.newContext({
      viewport: { width: PDF_WIDTH_PX, height: 1123 },
      deviceScaleFactor: 1,
    });
    await browserContext.route('**/*', (route) => {
      const url = route.request().url();
      if (
        url.startsWith('about:') ||
        url.startsWith('blob:') ||
        url.startsWith('data:') ||
        url.startsWith('file:')
      ) {
        route.continue();
        return;
      }

      route.abort();
    });
  }
  return browserContext;
}

export async function warmBrowser() {
  await getBrowserContext();
}

async function createPdfPage() {
  const context = await getBrowserContext();
  return context.newPage();
}

function htmlHasRenderedMermaid(html) {
  return /data-rendered="true"/.test(html) && /<svg[\s>]/i.test(html);
}

function htmlHasRasterizedDiagrams(html) {
  return /class="[^"]*\bpdf-diagram-img\b/.test(html) || /class="[^"]*\bpdf-diagram-rasterized\b/.test(html);
}

function documentHasDiagrams(documentHtml) {
  return /\bclass="[^"]*\bmermaid\b/.test(documentHtml);
}

async function getBrowser() {
  if (!browserPromise) {
    const executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH;
    const channel = process.env.PLAYWRIGHT_CHROME_CHANNEL ?? 'chrome';
    const browserOptions = {
      headless: true,
      args: ['--disable-dev-shm-usage', '--no-sandbox'],
      ...(executablePath
        ? { executablePath }
        : channel === 'bundled'
          ? {}
          : { channel }),
    };

    browserPromise = chromium.launch(browserOptions);
  }
  return browserPromise;
}

async function prepareBlockquotesForPdf(page) {
  await page.evaluate(() => {
    document.querySelectorAll('blockquote blockquote').forEach((inner) => {
      const div = document.createElement('div');
      div.className = 'pdf-nested-quote';
      while (inner.firstChild) div.appendChild(inner.firstChild);
      inner.replaceWith(div);
    });
  });
}

async function applySmartPageBreaks(page) {
  await page.evaluate((threshold) => {
    const selectors = '.pdf-diagram-img, img:not(.pdf-diagram-img), pre, table, .mermaid-rendered svg';
    document.querySelectorAll(selectors).forEach((el) => {
      const height = el.getBoundingClientRect().height;
      if (height >= threshold) {
        el.classList.add('pdf-avoid-break');
      } else {
        el.classList.remove('pdf-avoid-break');
      }
    });
  }, PDF_LARGE_BLOCK_THRESHOLD);
}

async function prepareMermaidDiagramsForPdf(page) {
  await page.evaluate((maxWidth) => {
    document
      .querySelectorAll('.mermaid, .mermaid-rendered, .pdf-diagram-block, .pdf-diagram-rasterized')
      .forEach((el) => {
        el.style.overflow = 'visible';
        el.style.breakInside = 'auto';
        el.style.pageBreakInside = 'auto';
      });

    document.querySelectorAll('.mermaid svg, .mermaid-rendered svg').forEach((svg) => {
      const viewBox = svg.viewBox?.baseVal;
      const attrW = Number.parseFloat(svg.getAttribute('width') || '');
      const attrH = Number.parseFloat(svg.getAttribute('height') || '');
      const rect = svg.getBoundingClientRect();
      const natW = viewBox?.width || attrW || rect.width || 400;
      const natH = viewBox?.height || attrH || rect.height || 300;
      const scale = natW > maxWidth ? maxWidth / natW : 1;
      const outW = Math.max(1, Math.round(natW * scale));
      const outH = Math.max(1, Math.round(natH * scale));

      svg.setAttribute('width', String(outW));
      svg.setAttribute('height', String(outH));
      svg.style.width = `${outW}px`;
      svg.style.height = `${outH}px`;
      svg.style.maxWidth = '100%';
      svg.style.overflow = 'visible';
    });
  }, PDF_CONTENT_WIDTH);

  const blocks = page.locator('.mermaid, .mermaid-rendered, .pdf-diagram-block');
  const blockCount = await blocks.count();
  const rasterizeTasks = [];

  for (let index = 0; index < blockCount; index += 1) {
    rasterizeTasks.push(rasterizeMermaidBlock(blocks.nth(index)));
  }

  await Promise.all(rasterizeTasks);
}

async function rasterizeMermaidBlock(block) {
  const svg = block.locator('svg').first();
  if ((await svg.count()) === 0) return;
  if ((await block.locator('img.pdf-diagram-img').count()) > 0) return;

  const box = await svg.boundingBox();
  if (!box || box.width < 1 || box.height < 1) return;

  const outW = Math.max(1, Math.round(box.width));
  const outH = Math.max(1, Math.round(box.height));
  const pngBuffer = await svg.screenshot({ type: 'png', omitBackground: false });
  const dataUrl = `data:image/png;base64,${pngBuffer.toString('base64')}`;

  await block.evaluate(
    (el, payload) => {
      const img = document.createElement('img');
      img.src = payload.dataUrl;
      img.alt = 'Diagram';
      img.className = 'pdf-diagram-img';
      img.width = payload.outW;
      img.height = payload.outH;
      img.style.width = `${payload.outW}px`;
      img.style.height = `${payload.outH}px`;
      img.style.maxWidth = '100%';
      img.style.display = 'block';
      img.style.margin = '12px auto';
      el.replaceChildren(img);
      el.classList.add('pdf-diagram-rasterized');
    },
    { dataUrl, outW, outH },
  );
}

async function renderMermaid(page) {
  const pendingCount = await page.locator('.mermaid:not([data-rendered])').count();
  if (pendingCount === 0) return;

  await page.addScriptTag({ path: mermaidBrowserPath });
  await page.evaluate(async () => {
    const nodes = Array.from(document.querySelectorAll('.mermaid:not([data-rendered])'));
    if (nodes.length === 0) return;

    window.mermaid.initialize({
      startOnLoad: false,
      theme: 'default',
      securityLevel: 'loose',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      flowchart: { useMaxWidth: true, htmlLabels: true },
      sequence: { useMaxWidth: true, wrap: true },
      gantt: { useMaxWidth: true },
    });

    await Promise.all(nodes.map(async (el, index) => {
      const source = (el.textContent || '').trim();
      if (!source) {
        el.setAttribute('data-rendered', 'true');
        return;
      }

      try {
        const id = `mermaid-backend-${Date.now()}-${index}`;
        const { svg } = await window.mermaid.render(id, source);
        el.innerHTML = svg;
        el.classList.add('mermaid-rendered');
      } catch {
        const pre = document.createElement('pre');
        pre.className = 'mermaid-error';
        pre.textContent = source;
        el.replaceChildren(pre);
      }

      el.setAttribute('data-rendered', 'true');
    }));
  });
}

async function renderDocumentPdf(documentHtml, { renderMermaidDiagrams = true, rasterizeDiagrams = true } = {}) {
  const page = await createPdfPage();

  try {
    await page.setContent(documentHtml, { waitUntil: PAGE_LOAD_WAIT });
    if (renderMermaidDiagrams) {
      await renderMermaid(page);
    }
    if (rasterizeDiagrams) {
      await prepareMermaidDiagramsForPdf(page);
    }
    await prepareBlockquotesForPdf(page);
    await applySmartPageBreaks(page);
    await page.emulateMedia({ media: 'print' });

    return await page.pdf({
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: false,
      margin: {
        top: '10mm',
        right: '10mm',
        bottom: '12mm',
        left: '10mm',
      },
    });
  } finally {
    await page.close();
  }
}

export async function renderMarkdownPdf({ markdown, title = 'document' }) {
  const html = buildDocument(markdown, title);
  const hasDiagrams = documentHasDiagrams(html);
  return renderDocumentPdf(html, {
    renderMermaidDiagrams: hasDiagrams,
    rasterizeDiagrams: hasDiagrams,
  });
}

export async function renderHtmlPdf({ html, title = 'document' }) {
  const documentHtml = buildDocumentFromHtml(html, title);
  const skipMermaid = htmlHasRenderedMermaid(html);
  const skipRasterize = htmlHasRasterizedDiagrams(html);
  return renderDocumentPdf(documentHtml, {
    renderMermaidDiagrams: !skipMermaid,
    rasterizeDiagrams: !skipRasterize,
  });
}

export async function renderMarkdownHtml({ markdown, title = 'document' }) {
  const html = buildDocument(markdown, title);
  const page = await createPdfPage();

  try {
    await page.setContent(html, { waitUntil: PAGE_LOAD_WAIT });
    await renderMermaid(page);
    const body = await page.locator('.pdf-document').evaluate((node) => node.innerHTML);
    return buildDocumentFromBody(sanitizeRenderedHtml(body), title);
  } finally {
    await page.close();
  }
}

export function renderMarkdownTxt({ markdown }) {
  const safeHtml = markdownToSafeHtml(markdown);
  return sanitizeHtml(safeHtml, {
    allowedTags: [],
    allowedAttributes: {},
  })
    .replace(/\n\s*\n/g, '\n\n')
    .trim();
}

export async function closeBrowser() {
  if (browserContext) {
    await browserContext.close();
    browserContext = undefined;
  }
  if (!browserPromise) return;
  const browser = await browserPromise;
  browserPromise = undefined;
  await browser.close();
}
