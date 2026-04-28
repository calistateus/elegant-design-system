'use client';

import { useId } from 'react';
import { ElegantRadio } from './ElegantRadio';
import { ElegantErrorMessage } from './ElegantErrorMessage';

export interface RadioGroupItem {
  id: string;
  label: string;
  description?: string | false;
  disabled?: boolean;
}

export interface ElegantRadioGroupProps {
  heading: string;
  description?: string | false;
  items: RadioGroupItem[];
  selectedId?: string;
  onChange?: (id: string) => void;
  error?: string;
  showError?: boolean;
  disabled?: boolean;
}

export function ElegantRadioGroup({
  heading,
  description,
  items,
  selectedId,
  onChange,
  error,
  showError = false,
  disabled = false,
}: ElegantRadioGroupProps) {
  // Shared name groups the radios so the browser enables arrow-key navigation between them
  const groupName = useId();

  const groupStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--size-label-to-description)',
    marginBottom: 'var(--size-form-group-gap)',
  };

  const headingStyle: React.CSSProperties = {
    fontSize: 'var(--primitive-font-size-sm)',
    fontWeight: 'var(--primitive-font-weight-bold)',
    color: 'var(--color-text-title)',
    lineHeight: 1.4,
  };

  const descriptionStyle: React.CSSProperties = {
    fontSize: 'var(--primitive-font-size-xs)',
    fontWeight: 'var(--primitive-font-weight-regular)',
    color: 'var(--color-text-muted)',
    lineHeight: 1.5,
  };

  const itemsStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--size-form-group-gap)',
  };

  return (
    <fieldset style={groupStyle}>
      <legend style={{ padding: 0, border: 'none', width: '100%' }}>
        <div style={headerStyle}>
          <span style={headingStyle}>{heading}</span>
          {description && <span style={descriptionStyle}>{description}</span>}
        </div>
      </legend>

      <div style={itemsStyle} role="radiogroup">
        {items.map((item) => (
          <ElegantRadio
            key={item.id}
            label={item.label}
            description={item.description}
            radioState={item.id === selectedId ? 'selected' : 'unselected'}
            onClick={onChange ? () => onChange(item.id) : undefined}
            name={groupName}
            value={item.id}
            disabled={disabled || item.disabled}
          />
        ))}
      </div>

      {showError && error && (
        <div style={{ marginTop: 'var(--size-form-group-gap)' }} role="alert" aria-live="polite">
          <ElegantErrorMessage message={error} />
        </div>
      )}
    </fieldset>
  );
}
