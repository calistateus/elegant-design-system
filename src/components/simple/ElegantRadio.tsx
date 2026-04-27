'use client';

// Mirrors ElegantCheckbox — same tokens, same layout — but circular with no indeterminate state.

export type RadioState = 'unselected' | 'selected';

export interface ElegantRadioProps {
  label: string;
  description?: string | false;
  radioState?: RadioState;
  onClick?: () => void;
}

export function ElegantRadio({
  label,
  description,
  radioState = 'unselected',
  onClick,
}: ElegantRadioProps) {
  const isSelected = radioState === 'selected';

  const wrapperStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 'var(--primitive-scale-3)',
    fontFamily: 'var(--primitive-font-sans)',
    cursor: onClick ? 'pointer' : 'default',
  };

  const circleStyle: React.CSSProperties = {
    flexShrink: 0,
    width: '1rem',
    height: '1rem',
    marginTop: '0.125rem',
    borderRadius: '50%',
    border: `1px solid ${isSelected ? 'var(--color-interactive-primary-bg)' : 'var(--primitive-gray-300)'}`,
    backgroundColor: isSelected
      ? 'var(--color-interactive-primary-bg)'
      : 'var(--primitive-white)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const labelStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--primitive-scale-1)',
  };

  const labelTextStyle: React.CSSProperties = {
    fontSize: 'var(--primitive-font-size-sm)',
    fontWeight: 'var(--primitive-font-weight-medium)',
    color: 'var(--color-text-title)',
    lineHeight: 1.4,
  };

  const descriptionStyle: React.CSSProperties = {
    fontSize: 'var(--primitive-font-size-xs)',
    fontWeight: 'var(--primitive-font-weight-regular)',
    color: 'var(--color-text-muted)',
    lineHeight: 1.5,
  };

  return (
    <div style={wrapperStyle} onClick={onClick}>
      <div style={circleStyle} aria-hidden="true">
        {isSelected && (
          <div
            style={{
              width: '0.375rem',
              height: '0.375rem',
              borderRadius: '50%',
              backgroundColor: 'var(--color-interactive-primary-fg)',
            }}
          />
        )}
      </div>

      <div style={labelStyle}>
        <span style={labelTextStyle}>{label}</span>
        {description && (
          <span style={descriptionStyle}>{description}</span>
        )}
      </div>
    </div>
  );
}
