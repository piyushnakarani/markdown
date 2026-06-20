'use client';

import { useState, useRef, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { locales, localeNames, localeFlags, Locale } from '@/i18n/locales';
import { Globe, Check, ChevronDown } from 'lucide-react';

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
    router.replace(pathname, { locale: newLocale });
    setOpen(false);
  };

  const buttonClass =
    variant === 'footer'
      ? 'flex items-center gap-2.5 w-full px-4 py-3 rounded-xl text-sm text-[var(--text-secondary)] hover:bg-white/[0.04] hover:text-[var(--text-primary)] border border-[var(--border-color)] transition-all duration-300'
      : 'flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm text-[var(--text-secondary)] hover:bg-white/[0.04] hover:text-[var(--text-primary)] transition-all duration-300';

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={buttonClass}
        aria-label="Change language"
        aria-expanded={open}
      >
        <Globe className="w-4 h-4 shrink-0" />
        <span className="font-medium">{localeFlags[locale]}</span>
        <span className={variant === 'footer' ? 'flex-1 text-left' : 'hidden sm:inline text-xs font-semibold uppercase'}>
          {variant === 'footer' ? localeNames[locale] : locale}
        </span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${open ? 'rotate-180' : ''} ${variant === 'default' ? 'hidden sm:block' : ''}`} />
      </button>

      {open && (
        <div
          className={`absolute ${variant === 'footer' ? 'bottom-full left-0 mb-2' : 'top-full right-0 mt-2.5'} w-56 max-h-72 overflow-y-auto rounded-2xl border border-[var(--border-color)] bg-[var(--bg-primary)]/95 backdrop-blur-xl shadow-2xl p-1.5 animate-fade-in z-50`}
        >
          <div className="grid gap-0.5">
            {locales.map((loc) => (
              <button
                key={loc}
                onClick={() => handleChange(loc)}
                className={`flex items-center gap-3 w-full px-3.5 py-2.5 rounded-xl text-left text-sm transition-all duration-200 ${
                  loc === locale
                    ? 'bg-[#3b82f6]/10 text-[#3b82f6] font-semibold'
                    : 'text-[var(--text-secondary)] hover:bg-white/[0.04] hover:text-[var(--text-primary)]'
                }`}
              >
                <span className="text-base leading-none">{localeFlags[loc]}</span>
                <span className="font-medium flex-1">{localeNames[loc]}</span>
                {loc === locale && <Check className="w-4 h-4 shrink-0" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
