'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { useTheme } from './ThemeProvider';
import LanguageSwitcher from './LanguageSwitcher';
import SiteLogo from './SiteLogo';
import {
  Sun,
  Moon,
  Menu,
  X,
  FileText,
  Code2,
  FileType,
  PenLine,
  ChevronDown,
  ArrowRight,
} from 'lucide-react';

export default function Header() {
  const t = useTranslations('nav');
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const toolsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
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
    `relative px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 ${
      isActive(path)
        ? 'text-[#3b82f6] bg-[#3b82f6]/10 font-semibold'
        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/[0.04]'
    }`;

  const tools = [
    { href: '/markdown-to-pdf', label: t('markdownToPdf'), icon: FileText, color: '#ef4444', bg: 'from-red-500/10 to-orange-500/5' },
    { href: '/markdown-to-html', label: t('markdownToHtml'), icon: Code2, color: '#f59e0b', bg: 'from-amber-500/10 to-yellow-500/5' },
    { href: '/markdown-to-txt', label: t('markdownToTxt'), icon: FileType, color: '#10b981', bg: 'from-emerald-500/10 to-green-500/5' },
    { href: '/editor', label: t('editor'), icon: PenLine, color: '#3b82f6', bg: 'from-blue-500/10 to-indigo-500/5' },
  ];

  return (
    <>
      <header
        className={`fixed left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          scrolled ? 'top-3 px-4 sm:px-6' : 'top-0 px-4 sm:px-6 lg:px-8'
        }`}
      >
        <div
          className={`mx-auto transition-all duration-500 ${
            scrolled
              ? 'max-w-5xl page-container glass nav-glow rounded-2xl px-5 py-2'
              : 'page-container bg-transparent py-5'
          }`}
        >
          <div className="flex items-center justify-between">
            {/* Logo */}
            <SiteLogo variant="header" />

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
              <Link href="/" className={navLinkClass('/')}>
                {t('home')}
              </Link>

              <div ref={toolsRef} className="relative">
                <button
                  onClick={() => setToolsOpen(!toolsOpen)}
                  className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-xl transition-all duration-300 ${
                    toolsOpen
                      ? 'bg-white/[0.04] text-[var(--text-primary)]'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/[0.04]'
                  }`}
                  aria-expanded={toolsOpen}
                  aria-haspopup="true"
                >
                  {t('tools')}
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${toolsOpen ? 'rotate-180' : ''}`} />
                </button>

                {toolsOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-80 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-primary)]/95 backdrop-blur-xl shadow-2xl p-2 animate-fade-in z-50">
                    <div className="grid gap-0.5">
                      {tools.map((tool) => (
                        <Link
                          key={tool.href}
                          href={tool.href}
                          onClick={() => setToolsOpen(false)}
                          className="flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all hover:bg-white/[0.04] group"
                        >
                          <div
                            className={`w-10 h-10 rounded-xl bg-gradient-to-br ${tool.bg} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}
                          >
                            <tool.icon className="w-5 h-5" style={{ color: tool.color }} />
                          </div>
                          <div className="flex flex-col flex-1">
                            <span className="font-semibold text-sm text-[var(--text-primary)]">{tool.label}</span>
                            <span className="text-[11px] text-[var(--text-tertiary)]">Instant conversion</span>
                          </div>
                          <ArrowRight className="w-4 h-4 text-[var(--text-tertiary)] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link href="/blog" className={navLinkClass('/blog')}>
                {t('blog')}
              </Link>
              <Link href="/about" className={navLinkClass('/about')}>
                {t('about')}
              </Link>
            </nav>

            {/* Right controls */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <LanguageSwitcher />

              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-xl text-[var(--text-secondary)] hover:bg-white/[0.04] hover:text-[var(--text-primary)] transition-all duration-300 active:scale-95"
                aria-label={t('theme')}
              >
                {theme === 'dark' ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
              </button>

              <Link
                href="/editor"
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] hover:shadow-lg hover:shadow-[#3b82f6]/25 transition-all duration-300 hover:-translate-y-0.5"
              >
                <PenLine className="w-4 h-4" />
                <span className="hidden md:inline">{t('editor')}</span>
              </Link>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2.5 rounded-xl text-[var(--text-secondary)] hover:bg-white/[0.04] transition-all duration-300"
                aria-label="Toggle menu"
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fade-in"
            onClick={() => setMobileOpen(false)}
          />
          <nav
            className="absolute top-0 right-0 h-full w-[min(320px,88vw)] bg-[var(--bg-primary)] shadow-2xl border-l border-[var(--border-color)] p-6 pt-24 overflow-y-auto"
            style={{ animation: 'slideInRight 0.35s cubic-bezier(0.16,1,0.3,1) forwards' }}
            aria-label="Mobile navigation"
          >
            <div className="space-y-1">
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-[var(--text-primary)] font-semibold hover:bg-white/[0.04] transition-all"
              >
                {t('home')}
              </Link>

              <div className="px-4 py-2 text-[10px] font-bold text-[var(--text-tertiary)] uppercase tracking-widest">
                {t('tools')}
              </div>
              <div className="grid gap-0.5 pl-1">
                {tools.map((tool) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/[0.04] transition-all"
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center"
                      style={{ background: `${tool.color}15` }}
                    >
                      <tool.icon className="w-4 h-4" style={{ color: tool.color }} />
                    </div>
                    <span className="text-sm font-medium text-[var(--text-primary)]">{tool.label}</span>
                  </Link>
                ))}
              </div>

              <div className="border-t border-[var(--border-color)] my-4" />

              {['/blog', '/about', '/contact', '/help'].map((href) => {
                const key = href.slice(1) as 'blog' | 'about' | 'contact' | 'help';
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-[var(--text-primary)] font-medium hover:bg-white/[0.04] transition-all"
                  >
                    {t(key)}
                  </Link>
                );
              })}
            </div>

            <div className="mt-8">
              <Link
                href="/editor"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2.5 w-full py-3.5 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] hover:shadow-xl transition-all"
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
