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
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const listboxRef = useRef<HTMLUListElement>(null);
  const generatedId = useId();
  const triggerId = id ?? `picklist-${generatedId}`;
  const listboxId = `${triggerId}-listbox`;
  const descriptionId = `${generatedId}-description`;
  const errorId = `${generatedId}-error`;
  const hasError = showError && !!error;

  const describedBy = [
    showDescription && description ? descriptionId : null,
    hasError ? errorId : null,
  ].filter(Boolean).join(' ') || undefined;

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
          toggleOption(options[activeIndex].value);
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
    : disabled
    ? 'var(--color-interactive-disabled-border)'
    : focused || open
    ? 'var(--color-border-input-focus)'
    : 'var(--color-border-input)';

  const boxShadow =
    (focused || open) && !hasError ? 'var(--shadow-focus-ring)' : 'none';

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

      <div style={{ position: 'relative' }}>
        {/* Trigger */}
        <button
          id={triggerId}
          type="button"
          disabled={disabled}
          aria-disabled={disabled || undefined}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listboxId}
          aria-activedescendant={open && activeIndex >= 0 ? `${listboxId}-option-${activeIndex}` : undefined}
          aria-multiselectable="true"
          aria-describedby={describedBy}
          aria-invalid={hasError || undefined}
          onClick={() => {
            if (!disabled) {
              setOpen((prev) => !prev);
              setActiveIndex((prev) => !open ? 0 : prev);
            }
          }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onKeyDown={handleKeyDown}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            minHeight: '36px',
            padding:
              selectedOptions.length > 0
                ? 'var(--primitive-scale-1) calc(var(--primitive-scale-8) + var(--primitive-scale-2)) var(--primitive-scale-1) var(--primitive-scale-2)'
                : 'var(--size-input-padding)',
            paddingRight: 'calc(var(--primitive-scale-8) + var(--primitive-scale-2))',
            fontSize: 'var(--primitive-font-size-sm)',
            color: 'var(--color-text-muted)',
            backgroundColor: disabled ? 'var(--color-interactive-disabled-bg)' : 'var(--color-bg-main)',
            border: `1px solid ${borderColor}`,
            borderRadius: 'var(--size-input-radius)',
            outline: 'none',
            cursor: disabled ? 'not-allowed' : 'pointer',
            opacity: disabled ? 'var(--opacity-disabled)' : 1,
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
                  backgroundColor: 'var(--color-interactive-hover-bg)',
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
            ref={listboxRef}
            id={listboxId}
            role="listbox"
            aria-multiselectable="true"
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
              options.map((option, index) => (
                <PicklistItem
                  key={option.value}
                  id={`${listboxId}-option-${index}`}
                  option={option}
                  isSelected={value.includes(option.value)}
                  isHighlighted={index === activeIndex}
                  onMouseEnter={() => setActiveIndex(index)}
                  onToggle={toggleOption}
                />
              ))
            )}
          </ul>
        )}
      </div>

      {hasError && <ElegantErrorMessage id={errorId} message={error} />}
    </div>
  );
}

function PicklistItem({
  id,
  option,
  isSelected,
  isHighlighted,
  onMouseEnter,
  onToggle,
}: {
  id: string;
  option: PicklistOption;
  isSelected: boolean;
  isHighlighted: boolean;
  onMouseEnter: () => void;
  onToggle: (value: string) => void;
}) {
  return (
    <li
      id={id}
      role="option"
      aria-selected={isSelected}
      onMouseEnter={onMouseEnter}
      onMouseDown={(e) => {
        e.preventDefault(); // prevent trigger blur
        onToggle(option.value);
      }}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 'var(--size-menu-item-padding)',
        fontSize: 'var(--primitive-font-size-sm)',
        fontWeight: isSelected
          ? 'var(--primitive-font-weight-medium)'
          : 'var(--primitive-font-weight-regular)',
        color: 'var(--color-text-body)',
        backgroundColor: isSelected
          ? 'var(--color-interactive-hover-bg)'
          : isHighlighted
          ? 'var(--color-bg-surface)'
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
