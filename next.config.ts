import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const posthogHost =
  process.env.NEXT_PUBLIC_POSTHOG_HOST?.trim() || 'https://us.i.posthog.com';

const posthogAssetsHost = posthogHost.replace(
  '://us.i.posthog.com',
  '://us-assets.i.posthog.com',
).replace(
  '://eu.i.posthog.com',
  '://eu-assets.i.posthog.com',
);

const nextConfig: NextConfig = {
  serverExternalPackages: ['highlight.js'],
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async rewrites() {
    return [
      {
        source: '/ingest/static/:path*',
        destination: `${posthogAssetsHost}/static/:path*`,
      },
      {
        source: '/ingest/:path*',
        destination: `${posthogHost}/:path*`,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
