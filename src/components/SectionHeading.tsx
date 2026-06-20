interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: 'center' | 'left';
  size?: 'default' | 'compact';
}

export default function SectionHeading({
  badge,
  title,
  subtitle,
  align = 'center',
  size = 'default',
}: SectionHeadingProps) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left';
  const spacingClass = size === 'compact' ? 'mb-8 sm:mb-10' : 'mb-10 sm:mb-14';
  const titleClass =
    size === 'compact'
      ? 'text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight leading-tight mb-2'
      : 'text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight leading-tight mb-3';

  return (
    <div className={`max-w-2xl ${spacingClass} ${alignClass}`}>
      {badge && (
        <span className="section-badge mb-3 inline-flex">{badge}</span>
      )}
      <h2 className={titleClass}>{title}</h2>
      {subtitle && (
        <p className="text-[var(--text-secondary)] text-sm sm:text-base leading-relaxed max-w-xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
