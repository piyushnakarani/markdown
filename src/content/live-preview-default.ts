/** Comprehensive default Markdown for Live Preview */
export const LIVE_PREVIEW_DEFAULT_MARKDOWN = `# Markdown Live Preview

Welcome! Start typing on the left and see the rendered output instantly.

---

## Text Formatting

**Bold Text**

*Italic Text*

***Bold + Italic***

~~Strikethrough~~

<u>Underline (HTML)</u>

Inline \`code\`

==Highlighted text== *(if supported)*

---

## Headings

# Heading 1

## Heading 2

### Heading 3

#### Heading 4

##### Heading 5

###### Heading 6

---

## Paragraph

Markdown makes writing documents simple.

You can create multiple paragraphs by leaving an empty line.

---

## Lists

### Unordered List

- Apple
- Banana
- Orange
  - Nested Item
  - Another Item

### Ordered List

1. First
2. Second
3. Third

### Task List

- [x] Completed Task
- [ ] Pending Task
- [ ] Another Task

---

## Links

[PDFWritter](https://www.pdfwritter.com)

Automatic URL:

https://www.pdfwritter.com/markdown-to-pdf

---

## Images

![PDFWritter logo](/logo.webp)

---

## Blockquotes

> This is a blockquote.
>
> It can contain multiple lines.

---

## Horizontal Rule

---

## Tables

| Feature | Supported |
|---------|-----------|
| Live Preview | ✅ |
| Tables | ✅ |
| Code Blocks | ✅ |
| Mermaid | ✅ |
| HTML | ✅ |

---

## Code

Inline:

\`const name = "Markdown";\`

### JavaScript

\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet("World"));
\`\`\`

### TypeScript

\`\`\`typescript
interface User {
  name: string;
  age: number;
}

const user: User = {
  name: "John",
  age: 30,
};
\`\`\`

### HTML

\`\`\`html
<div class="card">
  <h2>Hello World</h2>
</div>
\`\`\`

### CSS

\`\`\`css
.card {
  padding: 20px;
  border-radius: 8px;
}
\`\`\`

### JSON

\`\`\`json
{
  "name": "John",
  "age": 30
}
\`\`\`

### Bash

\`\`\`bash
npm install
npm run dev
\`\`\`

---

## Mermaid Diagram

\`\`\`mermaid
graph TD
    A[Markdown] --> B[Preview]
    B --> C[Export PDF]
\`\`\`

---

## Footnotes

Markdown supports footnotes.[^1]

[^1]: This is a footnote.

---

## Definition List

Term
: Definition

Markdown
: Lightweight markup language

---

## Emoji

🚀 ✨ 🎉 ❤️ 👍

---

## Keyboard Keys

Press <kbd>Ctrl</kbd> + <kbd>S</kbd> to save.

---

## HTML Support

<details>
<summary>Click to expand</summary>

You can embed HTML directly in Markdown.

</details>

---

## Escaping Characters

\\*This is not italic\\*

\\# This is not a heading

---

## Mixed Example

### Project Status

**Progress:** 75%

- [x] Design
- [x] Development
- [ ] Testing
- [ ] Deployment

Visit https://www.pdfwritter.com for documentation.

> Markdown is simple, readable, and portable.

\`\`\`python
def hello():
    print("Hello Markdown")
\`\`\`

---

Happy writing! 🎉

Your content stays in your browser. Nothing is uploaded.
`;