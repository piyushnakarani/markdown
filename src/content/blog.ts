export interface BlogPost {
  slug: string;
  titleKey: string;
  excerptKey: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  category: string;
  readTime: number;
  date: string;
  dateModified: string;
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'best-markdown-editors',
    titleKey: 'Best Markdown Editors for Developers',
    excerptKey:
      'Compare the top Markdown editors for developers — from VS Code and Obsidian to free online editors with live preview and export.',
    metaTitle: 'Best Markdown Editors for Developers (2025 Guide) | PDFWritter',
    metaDescription:
      'Discover the best Markdown editors for developers: VS Code, Typora, Obsidian, StackEdit, and free online tools with live preview and PDF export.',
    keywords: ['markdown editor', 'best markdown editor', 'developer tools', 'markdown preview', 'online markdown editor'],
    category: 'Tools',
    readTime: 8,
    date: '2025-01-15',
    dateModified: '2025-06-01',
    content: `# Best Markdown Editors for Developers

Choosing the right **Markdown editor** saves time on README files, documentation, and blog drafts. This guide compares the most popular options for developers in 2025.

## 1. VS Code with Markdown Extensions

Visual Studio Code offers excellent Markdown support with extensions like **Markdown All in One** and built-in preview. Ideal if you already live in VS Code.

## 2. Typora

Typora provides a clean, distraction-free writing experience with real-time preview — great for long-form writing.

## 3. PDFWritter Online Editor

Our [free online Markdown editor](/editor) offers live preview and instant export to **PDF**, **HTML**, and **TXT** — no installation required. Perfect for quick conversions and sharing.

## 4. Obsidian

Obsidian excels at note-taking with bidirectional links and local-first storage — popular for personal knowledge bases.

## 5. StackEdit

StackEdit is a capable browser-based editor with cloud sync options and GitHub integration.

## Which Editor Should You Choose?

| Use case | Recommended editor |
|----------|-------------------|
| Daily coding workflow | VS Code |
| Notes & linking | Obsidian |
| Quick browser editing | PDFWritter |
| Offline WYSIWYG | Typora |

## Conclusion

The best Markdown editor depends on your workflow. For fast browser-based editing and export, try our [free online editor](/editor) or [Markdown to PDF converter](/markdown-to-pdf).`,
  },
  {
    slug: 'convert-markdown-to-pdf',
    titleKey: 'How to Convert Markdown to PDF Online',
    excerptKey:
      'Step-by-step guide to convert Markdown to PDF in your browser — free, private, and no software installation required.',
    metaTitle: 'How to Convert Markdown to PDF Online (Free) | PDFWritter',
    metaDescription:
      'Convert Markdown to PDF online in 3 steps. Free browser-based tool — paste or upload .md files, preview live, and download a formatted PDF instantly.',
    keywords: ['markdown to pdf', 'convert markdown to pdf', 'md to pdf', 'markdown pdf converter', 'online pdf converter'],
    category: 'Tutorial',
    readTime: 5,
    date: '2025-02-01',
    dateModified: '2025-06-01',
    content: `# How to Convert Markdown to PDF Online

Need to turn a **Markdown file into a PDF**? You do not need desktop software. This tutorial shows how to convert Markdown to PDF entirely in your browser.

## Step 1: Open the Markdown to PDF Converter

Visit our [Markdown to PDF converter](/markdown-to-pdf) — it runs 100% client-side so your files never leave your device.

## Step 2: Paste or Upload Your File

Paste Markdown content into the editor or drag and drop a \`.md\` file. The live preview updates as you type.

## Step 3: Download Your PDF

Click **Download PDF**. Your formatted document saves instantly — no email, no account, no waiting.

## Why Use PDFWritter for PDF Export?

- **100% client-side** — private and secure
- **Free forever** — no limits or subscriptions
- **Professional output** — headings, code blocks, tables, and diagrams
- **Live preview** — see exactly what you export

## Tips for Better PDF Results

1. Use a single H1 and logical H2/H3 hierarchy
2. Add horizontal rules between major sections
3. Use fenced code blocks for technical content
4. Keep tables simple for cleaner page breaks

## Related Tools

- [Online Markdown editor](/editor) — write and preview before export
- [Markdown to HTML](/markdown-to-html) — publish on the web
- [Markdown to TXT](/markdown-to-txt) — plain-text export`,
  },
  {
    slug: 'markdown-vs-html',
    titleKey: 'Markdown vs HTML Explained',
    excerptKey:
      'Learn when to use Markdown vs HTML for documentation, blogs, and web content — with a comparison table and conversion tips.',
    metaTitle: 'Markdown vs HTML: Differences & When to Use Each | PDFWritter',
    metaDescription:
      'Markdown vs HTML explained for developers. Compare readability, flexibility, and use cases — plus free tools to convert Markdown to semantic HTML.',
    keywords: ['markdown vs html', 'markdown to html', 'markdown comparison', 'semantic html', 'documentation formats'],
    category: 'Guide',
    readTime: 6,
    date: '2025-02-15',
    dateModified: '2025-06-01',
    content: `# Markdown vs HTML Explained

Developers often ask: should I write in **Markdown** or **HTML**? Both have a place — this guide explains the trade-offs.

## What is Markdown?

Markdown is a lightweight markup language designed for readable plain-text source. It is ideal for README files, docs, and blogs.

## What is HTML?

HTML (HyperText Markup Language) is the standard for web pages. It offers full layout control, accessibility attributes, and interactivity.

## Markdown vs HTML at a Glance

| Feature | Markdown | HTML |
|---------|----------|------|
| Readability | High | Lower |
| Learning curve | Easy | Moderate |
| Flexibility | Limited | Full |
| Best for | Docs, README, notes | Web apps, complex layouts |

## When to Use Markdown

- GitHub README and wikis
- Technical documentation
- Blog posts and newsletters
- Meeting notes and specs

## When to Use HTML

- Custom web layouts and components
- Forms and interactive UI
- Email templates requiring precise styling

## Convert Between Markdown and HTML

Use our [Markdown to HTML converter](/markdown-to-html) to generate clean, semantic HTML from Markdown — ready for blogs, static sites, or CMS paste-in.`,
  },
  {
    slug: 'beginner-guide-markdown',
    titleKey: 'Beginner Guide to Markdown',
    excerptKey:
      'Learn Markdown syntax from scratch: headings, lists, links, code blocks, and tables — with examples you can try in our free editor.',
    metaTitle: 'Beginner Guide to Markdown Syntax (2025) | PDFWritter',
    metaDescription:
      'Complete beginner guide to Markdown syntax. Learn headings, bold, lists, links, code blocks, and tables — then practice free in our online editor.',
    keywords: ['markdown guide', 'markdown syntax', 'learn markdown', 'markdown for beginners', 'markdown cheat sheet'],
    category: 'Tutorial',
    readTime: 10,
    date: '2025-03-01',
    dateModified: '2025-06-01',
    content: `# Beginner Guide to Markdown

**Markdown** lets you format text without leaving your keyboard. This beginner guide covers every essential syntax you need.

## What is Markdown?

Markdown converts plain text to HTML using simple characters like \`#\`, \`*\`, and \`-\`. It is the standard for README files and developer docs.

## Headings

Use \`#\` for headings — one \`#\` for H1, two for H2, and so on.

## Emphasis

- **Bold** with \`**double asterisks**\`
- *Italic* with \`*single asterisks*\`
- ~~Strikethrough~~ with \`~~tildes~~\`

## Lists

Unordered lists use \`-\` or \`*\`. Ordered lists use \`1.\`, \`2.\`, etc.

## Links and Images

\`[Link text](https://example.com)\` creates a link.  
\`![Alt text](image-url)\` embeds an image — always include descriptive alt text for accessibility and SEO.

## Code

Inline code uses backticks: \`npm install\`. Fenced blocks use triple backticks with an optional language tag.

## Tables

Tables use pipes and dashes — great for comparisons and reference data.

## Practice Markdown Free

Open our [online Markdown editor](/editor) to write, preview, and export your first document to [PDF](/markdown-to-pdf) or [HTML](/markdown-to-html).`,
  },
  {
    slug: 'documentation-tools-developers',
    titleKey: 'Best Documentation Tools for Developers',
    excerptKey:
      'Compare the best documentation tools for developers — Markdown on GitHub, Docusaurus, MkDocs, GitBook, and free export options.',
    metaTitle: 'Best Documentation Tools for Developers | PDFWritter',
    metaDescription:
      'Explore top documentation tools for developers: Markdown + GitHub, Docusaurus, MkDocs, GitBook, and free Markdown export to PDF and HTML.',
    keywords: ['documentation tools', 'developer documentation', 'technical writing', 'markdown documentation', 'docs as code'],
    category: 'Tools',
    readTime: 7,
    date: '2025-03-15',
    dateModified: '2025-06-01',
    content: `# Best Documentation Tools for Developers

Great **developer documentation** reduces support tickets and speeds onboarding. Here are the tools teams use most in 2025.

## Why Documentation Matters

Clear docs improve developer experience (DX), reduce repeated questions, and make open-source projects easier to adopt.

## Top Documentation Tools

### 1. Markdown + GitHub

Write docs in Markdown, version with Git, and publish via GitHub Pages or README files. Simple and universal.

### 2. Docusaurus

Meta's React-based static site generator — ideal for product docs with search, versioning, and i18n.

### 3. GitBook

Visual editor with collaboration features — good for teams that prefer a GUI over raw Markdown.

### 4. MkDocs

Python-based static generator — fast builds and Material theme support.

### 5. PDFWritter

Convert Markdown docs to **PDF** for stakeholders or **HTML** for quick publishing. Try the [free converter hub](/free-markdown-converter).

## Documentation Best Practices

1. Write for your audience's skill level
2. Include runnable code examples
3. Keep docs updated with each release
4. Use consistent heading structure
5. Export PDFs for offline sharing when needed`,
  },
  {
    slug: 'markdown-tutorial-beginners',
    titleKey: 'Markdown Tutorial for Beginners',
    excerptKey:
      'Hands-on Markdown tutorial with exercises for headings, formatting, lists, code, tables, and links — practice free in your browser.',
    metaTitle: 'Markdown Tutorial for Beginners (Hands-On) | PDFWritter',
    metaDescription:
      'Hands-on Markdown tutorial for beginners. Practice headings, bold, lists, code blocks, and tables — then export to PDF with our free online tools.',
    keywords: ['markdown tutorial', 'learn markdown', 'markdown exercises', 'markdown practice', 'markdown for beginners'],
    category: 'Tutorial',
    readTime: 12,
    date: '2025-04-01',
    dateModified: '2025-06-01',
    content: `# Markdown Tutorial for Beginners

Learn Markdown by doing. Complete these short exercises, then paste your work into our [online editor](/editor).

## Exercise 1: Headings

Create a document with H1, H2, and H3 headings for a project README.

## Exercise 2: Text Formatting

Combine **bold**, *italic*, and ~~strikethrough~~ in one paragraph.

## Exercise 3: Lists

Build an unordered shopping list and an ordered step-by-step guide.

## Exercise 4: Code Blocks

\`\`\`javascript
function hello(name) {
  console.log(\`Hello, \${name}!\`);
}
hello('Markdown');
\`\`\`

## Exercise 5: Tables

| Tool | Format | Use case |
|------|--------|----------|
| PDFWritter | PDF | Sharing reports |
| PDFWritter | HTML | Web publishing |

## Exercise 6: Internal Links

Link to [PDFWritter home](/), the [editor](/editor), and [PDF converter](/markdown-to-pdf).

## Next Steps

- Practice daily in our [free editor](/editor)
- Convert your first file to [PDF](/markdown-to-pdf)
- Read our [beginner syntax guide](/blog/beginner-guide-markdown)`,
  },
  {
    slug: 'free-markdown-tools',
    titleKey: 'Best Free Markdown Tools Online',
    excerptKey:
      'Curated list of the best free online Markdown tools for editing, converting to PDF/HTML, and publishing documentation.',
    metaTitle: 'Best Free Markdown Tools Online (2025 List) | PDFWritter',
    metaDescription:
      'Best free Markdown tools online: editors, PDF/HTML converters, and doc generators. Compare PDFWritter, Dillinger, StackEdit, Pandoc, and more.',
    keywords: ['free markdown tools', 'online markdown converter', 'markdown tools online', 'free md to pdf', 'markdown utilities'],
    category: 'Tools',
    readTime: 6,
    date: '2025-04-15',
    dateModified: '2025-06-01',
    content: `# Best Free Markdown Tools Online

Looking for **free Markdown tools** that work in the browser? This curated list covers editors, converters, and doc platforms.

## Free Markdown Editors

1. **PDFWritter Editor** — Live preview + PDF/HTML/TXT export ([Try it](/editor))
2. **Dillinger** — Cloud-enabled browser editor
3. **StackEdit** — Full-featured with sync options

## Free Markdown Converters

1. **PDFWritter** — [MD to PDF](/markdown-to-pdf), [HTML](/markdown-to-html), [TXT](/markdown-to-txt) in one place
2. **Pandoc** — Powerful CLI converter for power users
3. **Grip** — GitHub-flavored Markdown preview

## Documentation Generators

- **Docusaurus** — React docs sites
- **VuePress** — Vue-powered documentation
- **MkDocs** — Python static docs

## Why Teams Choose PDFWritter

- 100% free with no usage limits
- Client-side processing — your content stays private
- 12 languages supported
- No sign-up required`,
  },
  {
    slug: 'developers-use-markdown',
    titleKey: 'How Developers Use Markdown Efficiently',
    excerptKey:
      'Productivity workflows for developers using Markdown: README files, PR templates, docs, blog posts, and fast export to PDF.',
    metaTitle: 'How Developers Use Markdown Efficiently | PDFWritter',
    metaDescription:
      'Learn how developers use Markdown for READMEs, PR descriptions, docs, and blogs. Productivity tips plus free export to PDF and HTML.',
    keywords: ['markdown workflow', 'developer productivity', 'markdown readme', 'technical writing', 'markdown tips'],
    category: 'Productivity',
    readTime: 7,
    date: '2025-05-01',
    dateModified: '2025-06-01',
    content: `# How Developers Use Markdown Efficiently

**Markdown** is more than README syntax — it is a daily productivity tool across the software lifecycle.

## 1. README Files

Every repo needs a clear README with install steps, usage, and license info. Markdown keeps it version-controlled alongside code.

## 2. Pull Request Descriptions

Structured PR templates in Markdown improve review quality and reduce back-and-forth.

## 3. Technical Documentation

API references, ADRs, runbooks, and onboarding guides are faster to write in Markdown than HTML.

## 4. Blog Posts & Changelogs

Static site generators (Next.js, Hugo, Jekyll) consume Markdown — write once, publish everywhere.

## 5. Notes & Knowledge Bases

` + "Tools like Obsidian and Notion use Markdown under the hood for portable, future-proof notes." + `

## Productivity Tips

1. Learn editor shortcuts for bold, links, and code fences
2. Keep reusable templates for PRs and RFCs
3. Preview before publishing — use our [online editor](/editor)
4. Export to [PDF](/markdown-to-pdf) when sharing with non-technical stakeholders
5. Batch-convert docs with our [free converter tools](/free-markdown-converter)`,
  },
  {
    slug: 'render-mermaid-diagrams-markdown',
    titleKey: 'How to Render Mermaid Diagrams in Markdown',
    excerptKey:
      'Learn how to embed flowcharts, sequence diagrams, and class diagrams in your Markdown documents using Mermaid.js syntax.',
    metaTitle: 'How to Render Mermaid Diagrams in Markdown | PDFWritter',
    metaDescription:
      'Master Mermaid.js diagrams in Markdown. Step-by-step guide to writing flowcharts, sequence diagrams, and Gantt charts with live online rendering and PDF export.',
    keywords: ['mermaid diagrams', 'markdown mermaid', 'flowcharts in markdown', 'mermaid js syntax', 'render diagrams'],
    category: 'Tutorial',
    readTime: 9,
    date: '2025-05-15',
    dateModified: '2025-06-01',
    content: `# How to Render Mermaid Diagrams in Markdown

Visualizing complex flows with diagrams keeps documentation clear. With **Mermaid.js**, you can render diagrams directly inside your Markdown files using simple text.

## 1. Flowchart Example

To create a flowchart, use a \`mermaid\` code block. Specify the layout direction (\`TD\` for Top-Down, \`LR\` for Left-to-Right) and declare nodes with connections.

\`\`\`mermaid
graph TD
    A[Start] --> B(Write Markdown)
    B --> C{Need Diagram?}
    C -- Yes --> D[Use Mermaid.js]
    C -- No --> E[Standard Text]
    D --> F[Export PDF]
    E --> F
\`\`\`

## 2. Sequence Diagram Example

Sequence diagrams represent interactions between different actors or systems over time.

\`\`\`mermaid
sequenceDiagram
    participant User
    participant Browser
    participant API
    User->>Browser: Click Export PDF
    Browser->>API: Send Markdown payload
    API-->>Browser: Return raw PDF Blob
    Browser->>User: Trigger download file
\`\`\`

## 3. Gantt Chart Example

Use Gantt charts inside your Markdown project files to track milestones, tasks, and schedules.

\`\`\`mermaid
gantt
    title Documentation Project Roadmap
    dateFormat  YYYY-MM-DD
    section Planning
    Write outline           :a1, 2025-06-01, 3d
    Review with team        :after a1  , 2d
    section Writing
    Draft contents          :2025-06-06  , 5d
    Render diagrams         :2025-06-09  , 3d
\`\`\`

## Why Use Text-Based Diagrams?

- **Version Control**: Unlike image files, text diagrams show clear diffs in Git.
- **Easy Updates**: Change a label or path in text in seconds rather than opening drawing software.
- **Responsive Styling**: Diagrams adjust automatically to document styling (like light/dark modes).

## Rendering Mermaid Diagrams Instantly

Our [online Markdown editor](/editor) and [Markdown to PDF converter](/markdown-to-pdf) support full Mermaid.js parsing. Type your code block and preview the rendered diagram live.`,
  },
  {
    slug: 'github-readme-best-practices',
    titleKey: 'GitHub README Best Practices for Developers',
    excerptKey:
      'A complete guide to writing high-impact GitHub README files that attract users and contributors to your open-source projects.',
    metaTitle: 'GitHub README Best Practices & Templates | PDFWritter',
    metaDescription:
      'Learn how to write a professional GitHub README file. Complete guide covering structure, badges, installation guides, tables, and PDF documentation exports.',
    keywords: ['github readme', 'best readme template', 'open source documentation', 'markdown readme guide', 'developer experience'],
    category: 'Guide',
    readTime: 7,
    date: '2025-06-01',
    dateModified: '2025-06-01',
    content: `# GitHub README Best Practices for Developers

A repository's **README** file is its front door. A clear, well-structured README drives open-source adoption, helps team members onboard, and serves as your project's main documentation.

## The Ideal README Structure

We recommend organizing your project documentation in this order:

1. **Header**: Project name, tagline, and badges (build status, version, license)
2. **Visual Preview**: A screenshot, GIF, or [live editor demo](/editor) showing the product in action
3. **Features**: A concise list of core features
4. **Getting Started**: Installation guides and quickstart commands
5. **Usage & Configuration**: Code snippets showing how to import, call, or configure the project
6. **Diagrams**: A [Mermaid flowchart](/blog/render-mermaid-diagrams-markdown) showing architecture or page layouts
7. **Contributing & License**: Clear guide on how to help out and the project's license

## Badges & Status Indicators

Use badges (e.g., from Shields.io) at the top of your README to provide immediate credibility:
- Build pipeline status (passing/failing)
- Current version (npm, crates.io, Docker Hub)
- Test coverage percentage
- License type (MIT, Apache 2.0)

## Code Formatting

Always specify the programming language on your fenced code blocks to trigger correct syntax highlighting. Use clear block formats for:
- Terminal installation commands (\`bash\`)
- Code examples (\`javascript\`, \`python\`, \`rust\`)
- Config files (\`json\`, \`yaml\`)

## Presenting Documentation Offline

Sometimes stakeholders or enterprise clients require documentation offline. You can copy your README and convert it to a beautifully formatted document instantly using our [Markdown to PDF converter](/markdown-to-pdf).`,
  },
  {
    slug: 'convert-markdown-to-html-online',
    titleKey: 'How to Convert Markdown to HTML: 3 Simple Ways',
    excerptKey:
      'Discover how to convert Markdown to clean, semantic HTML for your website, blog, or CMS using online tools and command line utilities.',
    metaTitle: 'How to Convert Markdown to HTML: 3 Simple Ways | PDFWritter',
    metaDescription:
      'Convert Markdown to semantic HTML. Compare online web converters, CLI utilities like Pandoc, and custom scripts. Clean code with syntax highlighting.',
    keywords: ['markdown to html', 'convert md to html', 'online md to html', 'semantic html generator', 'pandoc html'],
    category: 'Tutorial',
    readTime: 6,
    date: '2025-06-10',
    dateModified: '2025-06-10',
    content: `# How to Convert Markdown to HTML: 3 Simple Ways

Markdown is excellent for writing, but web browsers consume **HTML**. Here are three simple ways to convert your Markdown files to clean, semantic HTML code.

## 1. Using the PDFWritter Online Converter (Easiest)

For quick, zero-config exports, use our browser tool:
1. Open the [Markdown to HTML converter](/markdown-to-html)
2. Type or paste your Markdown in the editor
3. The right pane shows the real-time HTML output
4. Click **Download HTML** to save the file, or click **Copy** to grab raw code for your CMS

## 2. Using Command Line Utilities (Pandoc)

If you need to batch-convert files locally or integrate conversion into a build pipeline, **Pandoc** is the developer standard.

Install Pandoc (on macOS via Homebrew):
\`\`\`bash
brew install pandoc
\`\`\`

Convert a file:
\`\`\`bash
pandoc input.md -o output.html
\`\`\`

## 3. Programmatic Conversion (JavaScript/Node.js)

To convert Markdown dynamically inside a web application, use a library like **marked** or **markdown-it**.

\`\`\`javascript
import { marked } from 'marked';

const markdown = '# Hello World\\nThis is *italic* text.';
const html = marked.parse(markdown);

console.log(html);
// Output: <h1>Hello World</h1><p>This is <em>italic</em> text.</p>
\`\`\`

## Best Practices for HTML Output

- **Use Semantic Tags**: Ensure headers map to \`<h1>\`, \`<h2>\`, lists to \`<ul>\`, and code to \`<pre><code>\`
- **Sanitize Input**: If processing user-provided Markdown, always pass it through a sanitizer to avoid XSS security risks
- **Styling**: Standard HTML output is unstyled. Pair it with a CSS reset or utility class system (like Tailwind's typography plugin) for clean reading.`,
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  const current = getBlogPost(slug);
  if (!current) return blogPosts.slice(0, limit);

  const sameCategory = blogPosts.filter((p) => p.slug !== slug && p.category === current.category);
  const others = blogPosts.filter((p) => p.slug !== slug && p.category !== current.category);
  return [...sameCategory, ...others].slice(0, limit);
}

