/* eslint-disable @typescript-eslint/no-explicit-any */

// Google Analytics Measurement ID (set NEXT_PUBLIC_GA_MEASUREMENT_ID in .env / Vercel)
export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || '';

// Track pageviews
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

// Track custom events
export const event = (
  action: string,
  { category, label, value, ...params }: { category?: string; label?: string; value?: number; [key: string]: any } = {}
) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
      ...params,
    });
  }
};
