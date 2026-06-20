'use client';

import { useEffect, useState, useRef } from 'react';
import { useTranslations } from 'next-intl';

interface CounterProps {
  target: number;
  suffix?: string;
  active: boolean;
}

function Counter({ target, suffix = '', active }: CounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;

    let start = 0;
    const duration = 1800;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.floor(eased * target);
      setCount(start >= target ? target : start);
      if (progress < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [target, active]);

  const formatted = count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return (
    <span className="text-4xl sm:text-5xl lg:text-6xl font-extrabold stat-number tracking-tight">
      {formatted}
      {suffix}
    </span>
  );
}

export default function StatsSection() {
  const t = useTranslations();
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const stats = [
    { label: t('stats.filesConverted'), target: 1248390, suffix: '+' },
    { label: t('stats.countriesServed'), target: 180, suffix: '+' },
    { label: t('stats.monthlyUsers'), target: 450000, suffix: '+' },
    { label: t('stats.languages'), target: 12, suffix: '' },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-14 sm:py-16 relative"
    >
      <div className="page-container max-w-5xl relative">
        <div className="stats-panel px-6 py-10 sm:px-10 sm:py-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6">
            {stats.map((stat, i) => (
              <div
                key={i}
                className={`flex flex-col items-center text-center ${i > 0 ? 'lg:border-l lg:border-[var(--border-color)]' : ''}`}
              >
                <Counter target={stat.target} suffix={stat.suffix} active={active} />
                <span className="mt-3 text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wide">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
