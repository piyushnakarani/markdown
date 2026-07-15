import { NextRequest, NextResponse } from 'next/server';

import { type ContactFormData,validateContactForm } from '@/lib/contact';
import { sendContactEmail } from '@/lib/contact-mail';

export const runtime = 'nodejs';

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    const ip = forwarded.split(',')[0]?.trim();
    if (ip) return ip;
  }
  return request.headers.get('x-real-ip') || '0.0.0.0';
}

function jsonResponse(body: Record<string, unknown>, status: number) {
  return NextResponse.json(body, { status });
}

export async function POST(request: NextRequest) {
  let payload: ContactFormData;

  try {
    payload = await request.json();
  } catch {
    return jsonResponse({ success: false, error: 'Invalid request body.' }, 400);
  }

  if (payload.website?.trim()) {
    return jsonResponse({ success: true }, 200);
  }

  const errors = validateContactForm(payload);
  if (Object.keys(errors).length > 0) {
    return jsonResponse(
      { success: false, error: 'Validation failed.', fields: errors },
      422,
    );
  }

  try {
    await sendContactEmail(payload, getClientIp(request));
    return jsonResponse({ success: true }, 200);
  } catch (error) {
    console.error('Contact mail failed:', error);
    return jsonResponse(
      { success: false, error: 'Unable to send your message right now. Please try again later.' },
      500,
    );
  }
}

export async function GET() {
  return jsonResponse({ success: false, error: 'Method not allowed.' }, 405);
}
