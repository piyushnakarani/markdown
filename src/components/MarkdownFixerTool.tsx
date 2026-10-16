'use client';

import { Check, Copy, Download, FileUp, Sparkles, Trash2, Wand2 } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useMemo, useState } from 'react';

import MarkdownPreview from '@/components/MarkdownPreview';
import { event } from '@/lib/analytics';
import { convertMarkdownToHtml, downloadFile, readFileAsText } from '@/lib/converters';
import {
  fixBrokenMarkdown,
  type MarkdownFixChangeKey,
  SAMPLE_BROKEN_MARKDOWN,
} from '@/lib/markdown-fixer';

type ViewMode = 'fixed' | 'preview';

export default function MarkdownFixerTool() {
  const t = useTranslations('markdownFixer.tool');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [changes, setChanges] = useState<MarkdownFixChangeKey[]>([]);
  const [view, setView] = useState<ViewMode>('fixed');
  const [copied, setCopied] = useState(false);

  const runFix = useCallback(
    (source: string) => {
      const result = fixBrokenMarkdown(source);
      setOutput(result.fixed);
      setChanges(result.changes);
      event('markdown_fixer_run', { change_count: result.changes.length });
      return result;
    },
    [],
  );

  const handleFix = () => {
    runFix(input);
  };

  const handleSample = () => {
    setInput(SAMPLE_BROKEN_MARKDOWN);
    runFix(SAMPLE_BROKEN_MARKDOWN);
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setChanges([]);
  };

  const handleUpload = async (file: File) => {
    const text = await readFileAsText(file);
    setInput(text);
    runFix(text);
  };

  const handleCopy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!output) return;
    downloadFile(output, 'fixed-markdown.md', 'text/markdown;charset=utf-8');
  };

  const [previewHtml, setPreviewHtml] = useState('');

  useEffect(() => {
    let cancelled = false;
    const md = output || input || '';
    convertMarkdownToHtml(md).then((html) => {
      if (!cancelled) setPreviewHtml(html);
    });
    return () => {
      cancelled = true;
    };
  }, [output, input]);

  const changeLabels = useMemo(
    () =>
      changes.map((key) => ({
        key,
        label: t(`change_${key}` as Parameters<typeof t>[0]),
      })),
    [changes, t],
  );

  return (
    <section className="page-container py-6 sm:py-8">
      <div className="markdown-fixer-workspace">
        <div className="markdown-fixer-toolbar">
          <button type="button" className="btn-primary" onClick={handleFix}>
            <Wand2 className="w-4 h-4" aria-hidden />
            {t('fixButton')}
          </button>
          <button type="button" className="btn-secondary" onClick={handleSample}>
            <Sparkles className="w-4 h-4" aria-hidden />
            {t('sampleButton')}
          </button>
          <label className="btn-secondary cursor-pointer">
            <FileUp className="w-4 h-4" aria-hidden />
            {t('uploadButton')}
            <input
              type="file"
              accept=".md,.markdown,.txt"
              className="sr-only"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleUpload(file);
                e.target.value = '';
              }}
            />
          </label>
          <button type="button" className="btn-ghost" onClick={handleClear}>
            <Trash2 className="w-4 h-4" aria-hidden />
            {t('clearButton')}
          </button>
          <div className="markdown-fixer-toolbar-spacer" />
          <button
            type="button"
            className={`btn-ghost ${view === 'fixed' ? 'text-[var(--accent)]' : ''}`}
            onClick={() => setView('fixed')}
          >
            {t('tabFixed')}
          </button>
          <button
            type="button"
            className={`btn-ghost ${view === 'preview' ? 'text-[var(--accent)]' : ''}`}
            onClick={() => setView('preview')}
          >
            {t('tabPreview')}
          </button>
        </div>

        <div className="markdown-fixer-panes">
          <div className="markdown-fixer-pane">
            <label className="markdown-fixer-label" htmlFor="markdown-fixer-input">
              {t('inputLabel')}
            </label>
            <textarea
              id="markdown-fixer-input"
              className="markdown-fixer-textarea"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t('inputPlaceholder')}
              spellCheck={false}
            />
          </div>
          <div className="markdown-fixer-pane">
            <div className="markdown-fixer-pane-head">
              <span className="markdown-fixer-label">{t('outputLabel')}</span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  className="btn-ghost py-1 px-2"
                  onClick={handleCopy}
                  disabled={!output}
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? t('copied') : t('copyButton')}
                </button>
                <button
                  type="button"
                  className="btn-ghost py-1 px-2"
                  onClick={handleDownload}
                  disabled={!output}
                >
                  <Download className="w-3.5 h-3.5" />
                  {t('downloadButton')}
                </button>
              </div>
            </div>
            {view === 'fixed' ? (
              <textarea
                className="markdown-fixer-textarea markdown-fixer-textarea--readonly"
                value={output}
                readOnly
                placeholder={t('outputPlaceholder')}
                spellCheck={false}
              />
            ) : (
              <div className="markdown-fixer-preview">
                <MarkdownPreview html={previewHtml} />
              </div>
            )}
          </div>
        </div>

        <aside className="markdown-fixer-changes" aria-live="polite">
          <h3 className="markdown-fixer-changes-title">{t('changesTitle')}</h3>
          {changeLabels.length === 0 ? (
            <p className="markdown-fixer-changes-empty">{t('noChanges')}</p>
          ) : (
            <ul className="markdown-fixer-changes-list">
              {changeLabels.map(({ key, label }) => (
                <li key={key}>
                  <Check className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" aria-hidden />
                  {label}
                </li>
              ))}
            </ul>
          )}
        </aside>
      </div>
    </section>
  );
}
