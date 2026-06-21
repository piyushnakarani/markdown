import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import {
  closeBrowser,
  renderHtmlPdf,
  renderMarkdownHtml,
  renderMarkdownPdf,
  renderMarkdownTxt,
  warmBrowser,
} from './renderer.js';

const app = express();
const port = Number(process.env.PORT || 8080);
const jsonLimit = process.env.JSON_LIMIT || '15mb';

const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'http://localhost:3000,http://127.0.0.1:3000')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

const contentTypes = {
  pdf: 'application/pdf',
  html: 'text/html; charset=utf-8',
  txt: 'text/plain; charset=utf-8',
};

function normalizeFormat(value) {
  return ['pdf', 'html', 'txt'].includes(value) ? value : 'pdf';
}

function sanitizeFilename(value, format) {
  const extension = `.${format}`;
  const base = String(value || `document${extension}`)
    .replace(/[/\\?%*:|"<>]/g, '-')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\.(pdf|html|txt)$/i, '')
    .slice(0, 120);

  return `${base || 'document'}${extension}`;
}

app.disable('x-powered-by');

app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' },
}));

app.use(cors({
  origin(origin, callback) {
    const isLocal = origin && (
      origin.startsWith('http://localhost:') ||
      origin.startsWith('http://127.0.0.1:') ||
      origin === 'http://localhost' ||
      origin === 'http://127.0.0.1'
    );
    if (!origin || allowedOrigins.includes('*') || allowedOrigins.includes(origin) || isLocal) {
      callback(null, true);
      return;
    }

    callback(new Error(`Origin not allowed: ${origin}`));
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));

app.use(rateLimit({
  windowMs: 60 * 1000,
  limit: Number(process.env.RATE_LIMIT_PER_MINUTE || 30),
  standardHeaders: true,
  legacyHeaders: false,
}));

app.use(express.json({ limit: jsonLimit }));

app.get('/health', (_req, res) => {
  res.json({ ok: true });
});

app.post('/convert', async (req, res, next) => {
  try {
    const { markdown, html, filename, format: requestedFormat } = req.body || {};

    const format = normalizeFormat(requestedFormat);
    const hasMarkdown = typeof markdown === 'string' && markdown.trim().length > 0;
    const hasHtml = typeof html === 'string' && html.trim().length > 0;

    if (format === 'pdf' && !hasMarkdown && !hasHtml) {
      res.status(400).json({ error: 'A non-empty markdown or html string is required for PDF conversion.' });
      return;
    }

    if (format !== 'pdf' && !hasMarkdown) {
      res.status(400).json({ error: 'A non-empty markdown string is required for HTML/TXT conversion.' });
      return;
    }

    const safeFilename = sanitizeFilename(filename, format);
    const title = safeFilename.replace(/\.(pdf|html|txt)$/i, '');
    const output =
      format === 'pdf'
        ? hasHtml
          ? await renderHtmlPdf({ html: html.trim(), title })
          : await renderMarkdownPdf({ markdown, title })
        : format === 'html'
          ? await renderMarkdownHtml({ markdown, title })
          : renderMarkdownTxt({ markdown });

    res.setHeader('Content-Type', contentTypes[format]);
    res.setHeader('Content-Disposition', `attachment; filename="${safeFilename}"`);
    res.setHeader('Cache-Control', 'no-store');
    res.send(output);
  } catch (error) {
    next(error);
  }
});

app.use((error, _req, res, next) => {
  void next;
  console.error(error);
  res.status(500).json({ error: 'Conversion failed.' });
});

const server = app.listen(port, () => {
  console.log(`Conversion render API listening on http://localhost:${port}`);
  warmBrowser().catch((error) => {
    console.warn('Browser warm-up failed; first PDF request may be slower.', error);
  });
});

async function shutdown() {
  server.close(async () => {
    await closeBrowser();
    process.exit(0);
  });
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
