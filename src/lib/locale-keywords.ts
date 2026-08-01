import { type Locale, locales } from '@/i18n/locales';

export type LocaleKeywordMap = Record<Locale, readonly string[]>;

/**
 * SEO keyword strategy (tool pages)
 * ---------------------------------
 * 1. Own a clear cluster per URL — no cross-tool / cross-locale dumps.
 * 2. Lead with low-competition moat terms (Mermaid, free+online, privacy,
 *    Obsidian/GitHub README, formatting) before generic head terms.
 * 3. Keep lists lean (~12–20 phrases). Meta keywords are a weak signal;
 *    titles, H1s, FAQs, and hreflang do the real ranking work.
 * 4. Shared EN product anchors stay short; native long-tails live only
 *    on that locale’s URL.
 */
export function keywordsForLocale(
  locale: string,
  localeMap: LocaleKeywordMap | Partial<LocaleKeywordMap>,
  shared: readonly string[] = [],
): string[] {
  const resolved =
    (localeMap as Partial<LocaleKeywordMap>)[locale as Locale] ??
    (localeMap as Partial<LocaleKeywordMap>).en ??
    [];
  return [...new Set([...shared, ...resolved])];
}

function assertAllLocales<T extends Partial<Record<Locale, unknown>>>(
  map: T,
  label: string,
): asserts map is T & Record<Locale, unknown> {
  const missing = locales.filter((l) => !(l in map) || map[l] == null);
  if (missing.length > 0 && process.env.NODE_ENV !== 'production') {
    console.warn(`[locale-keywords] ${label} missing locales: ${missing.join(', ')}`);
  }
}

/* -------------------------------------------------------------------------- */
/* Language meta — intentionally empty. Hreflang + page language cover this.  */
/* -------------------------------------------------------------------------- */

export const LOCALE_LANGUAGE_KEYWORDS: LocaleKeywordMap = {
  en: [],
  es: [],
  fr: [],
  de: [],
  pt: [],
  ar: [],
  'zh-Hans': [],
  ja: [],
  ko: [],
  bn: [],
  ru: [],
};

export function languageKeywordsForLocale(locale: string): string[] {
  return [...(LOCALE_LANGUAGE_KEYWORDS[locale as Locale] ?? [])];
}

export const ALL_LANGUAGE_KEYWORDS: readonly string[] = [];

/* -------------------------------------------------------------------------- */
/* Markdown → PDF — primary money page                                         */
/* Low-comp moats first (saved KD ≈ 0–3 for Mermaid / free variants).         */
/* -------------------------------------------------------------------------- */

export const SHARED_PDF_KEYWORDS = [
  // Moat / low competition
  'mermaid to pdf',
  'markdown to pdf with mermaid',
  'markdown to pdf with latex',
  'markdown diagram to pdf',
  // Head anchors (needed for topical relevance)
  'markdown to pdf',
  'md to pdf',
] as const;

