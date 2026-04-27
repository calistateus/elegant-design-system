type DividerOrientation = 'horizontal' | 'vertical';

interface ElegantDividerProps {
  orientation?: DividerOrientation;
  label?: string;
  className?: string;
}

export function ElegantDivider({
  orientation = 'horizontal',
  label,
  className = '',
}: ElegantDividerProps) {
  if (orientation === 'vertical') {
    return (
      <div
        className={className}
        style={{
          width: '1px',
          alignSelf: 'stretch',
          backgroundColor: 'var(--color-border-subtle)',
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
        <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--color-border-subtle)' }} />
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
        <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--color-border-subtle)' }} />
      </div>
    );
  }

  return (
    <hr
      className={className}
      style={{
        border: 'none',
        borderTop: '1px solid var(--color-border-subtle)',
        margin: 0,
        width: '100%',
      }}
      aria-orientation="horizontal"
    />
  );
}
