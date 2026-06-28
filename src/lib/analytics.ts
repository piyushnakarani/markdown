/* eslint-disable @typescript-eslint/no-explicit-any */

import posthog from 'posthog-js';

import { isPostHogEnabled } from '@/lib/posthog';

// Google Analytics Measurement ID (set NEXT_PUBLIC_GA_MEASUREMENT_ID in .env / Vercel)
export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || '';

function pushToDataLayer(payload: Record<string, unknown>) {
  if (typeof window === 'undefined') return;
  const w = window as any;
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push(payload);
}

function capturePostHog(action: string, params: Record<string, unknown>) {
  if (!isPostHogEnabled() || typeof window === 'undefined') return;
  if (!posthog.__loaded) return;
  posthog.capture(action, params);
}

// Track pageviews (GA only — PostHog pageviews handled in PostHogProvider)
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

// Track custom events (GA4 + GTM dataLayer + PostHog)
export const event = (
  action: string,
  { category, label, value, ...params }: { category?: string; label?: string; value?: number; [key: string]: any } = {}
) => {
  const payload = {
    event: action,
    event_category: category,
    event_label: label,
    value,
    ...params,
  };

  pushToDataLayer(payload);

  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
      ...params,
    });
  }

  capturePostHog(action, {
    category,
    label,
    value,
    ...params,
  });
};
