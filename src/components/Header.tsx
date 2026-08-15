'use client';

import {
  ArrowRight,
  ChevronDown,
  Code2,
  Eye,
  FileSpreadsheet,
  FileText,
  FileType,
  Menu,
  Moon,
  PenLine,
  Sun,
  X,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';

import { Link, usePathname } from '@/i18n/navigation';

import LanguageSwitcher from './LanguageSwitcher';
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

  const tools = [
    { href: '/markdown-to-pdf', label: t('markdownToPdf'), icon: FileText, color: '#ef4444' },
    { href: '/markdown-to-html', label: t('markdownToHtml'), icon: Code2, color: '#f59e0b' },
    { href: '/markdown-to-txt', label: t('markdownToTxt'), icon: FileType, color: '#10b981' },
    { href: '/markdown-to-docx', label: t('markdownToDocx'), icon: FileSpreadsheet, color: '#2563eb' },
    { href: '/markdown-live-preview', label: t('markdownLivePreview'), icon: Eye, color: '#8b5cf6' },
    { href: '/editor', label: t('editor'), icon: PenLine, color: 'var(--accent)' },
  ];

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
                onClick={() => setToolsOpen(!toolsOpen)}
                className={`flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-md transition-colors duration-150 cursor-pointer ${
                  toolsOpen
                    ? 'bg-[var(--bg-tertiary)] text-[var(--text-primary)]'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)]'
                }`}
                aria-expanded={toolsOpen}
                aria-haspopup="true"
              >
                {t('tools')}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${toolsOpen ? 'rotate-180' : ''}`} />
              </button>

              {toolsOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 rounded-lg border border-[var(--border-color)] bg-[var(--bg-primary)] shadow-[var(--shadow-md)] p-1.5 animate-fade-in z-50">
                  <div className="grid gap-0.5">
                    {tools.map((tool) => (
                      <Link
                        key={tool.href}
                        href={tool.href}
                        onClick={() => setToolsOpen(false)}
                        className="flex items-center gap-3 px-3 py-2 rounded-md transition-colors hover:bg-[var(--bg-tertiary)] group cursor-pointer"
                      >
                        <div
                          className="w-8 h-8 rounded-md flex items-center justify-center shrink-0 border border-[var(--border-color)] bg-[var(--bg-secondary)]"
                        >
                          <tool.icon className="w-4 h-4" style={{ color: tool.color }} />
                        </div>
                        <span className="font-medium text-sm text-[var(--text-primary)] flex-1">{tool.label}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[var(--text-tertiary)] opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link href="/blog" locale="en" className={navLinkClass('/blog')}>
              {t('blog')}
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
            className="absolute top-0 right-0 h-full w-[min(300px,88vw)] bg-[var(--bg-primary)] shadow-[var(--shadow-md)] border-l border-[var(--border-color)] p-4 pt-[calc(var(--header-height)+1rem)] overflow-y-auto"
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

              <div className="px-3 py-2 text-[10px] font-semibold text-[var(--text-tertiary)] uppercase tracking-wider">
                {t('tools')}
              </div>
              <div className="grid gap-0.5">
                {tools.map((tool) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[var(--bg-tertiary)] transition-colors cursor-pointer"
                  >
                    <div
                      className="w-7 h-7 rounded-md flex items-center justify-center border border-[var(--border-color)] bg-[var(--bg-secondary)]"
                    >
                      <tool.icon className="w-3.5 h-3.5" style={{ color: tool.color }} />
                    </div>
                    <span className="text-sm font-medium text-[var(--text-primary)]">{tool.label}</span>
                  </Link>
                ))}
              </div>

              <div className="border-t border-[var(--border-color)] my-3" />

              {['/blog', '/about', '/contact', '/help'].map((href) => {
                const key = href.slice(1) as 'blog' | 'about' | 'contact' | 'help';
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-md text-[var(--text-primary)] font-medium hover:bg-[var(--bg-tertiary)] transition-colors cursor-pointer"
                  >
                    {t(key)}
                  </Link>
                );
              })}
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
