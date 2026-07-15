'use client';

import {
  Bold,
  Code,
  Download,
  Eye,
  FileCode,
  FileText,
  FileType,
  Heading,
  Italic,
  Link2,
  List,
  PenLine,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

import MarkdownPreview from '@/components/MarkdownPreview';
import { convertMarkdownToHtml } from '@/lib/markdown';

const DEMO_MARKDOWN = `# Premium Markdown

Convert to **PDF**, **HTML**, and **TXT** instantly.

- Client-side processing
- Live preview as you type
- One-click export

\`\`\`js
export('document.pdf');
\`\`\`
`;

const TYPING_MS = 32;
const PAUSE_MS = 2800;

function useTypingAnimation(fullText: string) {
  const [length, setLength] = useState(0);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      setLength(fullText.length);
      return;
    }

    let index = 0;
    let timeoutId: ReturnType<typeof setTimeout>;

    const tick = () => {
      if (index < fullText.length) {
        index += 1;
        setLength(index);
        timeoutId = setTimeout(tick, TYPING_MS);
        return;
      }
      timeoutId = setTimeout(() => {
        index = 0;
        setLength(0);
        timeoutId = setTimeout(tick, TYPING_MS);
      }, PAUSE_MS);
    };

    timeoutId = setTimeout(tick, TYPING_MS);
    return () => clearTimeout(timeoutId);
  }, [fullText]);

  return fullText.slice(0, length);
}

function highlightDemoLine(line: string) {
  if (line.startsWith('# ')) {
    return <span className="syntax-heading">{line}</span>;
  }
  if (line.startsWith('## ')) {
    return <span className="syntax-heading">{line}</span>;
  }
  if (line.startsWith('- ')) {
    return <span className="syntax-list">{line}</span>;
  }
  if (line.startsWith('```')) {
    return <span className="syntax-code">{line}</span>;
  }

  const parts = line.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <span key={i} className="syntax-bold">
          {part}
        </span>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

export default function HeroEditorDemo() {
  const typed = useTypingAnimation(DEMO_MARKDOWN);
  const lines = typed.split('\n');
  const lineCount = Math.max(lines.length, 8);
  const lineNumbers = Array.from({ length: lineCount }, (_, i) => i + 1);
  const [previewHtml, setPreviewHtml] = useState('');

  useEffect(() => {
    let isMounted = true;
    convertMarkdownToHtml(typed).then((res) => {
      if (isMounted) setPreviewHtml(res);
    });
    return () => {
      isMounted = false;
    };
  }, [typed]);

  return (
    <div
      className="hero-editor-demo glow-border select-none"
      aria-hidden
      inert
    >
      <div className="hero-editor-demo-toolbar">
        <div className="hero-editor-demo-format">
          {[Bold, Italic, Heading, Link2, Code, List].map((Icon, i) => (
            <span key={i} className="hero-editor-demo-format-btn">
              <Icon className="w-4 h-4" strokeWidth={2} />
            </span>
          ))}
        </div>

        <div className="hero-editor-demo-exports">
          <span className="hero-editor-demo-export hero-editor-demo-export--pdf">
            <Download className="w-3.5 h-3.5" />
            PDF
          </span>
          <span className="hero-editor-demo-export hero-editor-demo-export--html">
            <Download className="w-3.5 h-3.5" />
            HTML
          </span>
          <span className="hero-editor-demo-export hero-editor-demo-export--txt">
            <Download className="w-3.5 h-3.5" />
            TXT
          </span>
        </div>
      </div>

      <div className="hero-editor-demo-workspace editor-workspace editor-workspace-embedded">
        <div className="flex flex-col min-h-0 border-r border-[var(--border-color)]">
          <div className="editor-pane-header">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
              </div>
              <span className="w-px h-3.5 bg-[var(--border-color)] mx-1" />
              <PenLine className="w-4 h-4 text-[#3b82f6]" />
              <span className="text-xs font-bold text-[var(--text-secondary)]">Editor</span>
            </div>
          </div>

          <div className="editor-pane-body flex font-mono text-sm">
            <div className="editor-line-numbers" aria-hidden>
              {lineNumbers.map((num) => (
                <div key={num}>{num}</div>
              ))}
            </div>
            <pre className="hero-editor-demo-code">
              {lines.map((line, i) => (
                <div key={i}>
                  {highlightDemoLine(line)}
                  {i === lines.length - 1 ? <span className="hero-editor-cursor" /> : null}
                </div>
              ))}
            </pre>
          </div>
        </div>

        <div className="flex flex-col min-h-0 bg-[var(--bg-primary)]">
          <div className="editor-pane-header">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-[#8b5cf6]" />
              <span className="text-xs font-bold text-[var(--text-secondary)]">Preview</span>
            </div>
            <div className="flex items-center gap-1">
              <FileText className="w-3 h-3 text-red-400" />
              <FileCode className="w-3 h-3 text-amber-400" />
              <FileType className="w-3 h-3 text-emerald-400" />
            </div>
          </div>

          <div className="editor-pane-body editor-pane-scroll p-5 sm:p-6">
            <MarkdownPreview html={previewHtml} className="markdown-preview text-sm max-w-none" />
          </div>
        </div>
      </div>
    </div>
  );
}
