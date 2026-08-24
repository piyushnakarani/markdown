import { type Locale, locales } from '@/i18n/locales';

export type LocaleKeywordMap = Record<Locale, readonly string[]>;

/**
 * SEO keyword strategy (tool pages) — English-first ranking focus
 * ---------------------------------------------------------------
 * 1. One primary intent per URL (no cannibalization across tools).
 * 2. Lead with low-KD / rising long-tails (md file to pdf, chatgpt to pdf,
 *    mermaid to pdf, no signup, private browser) before head terms.
 * 3. Cap ~12–20 phrases. Include feature intents we support (LaTeX/KaTeX,
 *    Mermaid flowchart/sequence/Gantt/class/state/pie) as related terms.
 * 4. Non-EN locale arrays stay for UI locales (noindex) only.
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
/* Feature intents we support — LaTeX/KaTeX math + Mermaid diagram types       */
/* Use on tools that render these; keep lists lean for meta caps.              */
/* -------------------------------------------------------------------------- */

/** KaTeX / LaTeX math in Markdown → PDF/HTML (user-helpful related searches). */
export const FEATURE_MATH_KEYWORDS = [
  'markdown to pdf with latex',
  'markdown latex to pdf',
  'katex markdown to pdf',
  'markdown math equations to pdf',
  'latex formula in markdown pdf',
  'markdown with katex to pdf',
] as const;

/**
 * Mermaid diagram types we render (flowcharts, sequence, class, state,
 * Gantt, pie) — matches product FAQs / about copy.
 */
export const FEATURE_DIAGRAM_KEYWORDS = [
  'mermaid flowchart to pdf',
  'mermaid sequence diagram to pdf',
  'mermaid gantt chart to pdf',
  'mermaid class diagram to pdf',
  'mermaid state diagram to pdf',
  'mermaid pie chart to pdf',
  'markdown diagram to pdf',
  'export mermaid flowchart to pdf',
  'mermaid charts in markdown pdf',
] as const;

/** Lean feature subset for general converter / editor / preview pages. */
export const FEATURE_SUPPORT_KEYWORDS = [
  'markdown to pdf with mermaid',
  'markdown to pdf with latex',
  'mermaid flowchart to pdf',
  'mermaid sequence diagram to pdf',
  'katex markdown to pdf',
  'markdown diagram to pdf',
] as const;

export function withFeatureSupportKeywords(
  keywords: readonly string[],
  extras: readonly string[] = FEATURE_SUPPORT_KEYWORDS,
): string[] {
  return [...new Set([...keywords, ...extras])];
}

/* -------------------------------------------------------------------------- */
/* Markdown → PDF — /markdown-to-pdf (primary money page)                      */
/* Primary: "markdown to pdf online free" — moat before bare head term.        */
/* -------------------------------------------------------------------------- */

export const SHARED_PDF_KEYWORDS = [
  'markdown to pdf online free',
  'free markdown to pdf converter',
  'markdown to pdf no signup',
  'md file to pdf',
  'markdown to pdf with mermaid',
  'markdown to pdf with latex',
  'convert markdown to pdf free',
  'markdown to pdf',
  'mermaid flowchart to pdf',
  'katex markdown to pdf',
] as const;

