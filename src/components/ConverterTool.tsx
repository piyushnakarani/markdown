'use client';

import type { LucideIcon } from 'lucide-react';
import {
  Check,
  Code2,
  Copy,
  Download,
  Eye,
  FileCode,
  FileSpreadsheet,
  FileText,
  FileType,
  FileUp,
  PenLine,
  Trash2,
  Upload,
  X,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useRef, useState } from 'react';

import {
  type EditorToolbarAction,
  type EditorToolbarActionVariant,
  EditorToolbarBar,
  EditorToolbarDivider,
  EditorToolbarEnd,
  EditorToolbarStart,
} from '@/components/EditorToolbar';
import ExportOverlay from '@/components/ExportOverlay';
import MarkdownPreview from '@/components/MarkdownPreview';
import { event } from '@/lib/analytics';
import {
  buildHtmlDocument,
  buildTxtDocument,
  convertMarkdownToHtml,
  convertMarkdownToPdf,
  convertMarkdownToTxt,
  downloadFile,
  type ExportProgressStage,
  getExportOverlayProps,
  getHtmlExportStages,
  getPdfExportStages,
  getTxtExportStages,
  getDocxExportStages,
  markdownHasMermaid,
  readFileAsText,
} from '@/lib/converters';
import { buildDocxDocument, downloadDocxBlob } from '@/lib/docx-export';
import { syncProportionalScroll } from '@/lib/editor-scroll-sync';
import {
  applyMarkdownPaste,
  normalizeMermaidInMarkdown,
  pastedTextHasRawMermaid,
} from '@/lib/mermaid-normalize';

export type ConvertType = 'pdf' | 'html' | 'txt' | 'docx';

const DEFAULT_MD = `# My Document

Write **Markdown** here and preview it live on the right.

## Features
- Headings, lists, and code blocks
- Tables and blockquotes
- Export with one click

\`\`\`js
console.log('Hello world');
\`\`\`
`;

const FORMAT: Record<
  ConvertType,
  { label: string; gradient: string; icon: LucideIcon; ext: string }
> = {
  pdf: { label: 'PDF', gradient: 'from-red-600 to-orange-500', icon: FileText, ext: 'pdf' },
  html: { label: 'HTML', gradient: 'from-amber-600 to-yellow-500', icon: FileCode, ext: 'html' },
  txt: { label: 'TXT', gradient: 'from-emerald-600 to-green-500', icon: FileType, ext: 'txt' },
  docx: { label: 'DOCX', gradient: 'from-blue-600 to-indigo-500', icon: FileSpreadsheet, ext: 'docx' },
};

