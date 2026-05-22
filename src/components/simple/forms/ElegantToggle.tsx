'use client';

import { useState } from 'react';

export interface ElegantToggleProps {
  label: string;
  description?: string | false;
  toggled?: boolean;
  onToggle?: (value: boolean) => void;
  disabled?: boolean;
  /** Override the accessible name announced by screen readers.
   *  Defaults to the visible label text. Use when the label alone
   *  lacks enough context (e.g. "Enable" → "Enable dark mode"). */
  ariaLabel?: string;
}

export function ElegantToggle({
  label,
  description,
  toggled = false,
  onToggle,
  disabled = false,
  ariaLabel,
}: ElegantToggleProps) {
  const [internalToggled, setInternalToggled] = useState(toggled);
  const isOn = onToggle !== undefined ? toggled : internalToggled;

  function handleClick() {
    if (disabled) return;
    const next = !isOn;
    setInternalToggled(next);
    onToggle?.(next);
  }

  const wrapperStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 'var(--size-tag-gap)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    userSelect: 'none',
    opacity: disabled ? 'var(--opacity-disabled)' : 1,
  };

  const pillStyle: React.CSSProperties = {
    flexShrink: 0,
    width: '2rem',
    height: '1.25rem',
    marginTop: '0.125rem',
    borderRadius: '999px',
    backgroundColor: 'var(--color-interactive-primary-bg)',
    position: 'relative',
    transition: 'background-color 0.2s ease',
  };

  const thumbStyle: React.CSSProperties = {
    position: 'absolute',
    top: '0.125rem',
    left: isOn ? 'calc(2rem - 1rem - 0.125rem)' : '0.125rem',
    width: '1rem',
    height: '1rem',
    borderRadius: '50%',
    backgroundColor: 'var(--color-interactive-primary-fg)',
    transition: 'left 0.2s ease',
    boxShadow: '0 1px 2px rgba(0,0,0,0.15)',
  };

  const textGroupStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--size-label-to-description)',
  };

  const labelStyle: React.CSSProperties = {
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
    <div
      style={wrapperStyle}
      onClick={handleClick}
      role="switch"
      aria-checked={isOn}
      aria-label={ariaLabel ?? label}
      aria-disabled={disabled || undefined}
      tabIndex={disabled ? -1 : 0}
      onKeyDown={(e) => {
        if (disabled) return;
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      <div style={textGroupStyle}>
        <span style={labelStyle}>{label}</span>
        {description && (
          <span style={descriptionStyle}>{description}</span>
        )}
      </div>

      <div style={pillStyle} aria-hidden="true">
        <div style={thumbStyle} />
      </div>
    </div>
  );
}
