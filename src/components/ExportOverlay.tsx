'use client';

import { Check, Loader2 } from 'lucide-react';
import { useEffect } from 'react';

type ExportOverlayProps = {
  message: string;
  steps?: string[];
  activeStep?: number;
  hint?: string;
};

export default function ExportOverlay({
  message,
  steps,
  activeStep = 0,
  hint,
}: ExportOverlayProps) {
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

  const progress =
    steps && steps.length > 1
      ? Math.min(100, Math.round(((activeStep + 1) / steps.length) * 100))
      : null;

  return (
    <div className="export-overlay" role="status" aria-live="polite" aria-busy="true">
      <div className="export-overlay-card">
        <Loader2 className="export-overlay-spinner" aria-hidden />

        {progress !== null && (
          <div className="export-overlay-progress" aria-hidden>
            <div className="export-overlay-progress-track">
              <div
                className="export-overlay-progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        <p className="export-overlay-message">{message}</p>

        {hint && <p className="export-overlay-hint">{hint}</p>}

        {steps && steps.length > 1 && (
          <ol className="export-overlay-steps">
            {steps.map((label, index) => {
              const done = index < activeStep;
              const current = index === activeStep;

              return (
                <li
                  key={label}
                  className={[
                    'export-overlay-step',
                    done ? 'export-overlay-step--done' : '',
                    current ? 'export-overlay-step--active' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  <span className="export-overlay-step-icon" aria-hidden>
                    {done ? <Check className="w-3.5 h-3.5" /> : current ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
                  </span>
                  <span>{label}</span>
                </li>
              );
            })}
          </ol>
        )}
      </div>
    </div>
  );
}
