'use client';

import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';

type ExportOverlayProps = {
  message: string;
};

export default function ExportOverlay({ message }: ExportOverlayProps) {
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    const prevPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPaddingRight;
    };
  }, []);

  return (
    <div className="export-overlay" role="status" aria-live="polite" aria-busy="true">
      <div className="export-overlay-card">
        <Loader2 className="export-overlay-spinner" aria-hidden />
        <p className="export-overlay-message">{message}</p>
      </div>
    </div>
  );
}
