import { CONTACT_COPY } from '@/content/contact';

export type ContactFormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
  website?: string;
};

export type ContactField = keyof Omit<ContactFormData, 'website'>;

export type ContactFieldErrors = Partial<Record<ContactField, string>>;

export type ContactSubmitResult =
  | { success: true }
  | { success: false; error: string; fields?: ContactFieldErrors };

const NAME_PATTERN = /^[\p{L}\p{M}'\-. ]{2,100}$/u;

export function getContactApiUrl(): string {
  return process.env.NEXT_PUBLIC_CONTACT_API_URL?.trim() || '/api/sendmessage';
}

export function validateContactForm(data: ContactFormData): ContactFieldErrors {
  const errors: ContactFieldErrors = {};

  const name = data.name.trim();
  if (name.length < 2 || name.length > 100 || !NAME_PATTERN.test(name)) {
    errors.name = CONTACT_COPY.errorName;
  }

  const email = data.email.trim();
  if (email.length === 0 || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = CONTACT_COPY.errorEmail;
  }

  const subject = data.subject.trim();
  if (subject.length < 3 || subject.length > 150 || /[\r\n]/.test(subject)) {
    errors.subject = CONTACT_COPY.errorSubject;
  }

  const message = data.message.trim();
  if (message.length < 10 || message.length > 5000) {
    errors.message = CONTACT_COPY.errorMessage;
  }

  return errors;
}

export async function submitContactForm(
  data: ContactFormData,
  apiUrl: string,
): Promise<ContactSubmitResult> {
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  let payload: { success?: boolean; error?: string; fields?: ContactFieldErrors } = {};
  try {
    payload = await response.json();
  } catch {
    return { success: false, error: 'Invalid server response.' };
  }

  if (response.ok && payload.success) {
    return { success: true };
  }

  return {
    success: false,
    error: payload.error || 'Unable to send your message.',
    fields: payload.fields,
  };
}
