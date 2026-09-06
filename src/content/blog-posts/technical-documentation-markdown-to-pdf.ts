export const content = `# Technical Documentation: Markdown to PDF with Mermaid

Technical documentation dies in two places: a wiki nobody updates, or a PDF nobody can regenerate. Using **technical documentation Markdown to PDF** with Mermaid keeps the source reviewable in Git and the deliverable shareable with stakeholders who will not open a repo.

This guide is a documentation playbook: structure, diagram policy, code and table standards, and an export checklist tuned for ADRs, runbooks, and API overviews.

> **Key Takeaways**
> - Treat Markdown + Mermaid as the single source of truth; PDF is a build artifact.
> - Standardize heading, fence, and diagram conventions across the docs set.
> - Preview every Mermaid figure before cutting a release PDF.
> - [PDFWritter](/markdown-to-pdf) exports docs with Mermaid, KaTeX, and code highlighting in the browser.

## Table of Contents

- [Why Markdown Still Wins for Tech Docs](#why-markdown-still-wins-for-tech-docs)
- [Document Types That Export Well](#document-types-that-export-well)
- [Structural Template for Docs That Print](#structural-template-for-docs-that-print)
- [Mermaid Policy for Documentation Teams](#mermaid-policy-for-documentation-teams)
- [Code, Tables, and Math in the Same PDF](#code-tables-and-math-in-the-same-pdf)
- [Release Checklist for Doc PDFs](#release-checklist-for-doc-pdfs)
- [Tooling Recommendations](#tooling-recommendations)
- [Frequently Asked Questions](#frequently-asked-questions)

## Why Markdown Still Wins for Tech Docs

Engineering teams already write Markdown in PRs, READMEs, and ADRs. Extending that format to stakeholder PDFs avoids a second CMS. Mermaid upgrades the format from “text with code” to “text with architecture,” which is what onboarding packets and design reviews need.

PDF remains useful for:

- Customers or auditors who cannot access your Git host
- Change-controlled attachments in tickets
- Offline reading during incidents

The mistake is editing the PDF. Always edit Markdown; rebuild the PDF.

## Document Types That Export Well

| Doc type | Mermaid fit | Notes |
| --- | --- | --- |
| ADR | State / flowchart | Keep diagrams tiny |
| Runbook | Sequence / flowchart | Number steps in prose too |
| API overview | Sequence | Limit participants |
| Onboarding guide | Flowchart | One happy-path figure |
| RFC | Mix | Put large figures in appendix |

GitHub-centric docs can start from the [GitHub README to PDF](/github-readme-to-pdf) path, then expand diagrams using the policies below.

## Structural Template for Docs That Print

\`\`\`markdown
# Service X — Operational Overview

**Owner:** Platform
**Status:** Active
**Last reviewed:** 2026-09-05

## Purpose
## Architecture
## Request path
## Failure modes
## Runbook links
## Appendix
\`\`\`

Rules:

- Exactly one H1.
- Architecture section includes at most one primary Mermaid figure.
- Failure modes may add a second small diagram or a table — not both dense.

Example architecture figure:

\`\`\`mermaid
flowchart LR
  Client --> Gateway --> Service
  Service --> Cache
  Service --> DB[(Postgres)]
\`\`\`

## Mermaid Policy for Documentation Teams

Write the policy down so every author ships similar figures:

1. Only core diagram types (flowchart, sequence, state, class).
2. Max ~10 nodes per figure.
3. Every figure introduced by a sentence (“Figure: request path”).
4. No screenshots of Mermaid Live Editor — paste source into the doc.
5. Preview required in PR description (“diagrams checked in live preview”).

Authors new to fences can learn syntax from [How to render Mermaid diagrams in Markdown](/blog/render-mermaid-diagrams-markdown), then apply PDF rules from [render Mermaid diagrams to PDF](/blog/render-mermaid-diagrams-to-pdf).

## Code, Tables, and Math in the Same PDF

Technical PDFs usually mix:

- **Fenced code** with language tags for highlighting
- **Markdown tables** for matrices and SLOs
- **KaTeX** for the occasional formula

Keep code blocks short; move full samples to the repo and link them. Tables should stay within page width — see report formatting tips in [convert Markdown report to PDF](/blog/convert-markdown-report-to-pdf).

## Release Checklist for Doc PDFs

- [ ] Metadata block complete (owner, status, date)
- [ ] One H1; headings nest without skips
- [ ] Every Mermaid fence renders in [live preview](/markdown-live-preview)
- [ ] Flowcharts fit portrait width ([flowchart guide](/blog/render-flowcharts-from-markdown-to-pdf))
- [ ] Code fences have language tags
- [ ] Links to runbooks resolve
- [ ] PDF exported from current \`main\` (or release tag)
- [ ] Filename includes service + date

## Tooling Recommendations

| Need | Tool |
| --- | --- |
| Quick stakeholder PDF | [PDFWritter Markdown to PDF](/markdown-to-pdf) |
| Diagram-heavy export | [Mermaid to PDF](/mermaid-markdown-to-pdf) |
| Edit + preview | [Online editor](/editor) |
| CLI / CI at scale | Pandoc (+ Mermaid filter) — heavier setup |

Browser-first tools win for privacy and speed on single docs; CLI wins when CI must stamp every release automatically. Many teams use both: PDFWritter for drafts, Pandoc for pipelines.

## Frequently Asked Questions

### How do I create technical documentation Markdown to PDF with Mermaid?

Author in Markdown with \`\`\`mermaid fences, validate in live preview, then export with a Mermaid-aware converter such as [PDFWritter](/markdown-to-pdf).

### Should architecture live in Confluence instead?

Wikis drift. Markdown in Git with generated PDFs for distribution keeps review history honest. Publish PDF copies where stakeholders need them.

### How many diagrams per document?

Prefer one primary figure plus optional small supporting diagrams. Dense packs belong in an appendix PDF.

### Can I include sequence diagrams for APIs?

Yes — they print well if you limit participants. See also the Mermaid preview debugging guide: [Mermaid diagrams in Markdown preview](/blog/mermaid-diagrams-in-markdown-preview).

### How do I print complex multi-diagram docs?

Use pagination and sizing tactics from [print Markdown with diagrams](/blog/print-markdown-with-diagrams).

---

> Keep docs in Markdown, diagram with Mermaid, and ship PDFs free with **PDFWritter**.
`;
