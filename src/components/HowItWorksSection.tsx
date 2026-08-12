'use client';

import type { LucideIcon } from 'lucide-react';
import {
  ArrowRight,
  ChevronRight,
  Download,
  FileCode,
  FileText,
  FileType,
  MousePointerClick,
  Upload,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Fragment } from 'react';

import { Link } from '@/i18n/navigation';

import ScrollReveal from './ScrollReveal';
import SectionHeading from './SectionHeading';

type StepConfig = {
  icon: LucideIcon;
  num: string;
  color: string;
  titleKey: 'step1Title' | 'step2Title' | 'step3Title';
  descKey: 'step1Desc' | 'step2Desc' | 'step3Desc';
  formats?: { label: string; icon: LucideIcon; color: string }[];
};

const STEPS: StepConfig[] = [
  {
    icon: Upload,
    num: '01',
    color: 'var(--accent)',
    titleKey: 'step1Title',
    descKey: 'step1Desc',
  },
  {
    icon: MousePointerClick,
    num: '02',
    color: '#71717a',
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
    titleKey: 'step3Title',
    descKey: 'step3Desc',
  },
];

export default function HowItWorksSection() {
  const t = useTranslations('howItWorks');

  return (
    <section className="section-py relative">
      <div className="relative page-container">
        <ScrollReveal>
          <SectionHeading
            badge={t('badge')}
            title={t('sectionTitle')}
            subtitle={t('sectionSubtitle')}
          />
        </ScrollReveal>

        <div className="workflow-steps">
          {STEPS.map((step, i) => (
            <Fragment key={step.num}>
              <ScrollReveal delay={i * 80}>
                <article
                  className="workflow-step group h-full"
                  data-step={step.num}
                  style={{ '--step-color': step.color } as React.CSSProperties}
                >
                  <div className="relative z-10">
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div
                        className="workflow-step-icon"
                        style={{ color: step.color }}
                      >
                        <step.icon className="w-5 h-5" strokeWidth={2} />
                      </div>
                      <span className="workflow-step-badge">{step.num}</span>
                    </div>

                    <h3 className="workflow-step-title text-base font-semibold mb-1.5 tracking-tight">
                      {t(step.titleKey)}
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                      {t(step.descKey)}
                    </p>

                    {step.formats && (
                      <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-[var(--border-color)]">
                        {step.formats.map((fmt) => (
                          <span key={fmt.label} className="workflow-format-pill">
                            <fmt.icon className="w-3 h-3" style={{ color: fmt.color }} />
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
                    <ChevronRight className="workflow-connector-arrow w-4 h-4 shrink-0" />
                  </div>
                  <div className="flex md:hidden justify-center py-1" aria-hidden>
                    <ChevronRight className="workflow-connector-arrow w-4 h-4 rotate-90" />
                  </div>
                </>
              )}
            </Fragment>
          ))}
        </div>

        <ScrollReveal delay={240}>
          <div className="workflow-cta">
            <p className="text-sm text-[var(--text-secondary)] mb-3">{t('ctaHint')}</p>
            <Link href="/editor" className="btn-primary">
              {t('cta')}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
