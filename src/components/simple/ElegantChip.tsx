'use client';

import { X } from 'lucide-react';

type ChipColor = 'neutral' | 'black' | 'white';

/** Absolute upper bound — no caller can exceed this. */
const CHIP_HARD_MAX = 40;

export interface ElegantChipProps {
  /** Required display text. Truncated with ellipsis at maxChars (hard max 40). */
  label: string;
  color?: ChipColor;
  /** Soft limit the caller can set; capped at the hard max of 40. */
  maxChars?: number;
  onDismiss?: () => void;
}

export function ElegantChip({
  label,
  color = 'neutral',
  maxChars = CHIP_HARD_MAX,
  onDismiss,
}: ElegantChipProps) {
  const effectiveMax = Math.min(maxChars, CHIP_HARD_MAX);
  const displayLabel =
    label.length > effectiveMax
      ? label.slice(0, effectiveMax).trimEnd() + '\u2026'
      : label;

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 'var(--size-chip-gap)',
        padding: 'var(--size-chip-py) var(--size-chip-px)',
        backgroundColor: `var(--color-chip-${color}-bg)`,
        border: `1px solid var(--color-chip-${color}-border)`,
        borderRadius: 'var(--size-chip-radius)',
        fontSize: 'var(--primitive-font-size-xs)',
        fontWeight: 'var(--primitive-font-weight-regular)',
        color: `var(--color-chip-${color}-text)`,
        letterSpacing: '-0.01em',
        lineHeight: 1,
        maxWidth: '100%',
      }}
    >
      <span
        style={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {displayLabel}
      </span>

      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label={`Remove ${label}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            background: 'none',
            border: 'none',
            padding: '4px',
            cursor: 'pointer',
            color: 'inherit',
            opacity: 0.5,
            transition: `opacity var(--primitive-duration-fast) var(--primitive-easing-default)`,
          }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.5'; }}
        >
          <X size={10} strokeWidth={1.5} />
        </button>
      )}
    </span>
  );
}