export const LOCALE_PDF_KEYWORDS: LocaleKeywordMap = {
  en: [
    'markdown to pdf online',
    'browser markdown to pdf',
    'markdown latex to pdf',
    'mermaid sequence diagram to pdf',
    'convert markdown to pdf without losing formatting',
    'markdown pdf converter no upload',
    'github flavored markdown to pdf',
    'markdown diagram to pdf',
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
/* MD → PDF — /md-to-pdf (owns "md to pdf" / "md file to pdf" cluster)         */
/* -------------------------------------------------------------------------- */

export const SHARED_MD_TO_PDF_KEYWORDS = [
  'md to pdf',
  'md file to pdf',
  'convert md to pdf',
  'md to pdf online free',
  '.md to pdf',
  'md to pdf converter',
  'convert md file to pdf',
  'md to pdf with mermaid',
  'md to pdf with latex',
] as const;

export const LOCALE_MD_TO_PDF_KEYWORDS: LocaleKeywordMap = {
  en: [
    'md to pdf free',
    'md to pdf no signup',
    'online md to pdf',
    'markdown md to pdf',
  ],
  es: ['md a pdf', 'convertir md a pdf', 'archivo md a pdf'],
  fr: ['md en pdf', 'convertir md en pdf', 'fichier md en pdf'],
  de: ['md zu pdf', 'md datei zu pdf', 'md in pdf umwandeln'],
  pt: ['md para pdf', 'converter md em pdf', 'arquivo md para pdf'],
  ar: ['md إلى pdf', 'تحويل md إلى pdf'],
  'zh-Hans': ['md转pdf', 'md文件转pdf', '免费 md 转 pdf'],
  ja: ['md pdf 変換', 'mdファイルをpdfに', 'md to pdf 無料'],
  ko: ['md to pdf', 'md 파일 pdf 변환', 'md pdf 변환 무료'],
  bn: ['md to pdf', 'md ফাইল থেকে pdf'],
  ru: ['md в pdf', 'конвертировать md в pdf', 'md файл в pdf'],
};

export function mdToPdfKeywordsForLocale(locale: string): string[] {
  return keywordsForLocale(locale, LOCALE_MD_TO_PDF_KEYWORDS, SHARED_MD_TO_PDF_KEYWORDS);
}

/* -------------------------------------------------------------------------- */
/* Editor — avoid competing with live-preview head terms                       */
/* Primary: "online markdown editor free"                                      */
/* -------------------------------------------------------------------------- */

export const SHARED_EDITOR_KEYWORDS = [
  'online markdown editor free',
  'markdown editor no signup',
  'markdown editor with mermaid',
  'markdown editor with latex',
  'split pane markdown editor',
  'markdown editor with preview',
  'free markdown editor online',
  'mermaid flowchart editor online',
] as const;

export const LOCALE_EDITOR_KEYWORDS: LocaleKeywordMap = {
  en: [
    'browser markdown editor free',
    'github flavored markdown editor online',
    'markdown editor export to pdf',
    'katex markdown editor online',
    'privacy friendly markdown editor',
    'wysiwyg markdown editor online free',
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
/* Live preview — /markdown-live-preview                                       */
/* Primary: "markdown live preview" + free / no signup moats                   */
/* -------------------------------------------------------------------------- */

export const SHARED_PREVIEW_KEYWORDS = [
  'markdown live preview',
  'markdown preview online free',
  'real-time markdown preview',
  'markdown preview no signup',
  'md previewer online',
  'sync scroll markdown preview',
  'mermaid live preview markdown',
  'latex markdown preview online',
] as const;

export const LOCALE_PREVIEW_KEYWORDS: LocaleKeywordMap = {
  en: [
    'markdown live preview with mermaid',
    'free markdown previewer online',
    'live markdown preview in browser',
    'katex live preview markdown',
    'markdown preview export pdf',
    'dillinger alternative free',
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
/* Primary: "markdown to html online free"                                     */
/* -------------------------------------------------------------------------- */

export const SHARED_HTML_KEYWORDS = [
  'markdown to html online free',
  'free markdown to html converter',
  'md to html',
  'markdown to html no signup',
  'convert markdown to html free',
  'markdown to html',
  'markdown to html with mermaid',
  'markdown to html with latex',
] as const;

export const LOCALE_HTML_KEYWORDS: LocaleKeywordMap = {
  en: [
    'markdown to clean html online',
    'github flavored markdown to html',
    'mermaid flowchart to html',
    'export markdown to html in browser',
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
/* Primary: "markdown to plain text" / strip formatting                        */
/* -------------------------------------------------------------------------- */

export const SHARED_TXT_KEYWORDS = [
  'markdown to plain text',
  'markdown to txt',
  'strip markdown formatting',
  'md to txt',
  'convert markdown to plain text free',
  'remove markdown formatting online',
] as const;

export const LOCALE_TXT_KEYWORDS: LocaleKeywordMap = {
  en: [
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
/* Markdown → DOCX / Word                                                       */
/* Primary: "markdown to word" + "markdown to docx online free"                */
/* -------------------------------------------------------------------------- */

export const SHARED_DOCX_KEYWORDS = [
  'markdown to word',
  'markdown to docx online free',
  'markdown to docx',
  'md to docx',
  'convert markdown to word free',
  'export markdown to word',
  'markdown to docx with mermaid',
  'markdown to word with diagrams',
] as const;

export const LOCALE_DOCX_KEYWORDS: LocaleKeywordMap = {
  en: [
    'markdown to word document online',
    'markdown to docx no signup',
    'md to docx converter',
    'mermaid diagram to word docx',
    'convert markdown to docx free',
  ],
  es: [
    'convertir markdown a docx gratis',
    'markdown a word online',
    'markdown a docx sin registro',
    'convertir markdown a word',
  ],
  fr: [
    'convertir markdown en docx gratuitement',
    'markdown en word sans inscription',
    'convertisseur markdown vers docx',
  ],
  de: [
    'markdown zu docx kostenlos',
    'markdown in word umwandeln online',
    'markdown zu docx ohne anmeldung',
    'md zu docx konverter',
  ],
  pt: [
    'converter markdown para docx grátis',
    'markdown para word online',
    'markdown para docx sem cadastro',
  ],
  ar: [
    'تحويل markdown إلى docx مجانا',
    'محول markdown إلى word',
  ],
  'zh-Hans': [
    '免费 markdown 转 docx',
    'markdown 转 word 在线',
    'markdown转docx 无需注册',
  ],
  ja: [
    'markdown docx 変換 無料',
    'markdownをwordに変換',
    'md docx 変換 オンライン',
  ],
  ko: [
    '마크다운 docx 변환 무료',
    '마크다운을 word로 변환',
    'md to docx 온라인',
  ],
  bn: [
    'markdown to docx',
    'মার্কডাউন টু docx',
  ],
  ru: [
    'markdown в docx бесплатно',
    'конвертировать markdown в word',
    'markdown в docx без регистрации',
  ],
};

export function docxKeywordsForLocale(locale: string): string[] {
  return keywordsForLocale(locale, LOCALE_DOCX_KEYWORDS, SHARED_DOCX_KEYWORDS);
}

/* -------------------------------------------------------------------------- */
/* Free converter hub — multi-format (not PDF-head cannibalization)            */
/* Primary: "free markdown converter online"                                   */
/* -------------------------------------------------------------------------- */

export const SHARED_CONVERTER_KEYWORDS = [
  'free markdown converter online',
  'markdown converter no signup',
  'online markdown converter',
  'convert markdown to pdf html txt docx',
  'markdown multi format converter',
  'free markdown tools online',
] as const;

export const LOCALE_CONVERTER_KEYWORDS: LocaleKeywordMap = {
  en: [
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

/* -------------------------------------------------------------------------- */
/* Niche intent pages — each owns one rising / low-KD cluster                  */
/* -------------------------------------------------------------------------- */

/** /chatgpt-to-pdf — primary: chatgpt to pdf */
export const CHATGPT_TO_PDF_KEYWORDS = [
  'chatgpt to pdf',
  'chatgpt markdown to pdf',
  'export chatgpt to pdf',
  'convert chatgpt to pdf',
  'chatgpt answer to pdf',
  'chatgpt response to pdf',
  'paste chatgpt to pdf',
  'chatgpt to pdf free',
  'chatgpt mermaid to pdf',
  'chatgpt latex to pdf',
] as const;

/** /ai-markdown-to-pdf — primary: ai markdown to pdf / claude to pdf */
export const AI_MARKDOWN_TO_PDF_KEYWORDS = [
  'ai markdown to pdf',
  'claude to pdf',
  'gemini to pdf',
  'llm markdown to pdf',
  'convert ai answer to pdf',
  'ai chat to pdf',
  'claude markdown to pdf',
  'gemini markdown to pdf',
  'ai mermaid diagram to pdf',
  'ai latex markdown to pdf',
] as const;

/** /mermaid-markdown-to-pdf — primary: mermaid to pdf + all diagram types */
export const MERMAID_TO_PDF_KEYWORDS = [
  'mermaid to pdf',
  'mermaid markdown to pdf',
  'mermaid diagram to pdf',
  'convert mermaid to pdf',
  'mermaid pdf online free',
  'export mermaid diagram to pdf',
  'mermaid flowchart to pdf',
  'mermaid sequence diagram to pdf',
  'mermaid gantt chart to pdf',
  'mermaid class diagram to pdf',
  'mermaid state diagram to pdf',
  'mermaid pie chart to pdf',
  'markdown to pdf with mermaid diagrams',
  'flowchart to pdf mermaid',
] as const;

/** /obsidian-to-pdf — primary: obsidian to pdf */
export const OBSIDIAN_TO_PDF_KEYWORDS = [
  'obsidian to pdf',
  'export obsidian notes to pdf',
  'obsidian markdown to pdf',
  'obsidian pdf export',
  'obsidian to pdf free',
  'convert obsidian note to pdf',
  'obsidian pdf without publish',
  'obsidian mermaid to pdf',
  'obsidian latex to pdf',
  'obsidian katex to pdf',
] as const;

/** /notion-to-pdf — primary: notion to pdf */
export const NOTION_TO_PDF_KEYWORDS = [
  'notion to pdf',
  'export notion to pdf',
  'notion markdown to pdf',
  'convert notion page to pdf',
  'notion page to pdf',
  'notion to pdf free',
  'notion export markdown to pdf',
  'notion mermaid to pdf',
] as const;

/** /github-readme-to-pdf — primary: github readme to pdf */
export const GITHUB_README_TO_PDF_KEYWORDS = [
  'github readme to pdf',
  'readme.md to pdf',
  'convert readme to pdf',
  'github markdown to pdf',
  'readme to pdf online free',
  'convert github readme to pdf',
  'readme md to pdf',
  'github readme mermaid to pdf',
  'readme latex math to pdf',
] as const;

/** /markdown-to-pdf-resume — primary: markdown resume to pdf */
export const RESUME_TO_PDF_KEYWORDS = [
  'markdown resume to pdf',
  'markdown cv to pdf',
  'convert markdown resume to pdf',
  'markdown resume pdf',
  'markdown to pdf resume',
  'markdown cv pdf converter',
  'resume markdown to pdf free',
] as const;

assertAllLocales(LOCALE_PDF_KEYWORDS, 'LOCALE_PDF_KEYWORDS');
assertAllLocales(LOCALE_MD_TO_PDF_KEYWORDS, 'LOCALE_MD_TO_PDF_KEYWORDS');
assertAllLocales(LOCALE_EDITOR_KEYWORDS, 'LOCALE_EDITOR_KEYWORDS');
assertAllLocales(LOCALE_PREVIEW_KEYWORDS, 'LOCALE_PREVIEW_KEYWORDS');
assertAllLocales(LOCALE_HTML_KEYWORDS, 'LOCALE_HTML_KEYWORDS');
assertAllLocales(LOCALE_TXT_KEYWORDS, 'LOCALE_TXT_KEYWORDS');
assertAllLocales(LOCALE_DOCX_KEYWORDS, 'LOCALE_DOCX_KEYWORDS');
assertAllLocales(LOCALE_CONVERTER_KEYWORDS, 'LOCALE_CONVERTER_KEYWORDS');
assertAllLocales(LOCALE_LANGUAGE_KEYWORDS, 'LOCALE_LANGUAGE_KEYWORDS');
