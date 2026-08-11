'use client';

import type { LucideIcon } from 'lucide-react';
import { Loader2 } from 'lucide-react';
import type { ReactNode } from 'react';

export type EditorToolbarActionVariant =
  | 'default'
  | 'secondary'
  | 'copy'
  | 'pdf'
  | 'html'
  | 'txt'
  | 'docx'
  | 'danger'
  | 'download';

export type EditorToolbarAction = {
  id: string;
  icon: LucideIcon;
  label: string;
  /** Compact label shown beside the icon (e.g. PDF, HTML, Copy). */
  shortLabel?: string;
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  active?: boolean;
  variant?: EditorToolbarActionVariant;
};

const VARIANT_SHORT_LABELS: Partial<Record<EditorToolbarActionVariant, string>> = {
  pdf: 'PDF',
  html: 'HTML',
  txt: 'TXT',
  docx: 'DOCX',
};

export function EditorToolbarBar({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`editor-toolbar ${className}`.trim()}>
      <div className="editor-toolbar-inner">{children}</div>
    </div>
  );
}

export function EditorToolbarStart({ children }: { children: ReactNode }) {
  return <div className="editor-toolbar-start">{children}</div>;
}

export function EditorToolbarEnd({ actions }: { actions: EditorToolbarAction[] }) {
  if (actions.length === 0) return null;

  return (
    <div className="editor-toolbar-end">
      <div className="editor-toolbar-actions" role="toolbar" aria-label="Export and copy">
        {actions.map((action) => (
          <EditorToolbarIconButton key={action.id} {...action} />
        ))}
      </div>
    </div>
  );
}

function EditorToolbarIconButton({
  icon: Icon,
  label,
  shortLabel,
  onClick,
  disabled,
  loading,
  active,
  variant = 'default',
}: EditorToolbarAction) {
  const displayLabel =
    shortLabel ?? (variant ? VARIANT_SHORT_LABELS[variant] : undefined);

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || loading}
      title={label}
      aria-label={label}
      aria-pressed={active || undefined}
      className={`editor-toolbar-action editor-toolbar-action--${variant}${active ? ' is-active' : ''}${displayLabel ? ' has-label' : ''}`}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin shrink-0" aria-hidden />
      ) : (
        <Icon className="w-4 h-4 shrink-0" strokeWidth={2} aria-hidden />
      )}
      {displayLabel ? (
        <span className="editor-toolbar-action-text">{displayLabel}</span>
      ) : (
        <span className="sr-only">{label}</span>
      )}
    </button>
  );
}

export function EditorToolbarDivider({ className = '' }: { className?: string }) {
  return <div className={`editor-toolbar-divider ${className}`.trim()} aria-hidden />;
}

export function EditorToolbarFormatGroup({
  children,
}: {
  children: ReactNode;
}) {
  return <div className="editor-toolbar-format">{children}</div>;
}

export function EditorToolbarFormatButton({
  icon: Icon,
  label,
  onClick,
}: {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="editor-toolbar-format-btn"
      title={label}
      aria-label={label}
    >
      <Icon className="w-4 h-4" strokeWidth={2} />
    </button>
  );
}
