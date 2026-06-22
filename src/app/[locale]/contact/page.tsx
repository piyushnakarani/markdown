import { setRequestLocale } from 'next-intl/server';
import ContactContent from '@/components/ContactContent';
import { buildLocalizedPageMetadata } from '@/lib/site';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return buildLocalizedPageMetadata({
    locale,
    path: `/${locale}/contact`,
    titleKey: 'contact.title',
    descriptionKey: 'contact.subtitle',
  });
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ContactContent />;
}
