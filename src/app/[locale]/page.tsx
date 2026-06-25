import {
  ArrowRight,
  Code2,
  Eye,
  FileText,
  FileType,
  Globe,
  Lock,
  Monitor,
  PenLine,
  Shield,
  Sparkles,
  Zap,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';

import EditorClient from '@/components/EditorClient';
import FAQAccordion from '@/components/FAQAccordion';
import HowItWorksSection from '@/components/HowItWorksSection';
import ScrollReveal from '@/components/ScrollReveal';
import SectionHeading from '@/components/SectionHeading';
import TrustSection from '@/components/TrustSection';
import { Link } from '@/i18n/navigation';
import { buildPageMetadata } from '@/lib/site';
import { buildFaqPageJsonLd } from '@/lib/structured-data';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();
  const meta = (messages as Record<string, Record<string, string>>).metadata;

  return buildPageMetadata({
    title: meta?.title || 'PDFWritter',
    description: meta?.description || 'Free online Markdown converter and editor',
    path: `/${locale}`,
    locale,
    keywords: meta?.keywords?.split(',').map((k) => k.trim()),
  });
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <HomeContent locale={locale} />;
}

function HomeContent({ locale }: { locale: string }) {
  const t = useTranslations();
  const th = useTranslations('home');

  const tools = [
    {
      href: '/markdown-to-pdf',
      icon: FileText,
      color: '#ef4444',
      bg: 'from-red-500/15 to-orange-500/5',
      gradient: 'from-red-500 to-orange-500',
      title: t('tools.pdfTitle'),
      desc: t('tools.pdfDescription'),
      flow: ['MD', 'PDF'],
      speed: '~12ms',
    },
    {
      href: '/markdown-to-html',
      icon: Code2,
      color: '#f59e0b',
      bg: 'from-amber-500/15 to-yellow-500/5',
      gradient: 'from-amber-500 to-yellow-500',
      title: t('tools.htmlTitle'),
      desc: t('tools.htmlDescription'),
      flow: ['MD', 'HTML'],
      speed: '~8ms',
    },
    {
      href: '/markdown-to-txt',
      icon: FileType,
      color: '#10b981',
      bg: 'from-emerald-500/15 to-green-500/5',
      gradient: 'from-emerald-500 to-green-500',
      title: t('tools.txtTitle'),
      desc: t('tools.txtDescription'),
      flow: ['MD', 'TXT'],
      speed: '~5ms',
    },
    {
      href: '/markdown-live-preview',
      icon: Eye,
      color: '#8b5cf6',
      bg: 'from-violet-500/15 to-purple-500/5',
      gradient: 'from-violet-500 to-purple-500',
      title: t('tools.livePreviewTitle'),
      desc: t('tools.livePreviewDescription'),
      flow: ['MD', 'LIVE'],
      speed: 'Real-time',
    },
  ];

  const features = [
    { icon: Zap, title: t('features.clientSide'), desc: t('features.clientSideDesc'), color: '#3b82f6' },
    { icon: Sparkles, title: t('features.fast'), desc: t('features.fastDesc'), color: '#f59e0b' },
    { icon: Shield, title: t('features.free'), desc: t('features.freeDesc'), color: '#10b981' },
    { icon: Globe, title: t('features.multilingual'), desc: t('features.multilingualDesc'), color: '#06b6d4' },
    { icon: Monitor, title: t('features.responsive'), desc: t('features.responsiveDesc'), color: '#ec4899' },
    { icon: Lock, title: t('features.secure'), desc: t('features.secureDesc'), color: '#8b5cf6' },
  ];

  const faqs = [
    { q: t('faq.q1'), a: t('faq.a1') },
    { q: t('faq.q2'), a: t('faq.a2') },
    { q: t('faq.q3'), a: t('faq.a3') },
    { q: t('faq.q4'), a: t('faq.a4') },
    { q: t('faq.q5'), a: t('faq.a5') },
    { q: t('faq.q6'), a: t('faq.a6') },
  ];

  return (
    <>
      {/* ===== HERO + LIVE EDITOR ===== */}
      <section className="home-hero relative overflow-hidden">
        <div className="home-hero-bg" aria-hidden />
        <div className="home-hero-glow" aria-hidden />
        <div className="absolute inset-0 mesh-grid opacity-25 pointer-events-none" aria-hidden />

        <div className="relative home-hero-inner">
          <header className="home-hero-copy">
            <h1 className="home-hero-title">
              {t('hero.title')}{' '}
              <span className="home-hero-title-accent">{t('hero.titleHighlight')}</span>
            </h1>
            <p className="home-hero-subtitle">{t('hero.subtitle')}</p>
          </header>

          <div className="home-hero-editor">
            <EditorClient variant="hero" />
          </div>
        </div>
      </section>

      {/* ===== TOOLS ===== */}
      <section className="section-py relative">
        <div className="page-container">
          <ScrollReveal>
            <SectionHeading
              size="compact"
              title={t('tools.sectionTitle')}
              subtitle={t('tools.sectionSubtitle')}
            />
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {tools.map((tool, i) => (
              <ScrollReveal key={tool.href} delay={i * 80}>
                <Link href={tool.href} className="tool-card group flex flex-col justify-between min-h-[280px] h-full">
                  <div>
                    <div className="flex items-center justify-start gap-3 mb-5">
                      <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${tool.bg} flex items-center justify-center`}>
                        <tool.icon className="w-5 h-5" style={{ color: tool.color }} />
                      </div>
                      <h3 className="text-base font-semibold group-hover:text-[#3b82f6] transition-colors">
                      {tool.title}
                    </h3>
                    </div>

                    
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-5">
                      {tool.desc}
                    </p>
                  </div>

                  <div className="tool-card-cta">
                    <span className="tool-card-cta-label">
                      {t('tools.tryNow').replace(/\s*[→←\u2190-\u2193\u2196-\u2199]+\s*$/u, '').trim()}
                    </span>
                    <span className="tool-card-cta-icon" aria-hidden="true">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TRUST ===== */}
      <TrustSection />

      {/* ===== STATISTICS ===== */}
      {/* <StatsSection /> */}

      {/* ===== FEATURES ===== */}
      <section className="section-py section-divider relative">
        <div className="page-container">
          <ScrollReveal>
            <SectionHeading
              size="compact"
              title={t('features.sectionTitle')}
              subtitle={t('features.sectionSubtitle')}
            />
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feat, i) => (
              <ScrollReveal key={i} delay={i * 60}>
                <div className="card-glass group p-6 hover-lift h-full">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                    style={{ background: `${feat.color}14` }}
                  >
                    <feat.icon className="w-5 h-5" style={{ color: feat.color }} />
                  </div>
                  <h3 className="text-base font-semibold mb-2">{feat.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{feat.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <HowItWorksSection />

      {/* ===== FAQ ===== */}
      <section className="section-py relative">
        <div className="page-container max-w-3xl">
          <ScrollReveal>
            <SectionHeading
              size="compact"
              title={th('faqTitle')}
            />
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <FAQAccordion items={faqs} />
          </ScrollReveal>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildFaqPageJsonLd(faqs, `/${locale}`)),
        }}
      />
    </>
  );
}
