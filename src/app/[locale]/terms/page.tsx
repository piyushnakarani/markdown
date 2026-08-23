import { AlertTriangle, CheckCircle2, Scale } from 'lucide-react';
import { setRequestLocale, getTranslations } from 'next-intl/server';

import PageHero from '@/components/PageHero';
import { Link } from '@/i18n/navigation';
import { buildLocalizedPageMetadata } from '@/lib/site';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return buildLocalizedPageMetadata({
    locale,
    path: '/terms',
    titleKey: 'terms.title',
    descriptionKey: 'terms.subtitle',
  });
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('terms');

  return (
    <div className="bg-[var(--bg-primary)] min-h-screen pb-20">
      <PageHero
        badge={t("heroBadge")}
        badgeIcon={Scale}
        title={t("heroTitle")}
        subtitle={t("heroSubtitle")}
        accentColor="var(--accent)"
        glowColor="rgba(59, 130, 246, 0.08)"
      />

      <div className="page-container max-w-3xl mt-12 sm:mt-16">
        <div className="prose prose-invert max-w-none space-y-10 text-[var(--text-secondary)]">
          
          {/* Main Statement */}
          <section className="bg-[var(--bg-secondary)]/50 border border-[var(--border-color)] rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-[var(--text-primary)] mb-2">{t("freeTitle")}</h2>
                <p className="text-sm leading-relaxed">
                  {t("freeDesc")}
                </p>
              </div>
            </div>
          </section>

          {/* Guidelines */}
          <section className="space-y-6">
            <h2 className="text-xl font-extrabold text-[var(--text-primary)] border-b border-[var(--border-color)] pb-3">
              1. Ownership of Content
            </h2>
            <p className="text-sm leading-relaxed">
              {t("s1Desc")}
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-xl font-extrabold text-[var(--text-primary)] border-b border-[var(--border-color)] pb-3">
              2. Acceptable Use
            </h2>
            <p className="text-sm leading-relaxed">
              {t("s2Desc")}
            </p>
          </section>

          <section className="space-y-6 bg-amber-500/5 border border-amber-500/10 rounded-2xl p-6">
            <div className="flex gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-bold text-[var(--text-primary)] mb-2">{t("s3Title")}</h3>
                <p className="text-xs leading-relaxed text-[var(--text-secondary)]">
                  {t("s3Desc")}
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <h2 className="text-xl font-extrabold text-[var(--text-primary)] border-b border-[var(--border-color)] pb-3">
              4. Service Availability
            </h2>
            <p className="text-sm leading-relaxed">
              {t("s4Desc")}
            </p>
          </section>

          {/* Contact Section */}
          <div className="pt-8 border-t border-[var(--border-color)] text-xs text-center text-[var(--text-tertiary)]">
            {t("contactText")} 
            <Link href="/contact" className="text-[#6366f1] hover:underline">
              contact form
            </Link>
            .
          </div>

        </div>
      </div>
    </div>
  );
}
