import { ArrowUpRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/navigation';

import LanguageSwitcher from './LanguageSwitcher';
import SiteLogo from './SiteLogo';

export default function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');

  const toolLinks = [
    { href: '/markdown-to-pdf', label: 'markdownToPdf' },
    { href: '/markdown-to-html', label: 'markdownToHtml' },
    { href: '/markdown-to-txt', label: 'markdownToTxt' },
    { href: '/markdown-live-preview', label: 'markdownLivePreview' },
    { href: '/editor', label: 'editor' },
    { href: '/free-markdown-converter', label: 'freeConverter' },
  ] as const;

  const resourceLinks = [
    { href: '/blog', label: 'blog' },
    { href: '/help', label: 'help' },
    { href: '/about', label: 'about' },
    { href: '/contact', label: 'contact' },
  ] as const;

  return (
    <footer className="border-t border-[var(--border-color)] bg-[var(--bg-secondary)] relative">
      <div className="page-container py-16 sm:py-20 relative">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-4">
            <SiteLogo variant="footer" className="mb-6" />
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-sm mb-8">
              {t('description')}
            </p>

            <div className="mb-6 max-w-[200px]">
              <p className="text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-3">
                {tNav('language')}
              </p>
              <LanguageSwitcher variant="footer" />
            </div>
          </div>

          {/* Tools */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h3 className="text-xs font-semibold text-[var(--text-secondary)] mb-4 tracking-wider uppercase">
              {t('tools')}
            </h3>
            <ul className="space-y-3">
              {toolLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-[var(--text-secondary)] hover:text-[#3b82f6] transition-colors duration-200 inline-flex items-center gap-1 group"
                  >
                    {tNav(label)}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold text-[var(--text-secondary)] mb-4 tracking-wider uppercase">
              {t('resources')}
            </h3>
            <ul className="space-y-3">
              {resourceLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    locale={href === '/blog' ? 'en' : undefined}
                    className="text-sm text-[var(--text-secondary)] hover:text-[#3b82f6] transition-colors duration-200 inline-flex items-center gap-1 group"
                  >
                    {tNav(label)}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold text-[var(--text-secondary)] mb-4 tracking-wider uppercase">
              {t('legal')}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link href="/privacy" className="text-sm text-[var(--text-secondary)] hover:text-[#3b82f6] transition-colors duration-200">
                  {t('privacy')}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-[var(--text-secondary)] hover:text-[#3b82f6] transition-colors duration-200">
                  {t('terms')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[var(--border-color)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[var(--text-secondary)]">
            © {new Date().getFullYear()} PDFWritter. {t('copyright')}
          </p>
          <p className="text-sm text-[var(--text-secondary)]">
            {t('madeWith')}
          </p>
        </div>
      </div>
    </footer>
  );
}
