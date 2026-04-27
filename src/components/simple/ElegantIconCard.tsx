'use client';

import type { LucideIcon } from 'lucide-react';

interface ElegantIconCardProps {
  /** Instance-swappable icon — pass any Lucide icon component */
  icon: LucideIcon;
  heading: string;
  description: string;
}

export function ElegantIconCard({ icon: Icon, heading, description }: ElegantIconCardProps) {
  return (
    <div
      style={{
        backgroundColor: 'var(--color-bg-surface)',
        borderRadius: 'var(--size-card-radius)',
        border: '1px solid var(--color-border-subtle)',
        padding: 'var(--size-card-padding)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--size-heading-to-body)',
      }}
    >
      {/* Icon slot — swap via `icon` prop */}
      <Icon
        size={24}
        strokeWidth={1.5}
        style={{ color: 'var(--color-text-accent)' }}
        aria-hidden="true"
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--size-body-to-body)' }}>
        {/* h5 — bold sans-serif, smallest heading */}
        <h5
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

        <p
          style={{
            fontFamily: 'var(--primitive-font-sans)',
            fontSize: 'var(--primitive-font-size-sm)',
            fontWeight: 'var(--primitive-font-weight-regular)',
            lineHeight: '1.5',
            color: 'var(--color-text-body)',
            margin: 0,
          }}
        >
          {description}
        </p>
      </div>
    </div>
  );
}
