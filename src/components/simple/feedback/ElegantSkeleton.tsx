'use client';

export type SkeletonVariant = 'text' | 'circle' | 'rect';

export interface ElegantSkeletonProps {
  /** Visual shape variant */
  variant?: SkeletonVariant;
  /** Width of the skeleton block. Defaults to '100%'. */
  width?: string | number;
  /** Height of the skeleton block. Defaults per variant. */
  height?: string | number;
  /** Number of stacked text-line skeletons (only used when variant='text'). */
  lines?: number;
}

const VARIANT_RADIUS: Record<SkeletonVariant, string> = {
  text:   'var(--size-skeleton-radius)',
  rect:   'var(--size-card-radius)',
  circle: '50%',
};

const DEFAULT_HEIGHT: Record<SkeletonVariant, string> = {
  text:   '1em',
  rect:   '8rem',
  circle: '3rem',
};

function SkeletonBlock({
  width,
  height,
  borderRadius,
}: {
  width: string | number;
  height: string | number;
  borderRadius: string;
}) {
  return (
    <span
      aria-hidden="true"
      style={{
        display: 'block',
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        borderRadius,
        background: `linear-gradient(
          90deg,
          var(--color-skeleton-base)   25%,
          var(--color-skeleton-highlight) 50%,
          var(--color-skeleton-base)   75%
        )`,
        backgroundSize: '200% 100%',
        animation: 'skeleton-shimmer 1.6s ease-in-out infinite',
        flexShrink: 0,
      }}
    />
  );
}

export function ElegantSkeleton({
  variant = 'text',
  width = '100%',
  height,
  lines = 1,
}: ElegantSkeletonProps) {
  const radius = VARIANT_RADIUS[variant];
  const resolvedHeight = height ?? DEFAULT_HEIGHT[variant];

  if (variant === 'text' && lines > 1) {
    return (
      <span
        aria-busy="true"
        aria-label="Loading…"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--size-body-to-body)',
        }}
      >
        {Array.from({ length: lines }).map((_, i) => (
          <SkeletonBlock
            key={i}
            width={i === lines - 1 && lines > 1 ? '70%' : width}
            height={resolvedHeight}
            borderRadius={radius}
          />
        ))}
      </span>
    );
  }

  return (
    <span aria-busy="true" aria-label="Loading…" style={{ display: 'block' }}>
      <SkeletonBlock width={width} height={resolvedHeight} borderRadius={radius} />
    </span>
  );
}
