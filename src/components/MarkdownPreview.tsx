'use client';

import { useEffect, useRef } from 'react';
import { renderMermaidDiagrams } from '@/lib/mermaid-render';

interface MarkdownPreviewProps {
  html: string;
  className?: string;
}

export default function MarkdownPreview({ html, className = '' }: MarkdownPreviewProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.innerHTML = html;
    renderMermaidDiagrams(el).catch(() => {
      /* keep raw mermaid source visible on failure */
    });
  }, [html]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const rerender = () => {
      el.innerHTML = html;
      renderMermaidDiagrams(el).catch(() => {});
    };

    const observer = new MutationObserver(rerender);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => observer.disconnect();
  }, [html]);

  return <div ref={ref} className={className} />;
}
