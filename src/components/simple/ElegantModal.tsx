'use client';

import { X } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────

export interface ElegantModalProps {
  /** Controls whether the modal is visible. */
  open: boolean;
  /** H5 heading — required. */
  heading: string;
  /** Optional supporting description. */
  description?: string;
  /** Optional slot for any child component (instance swap). */
  container?: React.ReactNode;
  /** Called when the backdrop or close button is clicked. */
  onClose?: () => void;
}

// ─── Component ────────────────────────────────────────────────

export function ElegantModal({
  open,
  heading,
  description,
  container,
  onClose,
}: ElegantModalProps) {
  if (!open) return null;

  return (
    /* Backdrop */
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="elegant-modal-heading"
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--color-overlay-scrim)',
        padding: 'var(--size-page-gutter)',
      }}
    >
      {/* Panel */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: 'var(--color-bg-main)',
          borderRadius: 'var(--size-card-radius)',
          border: '1px solid var(--color-border-subtle)',
          padding: 'var(--size-card-padding)',
          width: '100%',
          maxWidth: '480px',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--size-heading-to-body)',
        }}
      >
        {/* Header row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: 'var(--primitive-scale-4)',
          }}
        >
          <h5
            id="elegant-modal-heading"
            style={{
              fontFamily: 'var(--type-h5-family)',
              fontSize: 'var(--type-h5-size)',
              fontWeight: 'var(--type-h5-weight)',
              lineHeight: 'var(--type-h5-line-height)',
              color: 'var(--color-text-title)',
              margin: 0,
            }}
          >
            {heading}
          </h5>

          {onClose && (
            <button
              onClick={onClose}
              aria-label="Close modal"
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
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--color-text-body)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--color-text-muted)';
              }}
            >
              <X size={16} strokeWidth={1.5} />
            </button>
          )}
        </div>

        {/* Description */}
        {description && (
          <p
            style={{
              fontFamily: 'var(--primitive-font-sans)',
              fontSize: 'var(--primitive-font-size-sm)',
              fontWeight: 'var(--primitive-font-weight-regular)',
              lineHeight: 1.5,
              color: 'var(--color-text-muted)',
              margin: 0,
            }}
          >
            {description}
          </p>
        )}

        {/* Container slot */}
        {container && (
          <div>
            {container}
          </div>
        )}
      </div>
    </div>
  );
}
