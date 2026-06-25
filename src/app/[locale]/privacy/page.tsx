import { Lock, Shield } from 'lucide-react';
import { setRequestLocale } from 'next-intl/server';

import PageHero from '@/components/PageHero';
import { Link } from '@/i18n/navigation';
import { buildLocalizedPageMetadata } from '@/lib/site';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return buildLocalizedPageMetadata({
    locale,
    path: `/${locale}/privacy`,
    titleKey: 'privacy.title',
    descriptionKey: 'privacy.subtitle',
  });
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="bg-[var(--bg-primary)] min-h-screen pb-20">
      <PageHero
        badge="Privacy Policy"
        badgeIcon={Shield}
        title="Your Privacy is Our Default"
        subtitle="PDFWritter operates 100% client-side. We do not collect, view, or store your documents."
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
                <h2 className="text-lg font-bold text-[var(--text-primary)] mb-2">No Server Uploads</h2>
                <p className="text-sm leading-relaxed">
                  Unlike traditional online converters that require uploading your files to a remote server, PDFWritter performs 100% of the conversions inside your web browser. Your text, Markdown files, custom CSS, and diagrams never leave your device.
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
              When you load a Markdown (.md) file or paste text into the editor, the application accesses it using standard browser APIs (such as the File Reader API). This text is loaded into your browser&apos;s temporary active memory only for rendering purposes.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-xl font-extrabold text-[var(--text-primary)] border-b border-[var(--border-color)] pb-3">
              2. Cookies and Browser Storage
            </h2>
            <p className="text-sm leading-relaxed">
              PDFWritter utilizes browser <code>localStorage</code> to remember configuration settings, such as:
            </p>
            <ul className="list-disc list-inside pl-4 text-sm space-y-2">
              <li>Your selected light or dark mode theme setting.</li>
              <li>Your last active workspace content (to prevent accidental data loss on refresh).</li>
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
              Mermaid diagram structures (flowcharts, sequence diagrams, pie charts) are compiled directly inside your browser. No external endpoints are called to render drawings.
            </p>
          </section>

          <section className="space-y-6">
            <h2 className="text-xl font-extrabold text-[var(--text-primary)] border-b border-[var(--border-color)] pb-3">
              4. Changes to This Policy
            </h2>
            <p className="text-sm leading-relaxed">
              As we run no backend services and collect no metadata, this privacy policy is simple and unlikely to change. Any updates to our local data handling features will be reflected here.
            </p>
          </section>

          {/* Contact Section */}
          <div className="pt-8 border-t border-[var(--border-color)] text-xs text-center text-[var(--text-tertiary)]">
            If you have questions about this privacy statement, please use our{' '}
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
