'use client';

import { useState } from 'react';
import { ThumbsUp, ThumbsDown, Star, Heart } from 'lucide-react';

// ─── Variant-specific prop shapes ────────────────────────────

type ThumbsVariant = {
  variant: 'thumbs';
  value?: 'up' | 'down' | null;
  onChange?: (v: 'up' | 'down' | null) => void;
};

type StarsVariant = {
  variant: 'stars';
  value?: number | null;
  onChange?: (v: number | null) => void;
  count?: number;
};

type HeartVariant = {
  variant: 'heart';
  value?: boolean;
  onChange?: (v: boolean) => void;
};

type SharedProps = {
  label?: string;
  description?: string;
  showDescription?: boolean;
  disabled?: boolean;
};

export type ElegantRatingInputProps = SharedProps &
  (ThumbsVariant | StarsVariant | HeartVariant);

// ─── Main component ───────────────────────────────────────────

export function ElegantRatingInput(props: ElegantRatingInputProps) {
  const { label, description, showDescription = false, disabled = false } = props;
  const hasLabelGroup = !!label || (showDescription && !!description);

  return (
    <div
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        gap: 'var(--size-heading-to-body)',
        opacity: disabled ? 'var(--opacity-disabled)' : 1,
        pointerEvents: disabled ? 'none' : 'auto',
      }}
    >
      {hasLabelGroup && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--size-label-to-description)',
          }}
        >
          {label && (
            <h5
              style={{
                margin: 0,
                fontFamily: 'var(--type-h5-family)',
                fontSize: 'var(--type-h5-size)',
                fontWeight: 'var(--type-h5-weight)',
                lineHeight: 'var(--type-h5-line-height)',
                color: 'var(--color-text-title)',
              }}
            >
              {label}
            </h5>
          )}

          {showDescription && description && (
            <span
              style={{
                fontSize: 'var(--primitive-font-size-xs)',
                color: 'var(--color-text-muted)',
                lineHeight: 1.5,
              }}
            >
              {description}
            </span>
          )}
        </div>
      )}

      {props.variant === 'thumbs' && <ThumbsInput {...props} />}
      {props.variant === 'stars' && <StarsInput {...props} />}
      {props.variant === 'heart' && <HeartInput {...props} />}
    </div>
  );
}

// ─── Thumbs variant ───────────────────────────────────────────

function ThumbsInput({ value, onChange }: ThumbsVariant) {
  const [internal, setInternal] = useState<'up' | 'down' | null>(value ?? null);
  const active = onChange !== undefined ? (value ?? null) : internal;

  function handle(next: 'up' | 'down') {
    const val = active === next ? null : next;
    setInternal(val);
    onChange?.(val);
  }

  return (
    <div style={{ display: 'flex', gap: 'var(--primitive-scale-2)' }}>
      <IconButton
        pressed={active === 'up'}
        onClick={() => handle('up')}
        aria-label="Thumbs up"
        aria-pressed={active === 'up'}
      >
        <ThumbsUp
          size={20}
          strokeWidth={active === 'up' ? 2 : 1.5}
          fill={active === 'up' ? 'var(--color-text-title)' : 'none'}
          color="var(--color-text-title)"
        />
      </IconButton>

      <IconButton
        pressed={active === 'down'}
        onClick={() => handle('down')}
        aria-label="Thumbs down"
        aria-pressed={active === 'down'}
      >
        <ThumbsDown
          size={20}
          strokeWidth={active === 'down' ? 2 : 1.5}
          fill={active === 'down' ? 'var(--color-text-title)' : 'none'}
          color="var(--color-text-title)"
        />
      </IconButton>
    </div>
  );
}

// ─── Stars variant ────────────────────────────────────────────

function StarsInput({ value, onChange, count = 5 }: StarsVariant) {
  const [internal, setInternal] = useState<number | null>(value ?? null);
  const [hovered, setHovered] = useState<number | null>(null);

  const selected = onChange !== undefined ? (value ?? null) : internal;
  const display = hovered ?? selected;

  function handle(star: number) {
    const val = selected === star ? null : star;
    setInternal(val);
    onChange?.(val);
  }

  return (
    <div
      style={{ display: 'flex', gap: 'var(--primitive-scale-1)' }}
      onMouseLeave={() => setHovered(null)}
    >
      {Array.from({ length: count }, (_, i) => i + 1).map((star) => {
        const lit = display !== null && star <= display;
        return (
          <button
            key={star}
            type="button"
            onClick={() => handle(star)}
            onMouseEnter={() => setHovered(star)}
            aria-label={`Rate ${star} out of ${count} stars`}
            aria-pressed={selected === star}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              color: lit
                ? 'var(--primitive-yellow-800)'
                : 'var(--primitive-gray-500)',
              transition: 'var(--motion-interactive-color)',
              lineHeight: 0,
            }}
          >
            <Star
              size={22}
              strokeWidth={1.5}
              fill={lit ? 'var(--primitive-yellow-800)' : 'none'}
            />
          </button>
        );
      })}
    </div>
  );
}

// ─── Heart variant ────────────────────────────────────────────

function HeartInput({ value, onChange }: HeartVariant) {
  const [internal, setInternal] = useState<boolean>(value ?? false);
  const liked = onChange !== undefined ? (value ?? false) : internal;

  function handle() {
    const next = !liked;
    setInternal(next);
    onChange?.(next);
  }

  return (
    <IconButton
      pressed={liked}
      onClick={handle}
      aria-label={liked ? 'Unlike' : 'Like'}
      aria-pressed={liked}
    >
      <Heart
        size={20}
        strokeWidth={liked ? 2 : 1.5}
        fill={liked ? 'var(--primitive-red-300)' : 'none'}
        color={liked ? 'var(--primitive-red-300)' : 'var(--color-text-body)'}
      />
    </IconButton>
  );
}

// ─── Shared icon button ───────────────────────────────────────

interface IconButtonProps {
  pressed: boolean;
  onClick: () => void;
  children: React.ReactNode;
  'aria-label': string;
  'aria-pressed': boolean;
}

function IconButton({ pressed, onClick, children, ...aria }: IconButtonProps) {
  const [hovering, setHovering] = useState(false);

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      {...aria}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 'var(--primitive-scale-9)',
        height: 'var(--primitive-scale-9)',
        borderRadius: 'var(--primitive-radius-md)',
        border: `1px solid ${pressed ? 'var(--primitive-gray-400)' : hovering ? 'var(--color-border-input)' : 'var(--color-border-default)'}`,
        backgroundColor: hovering ? 'var(--color-bg-surface)' : 'transparent',
        color: 'var(--color-text-body)',
        cursor: 'pointer',
        transition: `background-color var(--primitive-duration-fast) var(--primitive-easing-default), border-color var(--primitive-duration-fast) var(--primitive-easing-default)`,
        lineHeight: 0,
        padding: 0,
      }}
    >
      {children}
    </button>
  );
}
