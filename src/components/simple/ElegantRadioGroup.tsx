'use client';

import { ElegantRadio } from './ElegantRadio';
import { ElegantErrorMessage } from './ElegantErrorMessage';

export interface RadioGroupItem {
  id: string;
  label: string;
  description?: string | false;
}

export interface ElegantRadioGroupProps {
  heading: string;
  description?: string | false;
  items: RadioGroupItem[];
  selectedId?: string;
  onChange?: (id: string) => void;
  error?: string;
  showError?: boolean;
}

export function ElegantRadioGroup({
  heading,
  description,
  items,
  selectedId,
  onChange,
  error,
  showError = false,
}: ElegantRadioGroupProps) {
  const groupStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'var(--primitive-font-sans)',
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
          />
        ))}
      </div>

      {showError && error && (
        <div style={{ marginTop: 'var(--size-form-group-gap)' }}>
          <ElegantErrorMessage message={error} />
        </div>
      )}
    </fieldset>
  );
}