export const LOCALE_PDF_KEYWORDS: LocaleKeywordMap = {
  en: [
    'markdown with mermaid to pdf',
    'md to pdf with mermaid',
    'mermaid markdown to pdf',
    'how to convert markdown to pdf with mermaid',
    'markdown to pdf free',
    'convert markdown to pdf free',
    'markdown to pdf online free',
    'free markdown to pdf',
    'markdown to pdf no signup',
    'markdown to pdf in browser',
    'convert markdown to pdf without losing formatting',
    'github readme to pdf',
    'how to convert github readme to pdf',
    'obsidian markdown to pdf',
    'obsidian notes to pdf online',
    'export markdown math to pdf',
    'markdown latex to pdf',
    'markdown resume to pdf online',
    'md to pdf online',
    'convert md to pdf',
    'how to convert markdown to pdf',
    'pandoc markdown to pdf',
    'vscode markdown to pdf online',
  ],
  es: [
    'convertir markdown a pdf con mermaid',
    'convertir markdown a pdf gratis',
    'convertir markdown a pdf online sin registro',
    'cómo convertir markdown a pdf',
    'convertir markdown a pdf sin perder formato',
    'convertir github readme a pdf',
    'convertir notas de obsidian a pdf',
    'exportar markdown a pdf',
    'convertidor md a pdf online gratis',
    'markdown a pdf con diagramas',
    'markdown a pdf con latex',
  ],
  fr: [
    'convertir markdown en pdf avec mermaid',
    'convertir markdown en pdf gratuitement',
    'comment convertir markdown en pdf',
    'convertir markdown en pdf sans inscription',
    'exporter markdown vers pdf',
    'obsidian exporter note en pdf',
    'convertir readme github en pdf',
    'convertisseur md en pdf en ligne',
    'markdown en pdf avec diagrammes',
  ],
  de: [
    'markdown mit mermaid zu pdf',
    'markdown zu pdf kostenlos',
    'markdown in pdf umwandeln online',
    'markdown zu pdf ohne anmeldung',
    'markdown zu pdf ohne formatverlust',
    'obsidian notizen als pdf speichern',
    'github readme als pdf',
    'markdown lebenslauf als pdf exportieren',
    'md zu pdf konverter kostenlos',
    'pandoc markdown in pdf umwandeln',
  ],
  pt: [
    'converter markdown em pdf com mermaid',
    'converter markdown em pdf grátis',
    'como converter markdown em pdf',
    'converter markdown em pdf sem cadastro',
    'converter markdown em pdf sem perder formatação',
    'converter notas do obsidian para pdf',
    'github readme para pdf',
    'md para pdf online grátis',
    'markdown para pdf com diagramas',
  ],
  ar: [
    'تحويل markdown إلى pdf مع mermaid',
    'تحويل markdown إلى pdf مجانا',
    'كيف أحول markdown إلى pdf',
    'تحويل markdown إلى pdf بدون تسجيل',
    'تحويل ملاحظات obsidian إلى pdf',
    'تحويل ملف md إلى pdf',
    'محول markdown إلى pdf أونلاين',
  ],
  'zh-Hans': [
    'markdown转pdf mermaid',
    '免费 markdown 转 pdf 在线',
    'markdown转pdf 无需注册',
    '如何将markdown转换为pdf',
    'markdown转pdf 不丢格式',
    'github readme 转 pdf',
    'obsidian md 导出 pdf',
    'markdown转pdf 公式 latex',
    'md文件转换成pdf',
  ],
  ja: [
    'markdown mermaid pdf 変換',
    'markdown pdf 変換 無料',
    'markdownをpdfに変換する方法',
    'markdown pdf 変換 登録不要',
    'markdownをpdfに変換 レイアウト崩れない',
    'github readme md pdf 変換',
    'obsidian markdown pdf エクスポート',
    'markdown latex pdf 変換',
    'md pdf 変換 フリー',
  ],
  ko: [
    '마크다운 mermaid pdf 변환',
    '마크다운 pdf 변환 무료',
    '마크다운을 pdf로 변환하는 방법',
    '마크다운 pdf 변환 회원가입 없이',
    '옵시디언 마크다운 pdf',
    'github readme pdf 변환',
    'md 파일 pdf 변환',
  ],
  bn: [
    'markdown mermaid to pdf',
    'ফ্রি markdown to pdf',
    'মার্কডাউন টু পিডিএফ',
    'online markdown to pdf without signup',
    'md ফাইল থেকে pdf',
    'obsidian markdown to pdf',
  ],
  ru: [
    'markdown mermaid в pdf',
    'markdown в pdf бесплатно',
    'как конвертировать markdown в pdf',
    'markdown в pdf без регистрации',
    'obsidian markdown в pdf',
    'github readme в pdf',
    'md в pdf онлайн',
    'markdown latex в pdf',
  ],
};

export function pdfKeywordsForLocale(locale: string): string[] {
  return keywordsForLocale(locale, LOCALE_PDF_KEYWORDS, SHARED_PDF_KEYWORDS);
}

/* -------------------------------------------------------------------------- */
/* Editor — avoid competing with live-preview head terms                       */
/* -------------------------------------------------------------------------- */

export const SHARED_EDITOR_KEYWORDS = [
  'mermaid markdown editor',
  'split pane markdown editor',
  'markdown editor with preview',
  'free markdown editor no signup',
  'online markdown editor',
] as const;

