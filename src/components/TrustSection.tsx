'use client';

import { CloudOff,Lock, Shield, Zap } from 'lucide-react';
import { useTranslations } from 'next-intl';

import ScrollReveal from './ScrollReveal';

export default function TrustSection() {
  const t = useTranslations('trust');

  const badges = [
    { icon: Zap, title: t('fast'), desc: t('fastDesc'), color: '#f59e0b' },
    { icon: Shield, title: t('secure'), desc: t('secureDesc'), color: '#3b82f6' },
    { icon: CloudOff, title: t('noUpload'), desc: t('noUploadDesc'), color: '#10b981' },
    { icon: Lock, title: t('privacy'), desc: t('privacyDesc'), color: '#8b5cf6' },
  ];

  return (
    <section className="py-10 sm:py-12 relative border-b border-[var(--border-color)]">
      <div className="page-container">
        <ScrollReveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {badges.map((badge, i) => (
              <ScrollReveal key={badge.title} delay={i * 80}>
                <div className="trust-badge group">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
                    style={{ background: `${badge.color}14` }}
                  >
                    <badge.icon className="w-4 h-4" style={{ color: badge.color }} />
                  </div>
                  <h3 className="text-sm font-semibold mb-1 text-[var(--text-primary)]">{badge.title}</h3>
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">{badge.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
