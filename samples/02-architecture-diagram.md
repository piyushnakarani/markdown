# System Architecture Overview

A sample document with an **ASCII diagram**, code, and structured sections.

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     MarkdownTools                        │
├──────────────┬──────────────────────┬───────────────────┤
│   Browser    │   Conversion Engine  │   Export Layer    │
│   Editor     │   (marked + hljs)    │   PDF / HTML / TXT│
├──────────────┼──────────────────────┼───────────────────┤
│  User Input  │  Markdown → HTML     │  file-saver       │
│  Live Preview│  Client-side only    │  html2pdf.js      │
└──────────────┴──────────────────────┴───────────────────┘
         │                    │                    │
         └────────────────────┴────────────────────┘
                         No server upload
```

## Component Responsibilities

- **Editor panel** — type or paste Markdown with line numbers
- **Preview panel** — real-time HTML rendering
- **Toolbar** — upload `.md`, download, clear

## Sample Code

```javascript
import { convertMarkdownToHtml } from '@/lib/converters';

const html = convertMarkdownToHtml('# Hello **World**');
console.log(html);
```

## Deployment Checklist

- [x] Client-side conversion
- [x] Dark / light theme
- [x] Multi-language support
- [ ] Optional: Mermaid rendering in preview

---

*Generated for testing MarkdownTools converters.*
