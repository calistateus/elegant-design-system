'use client';

import { useRef, useState, useEffect, useId } from 'react';
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
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const listboxRef = useRef<HTMLUListElement>(null);
  const generatedId = useId();
  const triggerId = id ?? `dropdown-${generatedId}`;
  const listboxId = `${triggerId}-listbox`;
  const descriptionId = `${generatedId}-description`;
  const errorId = `${generatedId}-error`;
  const hasError = showError && !!error;
  const selectedOption = options.find((o) => o.value === value);

  const describedBy = [
    showDescription && description ? descriptionId : null,
    hasError ? errorId : null,
  ].filter(Boolean).join(' ') || undefined;

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function handleMouseDown(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setActiveIndex(-1);
      }
    }
    document.addEventListener('mousedown', handleMouseDown);
    return () => document.removeEventListener('mousedown', handleMouseDown);
  }, [open]);

  // Scroll highlighted option into view
  useEffect(() => {
    if (activeIndex < 0 || !listboxRef.current) return;
    const items = listboxRef.current.querySelectorAll<HTMLElement>('[role="option"]');
    items[activeIndex]?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex]);

  function handleKeyDown(e: React.KeyboardEvent<HTMLButtonElement>) {
    if (disabled) return;
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (!open) { setOpen(true); setActiveIndex(0); return; }
        setActiveIndex((prev) => Math.min(prev + 1, options.length - 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (!open) { setOpen(true); setActiveIndex(options.length - 1); return; }
        setActiveIndex((prev) => Math.max(prev - 1, 0));
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (!open) { setOpen(true); setActiveIndex(0); return; }
        if (activeIndex >= 0 && options[activeIndex]) {
          onChange?.(options[activeIndex].value);
          setOpen(false);
          setActiveIndex(-1);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setOpen(false);
        setActiveIndex(-1);
        break;
      case 'Tab':
        setOpen(false);
        setActiveIndex(-1);
        break;
    }
  }

  const borderColor = hasError
    ? 'var(--color-error-border)'
    : disabled
    ? 'var(--color-interactive-disabled-border)'
    : focused || open
    ? 'var(--color-border-input-focus)'
    : 'var(--color-border-input)';

  const boxShadow = (focused || open) && !hasError ? 'var(--shadow-focus-ring)' : 'none';

  const activeDescendant =
    open && activeIndex >= 0
      ? `${listboxId}-option-${activeIndex}`
      : undefined;

  return (
    <div
      ref={containerRef}
      className="elegant-field"
      style={{ position: 'relative' }}
    >
      {showLabel && (
        <label
          htmlFor={triggerId}
          className="elegant-field-label"
        >
          {label}
        </label>
      )}

      {showDescription && (
        <span
          id={descriptionId}
          className="elegant-field-description"
        >
          {description}
        </span>
      )}

      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <button
          id={triggerId}
          type="button"
          disabled={disabled}
          aria-disabled={disabled || undefined}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listboxId}
          aria-activedescendant={activeDescendant}
          aria-describedby={describedBy}
          aria-invalid={hasError || undefined}
          onClick={() => {
            if (!disabled) {
              setOpen((prev) => !prev);
              setActiveIndex(prev => !open ? 0 : prev);
            }
          }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onKeyDown={handleKeyDown}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 'var(--size-input-padding)',
            paddingRight: 'var(--primitive-scale-8)',
            fontSize: 'var(--primitive-font-size-sm)',
            fontWeight: 'var(--primitive-font-weight-regular)',
            color: selectedOption ? 'var(--color-text-body)' : 'var(--color-text-muted)',
            backgroundColor: disabled ? 'var(--color-interactive-disabled-bg)' : 'var(--color-bg-main)',
            border: `1px solid ${borderColor}`,
            borderRadius: 'var(--size-input-radius)',
            outline: 'none',
            cursor: disabled ? 'not-allowed' : 'pointer',
            opacity: disabled ? 'var(--opacity-disabled)' : 1,
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
          aria-hidden="true"
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
          // aria-labelledby ties the listbox to the same label as the trigger button —
          // no separate aria-label needed since the label element already names it
          <ul
            ref={listboxRef}
            id={listboxId}
            role="listbox"
            aria-labelledby={showLabel ? triggerId : undefined}
            className="elegant-menu-list"
            style={{
              position: 'absolute',
              top: 'calc(100% + var(--primitive-scale-1))',
              left: 0,
              right: 0,
              zIndex: 50,
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              margin: 0,
              listStyle: 'none',
              overflowY: 'auto',
              maxHeight: '240px',
            }}
          >
            {options.length === 0 ? (
              <li
                style={{
                  padding: 'var(--size-menu-item-padding)',
                  fontSize: 'var(--primitive-font-size-sm)',
                  color: 'var(--color-text-muted)',
                }}
              >
                No options
              </li>
            ) : (
              options.map((option, index) => {
                const isSelected = option.value === value;
                const isHighlighted = index === activeIndex;
                return (
                  <DropdownItem
                    key={option.value}
                    id={`${listboxId}-option-${index}`}
                    option={option}
                    isSelected={isSelected}
                    isHighlighted={isHighlighted}
                    onMouseEnter={() => setActiveIndex(index)}
                    onSelect={(val) => {
                      onChange?.(val);
                      setOpen(false);
                      setActiveIndex(-1);
                    }}
                  />
                );
              })
            )}
          </ul>
        )}
      </div>

      {hasError && <ElegantErrorMessage id={errorId} message={error} />}
    </div>
  );
}

function DropdownItem({
  id,
  option,
  isSelected,
  isHighlighted,
  onMouseEnter,
  onSelect,
}: {
  id: string;
  option: DropdownOption;
  isSelected: boolean;
  isHighlighted: boolean;
  onMouseEnter: () => void;
  onSelect: (value: string) => void;
}) {
  return (
    <li
      id={id}
      role="option"
      aria-selected={isSelected}
      onMouseEnter={onMouseEnter}
      onMouseDown={(e) => {
        // Prevent the trigger from blurring before the click registers
        e.preventDefault();
        onSelect(option.value);
      }}
      style={{
        padding: 'var(--size-menu-item-padding)',
        fontSize: 'var(--primitive-font-size-sm)',
        fontWeight: isSelected
          ? 'var(--primitive-font-weight-medium)'
          : 'var(--primitive-font-weight-regular)',
        color: 'var(--color-text-body)',
        backgroundColor: isSelected
          ? 'var(--primitive-gray-100)'
          : isHighlighted
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
