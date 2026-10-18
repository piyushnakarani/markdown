'use client';

import { useTranslations } from 'next-intl';

import ToolNavChip from '@/components/ToolNavChip';
import ToolNavLink from '@/components/ToolNavLink';
import { Link } from '@/i18n/navigation';
import {
  getNavTool,
  NAV_FOOTER_GROUPS,
  NAV_MEGA_FEATURED,
  NAV_TOOL_GROUPS,
  type NavToolLink,
} from '@/lib/nav-tool-links';

type Props = {
  variant: 'mega' | 'mobile' | 'footer';
  onNavigate?: () => void;
  activePath?: string;
};

function isToolActive(activePath: string | undefined, href: string) {
  if (!activePath) return false;
  if (href === '/') return activePath === '/';
  return activePath === href || activePath.startsWith(`${href}/`);
}

function toolsForGroup(groupHrefs: NavToolLink['href'][]): NavToolLink[] {
  return groupHrefs.map((href) => getNavTool(href));
}

function FeaturedTools({
  onNavigate,
  activePath,
  tNav,
  layout,
}: {
  onNavigate?: () => void;
  activePath?: string;
  tNav: ReturnType<typeof useTranslations<'nav'>>;
  layout: 'mega' | 'mobile';
}) {
  return (
    <ul
      className={layout === 'mega' ? 'tools-mega-feature-grid' : 'tools-feature-list'}
      role="none"
    >
      {NAV_MEGA_FEATURED.map((tool) => (
        <li key={tool.href} role="none">
          <ToolNavChip
            href={tool.href}
            label={tNav(tool.labelKey)}
            icon={tool.icon}
            variant={tool.variant}
            onNavigate={onNavigate}
            isActive={isToolActive(activePath, tool.href)}
          />
        </li>
      ))}
    </ul>
  );
}

function GroupBlock({
  title,
  tools,
  onNavigate,
  activePath,
  tNav,
}: {
  title: string;
  tools: NavToolLink[];
  onNavigate?: () => void;
  activePath?: string;
  tNav: ReturnType<typeof useTranslations<'nav'>>;
}) {
  return (
    <section className="tools-nav-section">
      <h3 className="tools-nav-group-title">{title}</h3>
      <ul className="tools-nav-list" role="none">
        {tools.map((tool) => (
          <li key={tool.href} role="none">
            <ToolNavLink
              href={tool.href}
              label={tNav(tool.labelKey)}
              icon={tool.icon}
              variant={tool.variant}
              onNavigate={onNavigate}
              showArrow={false}
              showIcon={false}
              density="compact"
              isActive={isToolActive(activePath, tool.href)}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function NavToolsMenu({ variant, onNavigate, activePath }: Props) {
  const tNav = useTranslations('nav');

  if (variant === 'mega') {
    return (
      <div className="tools-mega-panel" role="menu" aria-label={tNav('toolsMenuAria')}>
        <FeaturedTools layout="mega" onNavigate={onNavigate} activePath={activePath} tNav={tNav} />
        <div className="tools-mega-footer">
          <Link href="/free-markdown-converter" className="tools-mega-hub-link" onClick={onNavigate}>
            {tNav('toolsHubLink')}
          </Link>
        </div>
      </div>
    );
  }

  if (variant === 'mobile') {
    return (
      <div className="tools-mobile-panel">
        <p className="tools-mobile-feature-label">{tNav('tools')}</p>
        <FeaturedTools layout="mobile" onNavigate={onNavigate} activePath={activePath} tNav={tNav} />
        <Link
          href="/free-markdown-converter"
          className="tools-mobile-hub-link"
          onClick={onNavigate}
        >
          {tNav('toolsHubLink')}
        </Link>
      </div>
    );
  }

  return (
    <div className="tools-footer-panel">
      {NAV_FOOTER_GROUPS.map((group) => (
        <GroupBlock
          key={group.id}
          title={tNav(group.titleKey)}
          tools={toolsForGroup(group.toolHrefs)}
          onNavigate={onNavigate}
          activePath={activePath}
          tNav={tNav}
        />
      ))}
    </div>
  );
}
