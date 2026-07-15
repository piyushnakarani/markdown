import type { ExportProgressCallback } from './export-progress';
import { markdownHasMermaid } from './export-progress';
import { convertMarkdownToHtml } from './markdown';
import {
  MERMAID_EXPORT_STYLES,
  renderMermaidDiagrams,
  renderMermaidDiagramsForPdf,
} from './mermaid-render';

export type { ExportProgressCallback, ExportProgressStage } from './export-progress';
export {
  getExportOverlayProps,
  getHtmlExportStages,
  getPdfExportStages,
  getTxtExportStages,
  markdownHasMermaid,
  stageIndex,
} from './export-progress';
export { convertMarkdownToHtml } from './markdown';

/** A4 content width at ~96dpi (210mm). */
const PDF_WIDTH_PX = 794;
const PDF_PADDING_X = 32;

const SHARED_CONTENT_STYLES = `
  * { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; background: #ffffff; color: #1e293b; }
  h1, h2, h3, h4, h5, h6 { color: #0f172a; break-after: avoid; }
  h1 { font-size: 1.65rem; font-weight: 800; margin: 0 0 0.85rem; padding-bottom: 0.5rem; border-bottom: 2px solid #e2e8f0; line-height: 1.25; }
  h2 { font-size: 1.3rem; font-weight: 700; margin: 1.35rem 0 0.55rem; line-height: 1.3; }
  h3 { font-size: 1.1rem; font-weight: 600; margin: 1rem 0 0.45rem; line-height: 1.35; }
  p { margin: 0.45rem 0 0.65rem; font-size: 0.9rem; line-height: 1.65; }
  a { color: #4f46e5; text-decoration: underline; }
  strong, b { font-weight: 700; color: #0f172a; }
  em, i { font-style: italic; }
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
  tr { page-break-inside: avoid; break-inside: avoid-page; }
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
  .pdf-avoid-break { page-break-inside: avoid; break-inside: avoid-page; }
  ${MERMAID_EXPORT_STYLES}
`;

const DOCUMENT_STYLES = `
  body { font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.65; max-width: 800px; margin: 0 auto; padding: 40px 20px; }
  ${SHARED_CONTENT_STYLES}
`;

const PDF_STYLES = `
  ${SHARED_CONTENT_STYLES}
  .pdf-document {
    width: ${PDF_WIDTH_PX}px;
    padding: 28px ${PDF_PADDING_X}px 36px;
    background: #ffffff;
    color: #1e293b;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    line-height: 1.65;
  }
  @media print {
    @page {
      size: A4 portrait;
      margin: 15mm;
    }
    body, html {
      background: #ffffff !important;
      color: #1e293b !important;
      width: 100% !important;
      margin: 0 !important;
      padding: 0 !important;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    .pdf-capture-iframe {
      width: 100% !important;
      height: 100% !important;
    }
    .pdf-document {
      width: 100% !important;
      max-width: 100% !important;
      padding: 0 !important;
      margin: 0 !important;
    }
    pre, blockquote, table, img, .mermaid, .mermaid-rendered, .pdf-diagram-block {
      page-break-inside: avoid !important;
      break-inside: avoid-page !important;
    }
    h1, h2, h3, h4, h5, h6 {
      page-break-after: avoid !important;
      break-after: avoid !important;
    }
  }
`;

/** Off-screen DOM host for HTML string extraction (not canvas capture). */
function offscreenDomContainer(width = 800): HTMLDivElement {
  const container = document.createElement('div');
  container.style.cssText = [
    'position:fixed',
    'top:0',
    'left:0',
    `width:${width}px`,
    'opacity:0',
    'pointer-events:none',
    'z-index:-1',
    'overflow:visible',
    'background:#fff',
  ].join(';');
  document.body.appendChild(container);
  return container;
}

/**
 * Isolated iframe for html2pdf — sized for layout, clipped so the main page doesn't shift.
 */
function mountPdfIframe(markdownHtml: string): { iframe: HTMLIFrameElement; content: HTMLElement } {
  const iframe = document.createElement('iframe');
  iframe.className = 'pdf-capture-iframe';
  iframe.setAttribute('aria-hidden', 'true');
  iframe.setAttribute('tabindex', '-1');
  iframe.style.width = `${PDF_WIDTH_PX}px`;
  iframe.style.height = '1px';
  document.body.appendChild(iframe);

  const doc = iframe.contentDocument;
  if (!doc) {
    document.body.removeChild(iframe);
    throw new Error('PDF iframe unavailable');
  }

  doc.open();
  doc.write(`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=${PDF_WIDTH_PX}">
<style>${PDF_STYLES}</style>
</head>
<body>
  <div class="pdf-document">${markdownHtml}</div>
</body>
</html>`);
  doc.close();

  const content = doc.querySelector('.pdf-document') as HTMLElement | null;
  if (!content) {
    document.body.removeChild(iframe);
    throw new Error('PDF render failed: missing content root');
  }

  return { iframe, content };
}

