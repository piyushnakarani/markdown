import { setRequestLocale } from 'next-intl/server';
import ContactContent from '@/components/ContactContent';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return {
    title: 'Contact Us | MarkdownTools',
    description: 'Get in touch with the MarkdownTools team. Questions, feedback, or suggestions welcome.',
    alternates: { canonical: `/${locale}/contact` },
  };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ContactContent />;
}
