export const content = `# Rendering Mermaid Diagrams in Markdown to PDF

Shipping architecture docs without diagrams forces readers to invent the system in their heads. When you **render Mermaid diagrams to PDF**, the figure stays versioned beside the prose, preview-checked, and printable — no Visio round-trip, no screenshot drift.

This guide focuses on the PDF path: which Mermaid types survive export cleanly, how to write fences that print legibly, and a preview-first workflow that catches broken diagrams before you send the file.

> **Key Takeaways**
> - Native Mermaid fences in Markdown keep diagrams versioned with the text and export with the PDF when the converter supports them.
> - Keep diagrams under ~10–12 nodes and prefer \`LR\` / \`TD\` layouts that fit portrait page width.
> - Always verify Mermaid in live preview before download — syntax errors become blank boxes in print.
> - Client-side tools like [PDFWritter](/mermaid-markdown-to-pdf) render Mermaid in preview and PDF without uploading private docs.

## Table of Contents

- [Why Mermaid Belongs in the PDF Path](#why-mermaid-belongs-in-the-pdf-path)
- [Supported Diagram Types That Print Well](#supported-diagram-types-that-print-well)
- [Writing Fences That Survive Export](#writing-fences-that-survive-export)
- [Layout Rules for Portrait PDFs](#layout-rules-for-portrait-pdfs)
- [Preview-First Export Workflow](#preview-first-export-workflow)
- [Troubleshooting Blank or Truncated Diagrams](#troubleshooting-blank-or-truncated-diagrams)
- [When to Use Mermaid vs Screenshots](#when-to-use-mermaid-vs-screenshots)
- [Frequently Asked Questions](#frequently-asked-questions)

## Why Mermaid Belongs in the PDF Path

PNG exports of whiteboard tools go stale the week the architecture changes. Mermaid is text: it lives in Git, diffs cleanly in pull requests, and — with a converter that understands \`\`\`mermaid fences — renders again at export time.

Three outcomes matter for PDF:

1. **Fidelity** — nodes, edges, and labels match the preview.
2. **Legibility** — type size stays readable at A4/Letter width.
3. **Privacy** — architecture diagrams often describe internal systems; browser-side conversion keeps them off third-party upload converters.

If you only need syntax examples without the print step, start with the [Mermaid in Markdown tutorial](/blog/render-mermaid-diagrams-markdown). This article assumes you already write fences and need trustworthy PDFs.

## Supported Diagram Types That Print Well

Not every Mermaid type behaves equally on paper. In practice these export cleanly in modern browser converters:

| Type | Best for | Print tip |
| --- | --- | --- |
| Flowchart | Pipelines, decisions | Prefer \`flowchart LR\` for process chains |
| Sequence | API / actor timing | Limit participants to 4–6 |
| State | Lifecycle machines | Keep transitions short |
| Class | Domain models | Avoid deep inheritance trees |
| Gantt | Roadmaps | Cap tasks so the chart fits one page |
| Pie | Simple share breakdowns | Prefer tables if many slices |

Example flowchart ready for PDF:

\`\`\`mermaid
flowchart LR
  A[Markdown source] --> B[Live preview]
  B --> C{Diagrams OK?}
  C -->|Yes| D[Download PDF]
  C -->|No| E[Fix Mermaid fence]
  E --> B
\`\`\`

Sequence diagrams shine in API runbooks:

\`\`\`mermaid
sequenceDiagram
  participant Dev
  participant Preview
  participant PDF
  Dev->>Preview: Paste Mermaid fence
  Preview-->>Dev: Rendered SVG
  Dev->>PDF: Export
  PDF-->>Dev: Printable document
\`\`\`

For flowchart-only deep dives, see [rendering flowcharts from Markdown to PDF](/blog/render-flowcharts-from-markdown-to-pdf).

## Writing Fences That Survive Export

Converters look for a fenced block whose language tag is \`mermaid\`. Common failure modes:

- Using \`\`\`text or no language tag — the PDF prints raw source.
- Pasting Mermaid Live Editor JSON instead of diagram source.
- Mixing HTML \`<div class="mermaid">\` wrappers that some Markdown engines ignore.

Canonical pattern: a fenced block with language \`mermaid\` containing only diagram source (not Mermaid Live JSON, not HTML wrappers).

Label hygiene for print:

- Prefer short node IDs (\`A\`, \`Auth\`) and readable display text.
- Avoid emoji-heavy labels — they often render inconsistently in print engines.
- Escape special characters in edge labels carefully; keep quotes balanced.

## Layout Rules for Portrait PDFs

Screen previews forgive wide graphs. Paper does not.

1. **Node budget** — under ~12 nodes for a single figure; split larger systems into “Figure 1a / 1b.”
2. **Direction** — \`LR\` for pipelines; \`TD\` for hierarchies and org-like trees.
3. **Introduction sentence** — name the figure in the paragraph above so print readers know what they are looking at.
4. **One diagram per section** — stacking three Mermaid blocks without prose creates dense, hard-to-scan pages.
5. **Avoid tiny subgraphs** — nested subgraphs shrink labels; flatten when printing.

Technical writers documenting whole systems should also read [technical documentation Markdown to PDF with Mermaid](/blog/technical-documentation-markdown-to-pdf).

## Preview-First Export Workflow

Treat Mermaid like code: preview is the unit test; PDF is the release.

1. Paste Markdown into the [online editor](/editor) or open the [Mermaid to PDF tool](/mermaid-markdown-to-pdf).
2. Confirm every fence renders — no red error banners, no empty boxes.
3. Zoom the preview to ~100% and check label collisions.
4. Download PDF and spot-check the first page that contains a diagram.
5. Rename using your doc convention (\`arch-overview-2026-09.pdf\`) and ship.

Because [PDFWritter](/markdown-to-pdf) processes in the browser by default, internal network diagrams stay on the device during day-to-day exports.

## Troubleshooting Blank or Truncated Diagrams

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| Raw Mermaid text in PDF | Missing \`mermaid\` language tag | Fix fence language |
| Empty white box | Syntax error in diagram | Check preview error; validate brackets/quotes |
| Cut-off right edge | Too many columns / wide \`LR\` graph | Switch to \`TD\` or split nodes |
| Tiny unreadable text | Oversized graph | Reduce nodes; shorten labels |
| Works in VS Code, fails online | Extension-only syntax | Stick to core Mermaid types |

If print quality is still soft after simplifying, see [how to print Markdown with complex diagrams](/blog/print-markdown-with-diagrams) for pagination and page-break tactics.

## When to Use Mermaid vs Screenshots

Use Mermaid when the structure changes often, lives in Git, or must stay searchable as text.

Use a carefully cropped screenshot when the figure is a product UI, a photo, or a chart Mermaid cannot express (complex GIS maps, annotated Figma frames).

Never mix both for the same figure — pick one source of truth so reviews do not argue about which image is current.

## Frequently Asked Questions

### How do I render Mermaid diagrams to PDF from Markdown?

Write \`\`\`mermaid fences in your \`.md\` file, open a converter with Mermaid support such as [PDFWritter](/mermaid-markdown-to-pdf), verify live preview, then download PDF.

### Does every Mermaid diagram type export?

Core types (flowchart, sequence, state, class, Gantt, pie) export reliably. Exotic or experimental types may need simplification — always confirm in preview.

### Why is my diagram blank in the PDF?

Usually a syntax error or a missing language tag. Fix the fence until preview renders, then re-export.

### Can I keep architecture diagrams private?

Yes. Prefer client-side converters so Markdown with Mermaid never uploads to a third-party server during normal use.

### Is Mermaid better than drawing tools for PDFs?

For versioned technical docs, yes — text diffs and reproducible renders beat opaque binary drawings. For marketing illustrations, dedicated design tools still win.

---

> Write Mermaid in Markdown, preview every figure, and export PDF free with **PDFWritter** — diagrams included, no signup required.
`;
