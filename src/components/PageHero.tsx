import { type LucideIcon } from 'lucide-react';

interface PageHeroProps {
  badge: string;
  badgeIcon?: LucideIcon;
  title: React.ReactNode;
  subtitle: string;
  accentColor?: string;
  glowColor?: string;
}

export default function PageHero({
  badge,
  badgeIcon: BadgeIcon,
  title,
  subtitle,
  accentColor = '#3b82f6',
  glowColor = 'rgba(59, 130, 246, 0.12)',
}: PageHeroProps) {
  return (
    <section
      className="tool-hero relative overflow-hidden pt-16 pb-10 sm:pt-20 sm:pb-12"
      style={{ ['--hero-glow' as string]: glowColor }}
    >
      <div className="absolute inset-0 tool-hero-glow pointer-events-none" />
      <div className="absolute inset-0 mesh-grid opacity-20 pointer-events-none" />

      <div className="relative page-container max-w-4xl text-center">
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-6 animate-fade-in border"
          style={{
            borderColor: `${accentColor}35`,
            background: `${accentColor}12`,
            color: accentColor,
          }}
        >
          {BadgeIcon && <BadgeIcon className="w-3.5 h-3.5" />}
          {badge}
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--text-primary)] leading-[1.08] tracking-tight mb-5 animate-fade-in-up stagger-1">
          {title}
        </h1>

        <p className="text-[var(--text-secondary)] text-sm sm:text-base max-w-xl mx-auto leading-relaxed animate-fade-in-up stagger-2">
          {subtitle}
        </p>
      </div>
    </section>
  );
}
