# Product Roadmap & Sequence Diagrams

Use this file to test **complex documents** with multiple diagram types.

## Q2 Roadmap

| Feature            | Status      | Priority |
|--------------------|-------------|----------|
| PDF export         | Shipped     | High     |
| HTML export        | Shipped     | High     |
| TXT export         | Shipped     | Medium   |
| Diagram support    | In progress | Medium   |

## User Journey (Mermaid Sequence)

```mermaid
sequenceDiagram
    participant U as User
    participant E as Editor
    participant P as Preview
    participant X as Exporter

    U->>E: Upload markdown file
    E->>P: Send markdown text
    P-->>U: Show live preview
    U->>X: Click Download PDF
    X-->>U: Save document.pdf
```

## Release Timeline (Mermaid Gantt)

```mermaid
gantt
    title MarkdownTools Roadmap
    dateFormat  YYYY-MM-DD
    section Core
    Editor UI           :done,    a1, 2026-01-01, 30d
    PDF Export          :done,    a2, 2026-02-01, 20d
    section Polish
    Theme support       :active,  a3, 2026-03-01, 25d
    Sample test files   :         a4, 2026-04-01, 10d
```

## Entity Relationship (ASCII)

```
  ┌──────────┐       writes        ┌──────────┐
  │  Author  │ ──────────────────► │ Markdown │
  └──────────┘                     └────┬─────┘
                                          │ converts
                    ┌─────────────────────┼─────────────────────┐
                    ▼                     ▼                     ▼
              ┌──────────┐          ┌──────────┐          ┌──────────┐
              │   PDF    │          │   HTML   │          │   TXT    │
              └──────────┘          └──────────┘          └──────────┘
```

## Summary

Ship **v2.0** with:

1. Unified converter editor on all tool pages
2. Upload `.md` from toolbar
3. Side-by-side preview before export

**Bold**, *italic*, and `inline code` should all render correctly in preview and PDF.
