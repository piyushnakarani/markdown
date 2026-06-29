import { ArrowRight, BookOpen } from 'lucide-react';

import ScrollReveal from '@/components/ScrollReveal';
import SectionHeading from '@/components/SectionHeading';
import { Link } from '@/i18n/navigation';
import { getRelatedBlogPosts } from '@/lib/tool-blog-links';

type RelatedBlogGuidesProps = {
  toolKey: string;
  title?: string;
  accentColor?: string;
};

export default function RelatedBlogGuides({
  toolKey,
  title = 'Related guides',
  accentColor = '#3b82f6',
}: RelatedBlogGuidesProps) {
  const guides = getRelatedBlogPosts(toolKey);
  if (guides.length === 0) return null;

  return (
    <section className="section-py relative bg-(--bg-secondary)/20">
      <div className="page-container max-w-4xl">
        <ScrollReveal>
          <SectionHeading size="compact" title={title} />
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
          {guides.map((guide, index) => (
            <ScrollReveal key={guide.slug} delay={index * 60}>
              <Link
                href={`/blog/${guide.slug}`}
                className="card-glass group p-5 h-full flex flex-col hover-lift"
              >
                <BookOpen className="w-5 h-5 mb-3" style={{ color: accentColor }} />
                <h3 className="text-sm font-semibold leading-snug mb-3 flex-1 group-hover:text-[#3b82f6] transition-colors">
                  {guide.titleKey}
                </h3>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-(--text-tertiary) group-hover:text-[#3b82f6] transition-colors">
                  Read guide
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
