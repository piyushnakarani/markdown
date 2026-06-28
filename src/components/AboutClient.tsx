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
import { useState } from 'react';

import MermaidFlowchartPreview from '@/components/MermaidFlowchartPreview';
import { Link } from '@/i18n/navigation';

export default function AboutClient() {
  const [activeStep, setActiveStep] = useState<'input' | 'pdf' | 'html' | 'txt' | 'mermaid'>('input');

  const functionalities = [
    {
      icon: FileText,
      title: 'High-Fidelity PDF Compiler',
      desc: 'Convert Markdown to pixel-perfect A4-formatted PDFs. Features automatic page-break avoidance for elements, code blocks, tables, and diagrams, quote formatting, and syntax highlighting.',
      color: '#f43f5e',
      bg: 'from-rose-500/10 to-orange-500/5',
      badge: 'Print Ready',
    },
    {
      icon: FileCode,
      title: 'Semantic HTML Engine',
      desc: 'Compile Markdown to clean, W3C-compliant, semantic HTML markup. Ideal for copy-pasting directly into your CMS (WordPress, Webflow, Ghost), blogs, or static site templates.',
      color: '#f59e0b',
      bg: 'from-amber-500/10 to-yellow-500/5',
      badge: 'SEO Friendly',
    },
    {
      icon: FileType,
      title: 'Plain Text Stripper',
      desc: 'Quickly strip all Markdown syntax, formatting symbols, headings, images, links, and code blocks to produce clean, plain plain-text files (.txt) for templates or data feeds.',
      color: '#10b981',
      bg: 'from-emerald-500/10 to-green-500/5',
      badge: 'Unformatted',
    },
    {
      icon: PenLine,
      title: 'Interactive Live Editor',
      desc: 'Full-featured Markdown workspace featuring side-by-side split screen editing, synchronized scrolling, instant rendering, real-time word counters, and quick format tools.',
      color: '#3b82f6',
      bg: 'from-blue-500/10 to-indigo-500/5',
      badge: 'Real-time',
    },
    {
      icon: Activity,
      title: 'Mermaid.js Integrations',
      desc: 'Native support for code-defined diagrams. Render flowcharts, sequence diagrams, state diagrams, class relationships, and charts directly from markdown to high-resolution print SVGs.',
      color: '#8b5cf6',
      bg: 'from-purple-500/10 to-pink-500/5',
      badge: 'Vector Graphics',
    },
    {
      icon: Shield,
      title: 'Strict Local Sandbox',
      desc: 'Your files are processed with absolute privacy. All rendering and conversions take place client-side in the browser. Zero data transmission, zero tracking, zero logs.',
      color: '#06b6d4',
      bg: 'from-cyan-500/10 to-blue-500/5',
      badge: 'Private',
    },
  ];

  const values = [
    {
      icon: Zap,
      title: 'Zero Latency & Fee-Free',
      desc: 'Engineered for developers who value performance. Unlimited exports, zero subscriptions, no hidden limits.',
      color: '#f59e0b',
    },
    {
      icon: Globe,
      title: 'Localization First',
      desc: 'Full compatibility with 12 major languages and Right-to-Left (RTL) reading layouts for global developers.',
      color: '#06b6d4',
    },
    {
      icon: GitBranch,
      title: 'Optimized DX',
      desc: 'Keyboards shortcuts, clean typography, standard GFM compatibility, and search engine optimization.',
      color: '#a855f7',
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
      title: 'preview.pdf (A4 Preview)',
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
            <span>Generated via markdowntools.com</span>
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
      title: 'flowchart.svg (Mermaid Output)',
      lang: 'svg',
      content: (
        <div className="p-8 h-full flex flex-col justify-center items-center select-none bg-slate-950/20">
          <MermaidFlowchartPreview variant="dark" />
        </div>
      ),
    },
  };

  return (
    <div className="relative overflow-hidden w-full pb-24">
      {/* Background glow meshes */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.03),transparent_60%)] pointer-events-none" />
      <div className="absolute top-96 left-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-[#3b82f6]/5 to-[#8b5cf6]/3 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-40 right-1/4 w-[400px] h-[400px] bg-gradient-to-br from-[#ec4899]/3 to-[#06b6d4]/4 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-28">
        
        {/* Core Mission Spotlight */}
        <div className="relative group">
          <div className="absolute -inset-px bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur-md opacity-75 group-hover:opacity-100 transition duration-1000" />
          <div className="relative card-glass p-8 sm:p-12 text-center rounded-3xl border border-[var(--border-color)] bg-[var(--bg-secondary)]/50 backdrop-blur-xl">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-pink-500/10 border border-pink-500/20 mb-6 text-pink-500">
              <Layers className="w-6 h-6" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-4 tracking-tight text-[var(--text-primary)]">
              Developer-First Conversion Philosophy
            </h2>
            <p className="text-[var(--text-secondary)] text-sm sm:text-base leading-relaxed max-w-3xl mx-auto">
              Our tools are constructed with one core goal: to provide zero-friction, accessible, and absolute client-side privacy. PDFWritter supports full GitHub Flavored Markdown (GFM) specs, handles complex Mermaid.js code blocks directly, and exports clean compiled files instantly—all without needing servers, user accounts, or paywalls.
            </p>
          </div>
        </div>

        {/* Interactive Simulator: The Conversion Pipeline */}
        <section className="space-y-10">
          <div className="text-center max-w-2xl mx-auto">
            <div className="section-badge mb-3">Interactive Showcase</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] tracking-tight">
              Instant Multi-Format Compilation
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-2">
              Select a stage below to simulate how the PDFWritter pipeline processes code and handles formatting inputs.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Step Controls */}
            <div className="lg:col-span-4 flex flex-col justify-center space-y-3.5">
              <button
                onClick={() => setActiveStep('input')}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-start gap-4 ${
                  activeStep === 'input'
                    ? 'bg-blue-500/10 border-blue-500/40 text-[var(--text-primary)] shadow-lg shadow-blue-500/5'
                    : 'bg-[var(--bg-secondary)]/40 border-[var(--border-color)] text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]/80 hover:border-[var(--border-hover)]'
                }`}
              >
                <div className={`p-2 rounded-lg ${activeStep === 'input' ? 'bg-blue-500 text-white' : 'bg-[var(--bg-tertiary)]'}`}>
                  <Terminal className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold tracking-tight">1. Source Markdown</h4>
                  <p className="text-[11px] text-[var(--text-tertiary)] mt-0.5">Input standard GFM text & Mermaid blocks.</p>
                </div>
              </button>

              <button
                onClick={() => setActiveStep('pdf')}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-start gap-4 ${
                  activeStep === 'pdf'
                    ? 'bg-rose-500/10 border-rose-500/40 text-[var(--text-primary)] shadow-lg shadow-rose-500/5'
                    : 'bg-[var(--bg-secondary)]/40 border-[var(--border-color)] text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]/80 hover:border-[var(--border-hover)]'
                }`}
              >
                <div className={`p-2 rounded-lg ${activeStep === 'pdf' ? 'bg-rose-500 text-white' : 'bg-[var(--bg-tertiary)]'}`}>
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold tracking-tight">2. PDF Print Compilation</h4>
                  <p className="text-[11px] text-[var(--text-tertiary)] mt-0.5">Custom margin spacing & page dividers.</p>
                </div>
              </button>

              <button
                onClick={() => setActiveStep('html')}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-start gap-4 ${
                  activeStep === 'html'
                    ? 'bg-amber-500/10 border-amber-500/40 text-[var(--text-primary)] shadow-lg shadow-amber-500/5'
                    : 'bg-[var(--bg-secondary)]/40 border-[var(--border-color)] text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]/80 hover:border-[var(--border-hover)]'
                }`}
              >
                <div className={`p-2 rounded-lg ${activeStep === 'html' ? 'bg-amber-500 text-white' : 'bg-[var(--bg-tertiary)]'}`}>
                  <FileCode className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold tracking-tight">3. Clean HTML Markup</h4>
                  <p className="text-[11px] text-[var(--text-tertiary)] mt-0.5">CMS-ready semantic tag generation.</p>
                </div>
              </button>

              <button
                onClick={() => setActiveStep('txt')}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-start gap-4 ${
                  activeStep === 'txt'
                    ? 'bg-emerald-500/10 border-emerald-500/40 text-[var(--text-primary)] shadow-lg shadow-emerald-500/5'
                    : 'bg-[var(--bg-secondary)]/40 border-[var(--border-color)] text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]/80 hover:border-[var(--border-hover)]'
                }`}
              >
                <div className={`p-2 rounded-lg ${activeStep === 'txt' ? 'bg-emerald-500 text-white' : 'bg-[var(--bg-tertiary)]'}`}>
                  <FileType className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold tracking-tight">4. Plain Text Export</h4>
                  <p className="text-[11px] text-[var(--text-tertiary)] mt-0.5">Clean reset stripping all markdown tags.</p>
                </div>
              </button>

              <button
                onClick={() => setActiveStep('mermaid')}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex items-start gap-4 ${
                  activeStep === 'mermaid'
                    ? 'bg-purple-500/10 border-purple-500/40 text-[var(--text-primary)] shadow-lg shadow-purple-500/5'
                    : 'bg-[var(--bg-secondary)]/40 border-[var(--border-color)] text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]/80 hover:border-[var(--border-hover)]'
                }`}
              >
                <div className={`p-2 rounded-lg ${activeStep === 'mermaid' ? 'bg-purple-500 text-white' : 'bg-[var(--bg-tertiary)]'}`}>
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold tracking-tight">5. Mermaid Vectors</h4>
                  <p className="text-[11px] text-[var(--text-tertiary)] mt-0.5">Fully scalable rasterized inline charts.</p>
                </div>
              </button>
            </div>

            {/* Simulated Visual Sandbox */}
            <div className="lg:col-span-8 flex flex-col">
              <div className="relative w-full h-full flex flex-col rounded-2xl border border-[var(--border-color)] bg-[var(--bg-primary)] overflow-hidden shadow-2xl">
                {/* macOS styled header */}
                <div className="flex items-center justify-between px-4 py-3 bg-[var(--bg-secondary)] border-b border-[var(--border-color)] select-none">
                  <div className="flex gap-1.5 items-center">
                    <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                    <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                    <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
                  </div>
                  <div className="text-[11px] font-mono font-medium text-[var(--text-secondary)] bg-[var(--bg-tertiary)] px-3 py-1 rounded-md border border-[var(--border-color)] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                    {pipelineSteps[activeStep].title}
                  </div>
                  <div className="w-12" />
                </div>

                {/* Content Box */}
                <div className="flex-1 overflow-auto max-h-[360px] min-h-[320px] font-mono text-xs leading-relaxed text-[var(--text-secondary)] p-0">
                  {typeof pipelineSteps[activeStep].content === 'string' ? (
                    <pre className="p-6 h-full w-full overflow-x-auto select-all">
                      <code>{pipelineSteps[activeStep].content}</code>
                    </pre>
                  ) : (
                    <div className="h-full w-full bg-slate-100/50">
                      {pipelineSteps[activeStep].content}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Core Functionalities Grid */}
        <section className="space-y-10">
          <div className="text-center max-w-2xl mx-auto">
            <div className="section-badge mb-3">Feature Catalogue</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] tracking-tight">
              Provided Functionalities & Services
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-2">
              Built to optimize your markdown documentation workflow. Explore what you can perform instantly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {functionalities.map((func, i) => (
              <div
                key={i}
                className="group relative card-glass p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)]/40 hover:bg-[var(--bg-secondary)]/80 hover:border-blue-500/20 hover:shadow-lg hover:shadow-blue-500/2 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${func.bg} flex items-center justify-center border border-white/[0.03] group-hover:scale-105 transition-transform`}>
                      <func.icon className="w-5 h-5 animate-pulse-glow" style={{ color: func.color }} />
                    </div>
                    <span className="text-[9px] font-bold uppercase tracking-wider text-[var(--text-tertiary)] bg-[var(--bg-tertiary)] px-2 py-0.5 rounded border border-[var(--border-color)]">
                      {func.badge}
                    </span>
                  </div>
                  <h3 className="text-base font-extrabold text-[var(--text-primary)] mb-2 group-hover:text-blue-500 transition-colors">
                    {func.title}
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    {func.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Custom Data Flow / Architecture Visualization */}
        <section className="space-y-10">
          <div className="text-center max-w-2xl mx-auto">
            <div className="section-badge mb-3">System Architecture</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] tracking-tight">
              Data Rendering Engine Pipeline
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-2">
              A high-level view of how markdown text is processed and compiled securely into target files.
            </p>
          </div>

          <div className="relative card-glass p-8 rounded-3xl border border-[var(--border-color)] bg-[var(--bg-secondary)]/20 overflow-hidden">
            {/* Marching dashed animated lines - desktop layout */}
            <div className="hidden lg:grid grid-cols-4 gap-6 items-center relative z-10">
              
              {/* Box 1 */}
              <div className="flex flex-col items-center text-center p-5 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)] relative">
                <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20 mb-3 shadow-inner">
                  <Terminal className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-extrabold text-[var(--text-primary)] mb-1">1. MD Document Input</h4>
                <p className="text-[10px] text-[var(--text-secondary)] leading-relaxed">
                  Markdown strings, GFM tables, metadata, and Mermaid blocks.
                </p>
              </div>

              {/* Box 2 */}
              <div className="flex flex-col items-center text-center p-5 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)]">
                <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center border border-purple-500/20 mb-3 shadow-inner">
                  <Cpu className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-extrabold text-[var(--text-primary)] mb-1">2. AST Syntax Engine</h4>
                <p className="text-[10px] text-[var(--text-secondary)] leading-relaxed">
                  Lexical analysis parsing markdown blocks & building charts.
                </p>
              </div>

              {/* Box 3 */}
              <div className="flex flex-col items-center text-center p-5 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)]">
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20 mb-3 shadow-inner">
                  <Layers className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-extrabold text-[var(--text-primary)] mb-1">3. Compilation Drivers</h4>
                <p className="text-[10px] text-[var(--text-secondary)] leading-relaxed">
                  WASM engines & render APIs formatting pages & vectors.
                </p>
              </div>

              {/* Box 4 */}
              <div className="flex flex-col items-center text-center p-5 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)]">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20 mb-3 shadow-inner">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <h4 className="text-xs font-extrabold text-[var(--text-primary)] mb-1">4. Output Formats</h4>
                <p className="text-[10px] text-[var(--text-secondary)] leading-relaxed">
                  Clean A4 PDFs, parsed HTML files, and pure raw text.
                </p>
              </div>

            </div>

            {/* Vertical Flow Timeline - mobile/tablet layout */}
            <div className="lg:hidden flex flex-col gap-6 relative z-10 pl-6 border-l-2 border-dashed border-slate-700/60 ml-3">
              
              {/* Item 1 */}
              <div className="relative">
                <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-blue-500 border-4 border-[var(--bg-secondary)]" />
                <h4 className="text-xs font-extrabold text-[var(--text-primary)] mb-1 flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-blue-400" />
                  1. MD Document Input
                </h4>
                <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed pl-5">
                  Markdown content with tables, styling metadata, and Mermaid blocks.
                </p>
              </div>

              {/* Item 2 */}
              <div className="relative">
                <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-purple-500 border-4 border-[var(--bg-secondary)]" />
                <h4 className="text-xs font-extrabold text-[var(--text-primary)] mb-1 flex items-center gap-2">
                  <Cpu className="w-3.5 h-3.5 text-purple-400" />
                  2. AST Syntax Engine
                </h4>
                <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed pl-5">
                  Lexical compiler translating codes & generating diagram layouts.
                </p>
              </div>

              {/* Item 3 */}
              <div className="relative">
                <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-amber-500 border-4 border-[var(--bg-secondary)]" />
                <h4 className="text-xs font-extrabold text-[var(--text-primary)] mb-1 flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-amber-400" />
                  3. Compilation Drivers
                </h4>
                <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed pl-5">
                  WASM packages & PDF render APIs mapping content bounds.
                </p>
              </div>

              {/* Item 4 */}
              <div className="relative">
                <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-emerald-500 border-4 border-[var(--bg-secondary)]" />
                <h4 className="text-xs font-extrabold text-[var(--text-primary)] mb-1 flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  4. Converted Output
                </h4>
                <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed pl-5">
                  Finished files downloaded locally (.pdf, .html, .txt).
                </p>
              </div>

            </div>

            {/* Background design elements */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/5 blur-3xl rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/5 blur-3xl rounded-full pointer-events-none" />
          </div>
        </section>

        {/* Design & Core Values */}
        <section className="space-y-10">
          <div className="text-center max-w-2xl mx-auto">
            <div className="section-badge mb-3">Core Ethics</div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] tracking-tight">
              Design & Operations Values
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-2">
              The fundamental engineering guidelines behind PDFWritter.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <div key={i} className="card-glass p-6 rounded-2xl border border-[var(--border-color)] text-center relative overflow-hidden bg-[var(--bg-secondary)]/30">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-4 border border-white/[0.02]"
                  style={{ background: `${v.color}15` }}
                >
                  <v.icon className="w-5 h-5 animate-pulse-glow" style={{ color: v.color }} />
                </div>
                <h3 className="text-sm font-extrabold mb-2 text-[var(--text-primary)]">{v.title}</h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>



        {/* CTA Panel */}
        <div className="text-center pt-4 relative z-10">
          <Link
            href="/editor"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-bold text-white rounded-xl bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 hover:shadow-xl hover:shadow-indigo-500/20 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            Launch Interactive Editor
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
