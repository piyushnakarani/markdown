'use client';

import { Fragment } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import {
  Upload,
  MousePointerClick,
  Download,
  ArrowRight,
  FileText,
  FileCode,
  FileType,
  ChevronRight,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import SectionHeading from './SectionHeading';

type StepConfig = {
  icon: LucideIcon;
  num: string;
  color: string;
  bg: string;
  titleKey: 'step1Title' | 'step2Title' | 'step3Title';
  descKey: 'step1Desc' | 'step2Desc' | 'step3Desc';
  formats?: { label: string; icon: LucideIcon; color: string }[];
};

const STEPS: StepConfig[] = [
  {
    icon: Upload,
    num: '01',
    color: '#3b82f6',
    bg: 'from-blue-500/15 to-indigo-500/5',
    titleKey: 'step1Title',
    descKey: 'step1Desc',
  },
  {
    icon: MousePointerClick,
    num: '02',
    color: '#8b5cf6',
    bg: 'from-violet-500/15 to-purple-500/5',
    titleKey: 'step2Title',
    descKey: 'step2Desc',
    formats: [
      { label: 'PDF', icon: FileText, color: '#ef4444' },
      { label: 'HTML', icon: FileCode, color: '#f59e0b' },
      { label: 'TXT', icon: FileType, color: '#10b981' },
    ],
  },
  {
    icon: Download,
    num: '03',
    color: '#10b981',
    bg: 'from-emerald-500/15 to-green-500/5',
    titleKey: 'step3Title',
    descKey: 'step3Desc',
  },
];

export default function HowItWorksSection() {
  const t = useTranslations('howItWorks');

  return (
    <section className="section-py relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.06),transparent_65%)] pointer-events-none" />
      <div className="absolute inset-0 mesh-grid opacity-20 pointer-events-none" />

      <div className="relative page-container">
        <ScrollReveal>
          <SectionHeading
            badge="Simple Workflow"
            title={t('sectionTitle')}
            subtitle={t('sectionSubtitle')}
          />
        </ScrollReveal>

        <div className="workflow-steps">
          {STEPS.map((step, i) => (
            <Fragment key={step.num}>
              <ScrollReveal delay={i * 100}>
                <article
                  className="workflow-step group h-full"
                  data-step={step.num}
                  style={{ '--step-color': step.color } as React.CSSProperties}
                >
                  <div className="workflow-step-glow" aria-hidden />

                  <div className="relative z-10">
                    <div className="flex items-start justify-between gap-4 mb-5">
                      <div
                        className={`workflow-step-icon bg-gradient-to-br ${step.bg}`}
                        style={{ color: step.color }}
                      >
                        <step.icon className="w-6 h-6" strokeWidth={2} />
                      </div>
                      <span className="workflow-step-badge">{step.num}</span>
                    </div>

                    <h3 className="workflow-step-title text-lg font-bold mb-2 tracking-tight">
                      {t(step.titleKey)}
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                      {t(step.descKey)}
                    </p>

                    {step.formats && (
                      <div className="flex flex-wrap gap-2 mt-5 pt-5 border-t border-[var(--border-color)]">
                        {step.formats.map((fmt) => (
                          <span key={fmt.label} className="workflow-format-pill">
                            <fmt.icon className="w-3.5 h-3.5" style={{ color: fmt.color }} />
                            {fmt.label}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </article>
              </ScrollReveal>

              {i < STEPS.length - 1 && (
                <>
                  <div className="workflow-connector hidden md:flex" aria-hidden>
                    <div className="workflow-connector-line" />
                    <ChevronRight className="workflow-connector-arrow w-5 h-5 shrink-0" />
                  </div>
                  <div className="flex md:hidden justify-center py-1" aria-hidden>
                    <ChevronRight className="workflow-connector-arrow w-5 h-5 rotate-90" />
                  </div>
                </>
              )}
            </Fragment>
          ))}
        </div>

        <ScrollReveal delay={320}>
          <div className="workflow-cta">
            <p className="text-sm text-[var(--text-secondary)] mb-4">{t('ctaHint')}</p>
            <Link href="/editor" className="btn-primary">
              {t('cta')}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
