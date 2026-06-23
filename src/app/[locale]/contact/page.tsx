import { setRequestLocale } from 'next-intl/server';
import ContactContent from '@/components/ContactContent';
import { CONTACT_PAGE_META } from '@/content/contact';
import { buildPageMetadata } from '@/lib/site';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return buildPageMetadata({
    title: CONTACT_PAGE_META.title,
    description: CONTACT_PAGE_META.description,
    path: `/${locale}/contact`,
    locale,
  });
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ContactContent />;
}
