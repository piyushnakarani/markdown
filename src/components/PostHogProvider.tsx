'use client';

import { PostHogProvider as PHProvider, usePostHog } from '@posthog/react';
import { usePathname, useSearchParams } from 'next/navigation';
import posthog from 'posthog-js';
import { Suspense, useEffect } from 'react';

import { capturePostHogPageview, isPostHogEnabled } from '@/lib/posthog';

function PostHogPageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const posthogClient = usePostHog();

  useEffect(() => {
    if (!pathname || !posthogClient) return;
    const query = searchParams?.toString();
    const url = window.origin + pathname + (query ? `?${query}` : '');
    capturePostHogPageview(posthogClient, url);
  }, [pathname, searchParams, posthogClient]);

  return null;
}

export default function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (!isPostHogEnabled() || posthog.__loaded) return;

    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN as string, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      defaults: '2026-05-30',
    });
  }, []);

  if (!isPostHogEnabled()) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(
        'PostHog: set NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN and NEXT_PUBLIC_POSTHOG_HOST in your environment.',
      );
    }
    return <>{children}</>;
  }

  return (
    <PHProvider client={posthog}>
      <Suspense fallback={null}>
        <PostHogPageViewTracker />
      </Suspense>
      {children}
    </PHProvider>
  );
}
