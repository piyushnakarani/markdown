import { ArrowUpRight, Mail } from 'lucide-react';
import { useTranslations } from 'next-intl';

import RedditIcon from '@/components/icons/RedditIcon';
import { Link } from '@/i18n/navigation';
import { SITE_EMAIL, SITE_REDDIT_URL } from '@/lib/site';

const socialLinkClass =
  'flex h-9 w-9 items-center justify-center rounded-md border border-[var(--border-color)] bg-[var(--bg-primary)] text-[var(--text-secondary)] transition-colors duration-150 hover:border-[var(--border-hover)] hover:text-[var(--accent)] cursor-pointer';

import LanguageSwitcher from './LanguageSwitcher';
import SiteLogo from './SiteLogo';

export default function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const tc = useTranslations('common');

  const toolLinks = [
    { href: '/markdown-to-pdf', label: 'markdownToPdf' },
    { href: '/chatgpt-to-pdf', label: 'chatgptToPdf' },
    { href: '/mermaid-markdown-to-pdf', label: 'mermaidToPdf' },
    { href: '/ai-markdown-to-pdf', label: 'aiToPdf' },
    { href: '/obsidian-to-pdf', label: 'obsidianToPdf' },
    { href: '/notion-to-pdf', label: 'notionToPdf' },
    { href: '/github-readme-to-pdf', label: 'githubReadmeToPdf' },
    { href: '/markdown-to-pdf-resume', label: 'resumeToPdf' },
    { href: '/markdown-to-html', label: 'markdownToHtml' },
    { href: '/markdown-to-txt', label: 'markdownToTxt' },
    { href: '/markdown-to-docx', label: 'markdownToDocx' },
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

  const linkClass =
    'text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors duration-150 inline-flex items-center gap-1 group cursor-pointer';

  return (
    <footer className="border-t border-[var(--border-color)] bg-[var(--bg-primary)]">
      <div className="page-container py-10 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6">
          <div className="sm:col-span-2 lg:col-span-4">
            <SiteLogo variant="footer" className="mb-4" />
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-sm mb-4">
              {t('description')}
            </p>

            <div className="mb-6 flex items-center gap-2">
              <a
                href={`mailto:${SITE_EMAIL}`}
                className={socialLinkClass}
                aria-label={`${tc('emailAria')} ${SITE_EMAIL}`}
                title={SITE_EMAIL}
              >
                <Mail className="h-4 w-4" aria-hidden />
              </a>
              <a
                href={SITE_REDDIT_URL}
                target="_blank"
                rel="noopener noreferrer me"
                className={socialLinkClass}
                aria-label={tc('redditAria')}
                title="u/pdfwritter"
              >
                <RedditIcon className="h-4 w-4" />
              </a>
            </div>

            <div className="max-w-[200px]">
              <p className="text-xs font-semibold text-[var(--text-tertiary)] uppercase tracking-wider mb-2">
                {tNav('language')}
              </p>
              <LanguageSwitcher variant="footer" />
            </div>
          </div>

          <div className="lg:col-span-2 lg:col-start-6">
            <h3 className="text-xs font-semibold text-[var(--text-tertiary)] mb-3 tracking-wider uppercase">
              {t('tools')}
            </h3>
            <ul className="space-y-2">
              {toolLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className={linkClass}>
                    {tNav(label)}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold text-[var(--text-tertiary)] mb-3 tracking-wider uppercase">
              {t('resources')}
            </h3>
            <ul className="space-y-2">
              {resourceLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    locale={href === '/blog' ? 'en' : undefined}
                    className={linkClass}
                  >
                    {tNav(label)}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold text-[var(--text-tertiary)] mb-3 tracking-wider uppercase">
              {t('legal')}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className={linkClass}>
                  {t('privacy')}
                </Link>
              </li>
              <li>
                <Link href="/terms" className={linkClass}>
                  {t('terms')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[var(--border-color)] text-center">
          <p className="text-sm text-[var(--text-tertiary)]">
            © {new Date().getFullYear()} PDFWritter. {t('copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}
