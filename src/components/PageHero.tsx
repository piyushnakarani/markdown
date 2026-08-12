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
  accentColor = 'var(--accent)',
}: PageHeroProps) {
  return (
    <section className="tool-hero relative overflow-hidden pt-10 pb-8 sm:pt-12 sm:pb-10">
      <div className="relative page-container max-w-3xl text-center">
        <div
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium mb-4 border"
          style={{
            borderColor: `color-mix(in srgb, ${accentColor} 30%, transparent)`,
            background: `color-mix(in srgb, ${accentColor} 10%, transparent)`,
            color: accentColor,
          }}
        >
          {BadgeIcon && <BadgeIcon className="w-3 h-3" />}
          {badge}
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--text-primary)] leading-tight tracking-tight mb-3">
          {title}
        </h1>

        <p className="text-[var(--text-secondary)] text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      </div>
    </section>
  );
}
