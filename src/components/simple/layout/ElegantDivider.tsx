type DividerOrientation = 'horizontal' | 'vertical';
type DividerVariant = 'solid' | 'dashed' | 'dotted';

interface ElegantDividerProps {
  orientation?: DividerOrientation;
  variant?: DividerVariant;
  label?: string;
  className?: string;
}

export function ElegantDivider({
  orientation = 'horizontal',
  variant = 'solid',
  label,
  className = '',
}: ElegantDividerProps) {
  const lineColor = 'var(--color-border-subtle)';
  const borderValue = `1px ${variant} ${lineColor}`;

  if (orientation === 'vertical') {
    return (
      <div
        className={className}
        style={{
          width: 0,
          alignSelf: 'stretch',
          borderLeft: borderValue,
          flexShrink: 0,
        }}
        role="separator"
        aria-orientation="vertical"
      />
    );
  }

  if (label) {
    return (
      <div
        className={className}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--primitive-scale-4)',
        }}
        role="separator"
        aria-orientation="horizontal"
      >
        <div style={{ flex: 1, height: 0, borderTop: borderValue }} />
        <span
          style={{
            fontFamily: 'var(--primitive-font-sans)',
            fontSize: 'var(--primitive-font-size-xs)',
            fontWeight: 'var(--primitive-font-weight-regular)',
            color: 'var(--color-text-muted)',
            whiteSpace: 'nowrap',
          }}
        >
          {label}
        </span>
        <div style={{ flex: 1, height: 0, borderTop: borderValue }} />
      </div>
    );
  }

  return (
    <hr
      className={className}
      style={{
        border: 'none',
        borderTop: borderValue,
        margin: 0,
        width: '100%',
      }}
      role="separator"
      aria-orientation="horizontal"
    />
  );
}
