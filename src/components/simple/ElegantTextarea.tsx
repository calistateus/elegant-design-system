'use client';

import { useState } from 'react';
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
  const hasError = showError && !!error;

  const charCount = value.length;
  const wordCount = countWords(value);

  const isOverLimit = maxChars !== undefined && charCount > maxChars;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const next = e.target.value;
    if (maxChars !== undefined && next.length > maxChars) return;
    if (controlledValue === undefined) setInternalValue(next);
    onChange?.(next);
  };

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

  const textareaStyle: React.CSSProperties = {
    width: '100%',
    padding: 'var(--primitive-scale-2) var(--primitive-scale-3)',
    fontFamily: 'var(--primitive-font-sans)',
    fontSize: 'var(--primitive-font-size-sm)',
    fontWeight: 'var(--primitive-font-weight-regular)',
    color: 'var(--color-text-body)',
    backgroundColor: disabled ? 'var(--primitive-gray-100)' : 'var(--primitive-white)',
    border: `1px solid ${hasError || isOverLimit ? 'var(--color-error-border)' : 'var(--primitive-gray-300)'}`,
    borderRadius: 'var(--primitive-radius-md)',
    outline: 'none',
    transition: 'border-color 150ms ease, box-shadow 150ms ease',
    cursor: disabled ? 'not-allowed' : 'text',
    opacity: disabled ? 0.6 : 1,
    resize: draggable ? 'vertical' : 'none',
    lineHeight: 1.6,
    boxSizing: 'border-box',
  };

  const footerStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 'calc(var(--primitive-scale-1) * -1)',
  };

  const counterStyle: React.CSSProperties = {
    fontSize: 'var(--primitive-font-size-xs)',
    color: isOverLimit ? 'var(--color-error-border)' : 'var(--color-text-muted)',
    lineHeight: 1.4,
  };

  const showCounter = counter !== undefined;

  return (
    <div style={wrapperStyle}>
      {showLabel && (
        <label htmlFor={textareaId} style={labelStyle}>
          {label}
        </label>
      )}

      {showDescription && (
        <span style={descriptionStyle}>{description}</span>
      )}

      <textarea
        id={textareaId}
        value={value}
        onChange={handleChange}
        placeholder={showPlaceholder ? placeholder : undefined}
        disabled={disabled}
        rows={rows}
        style={textareaStyle}
        onFocus={(e) => {
          if (!hasError && !isOverLimit) {
            e.currentTarget.style.borderColor = 'var(--primitive-gray-600)';
            e.currentTarget.style.boxShadow = '0 0 0 2px var(--primitive-gray-200)';
          }
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor =
            hasError || isOverLimit ? 'var(--color-error-border)' : 'var(--primitive-gray-300)';
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

      {hasError && <ElegantErrorMessage message={error} />}
    </div>
  );
}
