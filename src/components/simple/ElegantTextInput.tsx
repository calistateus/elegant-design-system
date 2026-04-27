'use client';

import { Search, ArrowRight } from 'lucide-react';
import { ElegantErrorMessage } from './ElegantErrorMessage';

type InputIcon = 'search' | 'arrow';

export interface ElegantTextInputProps {
  // Core
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  showPlaceholder?: boolean;

  // Label
  label?: string;
  showLabel?: boolean;

  // Description
  description?: string;
  showDescription?: boolean;

  // Error
  error?: string;
  showError?: boolean;

  // Icon
  icon?: InputIcon;
  showIcon?: boolean;

  // Misc
  disabled?: boolean;
  id?: string;
}

export function ElegantTextInput({
  value,
  onChange,
  placeholder = 'Placeholder…',
  showPlaceholder = true,
  label = 'Label',
  showLabel = true,
  description = 'Supporting description text.',
  showDescription = true,
  error = 'Error message.',
  showError = false,
  icon = 'search',
  showIcon = true,
  disabled = false,
  id,
}: ElegantTextInputProps) {
  const inputId = id ?? `text-input-${Math.random().toString(36).slice(2, 7)}`;
  const hasError = showError && !!error;

  const wrapperStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--primitive-scale-1)',
    fontFamily: 'var(--primitive-font-sans)',
    width: '100%',
  };

  const labelStyle: React.CSSProperties = {
    fontSize: 'var(--primitive-font-size-sm)',
    fontWeight: 'var(--primitive-font-weight-medium)',
    color: 'var(--color-text-title)',
    lineHeight: 1.4,
  };

  const descriptionStyle: React.CSSProperties = {
    fontSize: 'var(--primitive-font-size-xs)',
    color: 'var(--color-text-muted)',
    lineHeight: 1.5,
    marginBottom: 'var(--primitive-scale-1)',
  };

  const inputWrapperStyle: React.CSSProperties = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: showIcon
      ? 'var(--primitive-scale-2) var(--primitive-scale-8) var(--primitive-scale-2) var(--primitive-scale-3)'
      : 'var(--primitive-scale-2) var(--primitive-scale-3)',
    fontFamily: 'var(--primitive-font-sans)',
    fontSize: 'var(--primitive-font-size-sm)',
    fontWeight: 'var(--primitive-font-weight-regular)',
    color: 'var(--color-text-body)',
    backgroundColor: disabled ? 'var(--primitive-gray-100)' : 'var(--primitive-white)',
    border: `1px solid ${hasError ? 'var(--color-error-border)' : 'var(--primitive-gray-300)'}`,
    borderRadius: 'var(--primitive-radius-md)',
    outline: 'none',
    transition: 'border-color 150ms ease, box-shadow 150ms ease',
    cursor: disabled ? 'not-allowed' : 'text',
    opacity: disabled ? 0.6 : 1,
  };

  const iconWrapperStyle: React.CSSProperties = {
    position: 'absolute',
    right: 'var(--primitive-scale-3)',
    display: 'flex',
    alignItems: 'center',
    color: 'var(--color-text-muted)',
    pointerEvents: 'none',
  };

  const IconComponent = icon === 'search' ? Search : ArrowRight;

  return (
    <div style={wrapperStyle}>
      {showLabel && (
        <label htmlFor={inputId} style={labelStyle}>
          {label}
        </label>
      )}

      {showDescription && (
        <span style={descriptionStyle}>{description}</span>
      )}

      <div style={inputWrapperStyle}>
        <input
          id={inputId}
          type="text"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={showPlaceholder ? placeholder : undefined}
          disabled={disabled}
          style={inputStyle}
          onFocus={(e) => {
            if (!hasError) {
              e.currentTarget.style.borderColor = 'var(--primitive-gray-600)';
              e.currentTarget.style.boxShadow = '0 0 0 2px var(--primitive-gray-200)';
            }
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = hasError
              ? 'var(--color-error-border)'
              : 'var(--primitive-gray-300)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        />
        {showIcon && (
          <span style={iconWrapperStyle}>
            <IconComponent size={14} strokeWidth={1.5} />
          </span>
        )}
      </div>

      {hasError && <ElegantErrorMessage message={error} />}
    </div>
  );
}
