export const content = `# How to Render Mermaid Diagrams in Markdown

Visual documentation lands better when the figure lives in the same file as the prose. **Mermaid** lets you describe flowcharts, sequence diagrams, and more as text inside Markdown — then render them in preview, on GitHub, or in a PDF export.

This tutorial is the syntax-first companion to our PDF and print guides. Learn the fences here; then use [render Mermaid diagrams to PDF](/blog/render-mermaid-diagrams-to-pdf) when you need printable output.

> **Key Takeaways**
> - Use fenced blocks with the \`mermaid\` language tag.
> - Start with flowchart, sequence, and Gantt — they cover most doc needs.
> - Keep diagrams small enough to read in preview at 100% zoom.
> - Validate in [live preview](/markdown-live-preview) before you share or export.

## Table of Contents

- [Mermaid Fence Basics](#mermaid-fence-basics)
- [Flowcharts](#flowcharts)
- [Sequence Diagrams](#sequence-diagrams)
- [Gantt Charts](#gantt-charts)
- [State and Class Diagrams](#state-and-class-diagrams)
- [Preview and Export Next Steps](#preview-and-export-next-steps)
- [Frequently Asked Questions](#frequently-asked-questions)

## Mermaid Fence Basics

Create a fenced code block whose language tag is \`mermaid\`, then put diagram source inside — for example a left-to-right flowchart:

\`\`\`mermaid
flowchart LR
  A[Write] --> B[Preview] --> C[Share]
\`\`\`

Rules:

- Language tag must be \`mermaid\`.
- One diagram per fence.
- Prefer short node IDs and readable labels.

## Flowcharts

Top-down decision tree:

\`\`\`mermaid
flowchart TD
  A[Start] --> B{Need a diagram?}
  B -->|Yes| C[Write Mermaid]
  B -->|No| D[Keep prose]
  C --> E[Preview]
  D --> E
  E --> F[Done]
\`\`\`

Left-to-right pipeline:

\`\`\`mermaid
flowchart LR
  Draft --> Review --> Publish
\`\`\`

Deeper export guidance: [render flowcharts from Markdown to PDF](/blog/render-flowcharts-from-markdown-to-pdf).

## Sequence Diagrams

\`\`\`mermaid
sequenceDiagram
  participant Author
  participant Preview
  participant Reader
  Author->>Preview: Add Mermaid fence
  Preview-->>Author: Render SVG
  Author->>Reader: Publish Markdown or PDF
\`\`\`

Limit participants so messages stay readable.

## Gantt Charts

\`\`\`mermaid
gantt
  title Docs sprint
  dateFormat YYYY-MM-DD
  section Writing
  Outline           :a1, 2026-09-01, 2d
  Draft diagrams    :a2, after a1, 3d
  section Review
  Peer review       :a3, after a2, 2d
\`\`\`

## State and Class Diagrams

State:

\`\`\`mermaid
stateDiagram-v2
  [*] --> Draft
  Draft --> InReview
  InReview --> Published
  InReview --> Draft
\`\`\`

Class (keep fields minimal for docs):

\`\`\`mermaid
classDiagram
  class Document {
    +String title
    +exportPdf()
  }
  class Diagram {
    +String mermaidSource
  }
  Document --> Diagram
\`\`\`

## Preview and Export Next Steps

1. Paste into [Markdown live preview](/markdown-live-preview) — see [Mermaid diagrams in Markdown preview](/blog/mermaid-diagrams-in-markdown-preview).
2. Export with [Mermaid to PDF](/mermaid-markdown-to-pdf) when stakeholders need a file.
3. For stubborn print layout, read [print Markdown with complex diagrams](/blog/print-markdown-with-diagrams).
4. For full doc sets, follow [technical documentation Markdown to PDF](/blog/technical-documentation-markdown-to-pdf).

## Frequently Asked Questions

### Does GitHub render Mermaid in Markdown?

Yes on GitHub for many diagram types in README and docs files. Always confirm in the GitHub UI after push.

### Can Mermaid diagrams go into PDF?

Yes when your converter supports Mermaid fences natively — [PDFWritter](/mermaid-markdown-to-pdf) does.

### Why is my diagram showing as code?

The fence is missing the \`mermaid\` language tag, or the viewer does not run Mermaid.

### Where should I learn PDF-specific layout rules?

Start with [rendering Mermaid diagrams to PDF](/blog/render-mermaid-diagrams-to-pdf).

---

> Practice Mermaid in Markdown, preview live, and export with **PDFWritter** when you need PDF.
`;
