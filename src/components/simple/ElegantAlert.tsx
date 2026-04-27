'use client';

import { CheckCircle, Info, XCircle, X } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────

export type AlertVariant = 'info' | 'success' | 'error';

export interface ElegantAlertProps {
  variant?: AlertVariant;
  title?: string;
  message: string;
  /** If provided, renders a dismiss button and calls this when clicked. */
  onDismiss?: () => void;
  /** Whether to show the leading icon. Defaults to true. */
  showIcon?: boolean;
}

// ─── Variant maps ─────────────────────────────────────────────

const VARIANT_BORDER: Record<AlertVariant, string> = {
  info:    'var(--primitive-gray-300)',
  success: 'var(--primitive-green-500)',
  error:   'var(--primitive-red-500)',
};

const VARIANT_ICON_COLOR: Record<AlertVariant, string> = {
  info:    'var(--color-text-muted)',
  success: 'var(--color-text-accent)',
  error:   'var(--color-error-text)',
};

const VARIANT_ICONS: Record<AlertVariant, React.ReactNode> = {
  info:    <Info    size={16} strokeWidth={1.5} />,
  success: <CheckCircle size={16} strokeWidth={1.5} />,
  error:   <XCircle size={16} strokeWidth={1.5} />,
};

// ─── Component ────────────────────────────────────────────────

export function ElegantAlert({
  variant = 'info',
  title,
  message,
  onDismiss,
  showIcon = true,
}: ElegantAlertProps) {
  return (
    <div
      role="alert"
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 'var(--primitive-scale-3)',
        padding: 'var(--primitive-scale-3) var(--primitive-scale-4)',
        border: `1px solid ${VARIANT_BORDER[variant]}`,
        borderRadius: 'var(--primitive-radius-md)',
        backgroundColor: 'var(--color-bg-surface)',
        fontFamily: 'var(--primitive-font-sans)',
      }}
    >
      {/* Icon */}
      {showIcon && (
        <span
          aria-hidden="true"
          style={{
            color: VARIANT_ICON_COLOR[variant],
            flexShrink: 0,
            paddingTop: '1px',
          }}
        >
          {VARIANT_ICONS[variant]}
        </span>
      )}

      {/* Body */}
      <span style={{ flex: 1 }}>
        {title && (
          <span
            style={{
              display: 'block',
              fontSize: 'var(--primitive-font-size-sm)',
              fontWeight: 'var(--primitive-font-weight-bold)',
              color: 'var(--color-text-body)',
              lineHeight: 1.4,
              marginBottom: title ? 'var(--primitive-scale-1)' : undefined,
            }}
          >
            {title}
          </span>
        )}
        <span
          style={{
            display: 'block',
            fontSize: 'var(--primitive-font-size-sm)',
            fontWeight: 'var(--primitive-font-weight-regular)',
            color: 'var(--color-text-muted)',
            lineHeight: 1.5,
          }}
        >
          {message}
        </span>
      </span>

      {/* Dismiss */}
      {onDismiss && (
        <button
          onClick={onDismiss}
          aria-label="Dismiss"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            color: 'var(--color-text-muted)',
            flexShrink: 0,
            transition: `color var(--primitive-duration-fast) var(--primitive-easing-default)`,
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-text-body)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-muted)'; }}
        >
          <X size={14} strokeWidth={1.5} />
        </button>
      )}
    </div>
  );
}
