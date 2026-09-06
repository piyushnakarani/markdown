export const content = `# Render Flowcharts from Markdown to PDF Automatically

Flowcharts are the most common Mermaid diagram in engineering docs — and the ones most often ruined by screenshots. When you **render flowcharts from Markdown to PDF**, the decision tree stays editable text, updates with the repo, and prints without opening a separate drawing app.

This tutorial covers flowchart syntax that exports cleanly, automatic render/export workflows, and layout choices that stay readable on A4 or Letter pages.

> **Key Takeaways**
> - Use \`flowchart\` (or \`graph\`) fences with \`TD\` / \`LR\` directions sized for portrait pages.
> - Automatic render means: edit Markdown → preview SVG → export PDF from the same source.
> - Cap node count and label length so automatic layout does not crush text.
> - [PDFWritter](/mermaid-markdown-to-pdf) automates Mermaid flowchart rendering in preview and PDF with no signup.

## Table of Contents

- [What “Automatic” Really Means](#what-automatic-really-means)
- [Flowchart Syntax That Exports Cleanly](#flowchart-syntax-that-exports-cleanly)
- [Decision Nodes, Subgraphs, and Edge Labels](#decision-nodes-subgraphs-and-edge-labels)
- [Portrait Layout Patterns](#portrait-layout-patterns)
- [End-to-End Automatic Workflow](#end-to-end-automatic-workflow)
- [Common Flowchart Export Failures](#common-flowchart-export-failures)
- [Frequently Asked Questions](#frequently-asked-questions)

## What “Automatic” Really Means

Automatic does not mean AI invents your architecture. It means the toolchain removes manual image steps:

1. You write a flowchart as Mermaid text in Markdown.
2. The preview engine renders it to SVG automatically.
3. The PDF export embeds that same render — no Copy → Paste → Crop.

Teams still own the content. Automation owns the imaging pipeline. That is why Git-friendly flowcharts beat weekly PNG refreshes.

## Flowchart Syntax That Exports Cleanly

Prefer the modern \`flowchart\` keyword:

\`\`\`mermaid
flowchart TD
  A[Start] --> B[Validate input]
  B --> C{Valid?}
  C -->|Yes| D[Process]
  C -->|No| E[Return error]
  D --> F[End]
  E --> F
\`\`\`

Left-to-right for pipelines:

\`\`\`mermaid
flowchart LR
  Ingest --> Transform --> Load --> Report
\`\`\`

Rules of thumb:

- One primary direction per figure.
- Rectangle nodes for steps; diamonds for decisions; stadium/circle sparingly.
- Edge labels short (\`Yes\` / \`No\` / \`retry\`).

Broader Mermaid-to-PDF context: [rendering Mermaid diagrams to PDF](/blog/render-mermaid-diagrams-to-pdf).

## Decision Nodes, Subgraphs, and Edge Labels

Decision diamonds print well when labels stay tiny. Long questions belong in the surrounding paragraph, not inside the node.

Subgraphs help group stages:

\`\`\`mermaid
flowchart TB
  subgraph Ingestion
    A[API] --> B[Queue]
  end
  subgraph Processing
    B --> C[Worker]
    C --> D[(Store)]
  end
\`\`\`

Print caveat: nested subgraphs shrink fonts. One level of grouping is enough for most PDFs.

## Portrait Layout Patterns

| Pattern | Direction | Use when |
| --- | --- | --- |
| Vertical story | \`TD\` / \`TB\` | Onboarding, incident response |
| Horizontal pipeline | \`LR\` | ETL, CI stages |
| Split swimlanes | subgraphs + \`TB\` | Multi-team ownership |

If a horizontal chart overflows, either:

- Switch to \`TD\`, or
- Split into “Part 1 / Part 2” figures with a one-sentence bridge.

Preview techniques that catch overflow early: [Mermaid diagrams in Markdown preview](/blog/mermaid-diagrams-in-markdown-preview).

## End-to-End Automatic Workflow

1. Draft the flowchart in your \`.md\` file under a clear H2 (“## Order flow”).
2. Open [Markdown live preview](/markdown-live-preview) or [editor](/editor).
3. Confirm the flowchart renders without errors.
4. Export with [Mermaid to PDF](/mermaid-markdown-to-pdf) (or general [Markdown to PDF](/markdown-to-pdf)).
5. In the PDF, ensure the figure fits one page or breaks at a subgraph boundary — not mid-node.

For docs that mix flowcharts with tables and code, follow [technical documentation Markdown to PDF](/blog/technical-documentation-markdown-to-pdf).

## Common Flowchart Export Failures

| Problem | Cause | Fix |
| --- | --- | --- |
| Source printed as code | Fence not tagged \`mermaid\` | Fix language tag |
| Overlapping arrows | Too many cross-links | Simplify; use sequence diagram instead |
| Cut-off right side | Wide \`LR\` chart | Use \`TD\` or split |
| Ugly line wraps in nodes | Paragraph-length labels | Shorten; move detail to prose |
| Different look in two tools | Different Mermaid versions | Stick to core shapes |

## Frequently Asked Questions

### How do I render a Markdown flowchart to PDF automatically?

Embed a \`\`\`mermaid flowchart fence, preview it, and export with a Mermaid-aware converter such as [PDFWritter](/mermaid-markdown-to-pdf).

### Should I use \`graph\` or \`flowchart\`?

Both work in many engines; \`flowchart\` is the clearer modern keyword. Pick one style per repo for consistency.

### Can flowcharts include links?

Some Mermaid features support click interactions on the web; PDF is static — assume print readers cannot click diagram hotspots. Put URLs in the prose or as footnotes.

### How large can a flowchart be?

If labels are hard to read at 100% preview zoom, the PDF will be worse. Split the figure.

### Is this better than draw.io exports?

For living technical docs, yes — text is reviewable in PRs. For polished posters, dedicated diagramming tools may still look sharper.

---

> Automate flowchart imaging: write Mermaid in Markdown and export PDF with **PDFWritter** — free and private.
`;
