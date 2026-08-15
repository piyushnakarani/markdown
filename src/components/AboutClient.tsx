'use client';

import {
  Activity,
  ArrowRight,
  CheckCircle,
  Cpu,
  FileCode,
  FileText,
  FileType,
  GitBranch,
  Globe,
  Layers,
  PenLine,
  Shield,
  Terminal,
  Zap,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import MermaidFlowchartPreview from '@/components/MermaidFlowchartPreview';
import { Link } from '@/i18n/navigation';

export default function AboutClient() {
  const t = useTranslations('about');
  const [activeStep, setActiveStep] = useState<'input' | 'pdf' | 'html' | 'txt' | 'mermaid'>('input');

  const functionalities = [
    {
      icon: FileText,
      title: t('func1Title'),
      desc: t('func1Desc'),
      color: '#ef4444',
      badge: t('func1Badge'),
    },
    {
      icon: FileCode,
      title: t('func2Title'),
      desc: t('func2Desc'),
      color: '#f59e0b',
      badge: t('func2Badge'),
    },
    {
      icon: FileType,
      title: t('func3Title'),
      desc: t('func3Desc'),
      color: '#10b981',
      badge: t('func3Badge'),
    },
    {
      icon: PenLine,
      title: t('func4Title'),
      desc: t('func4Desc'),
      color: 'var(--accent)',
      badge: t('func4Badge'),
    },
    {
      icon: Activity,
      title: t('func5Title'),
      desc: t('func5Desc'),
      color: '#8b5cf6',
      badge: t('func5Badge'),
    },
    {
      icon: Shield,
      title: t('func6Title'),
      desc: t('func6Desc'),
      color: '#06b6d4',
      badge: t('func6Badge'),
    },
  ];

  const values = [
    {
      icon: Zap,
      title: t('value1Title'),
      desc: t('value1Desc'),
    },
    {
      icon: Globe,
      title: t('value2Title'),
      desc: t('value2Desc'),
    },
    {
      icon: GitBranch,
      title: t('value3Title'),
      desc: t('value3Desc'),
    },
  ];

  // Pipeline content simulator definitions
  const pipelineSteps = {
    input: {
      title: 'document.md',
      lang: 'markdown',
      content: `# Weekly Project Update

📅 **Date:** June 20, 2026
👤 **Lead:** PdfWritter Team

## Progress Graph
\`\`\`mermaid
flowchart LR
  MD[Markdown Source] --> Engine[Parser]
  Engine --> PDF[Print Document]
\`\`\``,
    },
    pdf: {
      title: t('previewPdfTitle'),
      lang: 'pdf',
      content: (
        <div className="p-6 bg-white text-gray-900 h-full font-serif flex flex-col justify-between text-xs select-none">
          <div>
            <div className="flex justify-between border-b pb-1 mb-4 text-[9px] text-gray-400 font-sans tracking-widest font-bold">
              <span>MARKDOWN SUITE COMPILER</span>
              <span>CONFIDENTIAL</span>
            </div>
            
            <h1 className="text-xl font-bold font-sans text-blue-900 leading-tight mb-2">Weekly Project Update</h1>
            <div className="flex gap-4 text-[9px] text-gray-500 mb-6 font-sans">
              <span><strong>Date:</strong> June 20, 2026</span>
              <span>|</span>
              <span><strong>Lead:</strong> PdfWritter Team</span>
            </div>
            
            <h2 className="text-sm font-bold font-sans text-gray-800 border-b pb-0.5 mb-2 mt-4">Progress Graph</h2>
            <div className="my-4 scale-90 origin-center">
              <MermaidFlowchartPreview variant="light" />
            </div>
          </div>
          
          <div className="border-t pt-1 flex justify-between text-[8px] text-gray-400 font-sans">
            <span>Page 1 of 1</span>
            <span>Generated via pdfwritter.com</span>
          </div>
        </div>
      ),
    },
    html: {
      title: 'index.html',
      lang: 'html',
      content: `<h1 id="weekly-project-update">Weekly Project Update</h1>
<p>📅 <strong>Date:</strong> June 20, 2026<br>
👤 <strong>Lead:</strong> PdfWritter Team</p>

<h2 id="progress-graph">Progress Graph</h2>
<div className="mermaid-rendered-container">
  <svg width="100%" height="auto" viewBox="0 0 350 80">
    <!-- SVG markup representing the flowchart -->
  </svg>
</div>`,
    },
    txt: {
      title: 'plain-text.txt',
      lang: 'text',
      content: `Weekly Project Update

Date: June 20, 2026
Lead: PdfWritter Team

Progress Graph
Markdown Source -> Parser -> Print Document`,
    },
    mermaid: {
      title: t('flowchartSvgTitle'),
      lang: 'svg',
      content: (
        <div className="p-8 h-full flex flex-col justify-center items-center select-none bg-slate-950/20">
          <MermaidFlowchartPreview variant="dark" />
        </div>
      ),
    },
  };

  const pipelineTabs: {
    key: 'input' | 'pdf' | 'html' | 'txt' | 'mermaid';
    icon: typeof Terminal;
    label: string;
    hint: string;
    color: string;
  }[] = [
    { key: 'input', icon: Terminal, label: t('tab1Label'), hint: t('tab1Hint'), color: 'var(--accent)' },
    { key: 'pdf', icon: FileText, label: t('tab2Label'), hint: t('tab2Hint'), color: '#ef4444' },
    { key: 'html', icon: FileCode, label: t('tab3Label'), hint: t('tab3Hint'), color: '#f59e0b' },
    { key: 'txt', icon: FileType, label: t('tab4Label'), hint: t('tab4Hint'), color: '#10b981' },
    { key: 'mermaid', icon: Activity, label: t('tab5Label'), hint: t('tab5Hint'), color: '#8b5cf6' },
  ];

  const architectureSteps = [
    { icon: Terminal, title: t('arch1Title'), desc: t('arch1Desc') },
    { icon: Cpu, title: t('arch2Title'), desc: t('arch2Desc') },
    { icon: Layers, title: t('arch3Title'), desc: t('arch3Desc') },
    { icon: CheckCircle, title: t('arch4Title'), desc: t('arch4Desc') },
  ];

  return (
    <div className="relative w-full pb-16">
      <div className="page-container space-y-14">

        {/* Core Mission */}
        <div className="card-glass p-5 sm:p-7 text-center">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-md border border-[var(--border-color)] bg-[var(--accent-muted)] mb-4">
            <Layers className="w-5 h-5 text-[var(--accent)]" />
          </div>
          <h2 className="text-xl sm:text-2xl font-semibold mb-3 tracking-tight text-[var(--text-primary)]">
            {t('philosophyTitle')}
          </h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-2xl mx-auto">
            {t('philosophyText')}
          </p>
        </div>

        {/* Brand disambiguation — helps users (and search) separate us from pdfwriter.com */}
        <section className="card-glass p-5 sm:p-6">
          <h2 className="text-lg font-semibold tracking-tight text-[var(--text-primary)] mb-2">
            {t('disambiguationTitle')}
          </h2>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-3xl">
            {t('disambiguationText')}
          </p>
          <div className="mt-4 flex flex-wrap gap-2.5">
            <Link href="/markdown-to-pdf" className="btn-primary text-sm">
              {t('linkMarkdownToPdf')}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/contact" className="btn-secondary text-sm">
              {t('linkContact')}
            </Link>
          </div>
        </section>

        {/* Interactive Simulator: The Conversion Pipeline */}
        <section className="space-y-6">
          <div className="max-w-2xl">
            <span className="section-badge mb-2.5 inline-flex">{t('showcaseBadge')}</span>
            <h2 className="text-lg sm:text-xl font-semibold text-[var(--text-primary)] tracking-tight mb-1.5">
              {t('showcaseTitle')}
            </h2>
            <p className="text-sm text-[var(--text-secondary)]">
              {t('showcaseSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
            <div className="lg:col-span-4 flex flex-col justify-center gap-2">
              {pipelineTabs.map((tab) => {
                const isActive = activeStep === tab.key;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveStep(tab.key)}
                    className={`w-full text-left p-3 rounded-md border transition-colors duration-150 flex items-start gap-3 cursor-pointer ${
                      isActive
                        ? 'border-[var(--accent)] bg-[var(--accent-muted)]'
                        : 'border-[var(--border-color)] bg-[var(--bg-primary)] hover:bg-[var(--bg-tertiary)]'
                    }`}
                  >
                    <div
                      className="w-7 h-7 rounded-md flex items-center justify-center shrink-0 border border-[var(--border-color)]"
                      style={{ background: isActive ? `color-mix(in srgb, ${tab.color} 16%, transparent)` : 'var(--bg-tertiary)' }}
                    >
                      <tab.icon className="w-3.5 h-3.5" style={{ color: isActive ? tab.color : 'var(--text-secondary)' }} />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold tracking-tight text-[var(--text-primary)]">{tab.label}</h4>
                      <p className="text-xs text-[var(--text-tertiary)] mt-0.5">{tab.hint}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Simulated Visual Sandbox */}
            <div className="lg:col-span-8 flex flex-col">
              <div className="relative w-full h-full flex flex-col rounded-lg border border-[var(--border-color)] bg-[var(--bg-primary)] overflow-hidden">
                <div className="flex items-center justify-between px-4 py-2.5 bg-[var(--bg-tertiary)] border-b border-[var(--border-color)] select-none">
                  <div className="flex gap-1.5 items-center">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                  </div>
                  <div className="text-[11px] font-mono font-medium text-[var(--text-secondary)]">
                    {pipelineSteps[activeStep].title}
                  </div>
                  <div className="w-12" />
                </div>

                <div className="flex-1 overflow-auto max-h-[360px] min-h-[320px] font-mono text-xs leading-relaxed text-[var(--text-secondary)] p-0">
                  {typeof pipelineSteps[activeStep].content === 'string' ? (
                    <pre className="p-5 h-full w-full overflow-x-auto select-all">
                      <code>{pipelineSteps[activeStep].content}</code>
                    </pre>
                  ) : (
                    <div className="h-full w-full">
                      {pipelineSteps[activeStep].content}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Core Functionalities Grid */}
        <section className="space-y-6">
          <div className="max-w-2xl">
            <span className="section-badge mb-2.5 inline-flex">{t('featureBadge')}</span>
            <h2 className="text-lg sm:text-xl font-semibold text-[var(--text-primary)] tracking-tight mb-1.5">
              {t('featureTitle')}
            </h2>
            <p className="text-sm text-[var(--text-secondary)]">
              {t('featureSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {functionalities.map((func, i) => (
              <div key={i} className="card-glass group h-full flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <div
                    className="w-8 h-8 rounded-md flex items-center justify-center border border-[var(--border-color)]"
                    style={{ background: `color-mix(in srgb, ${func.color} 10%, transparent)` }}
                  >
                    <func.icon className="w-4 h-4" style={{ color: func.color }} />
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-tertiary)] bg-[var(--bg-tertiary)] px-2 py-0.5 rounded border border-[var(--border-color)]">
                    {func.badge}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-1.5">
                  {func.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  {func.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Custom Data Flow / Architecture Visualization */}
        <section className="space-y-6">
          <div className="max-w-2xl">
            <span className="section-badge mb-2.5 inline-flex">{t('architectureBadge')}</span>
            <h2 className="text-lg sm:text-xl font-semibold text-[var(--text-primary)] tracking-tight mb-1.5">
              {t('architectureTitle')}
            </h2>
            <p className="text-sm text-[var(--text-secondary)]">
              {t('architectureSubtitle')}
            </p>
          </div>

          <div className="card-glass p-5 sm:p-6">
            <div className="hidden lg:grid grid-cols-4 gap-3">
              {architectureSteps.map((step) => (
                <div key={step.title} className="flex flex-col items-center text-center p-4 rounded-md bg-[var(--bg-tertiary)] border border-[var(--border-color)]">
                  <div className="w-8 h-8 rounded-md bg-[var(--accent-muted)] text-[var(--accent)] flex items-center justify-center border border-[var(--border-color)] mb-2.5">
                    <step.icon className="w-4 h-4" />
                  </div>
                  <h4 className="text-xs font-semibold text-[var(--text-primary)] mb-1">{step.title}</h4>
                  <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>

            <div className="lg:hidden flex flex-col gap-5 pl-5 border-l border-[var(--border-color)] ml-2">
              {architectureSteps.map((step) => (
                <div key={step.title} className="relative">
                  <div className="absolute -left-[27px] top-1 w-3 h-3 rounded-full bg-[var(--accent)] border-2 border-[var(--bg-primary)]" />
                  <h4 className="text-xs font-semibold text-[var(--text-primary)] mb-1 flex items-center gap-2">
                    <step.icon className="w-3.5 h-3.5 text-[var(--accent)]" />
                    {step.title}
                  </h4>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed pl-5">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Design & Core Values */}
        <section className="space-y-6">
          <div className="max-w-2xl">
            <span className="section-badge mb-2.5 inline-flex">{t('ethicsBadge')}</span>
            <h2 className="text-lg sm:text-xl font-semibold text-[var(--text-primary)] tracking-tight mb-1.5">
              {t('ethicsTitle')}
            </h2>
            <p className="text-sm text-[var(--text-secondary)]">
              {t('ethicsSubtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {values.map((v, i) => (
              <div key={i} className="card-glass text-center">
                <div className="w-9 h-9 rounded-md flex items-center justify-center mx-auto mb-3 border border-[var(--border-color)] bg-[var(--accent-muted)]">
                  <v.icon className="w-4 h-4 text-[var(--accent)]" />
                </div>
                <h3 className="text-sm font-semibold mb-1.5 text-[var(--text-primary)]">{v.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="text-center pt-2">
          <Link href="/editor" className="btn-primary">
            {t('ctaLaunch')}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
