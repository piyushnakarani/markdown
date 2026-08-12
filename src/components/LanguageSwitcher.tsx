'use client';

import { Check, ChevronDown } from 'lucide-react';
import { useLocale } from 'next-intl';
import { useEffect, useRef, useState } from 'react';

import { Locale, localeFlags, localeNames, locales } from '@/i18n/locales';
import { usePathname, useRouter } from '@/i18n/navigation';
import { event } from '@/lib/analytics';

export default function LanguageSwitcher({ variant = 'default' }: { variant?: 'default' | 'footer' }) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleChange = (newLocale: Locale) => {
    event('change_language', { from: locale, to: newLocale });
    router.replace(pathname, { locale: newLocale });
    setOpen(false);
  };

  const buttonClass =
    variant === 'footer'
      ? 'flex items-center gap-2 w-full px-3 py-2 rounded-md text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)] border border-[var(--border-color)] transition-colors duration-150 cursor-pointer'
      : `flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wide text-[var(--text-secondary)] border border-[var(--border-color)] bg-[var(--bg-primary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)] transition-colors duration-150 cursor-pointer ${
          open ? 'border-[var(--accent)] bg-[var(--accent-muted)] text-[var(--accent)]' : ''
        }`;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={buttonClass}
        aria-label="Change language"
        aria-expanded={open}
      >
        <span className="font-bold flex items-center gap-1 leading-none">
          <span className="leading-none">{localeFlags[locale]}</span>
          <span className={variant === 'footer' ? 'flex-1 text-left normal-case font-medium' : 'hidden sm:inline font-semibold text-[10px]'}>
            {variant === 'footer' ? localeNames[locale] : locale}
          </span>
        </span>
        <ChevronDown
          className={`w-3 h-3 transition-transform duration-200 ${
            open ? 'rotate-180 text-[var(--accent)]' : 'text-[var(--text-tertiary)]'
          } ${variant === 'default' ? 'hidden sm:block' : ''}`}
        />
      </button>

      {open && (
        <div
          className={`absolute ${
            variant === 'footer' ? 'bottom-full left-0 mb-2' : 'top-full right-[-90px] sm:right-0 mt-2'
          } w-[min(320px,90vw)] sm:w-[380px] rounded-lg border border-[var(--border-color)] bg-[var(--bg-primary)] shadow-[var(--shadow-md)] p-1.5 animate-fade-in z-50`}
          style={{ transformOrigin: variant === 'footer' ? 'bottom left' : 'top right' }}
        >
          <div className="px-2.5 py-1.5 mb-1 border-b border-[var(--border-color)]">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-tertiary)]">
              Select Language
            </span>
          </div>

          <div className="grid grid-cols-2 gap-0.5 max-h-[280px] overflow-y-auto custom-scrollbar">
            {locales.map((loc) => {
              const isSelected = loc === locale;
              return (
                <button
                  key={loc}
                  onClick={() => handleChange(loc)}
                  className={`flex items-center gap-2 px-2.5 py-1.5 rounded-md text-left text-xs transition-colors duration-150 cursor-pointer ${
                    isSelected
                      ? 'bg-[var(--accent-muted)] text-[var(--accent)] font-semibold border border-[var(--accent)]/20'
                      : 'text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)] border border-transparent'
                  }`}
                >
                  <span className="flex items-center justify-center w-6 h-6 rounded-md bg-[var(--bg-secondary)] border border-[var(--border-color)] text-sm">
                    {localeFlags[loc]}
                  </span>
                  <span className="font-medium flex-1 truncate">{localeNames[loc]}</span>
                  {isSelected && (
                    <span className="w-4 h-4 rounded-full bg-[var(--accent-muted)] flex items-center justify-center">
                      <Check className="w-2.5 h-2.5 text-[var(--accent)]" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
