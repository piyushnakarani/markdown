'use client';

import type { LucideIcon } from 'lucide-react';

import ToolNavIcon from '@/components/ToolNavIcon';
import { Link } from '@/i18n/navigation';
import type { ToolIconVariant } from '@/lib/nav-tool-links';

type Props = {
  href: string;
  label: string;
  icon: LucideIcon;
  variant: ToolIconVariant;
  onNavigate?: () => void;
  isActive?: boolean;
};

export default function ToolNavChip({
  href,
  label,
  icon,
  variant,
  onNavigate,
  isActive = false,
}: Props) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={`tool-nav-chip ${isActive ? 'tool-nav-chip--active' : ''}`}
      role="menuitem"
    >
      <ToolNavIcon icon={icon} variant={variant} presentation="glyph" />
      <span className="tool-nav-chip-label">{label}</span>
    </Link>
  );
}
