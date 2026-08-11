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
  accentColor = 'var(--accent)',
}: RelatedBlogGuidesProps) {
  const guides = getRelatedBlogPosts(toolKey);
  if (guides.length === 0) return null;

  return (
    <section className="section-py relative">
      <div className="page-container max-w-4xl">
        <ScrollReveal>
          <SectionHeading size="compact" title={title} />
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {guides.map((guide, index) => (
            <ScrollReveal key={guide.slug} delay={index * 60}>
              <Link
                href={`/blog/${guide.slug}`}
                locale="en"
                className="card-glass group h-full flex flex-col cursor-pointer"
              >
                <BookOpen className="w-4 h-4 mb-2.5" style={{ color: accentColor }} />
                <h3 className="text-sm font-semibold leading-snug mb-2.5 flex-1 group-hover:text-[var(--accent)] transition-colors">
                  {guide.titleKey}
                </h3>
                <span className="inline-flex items-center gap-1 text-xs font-medium text-[var(--text-tertiary)] group-hover:text-[var(--accent)] transition-colors">
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
