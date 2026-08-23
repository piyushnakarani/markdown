import { Lock, Shield } from 'lucide-react';
import { setRequestLocale, getTranslations } from 'next-intl/server';

import PageHero from '@/components/PageHero';
import { Link } from '@/i18n/navigation';
import { buildLocalizedPageMetadata } from '@/lib/site';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return buildLocalizedPageMetadata({
    locale,
    path: '/privacy',
    titleKey: 'privacy.title',
    descriptionKey: 'privacy.subtitle',
  });
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('privacy');

  return (
    <div className="bg-[var(--bg-primary)] min-h-screen pb-20">
      <PageHero
        badge={t("heroBadge")}
        badgeIcon={Shield}
        title={t("heroTitle")}
        subtitle={t("heroSubtitle")}
        accentColor="#10b981"
        glowColor="rgba(16, 185, 129, 0.08)"
      />

      <div className="page-container max-w-3xl mt-12 sm:mt-16">
        <div className="prose prose-invert max-w-none space-y-10 text-[var(--text-secondary)]">
          
          {/* Main Statement */}
          <section className="bg-[var(--bg-secondary)]/50 border border-[var(--border-color)] rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                <Lock className="w-5 h-5 text-emerald-500" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-[var(--text-primary)] mb-2">{t("noServerTitle")}</h2>
                <p className="text-sm leading-relaxed">
                  {t("noServerDesc")}
                </p>
              </div>
            </div>
          </section>

          {/* Details */}
          <section className="space-y-6">
            <h2 className="text-xl font-extrabold text-[var(--text-primary)] border-b border-[var(--border-color)] pb-3">
              1. What Data We Access
            </h2>
            <p className="text-sm leading-relaxed">
              {t("s1Desc")}
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-xl font-extrabold text-[var(--text-primary)] border-b border-[var(--border-color)] pb-3">
              2. Cookies and Browser Storage
            </h2>
            <p className="text-sm leading-relaxed">
              PDFWritter utilizes browser <code>localStorage</code> {t("s2Desc1")}
            </p>
            <ul className="list-disc list-inside pl-4 text-sm space-y-2">
              <li>{t("s2List1")}</li>
              <li>{t("s2List2")}</li>
            </ul>
            <p className="text-sm leading-relaxed">
              We do not use tracking cookies, tracking pixels, or cross-site advertising trackers of any kind.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-xl font-extrabold text-[var(--text-primary)] border-b border-[var(--border-color)] pb-3">
              3. Diagram Compilers (Mermaid.js)
            </h2>
            <p className="text-sm leading-relaxed">
              {t("s3Desc")}
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-xl font-extrabold text-[var(--text-primary)] border-b border-[var(--border-color)] pb-3">
              4. Changes to This Policy
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
