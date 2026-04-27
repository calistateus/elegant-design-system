'use client';

type SpinnerSize = 'sm' | 'md' | 'lg';

interface ElegantSpinnerProps {
  size?: SpinnerSize;
  className?: string;
}

const sizeMap: Record<SpinnerSize, { dimension: string; borderWidth: string }> = {
  sm: { dimension: 'var(--size-spinner-sm)', borderWidth: '2px' },
  md: { dimension: 'var(--size-spinner-md)', borderWidth: '2px' },
  lg: { dimension: 'var(--size-spinner-lg)', borderWidth: '3px' },
};

export function ElegantSpinner({ size = 'md', className = '' }: ElegantSpinnerProps) {
  const { dimension, borderWidth } = sizeMap[size];

  return (
    <span
      role="status"
      aria-label="Loading"
      className={className}
      style={{
        display: 'inline-block',
        width: dimension,
        height: dimension,
        borderRadius: '50%',
        border: `${borderWidth} solid var(--color-progress-track)`,
        borderTopColor: 'var(--color-text-body)',
        animation: 'spinner-rotate 700ms linear infinite',
        flexShrink: 0,
      }}
    />
  );
}
