'use client';

import { useRef, useEffect, useId } from 'react';

export type CheckboxState = 'unselected' | 'selected' | 'indeterminate';

export interface ElegantCheckboxProps {
  label: string;
  description?: string | false;
  checkboxState?: CheckboxState;
  onChange?: (next: CheckboxState) => void;
  disabled?: boolean;
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
  disabled = false,
}: ElegantCheckboxProps) {
  const isChecked = checkboxState === 'selected';
  const isIndeterminate = checkboxState === 'indeterminate';
  const isFilled = isChecked || isIndeterminate;

  const inputRef = useRef<HTMLInputElement>(null);
  const descriptionId = useId();

  // The indeterminate state is not an HTML attribute — must be set imperatively
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = isIndeterminate;
    }
  }, [isIndeterminate]);

  const wrapperStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 'var(--primitive-scale-3)',
    cursor: disabled ? 'not-allowed' : onChange ? 'pointer' : 'default',
    opacity: disabled ? 'var(--opacity-disabled)' : 1,
  };

  const inputContainerStyle: React.CSSProperties = {
    position: 'relative',
    flexShrink: 0,
    width: '1rem',
    height: '1rem',
    marginTop: '0.125rem',
  };

  const boxStyle: React.CSSProperties = {
    width: '1rem',
    height: '1rem',
    borderRadius: 'var(--primitive-radius-sm)',
    border: `1px solid ${disabled ? 'var(--color-interactive-disabled-border)' : isFilled ? 'var(--color-interactive-primary-bg)' : 'var(--color-border-input)'}`,
    backgroundColor: disabled
      ? 'var(--color-interactive-disabled-bg)'
      : isFilled
      ? 'var(--color-interactive-primary-bg)'
      : 'var(--color-bg-main)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
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
    // label wraps the native input — clicking anywhere toggles the checkbox;
    // the input's accessible name comes from the label's text content
    <label style={wrapperStyle}>
      <span style={inputContainerStyle}>
        {/* Native input is visually hidden but focusable — provides keyboard
            (Space) and screen reader (state announcement) semantics */}
        <input
          ref={inputRef}
          type="checkbox"
          checked={isChecked}
          readOnly={!onChange}
          disabled={disabled}
          aria-disabled={disabled || undefined}
          aria-describedby={description ? descriptionId : undefined}
          onChange={onChange && !disabled ? () => onChange(nextState(checkboxState)) : undefined}
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0,
            width: '100%',
            height: '100%',
            margin: 0,
            cursor: disabled ? 'not-allowed' : onChange ? 'pointer' : 'default',
            zIndex: 1,
          }}
        />
        {/* Custom visual — aria-hidden because the native input owns semantics */}
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
      </span>

      <div style={labelStyle}>
        <span style={labelTextStyle}>{label}</span>
        {description && (
          <span id={descriptionId} style={descriptionStyle}>{description}</span>
        )}
      </div>
    </label>
  );
}
