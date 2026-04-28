'use client';

import { useRef, useEffect } from 'react';
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

// ─── Focus trap helpers ───────────────────────────────────────

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(', ');

// ─── Component ────────────────────────────────────────────────

export function ElegantModal({
  open,
  heading,
  description,
  container,
  onClose,
}: ElegantModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  // Remember which element had focus before the modal opened so we can restore it
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    // Store the element that had focus when the modal opened
    previousFocusRef.current = document.activeElement as HTMLElement;

    // Move focus into the modal on the next frame so the panel is in the DOM
    const frame = requestAnimationFrame(() => {
      const focusable = panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE);
      focusable?.[0]?.focus();
    });

    // Trap focus within the panel
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose?.();
        return;
      }
      if (e.key !== 'Tab') return;

      const focusable = Array.from(
        panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

  // Restore focus to the trigger element when the modal closes
  useEffect(() => {
    if (!open && previousFocusRef.current) {
      previousFocusRef.current.focus();
      previousFocusRef.current = null;
    }
  }, [open]);

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
        ref={panelRef}
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
                transition: 'var(--motion-interactive-color)',
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
