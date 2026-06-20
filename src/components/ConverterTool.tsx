'use client';

import { useState, useCallback, useRef } from 'react';
import { useTranslations } from 'next-intl';
import {
  convertMarkdownToHtml,
  convertMarkdownToPdf,
  convertMarkdownToTxt,
  buildHtmlDocument,
  buildTxtDocument,
  downloadFile,
  readFileAsText,
} from '@/lib/converters';
import MarkdownPreview from '@/components/MarkdownPreview';
import ExportOverlay from '@/components/ExportOverlay';
import {
  EditorToolbarBar,
  EditorToolbarStart,
  EditorToolbarEnd,
  EditorToolbarDivider,
  type EditorToolbarAction,
  type EditorToolbarActionVariant,
} from '@/components/EditorToolbar';
import {
  Upload,
  Download,
  Trash2,
  FileText,
  FileCode,
  FileType,
  Eye,
  PenLine,
  FileUp,
  Check,
  X,
  Copy,
  Code2,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export type ConvertType = 'pdf' | 'html' | 'txt';

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
};

export default function ConverterTool({ type }: { type: ConvertType }) {
  const t = useTranslations('converter');
  const te = useTranslations('editor');
  const fmt = FORMAT[type];

  const [markdown, setMarkdown] = useState(DEFAULT_MD);
  const [fileName, setFileName] = useState('');
  const [exporting, setExporting] = useState<'pdf' | 'html' | 'txt' | null>(null);
  const [copied, setCopied] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [toast, setToast] = useState('');
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [htmlView, setHtmlView] = useState<'preview' | 'code'>('preview');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);

  const html = convertMarkdownToHtml(markdown);
  const plainText = convertMarkdownToTxt(markdown);
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
      const text = await readFileAsText(file);
      setMarkdown(text);
      setFileName(file.name);
      showToast(t('fileLoaded'));
    } catch {
      showToast(t('errorMessage'));
    }
  }, [t]);

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) await handleFile(file);
  };

  const handleExport = async () => {
    if (!markdown.trim()) return;
    setExporting(type);
    try {
      const name = baseName();
      if (type === 'pdf') {
        await convertMarkdownToPdf(markdown, `${name}.pdf`);
      } else if (type === 'html') {
        const fullHtml = await buildHtmlDocument(markdown, name);
        downloadFile(fullHtml, `${name}.html`, 'text/html');
      } else {
        const txt = await buildTxtDocument(markdown, `${name}.txt`);
        downloadFile(txt, `${name}.txt`, 'text/plain');
      }
      showToast(t('successMessage'));
    } catch {
      showToast(t('errorMessage'));
    } finally {
      setExporting(null);
    }
  };

  const exportMessage =
    exporting === 'pdf'
      ? te('exportingPdf')
      : exporting === 'html'
        ? te('exportingHtml')
        : exporting === 'txt'
          ? te('exportingTxt')
          : '';

  const handleCopy = async () => {
    const content = type === 'html' ? html : plainText;
    if (!content) return;
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTextareaScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    if (lineNumbersRef.current) {
      lineNumbersRef.current.scrollTop = e.currentTarget.scrollTop;
    }
  };

  const clearAll = () => {
    setMarkdown('');
    setFileName('');
  };

  const ExportIcon = fmt.icon;

  const exportVariant: EditorToolbarActionVariant =
    type === 'pdf' ? 'pdf' : type === 'html' ? 'html' : 'txt';

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
      {exporting && <ExportOverlay message={exportMessage} />}
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
            onClick={() => setActiveTab('editor')}
            className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-semibold transition-colors ${
              activeTab === 'editor' ? 'bg-[#3b82f6] text-white' : 'text-[var(--text-secondary)]'
            }`}
          >
            <PenLine className="w-3.5 h-3.5" />
            {te('editorTab')}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('preview')}
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
              <ExportIcon className="w-4 h-4" style={{ color: type === 'pdf' ? '#8b5cf6' : type === 'html' ? '#f59e0b' : '#10b981' }} />
              {type === 'txt' ? t('outputTitle') : te('previewTab')}
            </div>

            {type === 'html' && (
              <div className="flex items-center gap-0.5 bg-[var(--bg-primary)] p-0.5 rounded-lg border border-[var(--border-color)]">
                <button
                  type="button"
                  onClick={() => setHtmlView('preview')}
                  className={`flex items-center gap-1 px-2 py-1 rounded-md text-[10px] font-semibold transition-colors ${
                    htmlView === 'preview' ? 'bg-[#3b82f6] text-white' : 'text-[var(--text-secondary)]'
                  }`}
                >
                  <Eye className="w-3 h-3" />
                  {t('preview')}
                </button>
                <button
                  type="button"
                  onClick={() => setHtmlView('code')}
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

          <div className="editor-pane-body editor-pane-scroll">
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
