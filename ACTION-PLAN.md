# PDFWritter SEO Action Plan

**URL:** https://www.pdfwritter.com/  
**Audit date:** 2026-09-06  
**Overall score:** 72/100 (Good)  
**Goal:** Fix schema policy issues, unlock or clarify international SEO, then improve CTR/E-E-A-T and measure CWV.

---

## 1) Immediate blockers (do this week)

### 1.1 Remove FAQPage JSON-LD sitewide
- **Priority:** Critical  
- **Effort:** Low–Medium  
- **Type:** Quick win  
- **Why:** FAQ rich results are limited to government/healthcare authority sites (since Aug 2023). Commercial FAQPage markup does not earn FAQ rich results and adds Search Console noise.  
- **How:** Delete `FAQPage` script blocks from layout/tool/blog templates. Keep visible `<details>`/FAQ HTML for users and AI answers.  
- **Verify:** Rich Results Test / schema scrape shows no `@type: FAQPage` on home, tools, blogs.

### 1.2 Remove HowTo JSON-LD from tool pages
- **Priority:** High (Warning)  
- **Effort:** Low  
- **Type:** Quick win  
- **Why:** HowTo rich results fully removed (Sep 2023).  
- **How:** Remove HowTo JSON-LD from the 13 tool templates (`/markdown-to-pdf`, `/chatgpt-to-pdf`, `/editor`, etc.). Keep “How it works” steps as HTML.  
- **Verify:** No `@type: HowTo` in page source.

### 1.3 Decide international SEO strategy
- **Priority:** Critical (strategic)  
- **Effort:** Medium–High  
- **Type:** Strategic  

**Option A — Rank in multiple languages (recommended if content is ready)**
1. Set each locale home/tool to `index,follow`.
2. Self-canonical per locale URL (e.g. `/es` → `https://www.pdfwritter.com/es`).
3. Emit full hreflang cluster (en + 10 locales + `x-default`).
4. Add all indexable locale URLs to `sitemap.xml`.
5. Ensure unique translated titles/metas/H1s (already partially present).

**Option B — UI-only locales**
1. Keep `noindex`.
2. Update `llms.txt` / marketing so you do not imply multilingual organic SEO.
3. Avoid generating thin translated tool clones until ready to index.

---

## 2) Quick wins (1–2 weeks)

| # | Action | Impact | Effort |
|---|--------|--------|--------|
| 2.1 | Trim **16** long titles to ~50–60 chars (drop redundant “Free Online”) | CTR | Low |
| 2.2 | Expand `/about`, `/privacy`, `/terms` meta descriptions to 120–155 chars | CTR / trust SERPs | Low |
| 2.3 | Add **Content-Security-Policy** header | Security / trust | Low–Med |
| 2.4 | Add contextual internal links to weak pages (`/md-to-pdf`, underlinked blogs) from hubs + related posts | Crawl / rankings | Low |
| 2.5 | Optionally add explicit robots rules for ClaudeBot / Applebot-Extended (already allowed via `*`) | GEO clarity | Low |
| 2.6 | Add `twitter:site` if brand account exists | Social preview polish | Low |

**Title rewrite pattern (example):**  
`Markdown to PDF Free — Mermaid & Math | PDFWritter` (shorter than current 70-char title).

---

## 3) Strategic improvements (30–60 days)

### 3.1 E-E-A-T & entity graph
- Publish named author bios (or a real “Editorial standards” page) and link from About + blog posts.
- Expand Organization `sameAs` only for real profiles (GitHub org, LinkedIn, X, Product Hunt, etc.) — do **not** create Wikipedia/Wikidata solely for SEO.
- In comparison posts, cite primary sources (Pandoc docs, Mermaid docs, etc.) to raise citation readiness above ~33.

### 3.2 Programmatic SEO hygiene
- Review near-duplicates (`/markdown-to-pdf` vs `/md-to-pdf`): differentiate intent or consolidate with 301.
- Ensure each tool page has unique intro, FAQs (HTML only), and examples — avoid template-thin pages.

### 3.3 Prefer eligible schema only
Keep / improve:
- `Organization`, `WebSite`, `SoftwareApplication` (or `WebApplication`), `BreadcrumbList`, `BlogPosting`, `WebPage` + speakable  
Avoid:
- `FAQPage` (commercial), `HowTo` (deprecated rich results)

### 3.4 Measure and fix Core Web Vitals
- Set `PAGESPEED_API_KEY` and rerun `pagespeed.py` (mobile + desktop).
- Focus on editor homepage: LCP image priority, reduce main-thread blocking, optimize INP for typing/preview.
- Track INP (not FID).

### 3.5 GEO maintenance
- Keep `llms.txt` / `llms-full.txt` excellent (current quality 100/100).
- Align documented locale list with actual indexability after decision in 1.3.

---

## 4) Execution order (checklist)

- [ ] Strip FAQPage JSON-LD everywhere  
- [ ] Strip HowTo JSON-LD on tools  
- [ ] Choose Option A or B for locales; implement  
- [ ] Shorten long titles (16 pages)  
- [ ] Fix short metas (about/privacy/terms)  
- [ ] Add CSP  
- [ ] Internal links to orphans / `/md-to-pdf`  
- [ ] E-E-A-T: authors + citations + real sameAs  
- [ ] CWV measurement + fixes  
- [ ] Re-audit with scripts + GSC coverage  

---

## 5) Success metrics

| Metric | Baseline (this audit) | Target (60 days) |
|--------|------------------------|------------------|
| SEO health score | 72 | ≥80 |
| FAQPage / HowTo presence | 32 / 13 pages | 0 / 0 |
| Indexable locales in sitemap | 0 | 11 (if Option A) or documented UI-only |
| Titles >60 chars | 16 | ≤3 |
| Citation readiness | 33 | ≥55 |
| CWV (mobile) | Unknown | LCP/INP/CLS in “Good” band |

---

## Artifacts

- Detailed findings: `FULL-AUDIT-REPORT.md`
- Interactive dashboard: `SEO-REPORT.html` (auto 85/100 — use with caveats in full report)
- Evidence: `.seo-audit-tmp/`
