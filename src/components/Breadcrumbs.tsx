import { ChevronRight } from 'lucide-react';

import { Link } from '@/i18n/navigation';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

/**
 * Visible breadcrumb navigation. Pair with BreadcrumbList JSON-LD
 * (already emitted by buildToolPageJsonLd / buildBreadcrumbJsonLd).
 */
export default function Breadcrumbs({
  items,
  className = '',
}: {
  items: BreadcrumbItem[];
  className?: string;
}) {
  if (items.length === 0) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className={`page-container ${className}`}
    >
      <ol className="flex flex-wrap items-center gap-1 text-xs text-[var(--text-tertiary)] max-w-3xl mx-auto">
        <li className="flex items-center gap-1">
          <Link
            href="/"
            className="transition-colors hover:text-[var(--accent)]"
          >
            Home
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1">
            <ChevronRight className="h-3 w-3 shrink-0 opacity-50" aria-hidden />
            {item.href ? (
              <Link
                href={item.href}
                className="transition-colors hover:text-[var(--accent)]"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-[var(--text-secondary)]" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
