import { ArrowUpRight, Mail } from 'lucide-react';
import { useTranslations } from 'next-intl';

import CrawlableLocaleNav from '@/components/CrawlableLocaleNav';
import RedditIcon from '@/components/icons/RedditIcon';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import NavToolsMenu from '@/components/NavToolsMenu';
import SiteLogo from '@/components/SiteLogo';
import { Link } from '@/i18n/navigation';
import { SITE_EMAIL, SITE_REDDIT_URL } from '@/lib/site';

export default function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const tc = useTranslations('common');

  const resourceLinks = [
    { href: '/blog', label: 'blog' as const, locale: 'en' as const },
    { href: '/help', label: 'help' as const },
    { href: '/about', label: 'about' as const },
    { href: '/contact', label: 'contact' as const },
  ];

  return (
    <footer className="site-footer" aria-labelledby="site-footer-heading">
      <h2 id="site-footer-heading" className="sr-only">Footer</h2>
      <div className="page-container site-footer-inner">
        <div className="site-footer-primary">
          <div className="site-footer-brand">
            <SiteLogo variant="footer" />
            <p className="site-footer-tagline">{t('taglineShort')}</p>
            <div className="site-footer-brand-actions">
              <div className="site-footer-social">
                <a
                  href={`mailto:${SITE_EMAIL}`}
                  className="site-footer-social-btn"
                  aria-label={`${tc('emailAria')} ${SITE_EMAIL}`}
                  title={SITE_EMAIL}
                >
                  <Mail className="h-3.5 w-3.5" aria-hidden />
                </a>
                <a
                  href={SITE_REDDIT_URL}
                  target="_blank"
                  rel="noopener noreferrer me"
                  className="site-footer-social-btn"
                  aria-label={tc('redditAria')}
                  title="u/pdfwritter"
                >
                  <RedditIcon className="h-3.5 w-3.5" />
                </a>
              </div>
              <LanguageSwitcher variant="footer" />
            </div>
          </div>

          <div className="site-footer-vrule" aria-hidden />

          <section className="site-footer-tools-col" aria-labelledby="footer-tools-heading">
            <header className="site-footer-block-head">
              <h3 id="footer-tools-heading" className="site-footer-heading">
                {t('tools')}
              </h3>
              <Link href="/free-markdown-converter" className="site-footer-cta-link">
                {tNav('toolsHubLink')}
                <ArrowUpRight className="w-3.5 h-3.5" aria-hidden />
              </Link>
            </header>
            <NavToolsMenu variant="footer" />
          </section>

          <div className="site-footer-vrule site-footer-vrule--end" aria-hidden />

          <div className="site-footer-nav-col">
            <div className="site-footer-nav-grid">
              <section aria-labelledby="footer-resources-heading">
                <h3 id="footer-resources-heading" className="site-footer-heading">
                  {t('resources')}
                </h3>
                <ul className="site-footer-links">
                  {resourceLinks.map(({ href, label, locale }) => (
                    <li key={href}>
                      <Link href={href} locale={locale} className="site-footer-link">
                        {tNav(label)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
              <section aria-labelledby="footer-legal-heading">
                <h3 id="footer-legal-heading" className="site-footer-heading">
                  {t('legal')}
                </h3>
                <ul className="site-footer-links">
                  <li>
                    <Link href="/privacy" className="site-footer-link">
                      {t('privacy')}
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms" className="site-footer-link">
                      {t('terms')}
                    </Link>
                  </li>
                </ul>
              </section>
            </div>
          </div>
        </div>

        <aside className="site-footer-locale-panel">
          <CrawlableLocaleNav variant="footer" />
        </aside>

        <div className="site-footer-bar">
          <p className="site-footer-copy">
            © {new Date().getFullYear()} PDFWritter. {t('copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}
