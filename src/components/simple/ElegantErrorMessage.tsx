'use client';

import { AlertCircle } from 'lucide-react';

export interface ElegantErrorMessageProps {
  message?: string;
}

export function ElegantErrorMessage({
  message = 'Something went wrong. Please try again.',
}: ElegantErrorMessageProps) {
  const wrapperStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 'var(--primitive-scale-1)',
    color: 'var(--color-error-text)',
    fontFamily: 'var(--primitive-font-sans)',
  };

  const iconStyle: React.CSSProperties = {
    flexShrink: 0,
    marginTop: '3px',
  };

  const textStyle: React.CSSProperties = {
    fontSize: 'var(--primitive-font-size-xs)',
    fontWeight: 'var(--primitive-font-weight-regular)',
    lineHeight: 1.5,
  };

  return (
    <div style={wrapperStyle} role="alert">
      <span style={iconStyle}>
        <AlertCircle size={12} strokeWidth={1.5} />
      </span>
      <span style={textStyle}>{message}</span>
    </div>
  );
}
