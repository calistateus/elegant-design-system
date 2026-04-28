'use client';

// Mirrors ElegantCheckbox — same tokens, same layout — but circular with no indeterminate state.

import { useId } from 'react';

export type RadioState = 'unselected' | 'selected';

export interface ElegantRadioProps {
  label: string;
  description?: string | false;
  radioState?: RadioState;
  onClick?: () => void;
  /** Shared name ties radios into a group — enables arrow-key nav between them in the browser. */
  name?: string;
  /** Value submitted when this radio is selected. Defaults to label if omitted. */
  value?: string;
  disabled?: boolean;
}

export function ElegantRadio({
  label,
  description,
  radioState = 'unselected',
  onClick,
  name,
  value,
  disabled = false,
}: ElegantRadioProps) {
  const isSelected = radioState === 'selected';
  const descriptionId = useId();

  const wrapperStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 'var(--primitive-scale-3)',
    cursor: disabled ? 'not-allowed' : onClick ? 'pointer' : 'default',
    opacity: disabled ? 'var(--opacity-disabled)' : 1,
  };

  const inputContainerStyle: React.CSSProperties = {
    position: 'relative',
    flexShrink: 0,
    width: '1rem',
    height: '1rem',
    marginTop: '0.125rem',
  };

  const circleStyle: React.CSSProperties = {
    width: '1rem',
    height: '1rem',
    borderRadius: '50%',
    border: `1px solid ${disabled ? 'var(--color-interactive-disabled-border)' : isSelected ? 'var(--color-interactive-primary-bg)' : 'var(--color-border-input)'}`,
    backgroundColor: disabled
      ? 'var(--color-interactive-disabled-bg)'
      : isSelected
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
    // label wraps the native input — clicking anywhere selects the radio;
    // the input's accessible name comes from the label's text content
    <label style={wrapperStyle}>
      <span style={inputContainerStyle}>
        {/* Native input is visually hidden but focusable — provides keyboard
            (Space/arrow keys within group) and screen reader semantics */}
        <input
          type="radio"
          checked={isSelected}
          readOnly={!onClick}
          disabled={disabled}
          aria-disabled={disabled || undefined}
          name={name}
          value={value ?? label}
          aria-describedby={description ? descriptionId : undefined}
          onChange={onClick && !disabled ? onClick : undefined}
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0,
            width: '100%',
            height: '100%',
            margin: 0,
            cursor: disabled ? 'not-allowed' : onClick ? 'pointer' : 'default',
            zIndex: 1,
          }}
        />
        {/* Custom visual — aria-hidden because the native input owns semantics */}
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
