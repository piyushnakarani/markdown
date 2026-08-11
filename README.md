# PDFWritter (pdfwritter.com)

Free **Markdown converter with diagram** support. Convert Markdown with Mermaid flowcharts and charts to PDF, HTML, TXT, and DOCX.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Conversion Backend

Markdown exports can use the separate Chromium renderer in `pdf-render-api` for backend PDF generation.

```bash
cd pdf-render-api
npm install
npm run dev
```

Create `.env.local` in the project root:

```bash
NEXT_PUBLIC_CONVERSION_API_URL=http://localhost:8080/convert
```

Restart the Next.js dev server after changing `.env.local`.

## Export Strategy

- PDF uses backend Chromium rendering when `NEXT_PUBLIC_CONVERSION_API_URL` is set
- HTML and TXT export locally in-browser
- PDF falls back to browser conversion if the API is unavailable
- Mermaid diagrams are rendered client-side before backend PDF export when possible

## Production

```bash
npm run build
npm run start
```

Site: [https://pdfwritter.com](https://pdfwritter.com)
