'use client';

import { AlertCircle } from 'lucide-react';

export interface ElegantErrorMessageProps {
  message?: string;
  /** DOM id — set this to wire aria-describedby from the associated input. */
  id?: string;
}

export function ElegantErrorMessage({
  message = 'Something went wrong. Please try again.',
  id,
}: ElegantErrorMessageProps) {
  return (
    <div
      id={id}
      role="alert"
      aria-live="polite"
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 'var(--size-label-to-description)',
        color: 'var(--color-error-text)',
      }}
    >
      <span style={{ flexShrink: 0, marginTop: '3px' }}>
        <AlertCircle size={12} strokeWidth={1.5} />
      </span>
      <span style={{ fontSize: 'var(--primitive-font-size-xs)', fontWeight: 'var(--primitive-font-weight-regular)', lineHeight: 1.5 }}>
        {message}
      </span>
    </div>
  );
}