export const LOCALE_EDITOR_KEYWORDS: LocaleKeywordMap = {
  en: [
    'markdown editor with mermaid diagrams',
    'github flavored markdown editor online',
    'browser markdown editor free',
    'markdown editor export to pdf',
    'wysiwyg markdown editor online free',
    'markdown editor no login',
    'privacy friendly markdown editor',
  ],
  es: [
    'editor markdown con mermaid',
    'editor markdown online gratis sin registro',
    'editor markdown con vista previa',
    'editor markdown exportar pdf',
    'editor markdown en el navegador',
  ],
  fr: [
    'éditeur markdown avec mermaid',
    'éditeur markdown gratuit sans inscription',
    'éditeur markdown avec aperçu',
    'éditeur markdown exporter pdf',
  ],
  de: [
    'markdown editor mit mermaid',
    'markdown editor kostenlos ohne anmeldung',
    'markdown editor mit vorschau',
    'markdown editor pdf export',
  ],
  pt: [
    'editor markdown com mermaid',
    'editor markdown grátis sem cadastro',
    'editor markdown com pré-visualização',
    'editor markdown exportar pdf',
  ],
  ar: [
    'محرر markdown مع mermaid',
    'محرر markdown مجاني بدون تسجيل',
    'محرر markdown مع معاينة',
  ],
  'zh-Hans': [
    'markdown 编辑器 mermaid',
    '免费 markdown 编辑器 无需注册',
    'markdown 编辑器 实时预览',
    'markdown 编辑器 导出 pdf',
  ],
  ja: [
    'mermaid 対応 markdown エディタ',
    'markdown エディタ 無料 登録不要',
    'markdown ライブプレビュー エディタ',
    'markdown エディタ pdf 出力',
  ],
  ko: [
    'mermaid 마크다운 에디터',
    '무료 마크다운 에디터 회원가입 없이',
    '마크다운 미리보기 에디터',
    '마크다운 에디터 pdf 내보내기',
  ],
  bn: [
    'mermaid markdown editor',
    'ফ্রি markdown এডিটর',
    'markdown এডিটর live preview',
  ],
  ru: [
    'редактор markdown с mermaid',
    'бесплатный редактор markdown без регистрации',
    'редактор markdown с предпросмотром',
    'редактор markdown экспорт pdf',
  ],
};

export function editorKeywordsForLocale(locale: string): string[] {
  return keywordsForLocale(locale, LOCALE_EDITOR_KEYWORDS, SHARED_EDITOR_KEYWORDS);
}

/* -------------------------------------------------------------------------- */
/* Live preview — own preview intent; differentiate from /editor               */
/* -------------------------------------------------------------------------- */

export const SHARED_PREVIEW_KEYWORDS = [
  'markdown live preview',
  'real-time markdown preview',
  'markdown preview online free',
  'sync scroll markdown preview',
] as const;

export const LOCALE_PREVIEW_KEYWORDS: LocaleKeywordMap = {
  en: [
    'markdown live preview with mermaid',
    'markdown preview no signup',
    'free markdown previewer online',
    'md viewer online free',
    'live markdown preview in browser',
    'markdown preview export pdf',
    'dillinger alternative free',
    'stackedit alternative online',
  ],
  es: [
    'vista previa markdown en vivo gratis',
    'vista previa markdown con mermaid',
    'visor markdown online sin registro',
    'previsualizador markdown exportar pdf',
  ],
  fr: [
    'aperçu markdown en direct gratuit',
    'aperçu markdown avec mermaid',
    'prévisualiseur markdown sans inscription',
    'aperçu markdown exporter pdf',
  ],
  de: [
    'markdown live vorschau kostenlos',
    'markdown vorschau mit mermaid',
    'markdown vorschau ohne anmeldung',
    'markdown vorschau pdf export',
  ],
  pt: [
    'pré-visualização markdown ao vivo grátis',
    'pré-visualização markdown com mermaid',
    'visualizador markdown sem cadastro',
    'pré-visualização markdown exportar pdf',
  ],
  ar: [
    'معاينة markdown مباشرة مجانا',
    'معاينة markdown مع mermaid',
    'معاينة markdown بدون تسجيل',
  ],
  'zh-Hans': [
    'markdown 实时预览 免费',
    'markdown 预览 mermaid',
    'markdown 在线预览 无需注册',
    'markdown 预览 导出 pdf',
  ],
  ja: [
    'markdown ライブプレビュー 無料',
    'markdown プレビュー mermaid',
    'markdown プレビュー 登録不要',
    'markdown プレビュー pdf 出力',
  ],
  ko: [
    '마크다운 라이브 미리보기 무료',
    '마크다운 미리보기 mermaid',
    '마크다운 미리보기 회원가입 없이',
    '마크다운 미리보기 pdf 내보내기',
  ],
  bn: [
    'markdown লাইভ প্রিভিউ ফ্রি',
    'markdown preview mermaid',
    'অনলাইন markdown প্রিভিউ',
  ],
  ru: [
    'живой предпросмотр markdown бесплатно',
    'предпросмотр markdown с mermaid',
    'предпросмотр markdown без регистрации',
    'предпросмотр markdown экспорт pdf',
  ],
};

