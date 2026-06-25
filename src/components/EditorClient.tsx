'use client';

import {
  Bold,
  Check,
  Code,
  Copy,
  Eye,
  FileCode,
  FileText,
  FileType,
  FileUp,
  Heading,
  Image,
  Italic,
  Link2,
  List,
  PenLine,
  Quote,
  Table,
  Trash2,
  Upload,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCallback, useRef,useState } from 'react';

import {
  type EditorToolbarAction,
  EditorToolbarBar,
  EditorToolbarDivider,
  EditorToolbarEnd,
  EditorToolbarFormatButton,
  EditorToolbarFormatGroup,
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
  downloadFile,
  type ExportProgressStage,
  getExportOverlayProps,
  getHtmlExportStages,
  getPdfExportStages,
  getTxtExportStages,
  markdownHasMermaid,
  readFileAsText,
} from '@/lib/converters';
import { syncProportionalScroll } from '@/lib/editor-scroll-sync';

const EMBEDDED_DEFAULT_MARKDOWN = `# Premium Markdown

Convert markdown to **PDF**, **HTML**, and **TXT** instantly.

- Client-side processing
- Fast & secure browser engine
- Live preview as you type
`;

export type EditorClientProps = {
  variant?: 'page' | 'embedded' | 'hero';
  defaultMarkdown?: string;
  className?: string;
  translationNamespace?: 'editor' | 'livePreview';
};

