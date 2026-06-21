# PDF Render API

Standalone Markdown conversion API powered by Playwright Chromium.

## Local Development

Install dependencies:

```bash
npm install
```

Start the API:

```bash
npm run dev
```

The API listens on `http://localhost:8080` by default.

`npm run dev` uses `nodemon` so backend changes restart the API automatically. Use `npm start` for a plain production-style Node process.

## Endpoints

- `GET /health` returns `{ "ok": true }`.
- `POST /convert` accepts JSON and returns `application/pdf`, `text/html`, or `text/plain`.

Example request body:

```json
{
  "markdown": "# Hello\n\nThis becomes a PDF.",
  "filename": "document.pdf",
  "format": "pdf"
}
```

For `format: "pdf"`, you can also send pre-rendered HTML:

```json
{
  "html": "<h1>Already rendered chart output</h1>",
  "filename": "document.pdf",
  "format": "pdf"
}
```

Supported `format` values are `pdf`, `html`, and `txt`. If omitted, the API returns PDF.

## Environment Variables

- `PORT`: API port. Defaults to `8080`.
- `JSON_LIMIT`: maximum JSON body size. Defaults to `15mb`.
- `ALLOWED_ORIGINS`: comma-separated list of allowed browser origins. Defaults to `http://localhost:3000,http://127.0.0.1:3000`.
- `RATE_LIMIT_PER_MINUTE`: max requests per IP per minute. Defaults to `30`.
- `PLAYWRIGHT_CHROME_CHANNEL`: Chrome channel for local rendering. Defaults to `chrome`. Set to `bundled` to use Playwright's downloaded Chromium.
- `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH`: explicit Chrome/Chromium executable path. Overrides `PLAYWRIGHT_CHROME_CHANNEL`.

For production, set `ALLOWED_ORIGINS` to the deployed Next.js domain.

## Security Notes

- Markdown output is sanitized before rendering.
- Remote images are blocked; only data URL images are allowed in rendered content.
- Chromium blocks outbound page requests while generating output.
- The API does not store uploaded Markdown or generated files.
- CORS is restricted to `ALLOWED_ORIGINS`.
- Helmet security headers and per-IP rate limiting are enabled.
