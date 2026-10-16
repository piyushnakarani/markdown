'use client';

import type { LucideIcon } from 'lucide-react';
import { ArrowRight } from 'lucide-react';

import ToolNavIcon from '@/components/ToolNavIcon';
import { Link } from '@/i18n/navigation';
import type { ToolIconVariant } from '@/lib/nav-tool-links';

type Props = {
  href: string;
  label: string;
  icon: LucideIcon;
  variant: ToolIconVariant;
  onNavigate?: () => void;
  showArrow?: boolean;
  showIcon?: boolean;
  density?: 'dense' | 'comfortable' | 'compact';
  isActive?: boolean;
};

export default function ToolNavLink({
  href,
  label,
  icon,
  variant,
  onNavigate,
  showArrow = true,
  showIcon = true,
  density = 'comfortable',
  isActive = false,
}: Props) {
  const iconSize = density === 'dense' ? 'xs' : density === 'compact' ? 'sm' : 'md';

  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={`tool-nav-link group tool-nav-link--${density} ${!showIcon ? 'tool-nav-link--text-only' : ''} ${isActive ? 'tool-nav-link--active' : ''}`}
      role="menuitem"
    >
      {showIcon ? <ToolNavIcon icon={icon} variant={variant} size={iconSize} /> : null}
      <span className="tool-nav-link-text min-w-0 flex-1">
        <span className="tool-nav-link-label block">{label}</span>
      </span>
      {showArrow ? <ArrowRight className="tool-nav-link-arrow" aria-hidden /> : null}
    </Link>
  );
}
