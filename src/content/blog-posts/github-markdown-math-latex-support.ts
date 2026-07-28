export const content = `# How to Use LaTeX and Math Expressions in GitHub Flavored Markdown

GitHub Flavored Markdown (GFM) has long been the standard for developers writing READMEs, issues, and pull requests. However, for a long time, researchers, data scientists, and engineers struggled to share mathematical formulas natively on GitHub. 

Fortunately, GitHub now officially supports rendering **LaTeX** and **Math** expressions directly within Markdown. 

In this post, we'll cover how to write math in GitHub Flavored Markdown, how the native support works, and how you can export your GitHub Markdown files to polished PDFs using PDFWritter.

---

## Math Support in GitHub: How it Works

GitHub uses **MathJax** under the hood to render LaTeX expressions safely in the browser. This means you can write standard math syntax in your \`.md\` files and GitHub will automatically render them as crisp, scalable SVG images when viewing a repository.

### Writing Inline Math

To include an equation in the middle of a sentence, wrap your LaTeX expression in single dollar signs: \`$ ... $\`.

**Example:**
\`\`\`markdown
The Pythagorean theorem is $a^2 + b^2 = c^2$, which relates the sides of a right triangle.
\`\`\`

When viewed on GitHub, the math will be rendered smoothly in line with your text.

### Writing Block Equations

For larger, more complex equations that need their own line, use double dollar signs: \`$$ ... $$\`.

**Example:**
\`\`\`markdown
Here is the definition of a derivative:
$$
f'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}
$$
\`\`\`

GitHub will center this equation in a dedicated block.

---

## Best Practices for Math in GitHub Markdown

1. **Avoid spaces around inline delimiters:** 
   Write \`$E=mc^2$\` rather than \`$ E=mc^2 $\`. GitHub's parser can occasionally fail to recognize inline math if there are spaces right after the opening \`$\` or before the closing \`$\`.
2. **Escaping dollar signs:** 
   If you need to write actual currency amounts (like $10 and $20) in a document that also contains math, you might accidentally trigger math rendering. Escape them with a backslash: \`\\$10 and \\$20\`.
3. **Complex formatting:**
   While GitHub supports most standard LaTeX commands, very complex macros or obscure packages may not render. Stick to standard MathJax-supported syntax.

---

## Exporting GitHub Markdown to PDF

While GitHub renders your math beautifully in the browser, sharing that documentation offline can be a hassle. Trying to "Print to PDF" from a GitHub page often results in broken layouts, clipped equations, and unwanted UI elements (like the repository sidebar).

This is where **PDFWritter** bridges the gap.

Our [Markdown to PDF converter](/markdown-to-pdf) is fully compatible with GitHub Flavored Markdown, including native support for math expressions via KaTeX. 

### How to export your GitHub README to PDF:

1. Copy the raw Markdown from your GitHub repository.
2. Paste it into the [PDFWritter Online Editor](/editor).
3. Check the [Live Preview](/markdown-live-preview) to ensure all your LaTeX equations render perfectly.
4. Click **Export PDF**. 

The resulting document will maintain all formatting, syntax highlighting for code blocks, and crisp, vector-based math equations. 

---

## Beyond Math: Mermaid Diagrams

If you are documenting complex systems, math equations are often accompanied by architecture diagrams or flowcharts. GitHub also supports Mermaid diagrams, and so does PDFWritter.

Check out our guide on [Rendering Mermaid Diagrams in Markdown](/blog/render-mermaid-diagrams-markdown) to learn how to add flowcharts to your README and export them to PDF flawlessly.

---

## Ready to write?

Writing technical documentation no longer requires juggling multiple word processors or complex LaTeX environments. With GitHub's math support and PDFWritter's seamless export tools, you can manage your documentation entirely in plain text.

Try pasting your GitHub math expressions into our [Markdown Converter](/markdown-to-pdf) today!

---

## Related Tools & Guides

- [Online Markdown Editor](/editor) — split-pane editor with math support
- [How to make a beautiful PDF from Markdown](/blog/make-beautiful-pdf-from-markdown) — styling tips for reports
- [Markdown Math Rendering Guide](/blog/markdown-latex-math-katex-rendering-guide) — deep dive into LaTeX vs KaTeX
`;
