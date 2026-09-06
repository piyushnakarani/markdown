# PDFWritter Full Website SEO Audit

**Scope:** `full-site` (homepage + sitemap crawl of 48 English URLs + 10 locale homepages)  
**Primary URL audited:** [https://www.pdfwritter.com/](https://www.pdfwritter.com/) (http://pdfwritter.com/ → 301 → www)  
**Audit date:** 2026-09-06  
**Business type:** SaaS / free browser-based Markdown converter (Software)  
**Overall SEO Health Score:** **72 / 100** — **Good** (borderline Needs Improvement on schema + i18n)  
**Score confidence:** Medium (PageSpeed/CWV unavailable this run)

---

## A) Audit Summary

PDFWritter has a solid English technical foundation: HTTPS + HSTS, clean apex→www redirect, robots/sitemap, unique titles, rich tool/blog IA, strong `llms.txt`, and working JSON-LD for Organization / SoftwareApplication / WebSite. The largest gaps are **ineligible/deprecated schema at scale**, **non-English locales locked behind `noindex`**, and **incomplete measurement of Core Web Vitals**.

### Top 3 issues
1. **FAQPage schema on ~32 commercial pages** (ineligible for FAQ rich results since Aug 2023).
2. **All 10 locale homes are `noindex` + canonicalize to English**, and are absent from sitemap/hreflang clusters.
3. **HowTo schema on 13 tool pages** (rich results removed Sep 2023).

### Top 3 opportunities
1. Remove FAQPage + HowTo JSON-LD; keep visible FAQ/steps for users and AI citation.
2. Launch real international SEO (self-canonical locales + full hreflang + sitemap) or clearly treat locales as UI-only.
3. Tighten titles/meta, deepen E-E-A-T (authors, sameAs, citations), and measure CWV on the editor-heavy homepage.

### Automated dashboard score note
`generate_report.py` produced **85/100** with different category weights and scored hreflang **100** because only `en`/`x-default` tags were validated. This LLM-first report adjusts for sitewide schema policy, locale indexability, and missing CWV (performance treated as incomplete, not “perfect”).

---

## Score Card (skill weights)

| Category | Weight | Score | Justification |
|----------|-------:|------:|---------------|
| Technical SEO | 25% | **78** | Strong crawl/index/security for EN; CSP missing; locale crawl strategy weak |
| Content Quality | 20% | **76** | Solid tool + FAQ + comparison + blog depth; E-E-A-T/citation moderate |
| On-Page SEO | 15% | **72** | Unique titles/metas; 16 titles >60 chars; thin trust-page metas |
| Schema / Structured Data | 15% | **52** | Good org/app/website; FAQPage×32 + HowTo×13 are policy violations |
| Performance (CWV) | 10% | **N/A → 50*** | *Placeholder mid-score; PSI rate-limited — confidence Low |
| Image Optimization | 10% | **90** | Logos use Next/Image + WebP; alts present on sampled homepage images |
| AI Search Readiness (GEO) | 5% | **88** | llms.txt 100/100 + speakable; citation readiness weak (33) |
| **Weighted total** | 100% | **72** | |

\*Performance contribution uses 50 with Low confidence so the overall score is not inflated by missing data.

---

## B) Findings Table

| Area | Severity | Confidence | Finding | Evidence | Fix |
|------|----------|------------|---------|----------|-----|
| Schema | 🔴 Critical | Confirmed | FAQPage JSON-LD on commercial pages | 32/48 sitemap URLs contain FAQPage | Remove FAQPage JSON-LD sitewide; keep HTML FAQ |
| International | 🔴 Critical | Confirmed | Locales noindex + EN canonical | `/es`…`/ru` all `noindex,follow`; canonical=`https://www.pdfwritter.com`; 0 locale URLs in sitemap | Index with self-canonical + hreflang cluster **or** keep UI-only and stop claiming multilingual SEO |
| Schema | ⚠️ Warning | Confirmed | Deprecated HowTo schema on tools | 13 tool pages (e.g. `/markdown-to-pdf`, `/chatgpt-to-pdf`, `/editor`) | Remove HowTo JSON-LD; keep numbered steps in HTML |
| On-Page | ⚠️ Warning | Confirmed | Titles too long on many tools | 16 titles >60 chars (e.g. editor 73, markdown-to-pdf 70) | Trim to ~50–60 chars |
| On-Page | ⚠️ Warning | Confirmed | Thin meta descriptions on trust pages | `/about` 67, `/privacy` 49, `/terms` 42 | Expand to 120–155 unique chars |
| Technical | ⚠️ Warning | Confirmed | Missing CSP header | security_headers score 85; CSP absent | Add CSP in Next/Vercel headers |
| Internal links | ⚠️ Warning | Confirmed | Weak inbound to some blogs/tools | depth-1 crawl: several URLs ≤1 inbound (e.g. `/md-to-pdf`, older blog posts) | Add contextual hub + related-post links |
| Content / E-E-A-T | ⚠️ Warning | Confirmed | Moderate E-E-A-T / low citation readiness | E-E-A-T 64; citation 33; sameAs ≈ Reddit only | Authors, editorial policy, more sameAs, cite comparison claims |
| Robots / GEO | ℹ️ Info | Confirmed | Some AI bots inherit `*` only | ClaudeBot, Applebot-Extended, FacebookBot, Amazonbot not explicit | Optional explicit Allow rules (already allowed via `*`) |
| Performance | ℹ️ Info | Hypothesis | CWV unknown this run | PageSpeed API rate-limited (retried) | Rerun with `PAGESPEED_API_KEY` |
| AI Search | ✅ Pass | Confirmed | Excellent llms.txt | Quality 100/100; `llms-full.txt` present | Maintain; align locale claims with indexability |
| Technical | ✅ Pass | Confirmed | Clean HTTPS / redirect / no broken homepage links | HTTP→HTTPS; apex→www 301; 25/25 healthy links | Keep |
| Social | ✅ Pass | Confirmed | Complete Open Graph + Twitter large image | social_meta 85/100 | Optional: `twitter:site` |
| On-Page | ✅ Pass | Confirmed | Homepage title/meta in range | Title 40 chars; meta 136 chars; `index,follow` | Keep pattern for EN home |

---

## Detailed Findings by Category

### Technical SEO

**Positives**
- Apex `http://pdfwritter.com/` → HTTPS, then `https://pdfwritter.com/` → **301** → `https://www.pdfwritter.com/` (1 hop).
- `robots.txt` allows crawling; only `/api/` disallowed; sitemap declared.
- Sitemap lists **48** English URLs (tools, legal, blog).
- Security headers strong except CSP (HSTS preload, XFO, XCTO, Referrer-Policy, Permissions-Policy).
- Homepage broken-link check: **0 broken**.

**Deficits**
- **International:** Localized homes exist and render translated titles/H1s, but search engines are told not to index them and to treat English as canonical. That burns localization investment for organic search.
- Missing **CSP**.
- Internal-link depth-1 crawl found weak inbound pages (blogs + `/md-to-pdf`).

```text
[Area] Technical / International
Severity: Critical
Confidence: Confirmed
Finding: Non-English locale homes are noindex and canonicalize to English home.
Evidence: Sampled 10 locales (es, fr, de, pt, ar, zh-Hans, ja, ko, bn, ru): robots=noindex,follow; canonical=https://www.pdfwritter.com; sitemap hreflang only en + x-default; 0 locale locs in sitemap.xml.
Impact: No organic rankings in those languages; hreflang incomplete vs product claim of 11 locales.
Fix: Decide strategy — (A) indexable locales with self-referencing canonicals, reciprocal hreflang for all locales + x-default, and sitemap entries; or (B) keep noindex and treat as UI-only (update llms.txt/marketing accordingly).
```

### Content Quality & E-E-A-T

**Positives**
- Homepage ~869 words; readable for educated audience (Flesch 59.5 / grade ~9).
- Clear product differentiation table (“PDFWritter vs other Markdown converters”).
- FAQ answers are substantive (privacy, Mermaid, formats, free tier).
- Blog inventory healthy (~26 posts in sitemap) with comparison/tutorial intent.
- About, Contact, Privacy, Terms linked in footer.

**Deficits**
- Citation readiness **33/100** — claims outnumber sources; almost no trusted external citations.
- E-E-A-T **64/100** — “PDFWritter Editorial Team” is generic; no editorial/corrections policy link detected.
- Organization `sameAs` essentially Reddit only (weak KG graph).

### On-Page SEO

**Positives**
- Unique titles across all 48 sitemap URLs (0 duplicates).
- Consistent H1 + supporting H2 structure on home (Tools, How It Works, Comparison, Blog, FAQ).
- Tool pages include SoftwareApplication + BreadcrumbList (good).

**Deficits**
- **16** titles longer than 60 characters (SERP truncation risk), often with redundant “Free Online / Free” phrasing.
- Trust pages under-describe in meta (`/privacy`, `/terms`, `/about`).
- Some H1s parse with missing spaces (e.g. “ConvertMarkdown to PDF”) — likely CSS-split spans; verify accessible/visible text nodes include spaces for non-JS extractors.

### Schema & Structured Data

**Present (good)**
- `@graph`: Organization, Person (editorial team), WebSite, SoftwareApplication (+ Offer price 0), WebPage + speakable, ItemList (blog), BreadcrumbList on tools, BlogPosting on articles.

**Policy problems**
- **FAQPage** on commercial site — restricted to government/healthcare authorities for rich results (Aug 2023). Detected on homepage, tools, help, and many blogs (**32** pages).
- **HowTo** on **13** tool pages — rich results fully removed (Sep 2023). Do not use for ranking benefit.

Keep visible FAQ/How-it-works copy; strip the ineligible JSON-LD types.

### Performance

- PageSpeed Insights **rate-limited** after retry → **environment limitation**, not a confirmed CWV failure.
- Hypothesis: homepage embeds a full Markdown editor/preview → watch **LCP** (logo/editor chrome) and **INP** (editor interaction). Re-measure with API key.
- Do not use FID (retired).

### Images

- Homepage images are Next.js optimized WebP with meaningful alt text (“PDFWritter — Markdown converter with diagram”).
- Logo appears multiple times (nav/footer) — acceptable; ensure LCP candidate is prioritized (`fetchpriority` / not lazy on above-fold logo).

### AI Search Readiness (GEO / AEO)

**Positives**
- `llms.txt` + `llms-full.txt` with quality **100/100**.
- Speakable CSS selectors on homepage.
- AI crawlers largely allowed (GPTBot, PerplexityBot, Google-Extended, etc.).
- Citability-friendly FAQ prose and comparison table.

**Deficits**
- Low citation/source density for factual/competitive claims.
- Locale claims in llms.txt conflict with `noindex` locale pages.

---

## Site Inventory Snapshot

| Segment | Count / note |
|---------|----------------|
| Sitemap URLs | 48 (EN only) |
| Tool / converter pages | ~20 |
| Blog posts | ~26 |
| Locale home URLs checked | 10 (all noindex) |
| FAQPage schema pages | 32 |
| HowTo schema pages | 13 |
| Broken links (home) | 0 |

---

## Environment Limitations

1. **PageSpeed / CrUX / lab CWV** — Google API rate limit; no LCP/INP/CLS numbers this run.
2. **Visual/Playwright screenshots** — not required for scoring; not run.
3. **Search Console / rankings / traffic** — not connected; no ranking claims made.
4. Auto HTML dashboard performance category may show **0** due to PSI failure — interpret as incomplete, not “zero performance.”

---

## D) Unknowns and Follow-ups

- [ ] Mobile + desktop CWV with `PAGESPEED_API_KEY`
- [ ] Confirm whether locale `noindex` is intentional product decision
- [ ] GSC: coverage for FAQ/HowTo rich-result warnings; www property verification
- [ ] Full bidirectional hreflang verification once locales are indexable
- [ ] Programmatic uniqueness check across near-duplicate tools (`/markdown-to-pdf` vs `/md-to-pdf`)

---

## Artifacts

| Artifact | Path |
|----------|------|
| This report | `FULL-AUDIT-REPORT.md` |
| Action plan | `ACTION-PLAN.md` |
| HTML dashboard | `SEO-REPORT.html` (auto score 85; see caveats above) |
| Evidence cache | `.seo-audit-tmp/` |
| Verified findings | `.seo-audit-tmp/verified_findings.json` |
