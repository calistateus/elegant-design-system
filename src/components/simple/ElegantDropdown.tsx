'use client';

import { useRef, useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { ElegantErrorMessage } from './ElegantErrorMessage';

export interface DropdownOption {
  label: string;
  value: string;
}

export interface ElegantDropdownProps {
  // Options
  options?: DropdownOption[];

  // Controlled value
  value?: string;
  onChange?: (value: string) => void;

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

export function ElegantDropdown({
  options = [],
  value,
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
}: ElegantDropdownProps) {
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerId = id ?? `dropdown-${Math.random().toString(36).slice(2, 7)}`;
  const hasError = showError && !!error;
  const selectedOption = options.find((o) => o.value === value);

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

  const borderColor = hasError
    ? 'var(--color-error-border)'
    : focused || open
    ? 'var(--primitive-gray-600)'
    : 'var(--primitive-gray-300)';

  const boxShadow = (focused || open) && !hasError ? '0 0 0 2px var(--primitive-gray-200)' : 'none';

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

      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <button
          id={triggerId}
          type="button"
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => {
            if (!disabled) setOpen((prev) => !prev);
          }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 'var(--primitive-scale-2) var(--primitive-scale-8) var(--primitive-scale-2) var(--primitive-scale-3)',
            fontFamily: 'var(--primitive-font-sans)',
            fontSize: 'var(--primitive-font-size-sm)',
            fontWeight: 'var(--primitive-font-weight-regular)',
            color: selectedOption ? 'var(--color-text-body)' : 'var(--color-text-muted)',
            backgroundColor: disabled ? 'var(--primitive-gray-100)' : 'var(--primitive-white)',
            border: `1px solid ${borderColor}`,
            borderRadius: 'var(--primitive-radius-md)',
            outline: 'none',
            cursor: disabled ? 'not-allowed' : 'pointer',
            opacity: disabled ? 0.6 : 1,
            transition: 'border-color 150ms ease, box-shadow 150ms ease',
            boxShadow,
            textAlign: 'left',
          }}
        >
          <span
            style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {selectedOption
              ? selectedOption.label
              : showPlaceholder
              ? placeholder
              : '\u00A0'}
          </span>
        </button>

        <span
          style={{
            position: 'absolute',
            right: 'var(--primitive-scale-3)',
            display: 'flex',
            alignItems: 'center',
            color: 'var(--color-text-muted)',
            pointerEvents: 'none',
            transition: 'transform 150ms ease',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        >
          <ChevronDown size={14} strokeWidth={1.5} />
        </span>

        {open && (
          <ul
            role="listbox"
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
              options.map((option) => {
                const isSelected = option.value === value;
                return (
                  <DropdownItem
                    key={option.value}
                    option={option}
                    isSelected={isSelected}
                    onSelect={(val) => {
                      onChange?.(val);
                      setOpen(false);
                    }}
                  />
                );
              })
            )}
          </ul>
        )}
      </div>

      {hasError && <ElegantErrorMessage message={error} />}
    </div>
  );
}

function DropdownItem({
  option,
  isSelected,
  onSelect,
}: {
  option: DropdownOption;
  isSelected: boolean;
  onSelect: (value: string) => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <li
      role="option"
      aria-selected={isSelected}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onSelect(option.value)}
      style={{
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
        transition: 'background-color 100ms ease',
        userSelect: 'none',
      }}
    >
      {option.label}
    </li>
  );
}
