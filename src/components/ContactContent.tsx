'use client';

import { useState } from 'react';
import { Mail, Send, Check, Loader2, AlertCircle } from 'lucide-react';
import { event } from '@/lib/analytics';
import { CONTACT_COPY } from '@/content/contact';
import {
  getContactApiUrl,
  submitContactForm,
  validateContactForm,
  type ContactField,
  type ContactFieldErrors,
  type ContactFormData,
} from '@/lib/contact';

const EMPTY_FORM: ContactFormData = {
  name: '',
  email: '',
  subject: '',
  message: '',
  website: '',
};

export default function ContactContent() {
  const [form, setForm] = useState<ContactFormData>(EMPTY_FORM);
  const [fieldErrors, setFieldErrors] = useState<ContactFieldErrors>({});
  const [formError, setFormError] = useState('');
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const updateField = (field: ContactField, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    if (fieldErrors[field]) {
      setFieldErrors((current) => {
        const next = { ...current };
        delete next[field];
        return next;
      });
    }
    if (formError) setFormError('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError('');

    const errors = validateContactForm(form);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setSubmitting(true);
    try {
      const result = await submitContactForm(form, getContactApiUrl());
      if (result.success) {
        setSent(true);
        event('submit_contact_success', { subject: form.subject });
        setForm(EMPTY_FORM);
        setFieldErrors({});
        setTimeout(() => setSent(false), 6000);
        return;
      }

      if (result.fields) {
        setFieldErrors(result.fields);
      }
      setFormError(result.error || CONTACT_COPY.errorGeneric);
      event('submit_contact_error', { error: result.error || 'field_validation' });
    } catch {
      setFormError(CONTACT_COPY.errorNetwork);
      event('submit_contact_error', { error: 'network_error' });
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = (field: ContactField) =>
    [
      'w-full px-4 py-3 rounded-xl border bg-[var(--bg-primary)] text-[var(--text-primary)] transition-all focus:outline-none focus:ring-2',
      fieldErrors[field]
        ? 'border-red-400 focus:ring-red-400/40'
        : 'border-[var(--border-color)] focus:ring-[#6366f1]',
    ].join(' ');

  return (
    <>
      <section className="relative overflow-hidden py-16 sm:py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-[#6366f1]/5 via-transparent to-[#ec4899]/5" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#6366f1]/10 to-[#8b5cf6]/5 mb-6">
            <Mail className="w-8 h-8 text-[#6366f1]" />
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4">{CONTACT_COPY.title}</h1>
          <p className="text-[var(--text-secondary)] text-lg max-w-xl mx-auto">{CONTACT_COPY.subtitle}</p>
        </div>
      </section>

      <section className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 pb-20" lang="en">
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={form.website}
            onChange={(e) => setForm((current) => ({ ...current, website: e.target.value }))}
            className="hidden"
            aria-hidden="true"
          />

          <div>
            <label htmlFor="contact-name" className="block text-sm font-medium mb-2">
              {CONTACT_COPY.nameLabel}
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              autoComplete="name"
              value={form.name}
              onChange={(e) => updateField('name', e.target.value)}
              disabled={submitting}
              className={inputClass('name')}
            />
            {fieldErrors.name ? (
              <p className="mt-2 text-sm text-red-500">{fieldErrors.name}</p>
            ) : null}
          </div>

          <div>
            <label htmlFor="contact-email" className="block text-sm font-medium mb-2">
              {CONTACT_COPY.emailLabel}
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={(e) => updateField('email', e.target.value)}
              disabled={submitting}
              className={inputClass('email')}
            />
            {fieldErrors.email ? (
              <p className="mt-2 text-sm text-red-500">{fieldErrors.email}</p>
            ) : null}
          </div>

          <div>
            <label htmlFor="contact-subject" className="block text-sm font-medium mb-2">
              {CONTACT_COPY.subjectLabel}
            </label>
            <input
              id="contact-subject"
              name="subject"
              type="text"
              value={form.subject}
              onChange={(e) => updateField('subject', e.target.value)}
              disabled={submitting}
              className={inputClass('subject')}
            />
            {fieldErrors.subject ? (
              <p className="mt-2 text-sm text-red-500">{fieldErrors.subject}</p>
            ) : null}
          </div>

          <div>
            <label htmlFor="contact-message" className="block text-sm font-medium mb-2">
              {CONTACT_COPY.messageLabel}
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={5}
              value={form.message}
              onChange={(e) => updateField('message', e.target.value)}
              disabled={submitting}
              className={`${inputClass('message')} resize-none`}
            />
            {fieldErrors.message ? (
              <p className="mt-2 text-sm text-red-500">{fieldErrors.message}</p>
            ) : null}
          </div>

          {formError ? (
            <div className="flex items-start gap-3 rounded-xl border border-red-300/40 bg-red-500/10 px-4 py-3 text-sm text-red-500">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <p>{formError}</p>
            </div>
          ) : null}

          {sent ? (
            <div className="flex items-start gap-3 rounded-xl border border-emerald-300/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-600">
              <Check className="mt-0.5 h-4 w-4 shrink-0" />
              <p>{CONTACT_COPY.sent}</p>
            </div>
          ) : null}

          <button
            type="submit"
            disabled={submitting}
            className="w-full btn-primary justify-center py-4 text-base disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {submitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> {CONTACT_COPY.sending}
              </>
            ) : (
              <>
                <Send className="w-5 h-5" /> {CONTACT_COPY.send}
              </>
            )}
          </button>
        </form>

        <p className="text-center text-sm text-[var(--text-tertiary)] mt-6">{CONTACT_COPY.formNote}</p>
      </section>
    </>
  );
}
