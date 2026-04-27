'use client';

import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type DeltaDirection = 'up' | 'down' | 'neutral';

interface ElegantKpiCardProps {
  /** Primary metric label */
  label: string;
  /** Formatted metric value, e.g. "$24,500" or "98.2%" */
  value: string;
  /** Formatted change amount, e.g. "+12.3%" or "−$400" */
  delta?: string;
  /** Direction of change — controls colour and icon */
  deltaDirection?: DeltaDirection;
  /** Comparison context shown beside the delta, e.g. "vs last month" */
  period?: string;
  /** Optional supporting icon — pass any Lucide icon component */
  icon?: LucideIcon;
}

const deltaStyles: Record<DeltaDirection, { bg: string; text: string; border: string }> = {
  up: {
    bg: 'var(--color-badge-green-bg)',
    text: 'var(--color-badge-green-text)',
    border: 'var(--color-badge-green-border)',
  },
  down: {
    bg: 'var(--color-badge-red-bg)',
    text: 'var(--color-badge-red-text)',
    border: 'var(--color-badge-red-border)',
  },
  neutral: {
    bg: 'var(--color-badge-neutral-bg)',
    text: 'var(--color-badge-neutral-text)',
    border: 'var(--color-badge-neutral-border)',
  },
};

const DeltaIcon: Record<DeltaDirection, LucideIcon> = {
  up: TrendingUp,
  down: TrendingDown,
  neutral: Minus,
};

export function ElegantKpiCard({
  label,
  value,
  delta,
  deltaDirection = 'neutral',
  period,
  icon: Icon,
}: ElegantKpiCardProps) {
  const colours = deltaStyles[deltaDirection];
  const DirectionIcon = DeltaIcon[deltaDirection];

  return (
    <div
      style={{
        backgroundColor: 'var(--color-bg-surface)',
        borderRadius: 'var(--size-card-radius)',
        border: '1px solid var(--color-border-subtle)',
        padding: 'var(--size-card-padding)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--primitive-scale-4)',
        width: '100%',
      }}
    >
      {/* Header row — label + optional icon */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'var(--primitive-scale-2)',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--primitive-font-sans)',
            fontSize: 'var(--primitive-font-size-sm)',
            fontWeight: 'var(--primitive-font-weight-medium)',
            lineHeight: 1.4,
            color: 'var(--color-text-muted)',
          }}
        >
          {label}
        </span>

        {Icon && (
          <Icon
            size={16}
            strokeWidth={1.5}
            aria-hidden="true"
            style={{ color: 'var(--color-text-muted)', flexShrink: 0 }}
          />
        )}
      </div>

      {/* Primary value */}
      <p
        style={{
          fontFamily: 'var(--primitive-font-sans)',
          fontSize: 'var(--primitive-font-size-3xl)',
          fontWeight: 'var(--primitive-font-weight-bold)',
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
          color: 'var(--color-text-title)',
          margin: 0,
        }}
      >
        {value}
      </p>

      {/* Delta pill + period */}
      {delta && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--primitive-scale-2)',
          }}
        >
          <span
            role="status"
            aria-label={`Change: ${delta}${period ? `, ${period}` : ''}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--primitive-scale-1)',
              backgroundColor: colours.bg,
              color: colours.text,
              border: `1px solid ${colours.border}`,
              borderRadius: 'var(--size-badge-radius)',
              paddingInline: 'var(--primitive-scale-2)',
              paddingBlock: 'var(--primitive-scale-1)',
              fontFamily: 'var(--primitive-font-sans)',
              fontSize: 'var(--primitive-font-size-xs)',
              fontWeight: 'var(--primitive-font-weight-medium)',
              lineHeight: 1.4,
              whiteSpace: 'nowrap',
            }}
          >
            <DirectionIcon size={10} strokeWidth={2} aria-hidden="true" />
            {delta}
          </span>

          {period && (
            <span
              style={{
                fontFamily: 'var(--primitive-font-sans)',
                fontSize: 'var(--primitive-font-size-xs)',
                fontWeight: 'var(--primitive-font-weight-regular)',
                color: 'var(--color-text-muted)',
              }}
            >
              {period}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
