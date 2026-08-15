import { PenLine } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

const EditorClient = dynamic(() => import('@/components/EditorClient'));
import PageHero from '@/components/PageHero';
import ToolSeoSections from '@/components/ToolSeoSections';
import { editorKeywordsForLocale } from '@/lib/locale-keywords';
import { buildLocalizedPageMetadata, withToolBrandKeywords } from '@/lib/site';
import { buildToolPageJsonLd } from '@/lib/structured-data';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return buildLocalizedPageMetadata({
    locale,
    path: '/editor',
    titleKey: 'editor.title',
    descriptionKey: 'editor.description',
    titleSuffix: ' — Free Split-Pane Mermaid Editor',
    keywords: withToolBrandKeywords(editorKeywordsForLocale(locale), 'editor'),
  });
}

export default async function EditorPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <EditorPageContent locale={locale} />;
}

function EditorPageContent({ locale }: { locale: string }) {
  const t = useTranslations('editor');
  const seo = useTranslations('markdownEditor');
  const faqs = [
    { q: seo('faq1Q'), a: seo('faq1A') },
    { q: seo('faq2Q'), a: seo('faq2A') },
    { q: seo('faq3Q'), a: seo('faq3A') },
    { q: seo('faq4Q'), a: seo('faq4A') },
    { q: seo('faq5Q'), a: seo('faq5A') },
  ];

  return (
    <>
      <PageHero
        badge={t('badge')}
        badgeIcon={PenLine}
        title={<span className="gradient-text">{t('title')}</span>}
        subtitle={t('description')}
        accentColor="var(--accent)"
        glowColor="rgba(59,130,246,0.08)"
      />
      <EditorClient />
      <ToolSeoSections
        whatTitle={seo('whatTitle')}
        whatDescription={seo('whatDescription')}
        howTitle={seo('howTitle')}
        howSubtitle={seo('howSubtitle')}
        steps={[
          { title: seo('step1Title'), description: seo('step1Desc') },
          { title: seo('step2Title'), description: seo('step2Desc') },
          { title: seo('step3Title'), description: seo('step3Desc') },
        ]}
        featuresTitle={seo('featuresTitle')}
        featuresSubtitle={seo('featuresSubtitle')}
        features={[
          { title: seo('feature1Title'), description: seo('feature1Desc') },
          { title: seo('feature2Title'), description: seo('feature2Desc') },
          { title: seo('feature3Title'), description: seo('feature3Desc') },
          { title: seo('feature4Title'), description: seo('feature4Desc') },
          { title: seo('feature5Title'), description: seo('feature5Desc') },
          { title: seo('feature6Title'), description: seo('feature6Desc') },
        ]}
        compareTitle={seo('compareTitle')}
        compareUs={seo('compareUs')}
        compareThem={seo('compareThem')}
        comparisons={[
          { ours: seo('compare1Us'), theirs: seo('compare1Them') },
          { ours: seo('compare2Us'), theirs: seo('compare2Them') },
          { ours: seo('compare3Us'), theirs: seo('compare3Them') },
          { ours: seo('compare4Us'), theirs: seo('compare4Them') },
        ]}
        mermaidTitle={seo('mermaidTitle')}
        mermaidDescription={seo('mermaidDescription')}
        faqTitle={seo('faqTitle')}
        faqs={faqs}
        relatedGuidesToolKey="editor"
        accentColor="var(--accent)"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildToolPageJsonLd(
              seo('jsonLdTitle'),
              seo('jsonLdDescription'),
              locale,
              '/editor',
            ),
          ),
        }}
      />
    </>
  );
}
