export const locales = ['en', 'es', 'fr', 'de', 'pt', 'ar', 'zh', 'ja', 'ko', 'bn', 'ru'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export const rtlLocales: Locale[] = ['ar'];

export const localeNames: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
  pt: 'Português',
  ar: 'العربية',
  zh: '中文',
  ja: '日本語',
  ko: '한국어',
  bn: 'বাংলা',
  ru: 'Русский',
};

export const localeFlags: Record<Locale, string> = {
  en: '🇺🇸',
  es: '🇪🇸',
  fr: '🇫🇷',
  de: '🇩🇪',
  pt: '🇧🇷',
  ar: '🇸🇦',
  zh: '🇨🇳',
  ja: '🇯🇵',
  ko: '🇰🇷',
  bn: '🇧🇩',
  ru: '🇷🇺',
};

export function isRtl(locale: Locale): boolean {
  return rtlLocales.includes(locale);
}
