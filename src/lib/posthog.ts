import type { PostHog } from 'posthog-js';

export const POSTHOG_PROJECT_TOKEN =
  process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN?.trim() || '';

export const POSTHOG_HOST =
  process.env.NEXT_PUBLIC_POSTHOG_HOST?.trim() || 'https://us.i.posthog.com';

export function isPostHogEnabled(): boolean {
  return Boolean(POSTHOG_PROJECT_TOKEN);
}

export function capturePostHogPageview(
  posthog: PostHog | undefined,
  url: string,
) {
  if (!posthog) return;
  posthog.capture('$pageview', { $current_url: url });
}
