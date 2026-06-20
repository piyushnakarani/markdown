import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Shield, Zap, Globe, Code, Heart, Sparkles } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return {
    title: 'About MarkdownTools - Free Markdown Converter & Editor',
    description: 'Learn about MarkdownTools — free, fast, and private Markdown tools for developers worldwide.',
    alternates: { canonical: `/${locale}/about` },
  };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AboutContent />;
}

function AboutContent() {
  const t = useTranslations('about');

  const values = [
    { icon: Zap, title: 'Fast & Free', desc: 'Lightning-fast conversions with zero cost, forever.', color: '#f59e0b' },
    { icon: Shield, title: 'Privacy First', desc: 'Your data never leaves your browser. Zero tracking.', color: '#10b981' },
    { icon: Globe, title: 'Global Access', desc: 'Available in 12 languages with full RTL support.', color: '#06b6d4' },
    { icon: Code, title: 'Developer Made', desc: 'Built by developers, for developers.', color: '#6366f1' },
  ];

  return (
    <>
      <section className="relative overflow-hidden py-16 sm:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-[#6366f1]/5 via-transparent to-[#ec4899]/5" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#6366f1]/10 to-[#8b5cf6]/5 mb-6">
            <Sparkles className="w-8 h-8 text-[#6366f1]" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4">{t('title')}</h1>
          <p className="text-[var(--text-secondary)] text-lg max-w-xl mx-auto">{t('subtitle')}</p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-16">
        {/* Mission */}
        <div className="card-glass p-8 sm:p-12 text-center">
          <Heart className="w-10 h-10 text-[#ec4899] mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">{t('missionTitle')}</h2>
          <p className="text-[var(--text-secondary)] leading-relaxed max-w-xl mx-auto">{t('missionText')}</p>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {values.map((v, i) => (
            <div key={i} className="card-glass group">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: `${v.color}15` }}>
                <v.icon className="w-6 h-6" style={{ color: v.color }} />
              </div>
              <h3 className="text-lg font-bold mb-2">{v.title}</h3>
              <p className="text-sm text-[var(--text-secondary)]">{v.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href="/editor" className="btn-primary text-base px-8 py-4">
            Try MarkdownTools →
          </Link>
        </div>
      </section>
    </>
  );
}
