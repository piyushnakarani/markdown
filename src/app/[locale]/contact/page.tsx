import { setRequestLocale } from 'next-intl/server';
import ContactContent from '@/components/ContactContent';
import { buildPageMetadata } from '@/lib/site';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return buildPageMetadata({
    title: 'Contact PDFWritter',
    description: 'Get in touch with the PDFWritter team at pdfwritter.com. Questions, feedback, or suggestions welcome.',
    path: `/${locale}/contact`,
    locale,
  });
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ContactContent />;
}