export function getSortedBlogPosts(): BlogPost[] {
  return [...blogPosts].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );
}

export function getAdjacentPosts(slug: string): {
  prev: BlogPost | null;
  next: BlogPost | null;
} {
  const sorted = getSortedBlogPosts();
  const index = sorted.findIndex((p) => p.slug === slug);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: index > 0 ? sorted[index - 1] : null,
    next: index < sorted.length - 1 ? sorted[index + 1] : null,
  };
}

export const BLOG_CATEGORY_STYLES: Record<
  string,
  { text: string; bg: string; border: string; accent: string }
> = {
  Tools: {
    text: '#ef4444',
    bg: 'rgba(239, 68, 68, 0.08)',
    border: 'rgba(239, 68, 68, 0.15)',
    accent: '#ef4444',
  },
  Tutorial: {
    text: '#f59e0b',
    bg: 'rgba(245, 158, 11, 0.08)',
    border: 'rgba(245, 158, 11, 0.15)',
    accent: '#f59e0b',
  },
  Guide: {
    text: '#3b82f6',
    bg: 'rgba(59, 130, 246, 0.08)',
    border: 'rgba(59, 130, 246, 0.15)',
    accent: '#3b82f6',
  },
  Productivity: {
    text: '#10b981',
    bg: 'rgba(16, 185, 129, 0.08)',
    border: 'rgba(16, 185, 129, 0.15)',
    accent: '#10b981',
  },
};