export default function EditorClient({
  variant = 'page',
  defaultMarkdown,
  className = '',
  translationNamespace = 'editor',
}: EditorClientProps) {
  const t = useTranslations(translationNamespace);
  const isEmbedded = variant === 'embedded' || variant === 'hero';
  const isHero = variant === 'hero';
  const initialMarkdown =
    defaultMarkdown ?? (isEmbedded ? EMBEDDED_DEFAULT_MARKDOWN : t('placeholder'));
  const [markdown, setMarkdown] = useState(initialMarkdown);
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [copied, setCopied] = useState(false);
  const [exporting, setExporting] = useState<'pdf' | 'html' | 'txt' | null>(null);
  const [exportStage, setExportStage] = useState<ExportProgressStage>('preparing');
  const [exportStages, setExportStages] = useState<ExportProgressStage[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);
  const previewScrollRef = useRef<HTMLDivElement>(null);
  const scrollSyncLockRef = useRef(false);

  const html = convertMarkdownToHtml(markdown);

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

  const insertSyntax = (before: string, after: string = '') => {
    const ta = textareaRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const selected = markdown.slice(start, end);
    const replacement = `${before}${selected || 'text'}${after}`;
    const newText = markdown.slice(0, start) + replacement + markdown.slice(end);
    setMarkdown(newText);
    event('use_formatting_toolbar', {
      syntax: before.trim() || after.trim() || 'unknown',
      tool: 'editor',
      variant,
    });
    setTimeout(() => {
      ta.focus();
      ta.setSelectionRange(start + before.length, start + before.length + (selected || 'text').length);
    }, 0);
  };

  const toolbarButtons = [
    { icon: Bold, action: () => insertSyntax('**', '**'), label: t('boldTooltip') },
    { icon: Italic, action: () => insertSyntax('*', '*'), label: t('italicTooltip') },
    { icon: Heading, action: () => insertSyntax('## '), label: t('headingTooltip') },
    { icon: Link2, action: () => insertSyntax('[', '](url)'), label: t('linkTooltip') },
    { icon: Image, action: () => insertSyntax('![alt](', ')'), label: t('imageTooltip') },
    { icon: Code, action: () => insertSyntax('`', '`'), label: t('codeTooltip') },
    { icon: List, action: () => insertSyntax('- '), label: t('listTooltip') },
    { icon: Quote, action: () => insertSyntax('> '), label: t('quoteTooltip') },
    { icon: Table, action: () => insertSyntax('| Header | Header |\n| --- | --- |\n| Cell | Cell |'), label: t('tableTooltip') },
  ];

  const handleFileUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const text = await readFileAsText(file);
    setMarkdown(text);
    event('upload_file', {
      file_name: file.name,
      file_size: file.size,
      tool_type: variant,
      tool: 'editor',
      method: 'input',
    });
  }, [variant]);

  // Drag and Drop implementation
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const text = await readFileAsText(file);
      setMarkdown(text);
      event('upload_file', {
        file_name: file.name,
        file_size: file.size,
        tool_type: variant,
        tool: 'editor',
        method: 'drag_and_drop',
      });
    }
  };

  const beginExport = (format: 'pdf' | 'html' | 'txt') => {
    const hasMermaid = markdownHasMermaid(markdown);
    const stages =
      format === 'pdf'
        ? getPdfExportStages(hasMermaid)
        : format === 'html'
          ? getHtmlExportStages(hasMermaid)
          : getTxtExportStages();
    setExportStages(stages);
    setExportStage(stages[0]);
    setExporting(format);
    return (stage: ExportProgressStage) => setExportStage(stage);
  };

  const endExport = () => {
    setExporting(null);
    setExportStages([]);
  };

  const handleExportPdf = async () => {
    const onProgress = beginExport('pdf');
    event('export_file', {
      format: 'pdf',
      has_mermaid: markdownHasMermaid(markdown),
      char_count: markdown.length,
      tool: 'editor',
      variant,
    });
    try {
      await convertMarkdownToPdf(markdown, 'document.pdf', onProgress);
    } finally {
      endExport();
    }
  };

  const handleExportHtml = async () => {
    const onProgress = beginExport('html');
    event('export_file', {
      format: 'html',
      has_mermaid: markdownHasMermaid(markdown),
      char_count: markdown.length,
      tool: 'editor',
      variant,
    });
    try {
      const fullHtml = await buildHtmlDocument(markdown, 'document', onProgress);
      onProgress('finalizing');
      downloadFile(fullHtml, 'document.html', 'text/html');
    } finally {
      endExport();
    }
  };

  const handleExportTxt = async () => {
    const onProgress = beginExport('txt');
    event('export_file', {
      format: 'txt',
      char_count: markdown.length,
      tool: 'editor',
      variant,
    });
    try {
      const txt = await buildTxtDocument(markdown, 'document.txt', onProgress);
      onProgress('finalizing');
      downloadFile(txt, 'document.txt', 'text/plain');
    } finally {
      endExport();
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(markdown);
    setCopied(true);
    event('copy_output', {
      format: 'markdown',
      char_count: markdown.length,
      tool: 'editor',
      variant,
    });
    setTimeout(() => setCopied(false), 2000);
  };

  // Generate mock line numbers
  const lineCount = markdown.split('\n').length;
  const minLines = 12;
  const lineNumbers = Array.from({ length: Math.max(lineCount, minLines) }, (_, i) => i + 1);

  const panelSplitClass = (tab: 'editor' | 'preview') => {
    if (activeTab === tab) return 'flex';
    return 'hidden md:flex';
  };

  const exportOverlayProps = exporting
    ? getExportOverlayProps(t, exportStages, exportStage)
    : null;

  const toolbarActions: EditorToolbarAction[] = [
    {
      id: 'copy',
      icon: copied ? Check : Copy,
      label: copied ? t('copied') : t('copy'),
      shortLabel: copied ? t('copied') : t('copy'),
      onClick: handleCopy,
      variant: 'copy',
      active: copied,
      disabled: exporting !== null,
    },
    {
      id: 'export-pdf',
      icon: FileText,
      label: t('exportPdf'),
      shortLabel: 'PDF',
      onClick: handleExportPdf,
      disabled: exporting !== null,
      loading: exporting === 'pdf',
      variant: 'pdf',
    },
    {
      id: 'export-html',
      icon: FileCode,
      label: t('exportHtml'),
      shortLabel: 'HTML',
      onClick: handleExportHtml,
      disabled: exporting !== null,
      loading: exporting === 'html',
      variant: 'html',
    },
    {
      id: 'export-txt',
      icon: FileType,
      label: t('exportTxt'),
      shortLabel: 'TXT',
      onClick: handleExportTxt,
      disabled: exporting !== null,
      loading: exporting === 'txt',
      variant: 'txt',
    },
  ];

  const mobileTabsClass = isHero
    ? 'editor-toolbar-tabs editor-toolbar-tabs--hero'
    : 'editor-toolbar-tabs';

  const shellClass = isHero
    ? `editor-shell-embedded editor-shell-hero home-editor-card w-full ${className}`.trim()
    : isEmbedded
      ? `editor-shell-embedded w-full glow-border ${className}`.trim()
      : `editor-shell ${className}`.trim();

  const workspaceClass = [
    'editor-workspace relative',
    isEmbedded ? 'editor-workspace--card' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={shellClass}>
      {exportOverlayProps && <ExportOverlay {...exportOverlayProps} />}
      <EditorToolbarBar className={`relative z-20${isHero ? ' editor-toolbar--hero' : ''}`}>
        <EditorToolbarStart>
          <div className={isHero ? 'editor-toolbar-format-wrap hidden sm:flex' : undefined}>
            <EditorToolbarFormatGroup>
              {toolbarButtons.map((btn, i) => (
                <EditorToolbarFormatButton
                  key={i}
                  icon={btn.icon}
                  label={btn.label}
                  onClick={btn.action}
                />
              ))}
            </EditorToolbarFormatGroup>
          </div>

          {isHero ? (
            <EditorToolbarDivider className="hidden sm:block" />
          ) : (
            <EditorToolbarDivider className="hidden md:block" />
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept=".md,.markdown,.txt"
            onChange={handleFileUpload}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="btn-secondary px-3 py-2 text-xs h-9 font-semibold hover:border-[#3b82f6]"
          >
            <Upload className="w-4 h-4 text-[#3b82f6]" />
            <span className="hidden sm:inline">{t('upload')}</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setMarkdown('');
              event('clear_editor', { tool: 'editor', variant });
            }}
            className="btn-secondary px-3 py-2 text-xs h-9 font-semibold hover:border-red-500 hover:bg-red-500/5 text-red-400"
          >
            <Trash2 className="w-4 h-4" />
            <span className="hidden sm:inline">{t('clear')}</span>
          </button>
        </EditorToolbarStart>

        <EditorToolbarEnd actions={toolbarActions} />

        <div className={mobileTabsClass}>
          <button
            type="button"
            onClick={() => {
              setActiveTab('editor');
              event('change_tab', { tab: 'editor', tool: 'editor', variant });
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 ${
              activeTab === 'editor' ? 'bg-[#3b82f6] text-white shadow-md' : 'text-[var(--text-secondary)]'
            }`}
          >
            <PenLine className="w-3.5 h-3.5" />
            {t('editorTab')}
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('preview');
              event('change_tab', { tab: 'preview', tool: 'editor', variant });
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 ${
              activeTab === 'preview' ? 'bg-[#3b82f6] text-white shadow-md' : 'text-[var(--text-secondary)]'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            {t('previewTab')}
          </button>
        </div>
      </EditorToolbarBar>

      {/* Editor & Preview Split screen */}
      <div className={workspaceClass}>
        
        {/* Editor Panel */}
        <div
          className={`flex flex-col relative min-h-0 border-r border-[var(--border-color)] ${panelSplitClass('editor')}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {/* File drag-and-drop active overlay */}
          {isDragging && (
            <div className="absolute inset-0 bg-[var(--bg-secondary)]/95 backdrop-blur-md border-2 border-dashed border-[#3b82f6] m-3 rounded-xl flex flex-col items-center justify-center z-30 animate-fade-in">
              <FileUp className="w-12 h-12 text-[#3b82f6] mb-4 animate-float" />
              <p className="font-extrabold text-[var(--text-primary)]">Drop your Markdown file here</p>
              <p className="text-xs text-[var(--text-tertiary)] mt-1">Supports .md, .markdown, .txt</p>
            </div>
          )}

          {/* Pane chrome — hidden on homepage hero (tabs + toolbar are enough) */}
          {!isHero && (
            <div className="editor-pane-header">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                </div>
                <span className="w-[1px] h-3.5 bg-[var(--border-color)] mx-1" />
                <PenLine className="w-4 h-4 text-[#3b82f6]" />
                <span className="text-xs font-bold text-[var(--text-secondary)]">{t('editorTab')}</span>
              </div>
              <span className="text-[10px] font-mono font-bold text-[var(--text-tertiary)] uppercase">
                {markdown.length} chars
              </span>
            </div>
          )}

          <div className="editor-pane-body flex font-mono text-sm">
            <div ref={lineNumbersRef} className="editor-line-numbers">
              {lineNumbers.map((num) => (
                <div key={num}>{num}</div>
              ))}
            </div>
            <textarea
              ref={textareaRef}
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              onScroll={handleTextareaScroll}
              className="editor-textarea"
              spellCheck={false}
              dir="auto"
              aria-label="Markdown editor"
            />
          </div>
        </div>

        {/* Live Preview Panel */}
        <div className={`flex flex-col min-h-0 ${panelSplitClass('preview')} bg-[var(--bg-primary)]`}>
          {!isHero && (
            <div className="editor-pane-header">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-[#8b5cf6]" />
                <span className="text-xs font-bold text-[var(--text-secondary)]">{t('previewTab')}</span>
              </div>
            </div>
          )}

          <div
            ref={previewScrollRef}
            className="editor-pane-body editor-pane-scroll bg-[var(--bg-primary)]"
            onScroll={handlePreviewScroll}
          >
            <MarkdownPreview html={html} className="markdown-preview max-w-none" />
          </div>
        </div>

      </div>
    </div>
  );
}
