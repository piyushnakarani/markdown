const CODE_FENCE = /^(`{3,}|~{3,})(\s*[\w-+]*)?\s*$/;

const FENCED_MERMAID = /```\s*mermaid\b/i;

/** First line of a Mermaid diagram definition. */
export const MERMAID_DIAGRAM_START =
  /^\s*(?:flowchart|graph|sequenceDiagram|classDiagram|stateDiagram(?:-v2)?|erDiagram|journey|gantt|pie(?:\s|$)|gitGraph|mindmap|timeline|quadrantChart|requirementDiagram|C4(?:Context|Container|Component|Dynamic|Deployment)|block-beta|sankey-beta|xyChart-beta|kanban)\b/i;

function isInsideCodeFence(lines: string[], index: number): boolean {
  let inFence = false;
  let fenceMarker = '';

  for (let i = 0; i < index; i++) {
    const line = lines[i];
    if (!inFence && CODE_FENCE.test(line)) {
      inFence = true;
      fenceMarker = line.match(CODE_FENCE)![1];
      continue;
    }
    if (inFence && line.trim().startsWith(fenceMarker)) {
      inFence = false;
    }
  }

  return inFence;
}

function isMermaidContinuation(line: string): boolean {
  const trimmed = line.trim();
  if (!trimmed) return true;
  if (/^\s/.test(line)) return true;
  if (MERMAID_DIAGRAM_START.test(line)) return true;

  if (
    /^(participant|actor|activate|deactivate|note over|note right of|note left of|loop|alt|else|opt|par|and|rect|critical|break|end|subgraph|style|class |classDef|linkStyle|click|direction|title|section|dateFormat|axisFormat|%%)/i.test(
      trimmed,
    )
  ) {
    return true;
  }

  if (/(-->|---|-\.-|==>|--x|--o|o--o|\|\||->>|-->>|<-->|x--x)/.test(trimmed)) return true;
  if (/^[A-Za-z0-9_"']+[\[\({<]/.test(trimmed)) return true;
  if (/^[A-Za-z0-9_]+\s*:\s/.test(trimmed)) return true;
  if (/^"[^"]+"\s*:\s*\d/.test(trimmed)) return true;

  return false;
}

function isMarkdownSectionStart(line: string): boolean {
  const trimmed = line.trim();
  if (!trimmed) return false;
  if (/^#{1,6}\s/.test(trimmed)) return true;
  if (/^```/.test(trimmed)) return true;
  if (/^[-*+]\s+/.test(trimmed)) return true;
  if (/^\d+\.\s+/.test(trimmed)) return true;
  if (/^>\s?/.test(trimmed)) return true;
  if (/^\|/.test(trimmed)) return true;
  return !isMermaidContinuation(line);
}

function nextNonBlankLine(lines: string[], start: number): string | null {
  for (let i = start; i < lines.length; i++) {
    const trimmed = lines[i].trim();
    if (trimmed) return lines[i];
  }
  return null;
}

function hasRawMermaidBlock(markdown: string): boolean {
  const lines = markdown.split('\n');

  for (let i = 0; i < lines.length; i++) {
    if (!MERMAID_DIAGRAM_START.test(lines[i])) continue;
    if (isInsideCodeFence(lines, i)) continue;
    return true;
  }

  return false;
}

export function markdownHasMermaidContent(markdown: string): boolean {
  return FENCED_MERMAID.test(markdown) || hasRawMermaidBlock(markdown);
}

export function pastedTextHasRawMermaid(text: string): boolean {
  return hasRawMermaidBlock(text) && !FENCED_MERMAID.test(text);
}

/**
 * Wrap raw Mermaid diagram blocks (e.g. pasted `sequenceDiagram` without fences)
 * in ```mermaid fences so they render in preview and export.
 */
export function normalizeMermaidInMarkdown(markdown: string): string {
  const lines = markdown.split('\n');
  const out: string[] = [];
  let inFence = false;
  let fenceMarker = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (!inFence && CODE_FENCE.test(line)) {
      inFence = true;
      fenceMarker = line.match(CODE_FENCE)![1];
      out.push(line);
      continue;
    }

    if (inFence) {
      out.push(line);
      if (line.trim().startsWith(fenceMarker)) {
        inFence = false;
      }
      continue;
    }

    if (MERMAID_DIAGRAM_START.test(line)) {
      const blockLines: string[] = [line];
      i++;

      while (i < lines.length) {
        const next = lines[i];

        if (CODE_FENCE.test(next)) break;

        if (!next.trim()) {
          const following = nextNonBlankLine(lines, i + 1);
          if (!following || isMarkdownSectionStart(following)) break;
          blockLines.push(next);
          i++;
          continue;
        }

        if (isMarkdownSectionStart(next)) break;
        if (!isMermaidContinuation(next)) break;

        blockLines.push(next);
        i++;
      }

      out.push('```mermaid', ...blockLines, '```');
      continue;
    }

    out.push(line);
  }

  return out.join('\n');
}

export function applyMarkdownPaste(
  current: string,
  pasted: string,
  selectionStart: number,
  selectionEnd: number,
): { text: string; cursor: number } {
  const normalized = normalizeMermaidInMarkdown(pasted);
  const text = current.slice(0, selectionStart) + normalized + current.slice(selectionEnd);
  return { text, cursor: selectionStart + normalized.length };
}
