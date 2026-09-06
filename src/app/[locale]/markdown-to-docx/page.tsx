import { Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

import ConverterTool from '@/components/ConverterTool';
import PageHero from '@/components/PageHero';
import ToolSeoSections from '@/components/ToolSeoSections';
import { docxKeywordsForLocale } from '@/lib/keywords';
import { buildLocalizedPageMetadata, withToolBrandKeywords } from '@/lib/site';
import { buildToolPageJsonLd } from '@/lib/structured-data';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return buildLocalizedPageMetadata({
    locale,
    path: '/markdown-to-docx',
    titleKey: 'tools.docxTitle',
    descriptionKey: 'tools.docxDescription',
    titleSuffix: ' — Word DOCX',
    keywords: withToolBrandKeywords(docxKeywordsForLocale(locale), 'docx'),
  });
}

export default async function MarkdownToDocxPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <MarkdownToDocxContent locale={locale} />;
}

function MarkdownToDocxContent({ locale }: { locale: string }) {
  const t = useTranslations('markdownToDocx');
  const tools = useTranslations('tools');
  const faqs = [
    { q: t('faq1Q'), a: t('faq1A') },
    { q: t('faq2Q'), a: t('faq2A') },
    { q: t('faq3Q'), a: t('faq3A') },
    { q: t('faq4Q'), a: t('faq4A') },
    { q: t('faq5Q'), a: t('faq5A') },
    { q: t('faq6Q'), a: t('faq6A') },
  ];

  return (
    <>
      <PageHero
        badge={tools('docxBadge')}
        badgeIcon={Sparkles}
        title={
          <>
            {t('heroBefore')}
            <span style={{ color: '#3b82f6' }}>{t('heroHighlight')}</span>
            {t('heroAfter')}
          </>
        }
        subtitle={tools('docxDescription')}
        accentColor="#3b82f6"
      />
      <ConverterTool type="docx" />
      <ToolSeoSections
        whatTitle={t('whatTitle')}
        whatDescription={t('whatDescription')}
        howTitle={t('howTitle')}
        howSubtitle={t('howSubtitle')}
        steps={[
          { title: t('step1Title'), description: t('step1Desc') },
          { title: t('step2Title'), description: t('step2Desc') },
          { title: t('step3Title'), description: t('step3Desc') },
        ]}
        featuresTitle={t('featuresTitle')}
        featuresSubtitle={t('featuresSubtitle')}
        features={[
          { title: t('feature1Title'), description: t('feature1Desc') },
          { title: t('feature2Title'), description: t('feature2Desc') },
          { title: t('feature3Title'), description: t('feature3Desc') },
          { title: t('feature4Title'), description: t('feature4Desc') },
          { title: t('feature5Title'), description: t('feature5Desc') },
          { title: t('feature6Title'), description: t('feature6Desc') },
        ]}
        compareTitle={t('compareTitle')}
        compareUs={t('compareUs')}
        compareThem={t('compareThem')}
        comparisons={[
          { ours: t('compare1Us'), theirs: t('compare1Them') },
          { ours: t('compare2Us'), theirs: t('compare2Them') },
          { ours: t('compare3Us'), theirs: t('compare3Them') },
          { ours: t('compare4Us'), theirs: t('compare4Them') },
        ]}
        mermaidTitle={t('mermaidTitle')}
        mermaidDescription={t('mermaidDescription')}
        faqTitle={t('faqTitle')}
        faqs={faqs}
        relatedGuidesToolKey="markdown-to-docx"
        accentColor="var(--accent)"
        locale={locale}
        path="/markdown-to-docx"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildToolPageJsonLd(
              t('jsonLdTitle'),
              t('jsonLdDescription'),
              locale,
              '/markdown-to-docx',
            ),
          ),
        }}
      />
    </>
  );
}