async function waitForPaint(extraMs = 150): Promise<void> {
  await new Promise<void>((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
  });
  await new Promise((resolve) => setTimeout(resolve, extraMs));
}

// Backend code commented out - PDF generation is fully client-side using native window.print()
/*
function getConversionApiUrl(): string | undefined {
  return process.env.NEXT_PUBLIC_CONVERSION_API_URL || process.env.NEXT_PUBLIC_PDF_API_URL;
}

type ConversionFormat = 'pdf' | 'html' | 'txt';

type BackendConversionPayload = {
  format: ConversionFormat;
  filename: string;
  markdown?: string;
  html?: string;
};

async function convertWithBackend(payload: BackendConversionPayload): Promise<Blob> {
  const apiUrl = getConversionApiUrl();
  if (!apiUrl) {
    throw new Error('Conversion API is not configured.');
  }

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Conversion API failed with status ${response.status}`);
  }

  return response.blob();
}
*/

/** Render markdown to HTML with Mermaid diagrams as SVG (browser only). */
export async function buildRenderedHtmlBody(
  markdown: string,
  options?: { forPdf?: boolean; onProgress?: ExportProgressCallback },
): Promise<string> {
  const html = await convertMarkdownToHtml(markdown);
  if (typeof document === 'undefined') return html;

  const container = offscreenDomContainer(options?.forPdf ? PDF_WIDTH_PX : 800);
  container.innerHTML = html;

  try {
    if (markdownHasMermaid(markdown)) {
      options?.onProgress?.('buildingDiagrams');
    }
    if (options?.forPdf) {
      await renderMermaidDiagramsForPdf(container);
    } else {
      await renderMermaidDiagrams(container);
    }
    await waitForPaint(options?.forPdf ? 400 : 150);
    return container.innerHTML;
  } finally {
    document.body.removeChild(container);
  }
}

/** HTML body with diagrams rasterized for backend PDF export. */
// buildPdfReadyHtmlBody commented out - backend PDF conversion is no longer used

export async function buildHtmlDocument(
  markdown: string,
  title: string,
  onProgress?: ExportProgressCallback,
): Promise<string> {
  const body = await buildRenderedHtmlBody(markdown, { onProgress });
  onProgress?.('generatingHtml');
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title><style>${DOCUMENT_STYLES}</style></head><body>${body}</body></html>`;
}

export async function convertMarkdownToTxt(markdown: string): Promise<string> {
  const html = await convertMarkdownToHtml(markdown);
  if (typeof document !== 'undefined') {
    const temp = document.createElement('div');
    temp.innerHTML = html;
    return temp.textContent || temp.innerText || '';
  }
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\n\s*\n/g, '\n\n')
    .trim();
}

export async function buildTxtDocument(
  markdown: string,
  filename: string = 'document.txt',
  onProgress?: ExportProgressCallback,
): Promise<string> {
  void filename;
  onProgress?.('preparingDownload');
  return await convertMarkdownToTxt(markdown);
}

export async function convertMarkdownToPdf(
  markdown: string,
  filename: string = 'document.pdf',
  onProgress?: ExportProgressCallback,
): Promise<void> {
  onProgress?.('preparing');

  const html = await convertMarkdownToHtml(markdown);
  const { iframe, content } = mountPdfIframe(html);

  // Set document title for PDF print dialog filename
  const title = filename.replace(/\.[^/.]+$/, '');
  const doc = iframe.contentDocument;
  if (doc) {
    doc.title = title;
  }

  try {
    if (markdownHasMermaid(markdown)) {
      onProgress?.('buildingDiagrams');
      await renderMermaidDiagramsForPdf(content);
      await waitForPaint(300);
    }
    
    onProgress?.('generatingPdf');
    await waitForPaint(150);

    onProgress?.('finalizing');
    await waitForPaint(100);

    if (iframe.contentWindow) {
      iframe.contentWindow.focus();
      iframe.contentWindow.print();
    }
  } finally {
    // Keep iframe attached briefly to ensure print setup can read it in background
    setTimeout(() => {
      if (document.body.contains(iframe)) {
        document.body.removeChild(iframe);
      }
    }, 2000);
  }
}

export function downloadFile(content: string, filename: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsText(file);
  });
}
