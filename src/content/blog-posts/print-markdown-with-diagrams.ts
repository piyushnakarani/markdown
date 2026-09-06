export const content = `# How to Print Markdown with Complex Diagrams

Complex diagrams are where Markdown-to-PDF jobs fail loudly: edges clip, labels collide, and multi-figure chapters paginate through the middle of a chart. Learning to **print Markdown with diagrams** is less about the print dialog and more about preparing Mermaid (and images) for paper.

This guide covers sizing, page breaks, multi-diagram chapters, and a print QA checklist you can run before any stakeholder send.

> **Key Takeaways**
> - Print quality is decided in the Markdown source and preview — not in the printer UI.
> - Split oversized Mermaid graphs; never rely on tiny fonts to “make it fit.”
> - Place page-break friendly separators between major figures.
> - Use [PDFWritter](/mermaid-markdown-to-pdf) to preview diagrams at screen size that approximates print, then export PDF.

## Table of Contents

- [Print vs Screen: Different Constraints](#print-vs-screen-different-constraints)
- [Sizing Complex Mermaid Diagrams](#sizing-complex-mermaid-diagrams)
- [Pagination and Page Breaks](#pagination-and-page-breaks)
- [Multi-Diagram Chapters](#multi-diagram-chapters)
- [Mixing Mermaid with PNG/SVG Assets](#mixing-mermaid-with-pngsvg-assets)
- [Print QA Checklist](#print-qa-checklist)
- [Frequently Asked Questions](#frequently-asked-questions)

## Print vs Screen: Different Constraints

Screens scroll. Paper does not. A diagram that looks fine in a wide IDE preview can overflow a portrait PDF page.

Translate screen habits:

| Screen habit | Print fix |
| --- | --- |
| Ultra-wide \`LR\` flowchart | Switch to \`TD\` or split |
| Nested subgraphs | Flatten to one grouping level |
| Tiny edge labels | Shorten or move to legend prose |
| Dark-theme neon colors | Rely on default Mermaid / converter theme |

If you are still learning Mermaid export basics, read [render Mermaid diagrams to PDF](/blog/render-mermaid-diagrams-to-pdf) first.

## Sizing Complex Mermaid Diagrams

Complexity is node count × label length × crossing edges.

Budget:

- **Simple** (≤6 nodes): one column, any direction
- **Medium** (7–12 nodes): prefer \`TD\`; audit crossings
- **Complex** (13+): mandatory split into multiple figures

Example of a “complex” chart deliberately split:

\`\`\`mermaid
flowchart TD
  subgraph Ingress
    A[CDN] --> B[Gateway]
  end
  B --> C[Service A]
\`\`\`

\`\`\`mermaid
flowchart TD
  C[Service A] --> D[Service B]
  D --> E[(Database)]
\`\`\`

Introduce each with “Figure 1 — ingress” / “Figure 2 — dependencies” so print readers reconnect the story.

Flowchart-specific automation tips: [render flowcharts from Markdown to PDF](/blog/render-flowcharts-from-markdown-to-pdf).

## Pagination and Page Breaks

Markdown does not give perfect CSS page-break control in every browser print pipeline, but you can bias outcomes:

1. Put each major diagram under its own H2.
2. Insert a horizontal rule (\`---\`) before large figures.
3. Avoid starting a Mermaid fence at the very end of a long paragraph block — give it air.
4. Keep a short caption paragraph immediately above the fence so the caption and figure travel together.

After export, flip through the PDF in two-page view: if a heading is alone at the bottom and the diagram starts the next page, consider moving the heading down by adding a sentence or rule above the figure.

## Multi-Diagram Chapters

Architecture chapters often need overview + sequence + state. Order them:

1. Overview flowchart (context)
2. Sequence (runtime)
3. State (lifecycle)

Never stack three fences with no prose. Minimum one explanatory sentence between figures.

Preview all fences with [Mermaid in Markdown preview](/blog/mermaid-diagrams-in-markdown-preview) before printing.

## Mixing Mermaid with PNG/SVG Assets

Sometimes Mermaid cannot express a UI annotation. Rules for mixed docs:

- Prefer Mermaid for structural truth.
- Use PNG/SVG for product screenshots only.
- Give images explicit alt text and reasonable width.
- Do not paste screenshots of Mermaid — that recreates the staleness problem.

For whole doc systems (ADRs, runbooks), see [technical documentation Markdown to PDF with Mermaid](/blog/technical-documentation-markdown-to-pdf).

## Print QA Checklist

Run this before any printed or attached PDF:

- [ ] Every Mermaid fence renders in live preview at 100% zoom
- [ ] No diagram wider than the preview content column
- [ ] Complex systems split into labeled figures
- [ ] Captions exist above each figure
- [ ] PDF spot-checked in two-page view for orphan headings
- [ ] Code and tables near diagrams still readable
- [ ] File named with doc title + date

Export path: [editor](/editor) → verify → [Mermaid to PDF](/mermaid-markdown-to-pdf) or [Markdown to PDF](/markdown-to-pdf).

## Frequently Asked Questions

### How do I print Markdown with complex diagrams cleanly?

Simplify or split Mermaid figures, verify in live preview, export PDF, then inspect pagination. Do not “fix” the PDF in a separate design tool if the source can be corrected.

### Why do my diagrams look fine on screen but bad on paper?

Screen width is larger than portrait pages. Redesign for \`TD\` layouts and fewer nodes.

### Can I force a page break before a diagram?

Use heading + horizontal rule patterns to encourage breaks; exact control varies by browser print engine. Splitting content is more reliable than fighting CSS.

### Should I use landscape PDF for wide charts?

Occasionally, but landscape docs mix poorly with portrait report packs. Prefer splitting figures.

### Does PDFWritter support Mermaid in printed PDFs?

Yes — Mermaid renders in preview and is included in PDF export via the browser print pipeline when using the Mermaid-aware tools.

---

> Preview hard, print once — export Markdown with complex Mermaid diagrams free using **PDFWritter**.
`;
