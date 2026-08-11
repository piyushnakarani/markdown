import {
  BorderStyle,
  Document,
  ExternalHyperlink,
  HeadingLevel,
  ImageRun,
  Packer,
  Paragraph,
  ShadingType,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType,
  type FileChild,
  type ParagraphChild,
} from 'docx';

import { buildRenderedHtmlBody } from './converters';
import type { ExportProgressCallback } from './export-progress';

const HEADING_LEVELS: Record<string, (typeof HeadingLevel)[keyof typeof HeadingLevel]> = {
  H1: HeadingLevel.HEADING_1,
  H2: HeadingLevel.HEADING_2,
  H3: HeadingLevel.HEADING_3,
  H4: HeadingLevel.HEADING_4,
  H5: HeadingLevel.HEADING_5,
  H6: HeadingLevel.HEADING_6,
};

const CODE_FONT = 'Consolas';
const BODY_FONT = 'Calibri';

function dataUrlToUint8Array(dataUrl: string): Uint8Array {
  const base64 = dataUrl.split(',')[1] ?? '';
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

async function fetchImageBytes(src: string): Promise<Uint8Array | null> {
  try {
    const response = await fetch(src);
    if (!response.ok) return null;
    return new Uint8Array(await response.arrayBuffer());
  } catch {
    return null;
  }
}

function readSvgSize(svg: SVGSVGElement): { width: number; height: number } {
  const viewBox = svg.viewBox?.baseVal;
  const attrW = parseFloat(svg.getAttribute('width') || '');
  const attrH = parseFloat(svg.getAttribute('height') || '');
  const rect = svg.getBoundingClientRect();
  const width = viewBox?.width || attrW || rect.width || 480;
  const height = viewBox?.height || attrH || rect.height || 320;
  return { width, height };
}

async function svgToPngBytes(svg: SVGSVGElement): Promise<{ data: Uint8Array; width: number; height: number }> {
  const { width: natW, height: natH } = readSvgSize(svg);
  const maxWidth = 620;
  const scale = natW > maxWidth ? maxWidth / natW : 1;
  const width = Math.max(1, Math.round(natW * scale));
  const height = Math.max(1, Math.round(natH * scale));

  const clone = svg.cloneNode(true) as SVGSVGElement;
  clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  clone.setAttribute('width', String(width));
  clone.setAttribute('height', String(height));
  if (!clone.getAttribute('viewBox')) {
    clone.setAttribute('viewBox', `0 0 ${natW} ${natH}`);
  }

  const xml = new XMLSerializer().serializeToString(clone);
  const url = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(xml)}`;

  const dataUrl = await new Promise<string>((resolve, reject) => {
    const img = document.createElement('img');
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
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
    img.onerror = () => reject(new Error('SVG rasterize failed'));
    img.src = url;
  });

  return { data: dataUrlToUint8Array(dataUrl), width, height };
}

function inlineRuns(
  node: Node,
  style: { bold?: boolean; italics?: boolean } = {},
): ParagraphChild[] {
  if (node.nodeType === Node.TEXT_NODE) {
    const value = node.textContent ?? '';
    return value ? [new TextRun({ font: BODY_FONT, text: value, ...style })] : [];
  }

  if (!(node instanceof HTMLElement)) return [];

  const tag = node.tagName;
  if (tag === 'STRONG' || tag === 'B') {
    return Array.from(node.childNodes).flatMap((child) => inlineRuns(child, { ...style, bold: true }));
  }

  if (tag === 'EM' || tag === 'I') {
    return Array.from(node.childNodes).flatMap((child) => inlineRuns(child, { ...style, italics: true }));
  }

  if (tag === 'CODE') {
    const code = node.textContent ?? '';
    return code
      ? [
          new TextRun({
            text: code,
            font: CODE_FONT,
            bold: style.bold,
            italics: style.italics,
            shading: { type: ShadingType.CLEAR, fill: 'F1F5F9' },
          }),
        ]
      : [];
  }

  if (tag === 'A') {
    const href = node.getAttribute('href') ?? '';
    const children = Array.from(node.childNodes).flatMap((child) => inlineRuns(child, style));
    if (!href) return children;
    return [new ExternalHyperlink({ link: href, children })];
  }

  if (tag === 'BR') return [new TextRun({ text: '\n', ...style })];

  if (node.classList.contains('katex') || node.classList.contains('katex-display')) {
    const mathText = node.textContent?.trim() ?? '';
    return mathText ? [new TextRun({ text: mathText, italics: true, ...style })] : [];
  }

  return Array.from(node.childNodes).flatMap((child) => inlineRuns(child, style));
}

function paragraphFromElement(element: HTMLElement): Paragraph {
  return new Paragraph({
    spacing: { after: 120 },
    children: Array.from(element.childNodes).flatMap((child) => inlineRuns(child)),
  });
}

function listParagraphs(list: HTMLUListElement | HTMLOListElement, ordered: boolean, depth = 0): Paragraph[] {
  const paragraphs: Paragraph[] = [];
  const items = Array.from(list.children).filter((child) => child.tagName === 'LI') as HTMLLIElement[];

  items.forEach((li, index) => {
    const prefix = ordered ? `${index + 1}. ` : '• ';
    const indent = '    '.repeat(depth);
    const runs: ParagraphChild[] = [new TextRun({ text: `${indent}${prefix}`, font: BODY_FONT })];

    if (li.classList.contains('task-list-item')) {
      const checked = li.querySelector('input[type="checkbox"]')?.hasAttribute('checked');
      runs[0] = new TextRun({ text: `${indent}${checked ? '☑ ' : '☐ '}`, font: BODY_FONT });
    }

    for (const child of li.childNodes) {
      if (child instanceof HTMLElement && (child.tagName === 'UL' || child.tagName === 'OL')) {
        continue;
      }
      runs.push(...inlineRuns(child));
    }

    paragraphs.push(new Paragraph({ spacing: { after: 80 }, children: runs }));

    for (const child of li.children) {
      if (child.tagName === 'UL') {
        paragraphs.push(...listParagraphs(child as HTMLUListElement, false, depth + 1));
      }
      if (child.tagName === 'OL') {
        paragraphs.push(...listParagraphs(child as HTMLOListElement, true, depth + 1));
      }
    }
  });

  return paragraphs;
}

async function tableFromElement(table: HTMLTableElement): Promise<Table> {
  const rows = Array.from(table.querySelectorAll('tr'));
  const docxRows = rows.map((row) => {
    const cells = Array.from(row.querySelectorAll('th, td'));
    return new TableRow({
      children: cells.map((cell) => {
        const isHeader = cell.tagName === 'TH';
        return new TableCell({
          width: { size: 100 / Math.max(cells.length, 1), type: WidthType.PERCENTAGE },
          shading: isHeader ? { type: ShadingType.CLEAR, fill: 'F1F5F9' } : undefined,
          children: [
            new Paragraph({
              children: Array.from(cell.childNodes).flatMap((child) => inlineRuns(child)).length
                ? Array.from(cell.childNodes).flatMap((child) => inlineRuns(child))
                : [new TextRun({ text: cell.textContent ?? '', font: BODY_FONT })],
            }),
          ],
        });
      }),
    });
  });

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: docxRows,
  });
}

async function imageParagraph(source: string, alt = 'Image'): Promise<Paragraph | null> {
  let bytes: Uint8Array | null = null;
  let width = 480;
  let height = 320;

  if (source.startsWith('data:image/')) {
    bytes = dataUrlToUint8Array(source);
  } else {
    bytes = await fetchImageBytes(source);
  }

  if (!bytes) {
    return new Paragraph({ children: [new TextRun({ text: `[${alt}]`, italics: true, color: '64748B', font: BODY_FONT })] });
  }

  return new Paragraph({
    alignment: 'center',
    spacing: { before: 120, after: 120 },
    children: [
      new ImageRun({
        type: 'png',
        data: bytes,
        altText: { title: alt, description: alt, name: alt },
        transformation: { width, height },
      }),
    ],
  });
}

async function blockFromElement(element: HTMLElement): Promise<FileChild[]> {
  const tag = element.tagName;

  if (tag in HEADING_LEVELS) {
    return [
      new Paragraph({
        heading: HEADING_LEVELS[tag],
        spacing: { before: 180, after: 120 },
        children: Array.from(element.childNodes).flatMap((child) => inlineRuns(child)),
      }),
    ];
  }

  if (tag === 'P') {
    return [paragraphFromElement(element)];
  }

  if (tag === 'UL' || tag === 'OL') {
    return listParagraphs(element as HTMLUListElement, tag === 'OL');
  }

  if (tag === 'BLOCKQUOTE') {
    return [
      new Paragraph({
        indent: { left: 720 },
        border: { left: { style: BorderStyle.SINGLE, size: 12, color: '6366F1' } },
        spacing: { before: 120, after: 120 },
        children: Array.from(element.childNodes).flatMap((child) => inlineRuns(child)),
      }),
    ];
  }

  if (tag === 'PRE') {
    const code = element.textContent ?? '';
    return [
      new Paragraph({
        spacing: { before: 120, after: 120 },
        shading: { type: ShadingType.CLEAR, fill: '0F172A' },
        children: [
          new TextRun({
            text: code,
            font: CODE_FONT,
            color: 'E2E8F0',
          }),
        ],
      }),
    ];
  }

  if (tag === 'TABLE') {
    return [await tableFromElement(element as HTMLTableElement)];
  }

  if (tag === 'HR') {
    return [new Paragraph({ spacing: { before: 120, after: 120 }, border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: 'CBD5E1' } }, children: [new TextRun({ text: '', font: BODY_FONT })] })];
  }

  if (tag === 'IMG') {
    const img = element as HTMLImageElement;
    const paragraph = await imageParagraph(img.src, img.alt || 'Image');
    return paragraph ? [paragraph] : [];
  }

  if (element.classList.contains('mermaid') || element.classList.contains('mermaid-rendered')) {
    const svg = element.querySelector('svg');
    if (svg) {
      const { data, width, height } = await svgToPngBytes(svg);
      return [
        new Paragraph({
          alignment: 'center',
          spacing: { before: 120, after: 120 },
          children: [
            new ImageRun({
              type: 'png',
              data,
              altText: { title: 'Diagram', description: 'Mermaid diagram', name: 'diagram' },
              transformation: { width, height },
            }),
          ],
        }),
      ];
    }

    const source = element.textContent?.trim();
    if (source) {
      return [
        new Paragraph({
          spacing: { before: 120, after: 120 },
          children: [new TextRun({ text: source, font: CODE_FONT })],
        }),
      ];
    }
  }

  if (element.classList.contains('katex-display')) {
    const mathText = element.textContent?.trim() ?? '';
    return mathText
      ? [new Paragraph({ alignment: 'center', spacing: { before: 120, after: 120 }, children: [new TextRun({ text: mathText, italics: true, font: BODY_FONT })] })]
      : [];
  }

  if (tag === 'DIV' || tag === 'SECTION' || tag === 'ARTICLE') {
    const blocks: FileChild[] = [];
    for (const child of element.children) {
      blocks.push(...(await blockFromElement(child as HTMLElement)));
    }
    return blocks;
  }

  const text = element.textContent?.trim();
  return text ? [paragraphFromElement(element)] : [];
}

async function htmlRootToDocxChildren(root: HTMLElement): Promise<FileChild[]> {
  const blocks: FileChild[] = [];

  for (const node of root.childNodes) {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent?.trim();
      if (text) blocks.push(new Paragraph({ children: [new TextRun({ text, font: BODY_FONT })] }));
      continue;
    }

    if (node instanceof HTMLElement) {
      blocks.push(...(await blockFromElement(node)));
    }
  }

  if (blocks.length === 0) {
    blocks.push(new Paragraph({ children: [new TextRun({ text: '', font: BODY_FONT })] }));
  }

  return blocks;
}

export async function convertMarkdownToDocx(
  markdown: string,
  onProgress?: ExportProgressCallback,
): Promise<Blob> {
  onProgress?.('preparing');
  const bodyHtml = await buildRenderedHtmlBody(markdown, { onProgress });
  onProgress?.('generatingDocx');

  const container = document.createElement('div');
  container.innerHTML = bodyHtml;
  const children = await htmlRootToDocxChildren(container);

  const doc = new Document({
    sections: [{ properties: {}, children }],
  });

  return Packer.toBlob(doc);
}

export function downloadDocxBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename.endsWith('.docx') ? filename : `${filename}.docx`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export async function buildDocxDocument(
  markdown: string,
  filename: string = 'document.docx',
  onProgress?: ExportProgressCallback,
): Promise<Blob> {
  void filename;
  return convertMarkdownToDocx(markdown, onProgress);
}
