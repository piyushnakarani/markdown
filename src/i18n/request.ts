import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';
import { Locale } from './locales';

function isObject(item: any): boolean {
  return !!(item && typeof item === 'object' && !Array.isArray(item));
}

function deepMerge(target: any, source: any): any {
  const output = { ...target };
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          Object.assign(output, { [key]: source[key] });
        } else {
          output[key] = deepMerge(target[key], source[key]);
        }
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  return output;
}

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as Locale)) {
    locale = routing.defaultLocale;
  }

  const userMessages = (await import(`./messages/${locale}.json`)).default;

  if (locale === 'en') {
    return {
      locale,
      messages: userMessages,
    };
  }

  const defaultMessages = (await import(`./messages/en.json`)).default;
  const mergedMessages = deepMerge(defaultMessages, userMessages);

  return {
    locale,
    messages: mergedMessages,
  };
});
