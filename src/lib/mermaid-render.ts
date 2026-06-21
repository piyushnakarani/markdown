function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function getMermaidTheme(): 'default' | 'dark' {
  if (typeof document === 'undefined') return 'default';
  return document.documentElement.getAttribute('data-theme') === 'light' ? 'default' : 'dark';
}

let mermaidReady = false;
let mermaidPdfReady = false;

async function initMermaid(theme?: 'default' | 'dark') {
  const mermaid = (await import('mermaid')).default;
  const resolvedTheme = theme ?? getMermaidTheme();
  if (!mermaidReady) {
    mermaid.initialize({
      startOnLoad: false,
      theme: resolvedTheme,
      securityLevel: 'loose',
      fontFamily: 'system-ui, -apple-system, sans-serif',
    });
    mermaidReady = true;
  } else {
    mermaid.initialize({ theme: resolvedTheme });
  }
  return mermaid;
}

async function initMermaidForPdf() {
  const mermaid = (await import('mermaid')).default;
  if (!mermaidPdfReady) {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'default',
      securityLevel: 'loose',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      flowchart: { useMaxWidth: true, htmlLabels: true },
      sequence: { useMaxWidth: true, wrap: true },
      gantt: { useMaxWidth: true },
    });
    mermaidPdfReady = true;
  }
  return mermaid;
}

/** Render all `.mermaid` blocks inside a DOM node to SVG (client-only). */
export async function renderMermaidDiagrams(root: HTMLElement): Promise<void> {
  if (typeof window === 'undefined') return;

  const nodes = root.querySelectorAll<HTMLElement>('.mermaid:not([data-rendered])');
  if (nodes.length === 0) return;

  const mermaid = await initMermaid();

  await Promise.all(
    Array.from(nodes).map(async (el, index) => {
      const source = (el.textContent || '').trim();
      if (!source) {
        el.setAttribute('data-rendered', 'true');
        return;
      }

      const id = `mermaid-${Date.now()}-${index}`;
      try {
        const { svg } = await mermaid.render(id, source);
        el.innerHTML = svg;
        el.classList.add('mermaid-rendered');
        el.setAttribute('data-rendered', 'true');
      } catch {
        el.innerHTML = `<pre class="mermaid-error">${escapeHtml(source)}</pre>`;
        el.setAttribute('data-rendered', 'true');
      }
    })
  );
}

export function mermaidCodeToHtml(text: string): string {
  return `<div class="mermaid pdf-diagram-block">${escapeHtml(text)}</div>`;
}

function readSvgSize(svg: SVGSVGElement): { width: number; height: number } {
  const viewBox = svg.viewBox?.baseVal;
  const attrW = parseFloat(svg.getAttribute('width') || '');
  const attrH = parseFloat(svg.getAttribute('height') || '');
  const rect = svg.getBoundingClientRect();

  const width = viewBox?.width || attrW || rect.width || 400;
  const height = viewBox?.height || attrH || rect.height || 300;
  return { width, height };
}

function svgToPngDataUrl(svg: SVGSVGElement, width: number, height: number): Promise<string> {
  const doc = svg.ownerDocument ?? document;
  const clone = svg.cloneNode(true) as SVGSVGElement;
  clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  clone.setAttribute('width', String(width));
  clone.setAttribute('height', String(height));
  if (!clone.getAttribute('viewBox')) {
    const { width: vw, height: vh } = readSvgSize(svg);
    clone.setAttribute('viewBox', `0 0 ${vw} ${vh}`);
  }

  const xml = new XMLSerializer().serializeToString(clone);
  const url = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(xml)}`;

  return new Promise((resolve, reject) => {
    const img = doc.createElement('img');
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      try {
        const canvas = doc.createElement('canvas');
        const dpr = 2;
        canvas.width = Math.ceil(width * dpr);
        canvas.height = Math.ceil(height * dpr);
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Canvas unavailable'));
          return;
        }
        ctx.scale(dpr, dpr);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/png'));
      } catch (error) {
        reject(error);
      }
    };
    img.onerror = () => {
      reject(new Error('SVG rasterize failed'));
    };
    img.src = url;
  });
}

/** Render mermaid with a fixed light theme for PDF export. */
export async function renderMermaidDiagramsForPdf(root: HTMLElement): Promise<void> {
  if (typeof window === 'undefined') return;

  const nodes = root.querySelectorAll<HTMLElement>('.mermaid:not([data-rendered])');
  if (nodes.length === 0) return;

  const mermaid = await initMermaidForPdf();

  await Promise.all(
    Array.from(nodes).map(async (el, index) => {
      const source = (el.textContent || '').trim();
      if (!source) {
        el.setAttribute('data-rendered', 'true');
        return;
      }

      const id = `mermaid-pdf-${Date.now()}-${index}`;
      try {
        const { svg } = await mermaid.render(id, source);
        el.innerHTML = svg;
        el.classList.add('mermaid-rendered');
        el.setAttribute('data-rendered', 'true');
      } catch {
        el.innerHTML = `<pre class="mermaid-error">${escapeHtml(source)}</pre>`;
        el.setAttribute('data-rendered', 'true');
      }
    }),
  );
}

/**
 * Scale diagrams to page width and rasterize SVG → PNG so html2canvas won't clip them.
 */
export async function rasterizeMermaidDiagramsForPdf(
  root: HTMLElement,
  maxWidth: number,
  maxHeight: number,
): Promise<void> {
  const doc = root.ownerDocument ?? document;
  const blocks = root.querySelectorAll<HTMLElement>('.mermaid, .mermaid-rendered, .pdf-diagram-block');

  for (const el of blocks) {
    const svg = el.querySelector('svg');
    if (!svg) continue;

    el.classList.add('pdf-diagram-block');

    const { width: natW, height: natH } = readSvgSize(svg);
    if (!natW || !natH) continue;

    let scale = 1;
    if (natW > maxWidth) scale = maxWidth / natW;
    if (natH * scale > maxHeight) scale = Math.min(scale, maxHeight / natH);

    const outW = Math.max(1, Math.round(natW * scale));
    const outH = Math.max(1, Math.round(natH * scale));

    try {
      const dataUrl = await svgToPngDataUrl(svg, outW, outH);
      const img = doc.createElement('img');
      img.src = dataUrl;
      img.alt = 'Diagram';
      img.className = 'pdf-diagram-img';
      img.width = outW;
      img.height = outH;
      img.style.cssText = [
        `width:${outW}px`,
        `height:${outH}px`,
        'max-width:100%',
        'display:block',
        'margin:12px auto',
      ].join(';');
      el.replaceChildren(img);
      el.classList.add('pdf-diagram-rasterized');
    } catch {
      svg.setAttribute('width', String(outW));
      svg.setAttribute('height', String(outH));
      svg.style.width = `${outW}px`;
      svg.style.height = `${outH}px`;
      svg.style.maxWidth = '100%';
      svg.style.display = 'block';
      svg.style.margin = '0 auto';
      el.style.overflow = 'visible';
    }
  }
}

export const MERMAID_EXPORT_STYLES = `
  .mermaid, .mermaid-rendered, .pdf-diagram-block, .pdf-diagram-rasterized {
    margin: 16px 0;
    text-align: center;
    overflow: visible;
    page-break-inside: auto;
    break-inside: auto;
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
    object-fit: contain;
  }
  .mermaid-error { background: #fef2f2; color: #991b1b; padding: 12px; border-radius: 8px; font-size: 12px; overflow-x: auto; white-space: pre-wrap; }
  .pdf-avoid-break { page-break-inside: avoid; break-inside: avoid-page; }
`;
