'use client';

import { Check, ChevronDown } from 'lucide-react';
import { useLocale } from 'next-intl';
import { useEffect,useRef, useState } from 'react';

import { Locale,localeFlags, localeNames, locales } from '@/i18n/locales';
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
      ? 'flex items-center gap-2.5 w-full px-4 py-3 rounded-xl text-sm text-[var(--text-secondary)] hover:bg-white/[0.04] hover:text-[var(--text-primary)] border border-[var(--border-color)] transition-all duration-300'
      : `flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] border border-[var(--border-color)] bg-[var(--bg-secondary)]/50 backdrop-blur-sm hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)] hover:border-[var(--border-hover)] transition-all duration-300 ${
          open ? 'border-[#3b82f6]/50 bg-[#3b82f6]/5 text-[#3b82f6]' : ''
        }`;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={buttonClass}
        aria-label="Change language"
        aria-expanded={open}
      >
        <span className="font-bold flex items-center gap-1.5 leading-none">
          <span className="scale-110 leading-none">{localeFlags[locale]}</span>
          <span className={variant === 'footer' ? 'flex-1 text-left' : 'hidden sm:inline font-semibold text-[10px]'}>
            {variant === 'footer' ? localeNames[locale] : locale}
          </span>
        </span>
        <ChevronDown
          className={`w-3 h-3 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            open ? 'rotate-180 text-[#3b82f6]' : 'text-[var(--text-tertiary)]'
          } ${variant === 'default' ? 'hidden sm:block' : ''}`}
        />
      </button>

      {open && (
        <div
          className={`absolute ${
            variant === 'footer' ? 'bottom-full left-0 mb-3' : 'top-full right-[-90px] sm:right-0 mt-3'
          } w-[min(340px,90vw)] sm:w-[420px] rounded-2xl border border-[var(--border-color)] bg-[var(--bg-primary)]/90 backdrop-blur-xl shadow-2xl p-2.5 animate-fade-in z-50`}
          style={{
            boxShadow: '0 20px 40px -15px rgba(0,0,0,0.6), 0 0 50px rgba(59,130,246,0.06)',
            transformOrigin: variant === 'footer' ? 'bottom left' : 'top right',
          }}
        >
          <div className="px-3 py-1.5 mb-2 border-b border-[var(--border-color)]">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[var(--text-tertiary)]">
              Select Language
            </span>
          </div>

          <div className="grid grid-cols-2 gap-1 max-h-[300px] overflow-y-auto custom-scrollbar">
            {locales.map((loc) => {
              const isSelected = loc === locale;
              return (
                <button
                  key={loc}
                  onClick={() => handleChange(loc)}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-left text-xs transition-all duration-300 relative group overflow-hidden ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#3b82f6]/10 to-[#8b5cf6]/5 text-[#3b82f6] font-semibold border border-[#3b82f6]/20'
                      : 'text-[var(--text-secondary)] hover:bg-white/[0.03] hover:text-[var(--text-primary)] border border-transparent hover:border-[var(--border-color)]'
                  }`}
                >
                  <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] text-sm shadow-sm group-hover:scale-105 group-hover:border-[var(--border-hover)] transition-all">
                    {localeFlags[loc]}
                  </span>
                  <span className="font-semibold flex-1 truncate">{localeNames[loc]}</span>
                  {isSelected && (
                    <span className="w-5 h-5 rounded-full bg-[#3b82f6]/10 flex items-center justify-center">
                      <Check className="w-3 h-3 text-[#3b82f6]" />
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
