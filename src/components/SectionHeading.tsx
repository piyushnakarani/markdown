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
  const spacingClass = size === 'compact' ? 'mb-6 sm:mb-8' : 'mb-8 sm:mb-10';
  const titleClass =
    size === 'compact'
      ? 'text-lg sm:text-xl lg:text-2xl font-semibold tracking-tight leading-tight mb-1.5'
      : 'text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight leading-tight mb-2';

  return (
    <div className={`max-w-2xl ${spacingClass} ${alignClass}`}>
      {badge && (
        <span className="section-badge mb-2 inline-flex">{badge}</span>
      )}
      <h2 className={titleClass}>{title}</h2>
      {subtitle && (
        <p className="text-[var(--text-secondary)] text-sm leading-relaxed max-w-xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
