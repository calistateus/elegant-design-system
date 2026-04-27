'use client';

import { useRef, useState, useCallback } from 'react';

interface ActionLink {
  label: string;
  onClick: () => void;
}

interface ElegantPinInputProps {
  heading: string;
  description?: string;
  digits?: 4 | 6;
  actionLink?: ActionLink;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  disabled?: boolean;
}

export function ElegantPinInput({
  heading,
  description,
  digits = 4,
  actionLink,
  onChange,
  onComplete,
  disabled = false,
}: ElegantPinInputProps) {
  const [values, setValues] = useState<string[]>(Array(digits).fill(''));
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const updateValues = useCallback(
    (next: string[]) => {
      setValues(next);
      const joined = next.join('');
      onChange?.(joined);
      if (joined.length === digits && next.every((v) => v !== '')) {
        onComplete?.(joined);
      }
    },
    [digits, onChange, onComplete]
  );

  const handleChange = (index: number, raw: string) => {
    const digit = raw.replace(/\D/g, '').slice(-1);
    const next = [...values];
    next[index] = digit;
    updateValues(next);
    if (digit && index < digits - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (values[index]) {
        const next = [...values];
        next[index] = '';
        updateValues(next);
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < digits - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, digits);
    if (!pasted) return;
    const next = Array(digits).fill('');
    pasted.split('').forEach((char, i) => { next[i] = char; });
    updateValues(next);
    const nextFocus = Math.min(pasted.length, digits - 1);
    inputRefs.current[nextFocus]?.focus();
  };

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--primitive-scale-4)',
    fontFamily: 'var(--primitive-font-sans)',
  };

  const headingStyle: React.CSSProperties = {
    fontFamily: 'var(--type-h5-family)',
    fontSize: 'var(--type-h5-size)',
    fontWeight: 'var(--type-h5-weight)',
    lineHeight: 'var(--type-h5-line-height)',
    color: 'var(--color-text-title)',
    margin: 0,
  };

  const descriptionStyle: React.CSSProperties = {
    fontSize: 'var(--primitive-font-size-sm)',
    fontWeight: 'var(--primitive-font-weight-regular)',
    color: 'var(--color-text-muted)',
    lineHeight: 1.5,
    margin: 0,
    marginTop: 'calc(var(--primitive-scale-1) * -1)',
  };

  const cellsStyle: React.CSSProperties = {
    display: 'flex',
    gap: 'var(--primitive-scale-2)',
  };

  const getCellStyle = (index: number): React.CSSProperties => ({
    width: '2.75rem',
    height: '3rem',
    textAlign: 'center',
    fontFamily: 'var(--primitive-font-mono)',
    fontSize: 'var(--primitive-font-size-xl)',
    fontWeight: 'var(--primitive-font-weight-medium)',
    color: 'var(--color-text-body)',
    backgroundColor: disabled ? 'var(--primitive-gray-100)' : 'var(--primitive-white)',
    border: `1px solid ${focusedIndex === index ? 'var(--primitive-gray-600)' : 'var(--primitive-gray-300)'}`,
    borderRadius: 'var(--primitive-radius-md)',
    outline: 'none',
    boxShadow: focusedIndex === index ? '0 0 0 2px var(--primitive-gray-200)' : 'none',
    transition: 'border-color 150ms ease, box-shadow 150ms ease',
    cursor: disabled ? 'not-allowed' : 'text',
    opacity: disabled ? 0.6 : 1,
    caretColor: 'transparent',
  });

  const actionLinkStyle: React.CSSProperties = {
    fontFamily: 'var(--type-action-link-family)',
    fontSize: 'var(--type-action-link-size)',
    fontWeight: 'var(--type-action-link-weight)',
    lineHeight: 'var(--type-action-link-line-height)',
    letterSpacing: 'var(--type-action-link-letter-spacing)',
    color: 'var(--color-text-accent)',
    background: 'none',
    border: 'none',
    padding: 0,
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'opacity 150ms ease',
    alignSelf: 'flex-start',
  };

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--primitive-scale-1)' }}>
        <h5 style={headingStyle}>{heading}</h5>
        {description && <p style={descriptionStyle}>{description}</p>}
      </div>

      <div style={cellsStyle} role="group" aria-label={heading}>
        {values.map((val, i) => (
          <input
            key={i}
            ref={(el) => { inputRefs.current[i] = el; }}
            type="text"
            inputMode="numeric"
            pattern="\d*"
            maxLength={1}
            value={val}
            disabled={disabled}
            aria-label={`Digit ${i + 1} of ${digits}`}
            style={getCellStyle(i)}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            onPaste={handlePaste}
            onFocus={() => setFocusedIndex(i)}
            onBlur={() => setFocusedIndex(null)}
          />
        ))}
      </div>

      {actionLink && (
        <button
          style={actionLinkStyle}
          onClick={actionLink.onClick}
          disabled={disabled}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.7'; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
        >
          {actionLink.label}
        </button>
      )}
    </div>
  );
}
