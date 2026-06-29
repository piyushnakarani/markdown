import {
  Check,
  GitBranch,
  HelpCircle,
  Lock,
  MousePointerClick,
  Shield,
  Sparkles,
} from 'lucide-react';
import type { CSSProperties } from 'react';

import FAQAccordion from '@/components/FAQAccordion';
import RelatedBlogGuides from '@/components/RelatedBlogGuides';
import ScrollReveal from '@/components/ScrollReveal';
import SectionHeading from '@/components/SectionHeading';

type Step = {
  title: string;
  description: string;
};

type Feature = {
  title: string;
  description: string;
};

type Comparison = {
  ours: string;
  theirs: string;
};

type Faq = {
  q: string;
  a: string;
};

type ToolSeoSectionsProps = {
  whatTitle: string;
  whatDescription: string;
  howTitle: string;
  howSubtitle: string;
  steps: Step[];
  featuresTitle: string;
  featuresSubtitle: string;
  features: Feature[];
  compareTitle: string;
  compareUs: string;
  compareThem: string;
  comparisons: Comparison[];
  mermaidTitle: string;
  mermaidDescription: string;
  faqTitle: string;
  faqs: Faq[];
  relatedGuidesToolKey?: string;
  relatedGuidesTitle?: string;
  accentColor: string;
};

export default function ToolSeoSections({
  whatTitle,
  whatDescription,
  howTitle,
  howSubtitle,
  steps,
  featuresTitle,
  featuresSubtitle,
  features,
  compareTitle,
  compareUs,
  compareThem,
  comparisons,
  mermaidTitle,
  mermaidDescription,
  faqTitle,
  faqs,
  relatedGuidesToolKey,
  relatedGuidesTitle,
  accentColor,
}: ToolSeoSectionsProps) {
  return (
    <>
      <section className="section-py relative">
        <div className="page-container max-w-4xl">
          <ScrollReveal>
            <div className="card-glass p-8 sm:p-10">
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                  style={{ background: `${accentColor}14` }}
                >
                  <HelpCircle className="w-6 h-6" style={{ color: accentColor }} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-3">{whatTitle}</h2>
                  <p className="text-(--text-secondary) leading-relaxed">{whatDescription}</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-py relative overflow-hidden">
        <div className="relative page-container">
          <ScrollReveal>
            <SectionHeading title={howTitle} subtitle={howSubtitle} />
          </ScrollReveal>

          <div className="workflow-steps">
            {steps.map((step, index) => (
              <div key={step.title} className="contents">
                <ScrollReveal delay={index * 80}>
                  <article
                    className="workflow-step group h-full"
                    data-step={String(index + 1).padStart(2, '0')}
                    style={{ '--step-color': accentColor } as CSSProperties}
                  >
                    <div className="workflow-step-glow" aria-hidden />
                    <div className="relative z-10">
                      <div className="flex items-start justify-between gap-4 mb-5">
                        <div className="workflow-step-icon" style={{ color: accentColor, background: `${accentColor}14` }}>
                          <MousePointerClick className="w-6 h-6" strokeWidth={2} />
                        </div>
                        <span className="workflow-step-badge">{String(index + 1).padStart(2, '0')}</span>
                      </div>
                      <h3 className="workflow-step-title text-lg font-bold mb-2 tracking-tight">{step.title}</h3>
                      <p className="text-sm text-(--text-secondary) leading-relaxed">{step.description}</p>
                    </div>
                  </article>
                </ScrollReveal>
                {index < steps.length - 1 && (
                  <div className="workflow-connector hidden md:flex" aria-hidden>
                    <div className="workflow-connector-line" />
                    <MousePointerClick className="workflow-connector-arrow w-5 h-5 shrink-0 opacity-40" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-py relative">
        <div className="page-container">
          <ScrollReveal>
            <SectionHeading size="compact" title={featuresTitle} subtitle={featuresSubtitle} />
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
            {features.map((feature, index) => (
              <ScrollReveal key={feature.title} delay={index * 60}>
                <div className="card-glass group p-6 hover-lift h-full">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                    style={{ background: `${accentColor}14` }}
                  >
                    <Sparkles className="w-5 h-5" style={{ color: accentColor }} />
                  </div>
                  <h3 className="text-base font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-(--text-secondary) leading-relaxed">{feature.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-py relative bg-(--bg-secondary)/30">
        <div className="page-container max-w-4xl">
          <ScrollReveal>
            <SectionHeading size="compact" title={compareTitle} />
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <div className="card-glass overflow-hidden mt-8">
              <div className="grid grid-cols-2 border-b border-(--border-color) bg-(--bg-secondary)/50">
                <div className="px-5 py-4 text-sm font-bold" style={{ color: accentColor }}>{compareUs}</div>
                <div className="px-5 py-4 text-sm font-bold text-(--text-tertiary) border-l border-(--border-color)">
                  {compareThem}
                </div>
              </div>
              {comparisons.map((row) => (
                <div key={row.ours} className="grid grid-cols-2 border-b border-(--border-color) last:border-b-0">
                  <div className="px-5 py-4 text-sm text-(--text-secondary) flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    {row.ours}
                  </div>
                  <div className="px-5 py-4 text-sm text-(--text-tertiary) border-l border-(--border-color)">
                    {row.theirs}
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-py relative">
        <div className="page-container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <ScrollReveal>
              <div className="card-glass p-6 h-full">
                <Shield className="w-8 h-8 text-emerald-500 mb-4" />
                <h2 className="text-lg font-bold mb-2">Privacy: files stay in your browser</h2>
                <p className="text-sm text-(--text-secondary) leading-relaxed">
                  Your Markdown content is processed locally in the browser. There is no account, no email step, and no need to upload private documents to a third-party converter.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={80}>
              <div className="card-glass p-6 h-full">
                <GitBranch className="w-8 h-8 text-amber-500 mb-4" />
                <h2 className="text-lg font-bold mb-2">{mermaidTitle}</h2>
                <p className="text-sm text-(--text-secondary) leading-relaxed">{mermaidDescription}</p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={160}>
              <div className="card-glass p-6 h-full">
                <Lock className="w-8 h-8 text-accent-500 mb-4" />
                <h2 className="text-lg font-bold mb-2">No signup, free online</h2>
                <p className="text-sm text-(--text-secondary) leading-relaxed">
                  Open the tool, paste or upload Markdown, and download the result instantly. PDFWritter is free to use without watermarks, registration, or installation.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {relatedGuidesToolKey && (
        <RelatedBlogGuides
          toolKey={relatedGuidesToolKey}
          title={relatedGuidesTitle}
          accentColor={accentColor}
        />
      )}

      <section className="section-py relative">
        <div className="page-container max-w-3xl">
          <ScrollReveal>
            <SectionHeading size="compact" title={faqTitle} />
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <FAQAccordion items={faqs} />
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
