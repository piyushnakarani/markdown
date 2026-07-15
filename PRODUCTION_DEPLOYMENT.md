# Production Deployment Guide — PDFWritter

This document lists all steps and configurations required to deploy and maintain **PDFWritter** in a production environment.

---

## 🚀 1. Production Build & Execution

To compile and launch the optimized build, run the following commands in the project root:

```bash
# 1. Clean install production-locked dependencies
npm ci

# 2. Build the application for production (runs compiler and optimizes pages)
npm run build

# 3. Start the production server
npm run start
```

---

## ⚙️ 2. Environment Variables

Configure the following environment variables in your hosting provider's dashboard or in a `.env.production` file:

| Variable | Description | Recommendation |
| :--- | :--- | :--- |
| `NODE_ENV` | Sets the application environment. | `production` |
| `NEXT_PUBLIC_APP_URL` | Used to build absolute canonical and hreflang alternate tags for SEO. | `https://pdfwritter.com` |

---

## 📦 3. Hosting Options

### Option A: Vercel (Recommended)
Next.js works natively on Vercel with zero configuration:
1. Connect your Git repository to Vercel.
2. Select **Next.js** as the framework preset.
3. Add `NEXT_PUBLIC_APP_URL` as an Environment Variable.
4. Deploy.

### Option B: Node.js VPS / Docker
If deploying to a custom server (DigitalOcean, AWS, GCP, etc.):
1. Enable Next.js **Standalone Build** (optional but highly recommended for Docker size optimization) by adding `output: 'standalone'` in `next.config.ts`.
2. Package the app using a standard Node.js Docker container:
   ```dockerfile
   FROM node:20-alpine AS base
   # Build steps...
   ```
3. Ensure port `3000` is exposed and reverse-proxied using Nginx or Caddy with SSL enabled.

---

## 🔍 4. SEO & Verification Checklist

Before opening the site to the public, verify these resources:

- [ ] **robots.txt**: Access `https://pdfwritter.com/robots.txt` and verify it serves the static file showing allowed/disallowed paths and pointing to the sitemap.
- [ ] **sitemap.xml**: Access `https://pdfwritter.com/sitemap.xml` and verify it serves the XML listing all static pages and blog posts across all **11 active languages**.
- [ ] **Canonical URL**: Inspect `https://pdfwritter.com/` and confirm that `<link rel="canonical">` points to the absolute production URL.
- [ ] **Hreflangs**: Confirm that headers render `<link rel="alternate" hreflang="..." href="..." />` for all 11 supported locales, alongside the `x-default` fallback.
- [ ] **Multilingual Switcher**: Verify that selecting Deutsch (`de`) or Português (`pt`) dynamically updates page metadata and switches routing cleanly.
