import { getRequestConfig } from 'next-intl/server';

import { Locale } from './locales';
import { routing } from './routing';

type MessageValue = string | MessageTree;
type MessageTree = { [key: string]: MessageValue };

function isMessageTree(item: unknown): item is MessageTree {
  return !!item && typeof item === 'object' && !Array.isArray(item);
}

function deepMerge(target: MessageTree, source: MessageTree): MessageTree {
  const output: MessageTree = { ...target };
  if (isMessageTree(target) && isMessageTree(source)) {
    Object.keys(source).forEach((key) => {
      if (isMessageTree(source[key])) {
        if (!(key in target)) {
          Object.assign(output, { [key]: source[key] });
        } else {
          output[key] = deepMerge(target[key] as MessageTree, source[key] as MessageTree);
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
