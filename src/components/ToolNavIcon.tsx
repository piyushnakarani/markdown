import type { LucideIcon } from 'lucide-react';

import type { ToolIconVariant } from '@/lib/nav-tool-links';

export default function ToolNavIcon({
  icon: Icon,
  variant,
  size = 'md',
  presentation = 'tile',
  className = '',
}: {
  icon: LucideIcon;
  variant: ToolIconVariant;
  size?: 'xs' | 'sm' | 'md';
  presentation?: 'tile' | 'glyph';
  className?: string;
}) {
  const isGlyph = presentation === 'glyph';
  const sizeClass = isGlyph
    ? ''
    : size === 'xs'
      ? 'tool-nav-icon--xs'
      : size === 'sm'
        ? 'tool-nav-icon--sm'
        : '';
  const glyphClass = isGlyph
    ? 'w-4 h-4'
    : size === 'xs'
      ? 'w-3.5 h-3.5'
      : size === 'sm'
        ? 'w-4 h-4'
        : 'w-[1.125rem] h-[1.125rem]';

  return (
    <span
      className={`${isGlyph ? 'tool-nav-glyph' : 'tool-nav-icon'} ${sizeClass} ${className}`.trim()}
      data-variant={variant}
      aria-hidden
    >
      <Icon className={glyphClass} strokeWidth={isGlyph ? 2.25 : 2} />
    </span>
  );
}
