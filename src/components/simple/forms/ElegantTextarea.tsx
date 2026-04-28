'use client';

import { useState, useId } from 'react';
import { ElegantErrorMessage } from './ElegantErrorMessage';

export interface ElegantTextareaProps {
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

  // Textarea-specific
  maxChars?: number;
  draggable?: boolean;
  counter?: 'char' | 'word';
  rows?: number;

  // Misc
  disabled?: boolean;
  id?: string;
}

function countWords(text: string): number {
  return text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
}

export function ElegantTextarea({
  value: controlledValue,
  onChange,
  placeholder = 'Placeholder…',
  showPlaceholder = true,
  label = 'Label',
  showLabel = true,
  description = 'Supporting description text.',
  showDescription = true,
  error = 'Error message.',
  showError = false,
  maxChars,
  draggable = false,
  counter,
  rows = 4,
  disabled = false,
  id,
}: ElegantTextareaProps) {
  const [internalValue, setInternalValue] = useState('');
  const value = controlledValue ?? internalValue;

  const textareaId = id ?? `textarea-${Math.random().toString(36).slice(2, 7)}`;
  const generatedId = useId();
  const descriptionId = `${generatedId}-description`;
  const errorId = `${generatedId}-error`;
  const hasError = showError && !!error;
  const isOverLimitLocal = maxChars !== undefined && value.length > maxChars;

  const describedBy = [
    showDescription && description ? descriptionId : null,
    hasError ? errorId : null,
  ].filter(Boolean).join(' ') || undefined;

  const charCount = value.length;
  const wordCount = countWords(value);

  const isOverLimit = maxChars !== undefined && charCount > maxChars;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const next = e.target.value;
    if (maxChars !== undefined && next.length > maxChars) return;
    if (controlledValue === undefined) setInternalValue(next);
    onChange?.(next);
  };

  const textareaStyle: React.CSSProperties = {
    width: '100%',
    padding: 'var(--size-input-padding)',
    fontSize: 'var(--primitive-font-size-sm)',
    fontWeight: 'var(--primitive-font-weight-regular)',
    color: 'var(--color-text-body)',
    backgroundColor: disabled ? 'var(--color-interactive-disabled-bg)' : 'var(--color-bg-main)',
    border: `1px solid ${hasError || isOverLimit ? 'var(--color-error-border)' : disabled ? 'var(--color-interactive-disabled-border)' : 'var(--color-border-input)'}`,
    borderRadius: 'var(--size-input-radius)',
    outline: 'none',
    transition: 'border-color 150ms ease, box-shadow 150ms ease',
    cursor: disabled ? 'not-allowed' : 'text',
    opacity: disabled ? 'var(--opacity-disabled)' : 1,
    resize: draggable ? 'vertical' : 'none',
    lineHeight: 1.6,
    boxSizing: 'border-box',
  };

  const footerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 'calc(var(--size-label-to-description) * -1)',
  };

  const counterStyle: React.CSSProperties = {
    fontSize: 'var(--primitive-font-size-xs)',
    color: isOverLimit ? 'var(--color-error-border)' : 'var(--color-text-muted)',
    lineHeight: 1.4,
  };

  const showCounter = counter !== undefined;

  return (
    <div className="elegant-field">
      {showLabel && (
        <label htmlFor={textareaId} className="elegant-field-label">
          {label}
        </label>
      )}

      {showDescription && (
        <span id={descriptionId} className="elegant-field-description">{description}</span>
      )}

      <textarea
        id={textareaId}
        value={value}
        onChange={handleChange}
        placeholder={showPlaceholder ? placeholder : undefined}
        disabled={disabled}
        aria-disabled={disabled || undefined}
        rows={rows}
        aria-describedby={describedBy}
        aria-invalid={hasError || isOverLimitLocal || undefined}
        style={textareaStyle}
        onFocus={(e) => {
          if (!hasError && !isOverLimit) {
            e.currentTarget.style.borderColor = 'var(--color-border-input-focus)';
            e.currentTarget.style.boxShadow = 'var(--shadow-focus-ring)';
          }
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor =
            hasError || isOverLimit ? 'var(--color-error-border)' : 'var(--color-border-input)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      />

      {showCounter && (
        <div style={footerStyle}>
          <span style={counterStyle}>
            {counter === 'char'
              ? maxChars !== undefined
                ? `${charCount} / ${maxChars}`
                : `${charCount}`
              : `${wordCount} word${wordCount !== 1 ? 's' : ''}`}
          </span>
        </div>
      )}

      {hasError && <ElegantErrorMessage id={errorId} message={error} />}
    </div>
  );
}
