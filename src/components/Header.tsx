'use client';

import { ChevronDown, Menu, Moon, PenLine, Sun, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';

import { Link, usePathname } from '@/i18n/navigation';

import LanguageSwitcher from './LanguageSwitcher';
import NavToolsMenu from './NavToolsMenu';
import SiteLogo from './SiteLogo';
import { useTheme } from './ThemeProvider';

export default function Header() {
  const t = useTranslations('nav');
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const toolsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setToolsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (toolsRef.current && !toolsRef.current.contains(e.target as Node)) {
        setToolsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!toolsOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setToolsOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [toolsOpen]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  const navLinkClass = (path: string) =>
    `relative px-3 py-1.5 text-sm font-medium rounded-md transition-colors duration-150 cursor-pointer ${
      isActive(path)
        ? 'text-[var(--accent)] bg-[var(--accent-muted)]'
        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]'
    }`;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 h-[var(--header-height)] transition-colors duration-200 ${
          scrolled ? 'glass nav-glow bg-[var(--bg-primary)]/90 backdrop-blur-md' : 'bg-[var(--bg-primary)]'
        } border-b border-[var(--border-color)]`}
      >
        <div className="mx-auto h-full page-container flex items-center justify-between gap-4">
          <SiteLogo variant="header" />

          <nav className="hidden lg:flex items-center gap-0.5" aria-label={t('mainNavAria')}>
            <Link href="/" className={navLinkClass('/')}>
              {t('home')}
            </Link>

            <div ref={toolsRef} className="relative">
              <button
                type="button"
                id="tools-menu-button"
                onClick={() => setToolsOpen(!toolsOpen)}
                className={`flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-md transition-colors duration-150 cursor-pointer min-h-[44px] ${
                  toolsOpen
                    ? 'bg-[var(--bg-tertiary)] text-[var(--text-primary)] ring-1 ring-[var(--border-hover)]'
                    : 'text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]'
                }`}
                aria-expanded={toolsOpen}
                aria-haspopup="menu"
                aria-controls="tools-mega-menu"
              >
                {t('tools')}
                <ChevronDown
                  className={`w-4 h-4 text-[var(--text-secondary)] transition-transform duration-200 ${toolsOpen ? 'rotate-180' : ''}`}
                  aria-hidden
                />
              </button>

              {toolsOpen && (
                <div
                  id="tools-mega-menu"
                  className="tools-mega-wrap animate-fade-in z-50"
                  role="presentation"
                >
                  <NavToolsMenu
                    variant="mega"
                    activePath={pathname}
                    onNavigate={() => setToolsOpen(false)}
                  />
                </div>
              )}
            </div>

            <Link href="/blog" locale="en" className={navLinkClass('/blog')}>
              {t('blog')}
            </Link>
            <Link href="/help" className={navLinkClass('/help')}>
              {t('help')}
            </Link>
            <Link href="/about" className={navLinkClass('/about')}>
              {t('about')}
            </Link>
          </nav>

          <div className="flex items-center gap-1">
            <LanguageSwitcher />

            <button
              onClick={toggleTheme}
              className="p-2 rounded-md text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)] transition-colors duration-150 cursor-pointer"
              aria-label={t('theme')}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <Link
              href="/editor"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold text-[var(--accent-foreground)] rounded-md bg-[var(--accent)] hover:bg-[var(--accent-hover)] transition-colors duration-150 cursor-pointer"
            >
              <PenLine className="w-3.5 h-3.5" />
              <span className="hidden md:inline">{t('editor')}</span>
            </Link>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-md text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] transition-colors cursor-pointer"
              aria-label={t('toggleMenuAria')}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
            onClick={() => setMobileOpen(false)}
          />
          <nav
            className="absolute top-0 right-0 h-full w-[min(360px,92vw)] bg-[var(--bg-primary)] shadow-[var(--shadow-md)] border-l border-[var(--border-color)] p-4 pt-[calc(var(--header-height)+1rem)] overflow-y-auto"
            style={{ animation: 'slideInRight 0.25s ease forwards' }}
            aria-label={t('mobileNavAria')}
          >
            <div className="space-y-0.5">
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-md text-[var(--text-primary)] font-medium hover:bg-[var(--bg-tertiary)] transition-colors cursor-pointer"
              >
                {t('home')}
              </Link>

              <NavToolsMenu
                variant="mobile"
                activePath={pathname}
                onNavigate={() => setMobileOpen(false)}
              />

              <div className="border-t border-[var(--border-color)] my-3" />

              {[
                { href: '/blog', key: 'blog' as const, locale: 'en' as const },
                { href: '/about', key: 'about' as const },
                { href: '/contact', key: 'contact' as const },
                { href: '/help', key: 'help' as const },
              ].map(({ href, key, locale }) => (
                <Link
                  key={href}
                  href={href}
                  locale={locale}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-md text-[var(--text-primary)] font-medium hover:bg-[var(--bg-tertiary)] transition-colors cursor-pointer"
                >
                  {t(key)}
                </Link>
              ))}
            </div>

            <div className="mt-6">
              <Link
                href="/editor"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-semibold text-[var(--accent-foreground)] rounded-md bg-[var(--accent)] hover:bg-[var(--accent-hover)] transition-colors cursor-pointer"
              >
                <PenLine className="w-4 h-4" />
                {t('editor')}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
