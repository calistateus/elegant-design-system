'use client';

import { useId } from 'react';
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
  const generatedId = useId();
  const descriptionId = `${generatedId}-description`;
  const errorId = `${generatedId}-error`;
  const hasError = showError && !!error;

  // Build aria-describedby from whichever helpers are visible
  const describedBy = [
    showDescription && description ? descriptionId : null,
    hasError ? errorId : null,
  ].filter(Boolean).join(' ') || undefined;

  const inputWrapperStyle: React.CSSProperties = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: showIcon
      ? 'var(--primitive-scale-2) var(--primitive-scale-8) var(--primitive-scale-2) var(--primitive-scale-3)'
      : 'var(--size-input-padding)',
    fontSize: 'var(--primitive-font-size-sm)',
    fontWeight: 'var(--primitive-font-weight-regular)',
    color: 'var(--color-text-body)',
    backgroundColor: disabled ? 'var(--color-interactive-disabled-bg)' : 'var(--color-bg-main)',
    border: `1px solid ${hasError ? 'var(--color-error-border)' : disabled ? 'var(--color-interactive-disabled-border)' : 'var(--color-border-input)'}`,
    borderRadius: 'var(--size-input-radius)',
    outline: 'none',
    transition: 'border-color 150ms ease, box-shadow 150ms ease',
    cursor: disabled ? 'not-allowed' : 'text',
    opacity: disabled ? 'var(--opacity-disabled)' : 1,
  };

  const iconWrapperStyle: React.CSSProperties = {
    position: 'absolute',
    right: 'var(--primitive-scale-3)', /* icon anchor — no semantic token for ad-hoc positions */
    display: 'flex',
    alignItems: 'center',
    color: 'var(--color-text-muted)',
    pointerEvents: 'none',
  };

  const IconComponent = icon === 'search' ? Search : ArrowRight;

  return (
    <div className="elegant-field">
      {showLabel && (
        <label htmlFor={inputId} className="elegant-field-label">
          {label}
        </label>
      )}

      {showDescription && (
        <span id={descriptionId} className="elegant-field-description">{description}</span>
      )}

      <div style={inputWrapperStyle}>
        <input
          id={inputId}
          type="text"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={showPlaceholder ? placeholder : undefined}
          disabled={disabled}
          aria-disabled={disabled || undefined}
          aria-describedby={describedBy}
          aria-invalid={hasError || undefined}
          style={inputStyle}
          onFocus={(e) => {
            if (!hasError) {
              e.currentTarget.style.borderColor = 'var(--color-border-input-focus)';
              e.currentTarget.style.boxShadow = 'var(--shadow-focus-ring)';
            }
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = hasError
              ? 'var(--color-error-border)'
              : 'var(--color-border-input)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        />
        {showIcon && (
          <span style={iconWrapperStyle}>
            <IconComponent size={14} strokeWidth={1.5} />
          </span>
        )}
      </div>

      {hasError && <ElegantErrorMessage id={errorId} message={error} />}
    </div>
  );
}
