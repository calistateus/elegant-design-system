'use client';

import { ElegantAvatar } from '../assets/ElegantAvatar';

interface ElegantReferralCardProps {
  quote: string;
  name: string;
  title: string;
  /** When true, renders a circular avatar slot next to the attribution */
  showAvatar?: boolean;
  /** Actual image URL for the avatar — falls back to upload placeholder when absent */
  avatarPath?: string;
}

export function ElegantReferralCard({ quote, name, title, showAvatar = false, avatarPath }: ElegantReferralCardProps) {
  return (
    <figure
      style={{
        position: 'relative',
        backgroundColor: 'var(--color-bg-surface)',
        borderRadius: 'var(--size-card-radius)',
        border: '1px solid var(--color-border-subtle)',
        padding: 'var(--size-card-padding)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--size-heading-to-body)',
        margin: 0,
      }}
    >
      {/* Decorative quotation mark — absolutely positioned */}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 'var(--size-heading-to-sub)',
          left: 'var(--size-card-padding)',
          fontFamily: 'var(--primitive-font-mono)',
          fontSize: 'var(--primitive-font-size-display)',
          fontWeight: 'var(--primitive-font-weight-regular)',
          lineHeight: 1,
          color: 'var(--primitive-gray-300)',
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      >
        &ldquo;
      </span>

      {/* Quote text */}
      <blockquote
        style={{
          margin: 0,
          position: 'relative',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--type-quote-family)',
            fontSize: 'var(--type-quote-size)',
            fontWeight: 'var(--type-quote-weight)',
            lineHeight: 'var(--type-quote-line-height)',
            fontStyle: 'italic',
            color: 'var(--color-text-body)',
            textIndent: 'var(--primitive-scale-10)',
            margin: 0,
          }}
        >
          {quote}
        </p>
      </blockquote>

      {/* Attribution — pushed to bottom so it aligns across cards in the same row */}
      <figcaption
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--size-heading-to-sub)',
          marginTop: 'auto',
        }}
      >
        {showAvatar && (
          <ElegantAvatar src={avatarPath} />
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.125rem' }}>
          <p
            style={{
              fontSize: 'var(--primitive-font-size-sm)',
              fontWeight: 'var(--primitive-font-weight-bold)',
              lineHeight: 1.4,
              color: 'var(--color-text-title)',
              margin: 0,
            }}
          >
            {name}
          </p>
          <p
            style={{
              fontSize: 'var(--primitive-font-size-xs)',
              fontWeight: 'var(--primitive-font-weight-regular)',
              lineHeight: 1.4,
              color: 'var(--color-text-muted)',
              margin: 0,
            }}
          >
            {title}
          </p>
        </div>
      </figcaption>
    </figure>
  );
}