export function previewKeywordsForLocale(locale: string): string[] {
  return keywordsForLocale(locale, LOCALE_PREVIEW_KEYWORDS, SHARED_PREVIEW_KEYWORDS);
}

/* -------------------------------------------------------------------------- */
/* Markdown → HTML                                                              */
/* -------------------------------------------------------------------------- */

export const SHARED_HTML_KEYWORDS = [
  'free markdown to html converter',
  'markdown to html online free',
  'md to html',
  'markdown to html',
] as const;

export const LOCALE_HTML_KEYWORDS: LocaleKeywordMap = {
  en: [
    'convert markdown to html free',
    'markdown to clean html online',
    'markdown to html no signup',
    'export markdown to html in browser',
    'github flavored markdown to html',
    'markdown to html with mermaid',
    'md to html online free',
  ],
  es: [
    'convertir markdown a html gratis',
    'markdown a html online sin registro',
    'convertidor markdown a html',
    'exportar markdown a html',
    'markdown a html limpio',
  ],
  fr: [
    'convertir markdown en html gratuitement',
    'markdown en html sans inscription',
    'convertisseur markdown en html',
    'exporter markdown vers html',
  ],
  de: [
    'markdown zu html kostenlos',
    'markdown in html umwandeln online',
    'markdown zu html ohne anmeldung',
    'md zu html konverter',
  ],
  pt: [
    'converter markdown em html grátis',
    'markdown para html sem cadastro',
    'conversor markdown para html',
    'exportar markdown para html',
  ],
  ar: [
    'تحويل markdown إلى html مجانا',
    'محول markdown إلى html',
    'markdown إلى html بدون تسجيل',
  ],
  'zh-Hans': [
    '免费 markdown 转 html',
    'markdown 转 html 在线',
    'markdown转html 无需注册',
    'md转html',
  ],
  ja: [
    'markdown html 変換 無料',
    'markdownをhtmlに変換',
    'markdown html 変換 登録不要',
    'md html 変換 オンライン',
  ],
  ko: [
    '마크다운 html 변환 무료',
    '마크다운을 html로 변환',
    '마크다운 html 변환 회원가입 없이',
    'md to html 온라인',
  ],
  bn: [
    'ফ্রি markdown to html',
    'মার্কডাউন টু এইচটিএমএল',
    'md থেকে html',
  ],
  ru: [
    'markdown в html бесплатно',
    'конвертировать markdown в html',
    'markdown в html без регистрации',
    'экспорт markdown в html',
  ],
};

export function htmlKeywordsForLocale(locale: string): string[] {
  return keywordsForLocale(locale, LOCALE_HTML_KEYWORDS, SHARED_HTML_KEYWORDS);
}

/* -------------------------------------------------------------------------- */
/* Markdown → TXT                                                               */
/* -------------------------------------------------------------------------- */

export const SHARED_TXT_KEYWORDS = [
  'markdown to plain text converter',
  'strip markdown formatting',
  'markdown to txt',
  'md to txt',
] as const;

export const LOCALE_TXT_KEYWORDS: LocaleKeywordMap = {
  en: [
    'convert markdown to plain text free',
    'remove markdown formatting online',
    'markdown to txt online free',
    'markdown to txt no signup',
    'strip markdown for llm prompt',
    'md to plain text converter',
  ],
  es: [
    'convertir markdown a texto plano gratis',
    'quitar formato markdown online',
    'markdown a txt sin registro',
    'convertir markdown a txt',
  ],
  fr: [
    'convertir markdown en texte brut gratuitement',
    'supprimer formatage markdown',
    'markdown en txt sans inscription',
    'convertir markdown en txt',
  ],
  de: [
    'markdown zu plain text kostenlos',
    'markdown formatierung entfernen online',
    'markdown zu txt ohne anmeldung',
    'md zu txt konverter',
  ],
  pt: [
    'converter markdown para texto simples grátis',
    'remover formatação markdown',
    'markdown para txt sem cadastro',
    'converter markdown em txt',
  ],
  ar: [
    'تحويل markdown إلى نص عادي مجانا',
    'إزالة تنسيق markdown',
    'markdown إلى txt بدون تسجيل',
  ],
  'zh-Hans': [
    'markdown 转纯文本 免费',
    '去除 markdown 格式',
    'markdown转txt 无需注册',
    'md转txt',
  ],
  ja: [
    'markdown プレーンテキスト 変換 無料',
    'markdown 書式削除',
    'markdown txt 変換 登録不要',
    'md txt 変換',
  ],
  ko: [
    '마크다운 일반 텍스트 변환 무료',
    '마크다운 서식 제거',
    '마크다운 txt 변환 회원가입 없이',
    'md to txt',
  ],
  bn: [
    'markdown to plain text',
    'markdown ফরম্যাটিং সরান',
    'মার্কডাউন টু টেক্সট',
  ],
  ru: [
    'markdown в обычный текст бесплатно',
    'убрать форматирование markdown',
    'markdown в txt без регистрации',
    'конвертировать markdown в txt',
  ],
};

