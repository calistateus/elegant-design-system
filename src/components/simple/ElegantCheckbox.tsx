'use client';

export type CheckboxState = 'unselected' | 'selected' | 'indeterminate';

export interface ElegantCheckboxProps {
  label: string;
  description?: string | false;
  checkboxState?: CheckboxState;
  onChange?: (next: CheckboxState) => void;
}

function nextState(current: CheckboxState): CheckboxState {
  if (current === 'selected') return 'unselected';
  return 'selected';
}

export function ElegantCheckbox({
  label,
  description,
  checkboxState = 'unselected',
  onChange,
}: ElegantCheckboxProps) {
  const isChecked = checkboxState === 'selected';
  const isIndeterminate = checkboxState === 'indeterminate';
  const isFilled = isChecked || isIndeterminate;

  const wrapperStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 'var(--primitive-scale-3)',
    fontFamily: 'var(--primitive-font-sans)',
    cursor: onChange ? 'pointer' : 'default',
  };

  const boxStyle: React.CSSProperties = {
    flexShrink: 0,
    width: '1rem',
    height: '1rem',
    marginTop: '0.125rem',
    borderRadius: 'var(--primitive-radius-sm)',
    border: `1px solid ${isFilled ? 'var(--color-interactive-primary-bg)' : 'var(--primitive-gray-300)'}`,
    backgroundColor: isFilled
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
    <div style={wrapperStyle} onClick={onChange ? () => onChange(nextState(checkboxState)) : undefined}>
      <div style={boxStyle} aria-hidden="true">
        {isChecked && (
          <svg
            width="10"
            height="8"
            viewBox="0 0 10 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 3.5L3.8 6.5L9 1"
              stroke="var(--color-interactive-primary-fg)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
        {isIndeterminate && (
          <div
            style={{
              width: '0.5rem',
              height: '1.5px',
              backgroundColor: 'var(--color-interactive-primary-fg)',
              // Intentional 1px radius — sharper than --primitive-radius-sm (2px) for the 2px-tall indeterminate bar.
              borderRadius: '1px',
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
