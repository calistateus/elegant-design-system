'use client';

import { useRef, useState, useEffect, useId } from 'react';
import { ChevronDown, X, Check } from 'lucide-react';
import { ElegantErrorMessage } from './ElegantErrorMessage';

export interface PicklistOption {
  label: string;
  value: string;
}

export interface ElegantPicklistProps {
  options?: PicklistOption[];

  // Controlled value
  value?: string[];
  onChange?: (value: string[]) => void;

  // Placeholder
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

  // Misc
  disabled?: boolean;
  id?: string;
}

export function ElegantPicklist({
  options = [],
  value = [],
  onChange,
  placeholder = 'Select…',
  showPlaceholder = true,
  label = 'Label',
  showLabel = true,
  description = 'Supporting description text.',
  showDescription = true,
  error = 'Error message.',
  showError = false,
  disabled = false,
  id,
}: ElegantPicklistProps) {
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const generatedId = useId();
  const triggerId = id ?? `picklist-${generatedId}`;
  const hasError = showError && !!error;

  useEffect(() => {
    if (!open) return;
    function handleMouseDown(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleMouseDown);
    return () => document.removeEventListener('mousedown', handleMouseDown);
  }, [open]);

  function toggleOption(optionValue: string) {
    if (!onChange) return;
    if (value.includes(optionValue)) {
      onChange(value.filter((v) => v !== optionValue));
    } else {
      onChange([...value, optionValue]);
    }
  }

  function removeOption(e: React.MouseEvent, optionValue: string) {
    e.stopPropagation();
    onChange?.(value.filter((v) => v !== optionValue));
  }

  const selectedOptions = options.filter((o) => value.includes(o.value));

  const borderColor = hasError
    ? 'var(--color-error-border)'
    : focused || open
    ? 'var(--primitive-gray-600)'
    : 'var(--primitive-gray-300)';

  const boxShadow =
    (focused || open) && !hasError ? '0 0 0 2px var(--primitive-gray-200)' : 'none';

  return (
    <div
      ref={containerRef}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--primitive-scale-1)',
        fontFamily: 'var(--primitive-font-sans)',
        width: '100%',
        position: 'relative',
      }}
    >
      {showLabel && (
        <label
          htmlFor={triggerId}
          style={{
            fontSize: 'var(--primitive-font-size-sm)',
            fontWeight: 'var(--primitive-font-weight-medium)',
            color: 'var(--color-text-title)',
            lineHeight: 1.4,
          }}
        >
          {label}
        </label>
      )}

      {showDescription && (
        <span
          style={{
            fontSize: 'var(--primitive-font-size-xs)',
            color: 'var(--color-text-muted)',
            lineHeight: 1.5,
            marginBottom: 'var(--primitive-scale-1)',
          }}
        >
          {description}
        </span>
      )}

      <div style={{ position: 'relative' }}>
        {/* Trigger */}
        <button
          id={triggerId}
          type="button"
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-multiselectable="true"
          onClick={() => {
            if (!disabled) setOpen((prev) => !prev);
          }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            minHeight: '36px',
            padding:
              selectedOptions.length > 0
                ? 'var(--primitive-scale-1) calc(var(--primitive-scale-8) + var(--primitive-scale-2)) var(--primitive-scale-1) var(--primitive-scale-2)'
                : 'var(--primitive-scale-2) calc(var(--primitive-scale-8) + var(--primitive-scale-2)) var(--primitive-scale-2) var(--primitive-scale-3)',
            fontFamily: 'var(--primitive-font-sans)',
            fontSize: 'var(--primitive-font-size-sm)',
            color: 'var(--color-text-muted)',
            backgroundColor: disabled ? 'var(--primitive-gray-100)' : 'var(--primitive-white)',
            border: `1px solid ${borderColor}`,
            borderRadius: 'var(--primitive-radius-md)',
            outline: 'none',
            cursor: disabled ? 'not-allowed' : 'pointer',
            opacity: disabled ? 0.6 : 1,
            transition: 'var(--motion-dropdown-trigger)',
            boxShadow,
            textAlign: 'left',
            flexWrap: 'wrap',
            gap: 'var(--primitive-scale-1)',
          }}
        >
          {selectedOptions.length > 0 ? (
            selectedOptions.map((opt) => (
              <span
                key={opt.value}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '3px',
                  padding: '2px var(--primitive-scale-2)',
                  backgroundColor: 'var(--primitive-gray-100)',
                  color: 'var(--color-text-body)',
                  borderRadius: 'var(--primitive-radius-full)',
                  fontSize: 'var(--primitive-font-size-xs)',
                  fontWeight: 'var(--primitive-font-weight-medium)',
                  lineHeight: 1.4,
                  whiteSpace: 'nowrap',
                  maxWidth: '140px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                <span
                  style={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {opt.label}
                </span>
                <span
                  role="button"
                  aria-label={`Remove ${opt.label}`}
                  onMouseDown={(e) => removeOption(e, opt.value)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    color: 'var(--color-text-muted)',
                    flexShrink: 0,
                  }}
                >
                  <X size={10} strokeWidth={2} />
                </span>
              </span>
            ))
          ) : showPlaceholder ? (
            placeholder
          ) : (
            '\u00A0'
          )}
        </button>

        {/* Chevron */}
        <span
          style={{
            position: 'absolute',
            right: 'var(--primitive-scale-3)',
            top: '50%',
            transform: open ? 'translateY(-50%) rotate(180deg)' : 'translateY(-50%) rotate(0deg)',
            display: 'flex',
            alignItems: 'center',
            color: 'var(--color-text-muted)',
            pointerEvents: 'none',
            transition: 'var(--motion-dropdown-chevron)',
          }}
        >
          <ChevronDown size={14} strokeWidth={1.5} />
        </span>

        {/* Listbox */}
        {open && (
          <ul
            role="listbox"
            aria-multiselectable="true"
            style={{
              position: 'absolute',
              top: 'calc(100% + var(--primitive-scale-1))',
              left: 0,
              right: 0,
              zIndex: 50,
              backgroundColor: 'var(--primitive-white)',
              border: '1px solid var(--primitive-gray-300)',
              borderRadius: 'var(--primitive-radius-md)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              margin: 0,
              padding: 'var(--primitive-scale-1) 0',
              listStyle: 'none',
              overflowY: 'auto',
              maxHeight: '240px',
            }}
          >
            {options.length === 0 ? (
              <li
                style={{
                  padding: 'var(--primitive-scale-2) var(--primitive-scale-3)',
                  fontSize: 'var(--primitive-font-size-sm)',
                  color: 'var(--color-text-muted)',
                }}
              >
                No options
              </li>
            ) : (
              options.map((option) => (
                <PicklistItem
                  key={option.value}
                  option={option}
                  isSelected={value.includes(option.value)}
                  onToggle={toggleOption}
                />
              ))
            )}
          </ul>
        )}
      </div>

      {hasError && <ElegantErrorMessage message={error} />}
    </div>
  );
}

function PicklistItem({
  option,
  isSelected,
  onToggle,
}: {
  option: PicklistOption;
  isSelected: boolean;
  onToggle: (value: string) => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <li
      role="option"
      aria-selected={isSelected}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseDown={(e) => e.preventDefault()} // prevent trigger blur
      onClick={() => onToggle(option.value)}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 'var(--primitive-scale-2) var(--primitive-scale-3)',
        fontSize: 'var(--primitive-font-size-sm)',
        fontWeight: isSelected
          ? 'var(--primitive-font-weight-medium)'
          : 'var(--primitive-font-weight-regular)',
        color: 'var(--color-text-body)',
        backgroundColor: isSelected
          ? 'var(--primitive-gray-100)'
          : hovered
          ? 'var(--primitive-gray-50)'
          : 'transparent',
        cursor: 'pointer',
        transition: 'var(--motion-dropdown-item)',
        userSelect: 'none',
      }}
    >
      <span>{option.label}</span>
      {isSelected && (
        <span
          style={{
            display: 'flex',
            alignItems: 'center',
            color: 'var(--color-text-accent)',
            flexShrink: 0,
          }}
        >
          <Check size={14} strokeWidth={2} />
        </span>
      )}
    </li>
  );
}