export function txtKeywordsForLocale(locale: string): string[] {
  return keywordsForLocale(locale, LOCALE_TXT_KEYWORDS, SHARED_TXT_KEYWORDS);
}

/* -------------------------------------------------------------------------- */
/* Free converter hub — multi-format, not PDF-head cannibalization             */
/* -------------------------------------------------------------------------- */

export const SHARED_CONVERTER_KEYWORDS = [
  'free markdown converter online',
  'markdown converter no signup',
  'convert markdown to pdf html txt',
  'online markdown converter',
] as const;

export const LOCALE_CONVERTER_KEYWORDS: LocaleKeywordMap = {
  en: [
    'free markdown tools online',
    'markdown multi format converter',
    'browser markdown converter private',
    'markdown file converter free',
    'convert markdown file online free',
    'best free markdown converter 2026',
  ],
  es: [
    'convertidor markdown gratis online',
    'herramientas markdown gratis sin registro',
    'convertir markdown a pdf html txt',
    'convertidor markdown en el navegador',
  ],
  fr: [
    'convertisseur markdown gratuit en ligne',
    'outils markdown gratuits sans inscription',
    'convertir markdown en pdf html txt',
  ],
  de: [
    'markdown konverter kostenlos online',
    'markdown tools kostenlos ohne anmeldung',
    'markdown zu pdf html txt',
  ],
  pt: [
    'conversor markdown grátis online',
    'ferramentas markdown grátis sem cadastro',
    'converter markdown para pdf html txt',
  ],
  ar: [
    'محول markdown مجاني أونلاين',
    'أدوات markdown مجانية بدون تسجيل',
    'تحويل markdown إلى pdf html txt',
  ],
  'zh-Hans': [
    '免费 markdown 转换器 在线',
    'markdown 工具 无需注册',
    'markdown 转 pdf html txt',
  ],
  ja: [
    '無料 markdown 変換 オンライン',
    'markdown ツール 登録不要',
    'markdown pdf html txt 変換',
  ],
  ko: [
    '무료 마크다운 변환기 온라인',
    '마크다운 도구 회원가입 없이',
    '마크다운 pdf html txt 변환',
  ],
  bn: [
    'ফ্রি markdown কনভার্টার',
    'markdown টুলস অনলাইন',
    'markdown to pdf html txt',
  ],
  ru: [
    'бесплатный конвертер markdown онлайн',
    'инструменты markdown без регистрации',
    'markdown в pdf html txt',
  ],
};

export function converterKeywordsForLocale(locale: string): string[] {
  return keywordsForLocale(locale, LOCALE_CONVERTER_KEYWORDS, SHARED_CONVERTER_KEYWORDS);
}

assertAllLocales(LOCALE_PDF_KEYWORDS, 'LOCALE_PDF_KEYWORDS');
assertAllLocales(LOCALE_EDITOR_KEYWORDS, 'LOCALE_EDITOR_KEYWORDS');
assertAllLocales(LOCALE_PREVIEW_KEYWORDS, 'LOCALE_PREVIEW_KEYWORDS');
assertAllLocales(LOCALE_HTML_KEYWORDS, 'LOCALE_HTML_KEYWORDS');
assertAllLocales(LOCALE_TXT_KEYWORDS, 'LOCALE_TXT_KEYWORDS');
assertAllLocales(LOCALE_CONVERTER_KEYWORDS, 'LOCALE_CONVERTER_KEYWORDS');
assertAllLocales(LOCALE_LANGUAGE_KEYWORDS, 'LOCALE_LANGUAGE_KEYWORDS');
