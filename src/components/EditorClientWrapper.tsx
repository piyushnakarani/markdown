'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const EditorClient = dynamic(() => import('./EditorClient'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)] animate-pulse" />
  ),
});

export default function EditorClientWrapper({ variant }: { variant?: 'page' | 'embedded' | 'hero' }) {
  return (
    <Suspense fallback={<div className="w-full h-[500px] rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)] animate-pulse" />}>
      <EditorClient variant={variant} />
    </Suspense>
  );
}
