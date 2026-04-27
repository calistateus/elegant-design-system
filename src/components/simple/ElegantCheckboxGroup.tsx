'use client';

import { ElegantCheckbox, CheckboxState } from './ElegantCheckbox';
import { ElegantErrorMessage } from './ElegantErrorMessage';

export interface CheckboxGroupItem {
  id: string;
  label: string;
  description?: string | false;
  state?: CheckboxState;
}

export interface ElegantCheckboxGroupProps {
  heading: string;
  description?: string | false;
  items: CheckboxGroupItem[];
  onChange?: (id: string, next: CheckboxState) => void;
  error?: string;
  showError?: boolean;
}

export function ElegantCheckboxGroup({
  heading,
  description,
  items,
  onChange,
  error,
  showError = false,
}: ElegantCheckboxGroupProps) {
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

      <div style={itemsStyle}>
        {items.map((item) => (
          <ElegantCheckbox
            key={item.id}
            label={item.label}
            description={item.description}
            checkboxState={item.state ?? 'unselected'}
            onChange={onChange ? (next) => onChange(item.id, next) : undefined}
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
