'use client';

import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────

export type DrawerSide = 'right' | 'left' | 'bottom';

export interface ElegantDrawerSheetProps {
  /** Controls whether the drawer is visible. */
  open: boolean;
  /** Which edge the drawer slides in from. */
  side?: DrawerSide;
  /** H5 heading — required. */
  heading: string;
  /** Optional supporting description. */
  description?: string;
  /** Optional slot for any child component. */
  container?: React.ReactNode;
  /** Called when the backdrop or close button is clicked. */
  onClose?: () => void;
}

// ─── Helpers ──────────────────────────────────────────────────

function getPanelStyle(side: DrawerSide): React.CSSProperties {
  const base: React.CSSProperties = {
    position: 'fixed',
    backgroundColor: 'var(--color-bg-main)',
    border: '1px solid var(--color-border-subtle)',
    padding: 'var(--size-card-padding)',
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--size-heading-to-body)',
    zIndex: 51,
  };

  if (side === 'right') {
    return {
      ...base,
      top: 0,
      right: 0,
      bottom: 0,
      width: 'var(--size-drawer-width)',
      borderRadius: 'var(--size-card-radius) 0 0 var(--size-card-radius)',
      borderRight: 'none',
    };
  }

  if (side === 'left') {
    return {
      ...base,
      top: 0,
      left: 0,
      bottom: 0,
      width: 'var(--size-drawer-width)',
      borderRadius: '0 var(--size-card-radius) var(--size-card-radius) 0',
      borderLeft: 'none',
    };
  }

  // bottom
  return {
    ...base,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 'var(--size-card-radius) var(--size-card-radius) 0 0',
    borderBottom: 'none',
  };
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

// ─── Component ────────────────────────────────────────────────

export function ElegantDrawerSheet({
  open,
  side = 'right',
  heading,
  description,
  container,
  onClose,
}: ElegantDrawerSheetProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const returnFocusRef = useRef<Element | null>(null);

  // Store the element that triggered the drawer so we can restore focus on close
  useEffect(() => {
    if (open) {
      returnFocusRef.current = document.activeElement;
    } else {
      (returnFocusRef.current as HTMLElement | null)?.focus();
      returnFocusRef.current = null;
    }
  }, [open]);

  // Focus first focusable element when the drawer opens
  useEffect(() => {
    if (!open || !panelRef.current) return;
    const firstFocusable = panelRef.current.querySelector<HTMLElement>(FOCUSABLE);
    firstFocusable?.focus();
  }, [open]);

  // Focus trap: keep focus inside the panel
  useEffect(() => {
    if (!open || !panelRef.current) return;
    const panel = panelRef.current;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose?.();
        return;
      }
      if (e.key !== 'Tab') return;

      const focusables = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];

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
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 50,
          backgroundColor: 'var(--color-overlay-scrim)',
        }}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="elegant-drawer-heading"
        style={getPanelStyle(side)}
      >
        {/* Header row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: 'var(--size-card-gap)',
          }}
        >
          <h5
            id="elegant-drawer-heading"
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
              aria-label="Close drawer"
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
        {container && <div>{container}</div>}
      </div>
    </>
  );
}
