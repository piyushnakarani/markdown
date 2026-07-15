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

    // Render HTML text changes instantly
    el.innerHTML = html;

    // Debounce heavy Mermaid rendering to keep editor typing fluid
    const timer = setTimeout(() => {
      renderMermaidDiagrams(el).catch(() => {
        /* keep raw mermaid source visible on failure */
      });
    }, 250);

    // Re-render on theme toggle to match theme styling
    const handleThemeChange = () => {
      el.innerHTML = html;
      renderMermaidDiagrams(el).catch(() => {});
    };

    const observer = new MutationObserver(handleThemeChange);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [html]);

  return <div ref={ref} className={className} />;
}
