'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Mail, Send, Check } from 'lucide-react';

export default function ContactContent() {
  const t = useTranslations('contact');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <>
      <section className="relative overflow-hidden py-16 sm:py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-[#6366f1]/5 via-transparent to-[#ec4899]/5" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#6366f1]/10 to-[#8b5cf6]/5 mb-6">
            <Mail className="w-8 h-8 text-[#6366f1]" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4">{t('title')}</h1>
          <p className="text-[var(--text-secondary)] text-lg max-w-xl mx-auto">{t('subtitle')}</p>
        </div>
      </section>

      <section className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="contact-name" className="block text-sm font-medium mb-2">{t('nameLabel')}</label>
            <input id="contact-name" type="text" required className="w-full px-4 py-3 rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[#6366f1] transition-all" />
          </div>
          <div>
            <label htmlFor="contact-email" className="block text-sm font-medium mb-2">{t('emailLabel')}</label>
            <input id="contact-email" type="email" required className="w-full px-4 py-3 rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[#6366f1] transition-all" />
          </div>
          <div>
            <label htmlFor="contact-subject" className="block text-sm font-medium mb-2">{t('subjectLabel')}</label>
            <input id="contact-subject" type="text" required className="w-full px-4 py-3 rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[#6366f1] transition-all" />
          </div>
          <div>
            <label htmlFor="contact-message" className="block text-sm font-medium mb-2">{t('messageLabel')}</label>
            <textarea id="contact-message" rows={5} required className="w-full px-4 py-3 rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] text-[var(--text-primary)] resize-none focus:outline-none focus:ring-2 focus:ring-[#6366f1] transition-all" />
          </div>
          <button type="submit" className="w-full btn-primary justify-center py-4 text-base">
            {sent ? <><Check className="w-5 h-5" /> {t('sent')}</> : <><Send className="w-5 h-5" /> {t('send')}</>}
          </button>
        </form>

        <p className="text-center text-sm text-[var(--text-tertiary)] mt-6">
          {t('emailDirect')} <a href="mailto:hello@markdowntools.com" className="text-[#6366f1] hover:underline">hello@markdowntools.com</a>
        </p>
      </section>
    </>
  );
}