export default function ConverterTool({ type }: { type: ConvertType }) {
  const t = useTranslations('converter');
  const te = useTranslations('editor');
  const fmt = FORMAT[type];

  const [markdown, setMarkdown] = useState(DEFAULT_MD);
  const [fileName, setFileName] = useState('');
  const [exporting, setExporting] = useState<'pdf' | 'html' | 'txt' | 'docx' | null>(null);
  const [exportStage, setExportStage] = useState<ExportProgressStage>('preparing');
  const [exportStages, setExportStages] = useState<ExportProgressStage[]>([]);
  const [copied, setCopied] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [toast, setToast] = useState('');
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [htmlView, setHtmlView] = useState<'preview' | 'code'>('preview');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);
  const previewScrollRef = useRef<HTMLDivElement>(null);
  const scrollSyncLockRef = useRef(false);

  const [html, setHtml] = useState('');
  const [plainText, setPlainText] = useState('');

  useEffect(() => {
    let isMounted = true;
    convertMarkdownToHtml(markdown).then(res => {
      if (isMounted) setHtml(res);
    });
    convertMarkdownToTxt(markdown).then(res => {
      if (isMounted) setPlainText(res);
    });
    return () => { isMounted = false; };
  }, [markdown]);
  const lineCount = Math.max(markdown.split('\n').length, 12);
  const lineNumbers = Array.from({ length: lineCount }, (_, i) => i + 1);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const baseName = () => fileName.replace(/\.[^/.]+$/, '') || 'document';

  const handleFile = useCallback(async (file: File) => {
    if (!file.name.match(/\.(md|markdown|txt)$/i)) {
      showToast('Please upload a .md or .txt file');
      return;
    }
    try {
      const text = normalizeMermaidInMarkdown(await readFileAsText(file));
      setMarkdown(text);
      setFileName(file.name);
      showToast(t('fileLoaded'));
      event('upload_file', {
        file_name: file.name,
        file_size: file.size,
        tool_type: type,
        tool: 'converter',
      });
    } catch {
      showToast(t('errorMessage'));
    }
  }, [t, type]);

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) await handleFile(file);
  };

  const handleExport = async () => {
    if (!markdown.trim()) return;
    const hasMermaid = markdownHasMermaid(markdown);
    const stages =
      type === 'pdf'
        ? getPdfExportStages(hasMermaid)
        : type === 'html'
          ? getHtmlExportStages(hasMermaid)
          : type === 'docx'
            ? getDocxExportStages(hasMermaid)
            : getTxtExportStages();
    setExportStages(stages);
    setExportStage(stages[0]);
    setExporting(type);
    event('export_file', {
      format: type,
      has_mermaid: hasMermaid,
      char_count: markdown.length,
      tool: 'converter',
    });
    const onProgress = (stage: ExportProgressStage) => setExportStage(stage);
    try {
      const name = baseName();
      if (type === 'pdf') {
        await convertMarkdownToPdf(markdown, `${name}.pdf`, onProgress);
      } else if (type === 'html') {
        const fullHtml = await buildHtmlDocument(markdown, name, onProgress);
        onProgress('finalizing');
        downloadFile(fullHtml, `${name}.html`, 'text/html');
      } else if (type === 'docx') {
        const blob = await buildDocxDocument(markdown, `${name}.docx`, onProgress);
        onProgress('finalizing');
        downloadDocxBlob(blob, `${name}.docx`);
      } else {
        const txt = await buildTxtDocument(markdown, `${name}.txt`, onProgress);
        onProgress('finalizing');
        downloadFile(txt, `${name}.txt`, 'text/plain');
      }
      showToast(t('successMessage'));
    } catch {
      showToast(t('errorMessage'));
    } finally {
      setExporting(null);
      setExportStages([]);
    }
  };

  const exportOverlayProps = exporting
    ? getExportOverlayProps(te, exportStages, exportStage)
    : null;

  const handleCopy = async () => {
    const content = type === 'html' ? html : plainText;
    if (!content) return;
    await navigator.clipboard.writeText(content);
    setCopied(true);
    event('copy_output', {
      format: type,
      char_count: content.length,
      tool: 'converter',
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const syncLineNumbers = (scrollTop: number) => {
    if (lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = scrollTop;
    }
  };

  const handleTextareaScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    const textarea = e.currentTarget;
    syncLineNumbers(textarea.scrollTop);

    const preview = previewScrollRef.current;
    if (!preview || scrollSyncLockRef.current) return;

    scrollSyncLockRef.current = true;
    syncProportionalScroll(textarea, preview);
    requestAnimationFrame(() => {
      scrollSyncLockRef.current = false;
    });
  };

  const handlePreviewScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const preview = e.currentTarget;
    const textarea = textareaRef.current;
    if (!textarea || scrollSyncLockRef.current) return;

    scrollSyncLockRef.current = true;
    syncProportionalScroll(preview, textarea);
    syncLineNumbers(textarea.scrollTop);
    requestAnimationFrame(() => {
      scrollSyncLockRef.current = false;
    });
  };

  const clearAll = () => {
    setMarkdown('');
    setFileName('');
    event('clear_editor', {
      tool: 'converter',
      type: type,
    });
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const pasted = e.clipboardData.getData('text/plain');
    if (!pastedTextHasRawMermaid(pasted)) return;

    e.preventDefault();
    const ta = e.currentTarget;
    const { text, cursor } = applyMarkdownPaste(markdown, pasted, ta.selectionStart, ta.selectionEnd);
    setMarkdown(text);
    requestAnimationFrame(() => {
      ta.focus();
      ta.setSelectionRange(cursor, cursor);
    });
  };

  const ExportIcon = fmt.icon;

  const exportVariant: EditorToolbarActionVariant =
    type === 'pdf' ? 'pdf' : type === 'html' ? 'html' : type === 'docx' ? 'docx' : 'txt';

  const toolbarActions: EditorToolbarAction[] = [
    ...(type !== 'pdf'
      ? [
          {
            id: 'copy',
            icon: copied ? Check : Copy,
            label: copied ? te('copied') : t('copyOutput'),
            shortLabel: copied ? te('copied') : te('copy'),
            onClick: handleCopy,
            disabled: !markdown.trim() || exporting !== null,
            variant: 'copy' as const,
            active: copied,
          },
        ]
      : []),
    {
      id: 'export',
      icon: Download,
      label: `${t('download')} ${fmt.label}`,
      shortLabel: fmt.label,
      onClick: handleExport,
      disabled: !markdown.trim() || exporting !== null,
      loading: exporting === type,
      variant: exportVariant,
    },
  ];

  return (
    <div className="editor-shell relative">
      {exportOverlayProps && <ExportOverlay {...exportOverlayProps} />}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-primary)] text-sm font-medium shadow-lg animate-fade-in">
          <Check className="w-4 h-4 text-emerald-500" />
          {toast}
        </div>
      )}

      <EditorToolbarBar>
        <EditorToolbarStart>
          <input
            ref={fileInputRef}
            type="file"
            accept=".md,.markdown,.txt"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="btn-secondary px-3 py-2 text-sm h-10"
          >
            <Upload className="w-4 h-4 text-[#3b82f6]" />
            {te('upload')}
          </button>

          {fileName && (
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-xs text-[var(--text-secondary)]">
              <FileText className="w-3.5 h-3.5" />
              {fileName}
              <button
                type="button"
                onClick={() => { setFileName(''); setMarkdown(DEFAULT_MD); }}
                className="ml-1 text-[var(--text-tertiary)] hover:text-red-500"
                aria-label="Clear file"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          )}

          <EditorToolbarDivider className="hidden sm:block" />

          <button
            type="button"
            onClick={clearAll}
            className="btn-secondary px-3 py-2 text-sm h-10 text-[var(--text-secondary)] hover:text-red-500 hover:border-red-500/30"
          >
            <Trash2 className="w-4 h-4" />
            <span className="hidden sm:inline">{te('clear')}</span>
          </button>
        </EditorToolbarStart>

        <EditorToolbarEnd actions={toolbarActions} />

        <div className="editor-toolbar-tabs">
          <button
            type="button"
            onClick={() => {
              setActiveTab('editor');
              event('change_tab', { tab: 'editor', tool: 'converter', type });
            }}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-semibold transition-colors ${
              activeTab === 'editor' ? 'bg-[#3b82f6] text-white' : 'text-[var(--text-secondary)]'
            }`}
          >
            <PenLine className="w-3.5 h-3.5" />
            {te('editorTab')}
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('preview');
              event('change_tab', { tab: 'preview', tool: 'converter', type });
            }}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-semibold transition-colors ${
              activeTab === 'preview' ? 'bg-[#3b82f6] text-white' : 'text-[var(--text-secondary)]'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            {te('previewTab')}
          </button>
        </div>
      </EditorToolbarBar>

      {/* Editor + Preview */}
      <div
        className="editor-workspace relative"
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        {/* Editor panel */}
        <div className={`flex flex-col relative min-h-0 border-r border-[var(--border-color)] ${activeTab !== 'editor' ? 'hidden md:flex' : 'flex'}`}>
          {isDragging && (
            <div className="absolute inset-0 z-20 bg-[var(--bg-secondary)]/95 backdrop-blur-sm border-2 border-dashed border-[#3b82f6] m-3 rounded-xl flex flex-col items-center justify-center">
              <FileUp className="w-10 h-10 text-[#3b82f6] mb-3" />
              <p className="font-semibold text-[var(--text-primary)]">{t('dragDrop')}</p>
            </div>
          )}

          <div className="editor-pane-header">
            <div className="flex items-center gap-2 text-xs font-bold text-[var(--text-secondary)]">
              <div className="flex items-center gap-1.5 mr-1">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
              </div>
              <PenLine className="w-4 h-4 text-[#3b82f6]" />
              {te('editorTab')}
            </div>
            <span className="text-[10px] font-mono font-bold text-[var(--text-tertiary)] uppercase">{markdown.length} chars</span>
          </div>

          <div className="editor-pane-body flex font-mono text-sm">
            <div ref={lineNumbersRef} className="editor-line-numbers">
              {lineNumbers.map((n) => (
                <div key={n}>{n}</div>
              ))}
            </div>
            <textarea
              ref={textareaRef}
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              onPaste={handlePaste}
              onScroll={handleTextareaScroll}
              placeholder={t('pasteHere')}
              className="editor-textarea"
              spellCheck={false}
              dir="auto"
              aria-label="Markdown editor"
            />
          </div>
        </div>

        {/* Preview panel */}
        <div className={`flex flex-col min-h-0 bg-[var(--bg-primary)] ${activeTab !== 'preview' ? 'hidden md:flex' : 'flex'}`}>
          <div className="editor-pane-header">
            <div className="flex items-center gap-2 text-xs font-bold text-[var(--text-secondary)]">
              <ExportIcon className="w-4 h-4" style={{ color: type === 'pdf' ? '#8b5cf6' : type === 'html' ? '#f59e0b' : type === 'docx' ? '#3b82f6' : '#10b981' }} />
              {type === 'txt' ? t('outputTitle') : te('previewTab')}
            </div>

            {type === 'html' && (
              <div className="flex items-center gap-0.5 bg-[var(--bg-primary)] p-0.5 rounded-lg border border-[var(--border-color)]">
                <button
                  type="button"
                  onClick={() => {
                    setHtmlView('preview');
                    event('change_html_view', { view: 'preview', tool: 'converter' });
                  }}
                  className={`flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-semibold transition-colors ${
                    htmlView === 'preview' ? 'bg-[#3b82f6] text-white' : 'text-[var(--text-secondary)]'
                  }`}
                >
                  <Eye className="w-3 h-3" />
                  {t('preview')}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setHtmlView('code');
                    event('change_html_view', { view: 'code', tool: 'converter' });
                  }}
                  className={`flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-semibold transition-colors ${
                    htmlView === 'code' ? 'bg-[#3b82f6] text-white' : 'text-[var(--text-secondary)]'
                  }`}
                >
                  <Code2 className="w-3 h-3" />
                  {t('rawOutput')}
                </button>
              </div>
            )}
          </div>

          <div
            ref={previewScrollRef}
            className="editor-pane-body editor-pane-scroll"
            onScroll={handlePreviewScroll}
          >
            {type === 'txt' ? (
              <pre className="text-sm text-[var(--text-primary)] whitespace-pre-wrap font-mono leading-relaxed">
                {plainText || t('noOutput')}
              </pre>
            ) : type === 'html' && htmlView === 'code' ? (
              <pre className="text-xs sm:text-sm font-mono text-[var(--text-primary)] whitespace-pre-wrap break-words leading-relaxed">
                {html}
              </pre>
            ) : (
              <MarkdownPreview html={html} className="markdown-preview text-sm" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
