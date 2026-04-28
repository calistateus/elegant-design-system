'use client';

import { useRef, useState, useId } from 'react';
import { Search, X } from 'lucide-react';

export interface ElegantSearchProps {
  // Core
  value?: string;
  onChange?: (value: string) => void;
  onSelect?: (value: string) => void;

  // Text
  label?: string;
  showLabel?: boolean;
  description?: string;
  showDescription?: boolean;
  placeholder?: string;
  showPlaceholder?: boolean;

  // Autocomplete
  autocomplete?: boolean;
  suggestions?: string[];

  // Misc
  disabled?: boolean;
  id?: string;
}

export function ElegantSearch({
  value,
  onChange,
  onSelect,
  label = 'Label',
  showLabel = true,
  description = 'Supporting description text.',
  showDescription = true,
  placeholder = 'Search…',
  showPlaceholder = true,
  autocomplete = false,
  suggestions = [],
  disabled = false,
  id,
}: ElegantSearchProps) {
  const generatedId = useId();
  const inputId = id ?? `search-${generatedId}`;
  const listboxId = `${inputId}-listbox`;

  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [focused, setFocused] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const hasValue = !!value;

  const filtered = autocomplete && value
    ? suggestions.filter((s) =>
        s.toLowerCase().includes(value.toLowerCase())
      )
    : suggestions;

  // Show the listbox when there are matches OR when the user has typed
  // something and got no results (so we can display the empty state)
  const hasQuery = !!value && value.length > 0;
  const showList = autocomplete && open && (filtered.length > 0 || hasQuery);
  const showNoResults = autocomplete && open && hasQuery && filtered.length === 0;

  const borderColor = disabled
    ? 'var(--color-interactive-disabled-border)'
    : focused || open
    ? 'var(--color-border-input-focus)'
    : 'var(--color-border-input)';

  const boxShadow = !disabled && (focused || open)
    ? 'var(--shadow-focus-ring)'
    : 'none';

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const next = e.target.value;
    onChange?.(next);
    setActiveIndex(-1);
    setOpen(true);
  }

  function handleClear() {
    onChange?.('');
    setOpen(false);
    setActiveIndex(-1);
    inputRef.current?.focus();
  }

  function handleSelect(suggestion: string) {
    onChange?.(suggestion);
    onSelect?.(suggestion);
    setOpen(false);
    setActiveIndex(-1);
    inputRef.current?.focus();
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!autocomplete) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (!open) { setOpen(true); return; }
      setActiveIndex((prev) => Math.min(prev + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => Math.max(prev - 1, -1));
    } else if (e.key === 'Enter') {
      if (activeIndex >= 0 && filtered[activeIndex] !== undefined) {
        e.preventDefault();
        handleSelect(filtered[activeIndex]);
      }
    } else if (e.key === 'Escape') {
      setOpen(false);
      setActiveIndex(-1);
    }
  }

  function handleBlur(e: React.FocusEvent<HTMLDivElement>) {
    if (containerRef.current && !containerRef.current.contains(e.relatedTarget as Node)) {
      setOpen(false);
      setFocused(false);
      setActiveIndex(-1);
    }
  }

  return (
    <div
      ref={containerRef}
      onBlur={handleBlur}
      className="elegant-field"
      style={{ position: 'relative' }}
    >
      {/* Suppress the native browser search-cancel button */}
      <style>{`#${CSS.escape(inputId)}::-webkit-search-cancel-button { display: none; }`}</style>

      {showLabel && (
        <label
          htmlFor={inputId}
          className="elegant-field-label"
        >
          {label}
        </label>
      )}

      {showDescription && (
        <span className="elegant-field-description">
          {description}
        </span>
      )}

      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        {/* Search icon — always present, left-anchored */}
        <span
          style={{
            position: 'absolute',
            left: 'var(--primitive-scale-3)',
            display: 'flex',
            alignItems: 'center',
            color: 'var(--color-text-muted)',
            pointerEvents: 'none',
            zIndex: 1,
          }}
        >
          <Search size={14} strokeWidth={1.5} />
        </span>

        <input
          ref={inputRef}
          id={inputId}
          type="search"
          role={autocomplete ? 'combobox' : undefined}
          aria-autocomplete={autocomplete ? 'list' : undefined}
          aria-expanded={autocomplete ? open : undefined}
          aria-controls={autocomplete ? listboxId : undefined}
          aria-activedescendant={
            autocomplete && activeIndex >= 0
              ? `${listboxId}-option-${activeIndex}`
              : undefined
          }
          disabled={disabled}
          aria-disabled={disabled || undefined}
          value={value}
          onChange={disabled ? undefined : handleChange}
          onFocus={() => {
            if (disabled) return;
            setFocused(true);
            if (autocomplete && filtered.length > 0) setOpen(true);
          }}
          onKeyDown={disabled ? undefined : handleKeyDown}
          placeholder={showPlaceholder ? placeholder : undefined}
          autoComplete="off"
          style={{
            width: '100%',
            padding: 'var(--size-input-padding)',
            paddingLeft: 'var(--primitive-scale-8)',
            paddingRight: hasValue ? 'var(--primitive-scale-8)' : 'var(--primitive-scale-3)',
            fontSize: 'var(--primitive-font-size-sm)',
            fontWeight: 'var(--primitive-font-weight-regular)',
            color: 'var(--color-text-body)',
            backgroundColor: disabled ? 'var(--color-interactive-disabled-bg)' : 'var(--color-bg-main)',
            border: `1px solid ${borderColor}`,
            cursor: disabled ? 'not-allowed' : undefined,
            opacity: disabled ? 'var(--opacity-disabled)' : 1,
            borderRadius: showList
              ? 'var(--size-input-radius) var(--size-input-radius) 0 0'
              : 'var(--size-input-radius)',
            outline: 'none',
            boxShadow,
            transition: 'border-color 150ms ease, box-shadow 150ms ease, border-radius 100ms ease',
            WebkitAppearance: 'none',
            MozAppearance: 'none',
          }}
        />

        {/* Clear button — matches icon size/weight/color */}
        {hasValue && (
          <button
            type="button"
            aria-label="Clear search"
            tabIndex={-1}
            onMouseDown={(e) => {
              e.preventDefault();
              handleClear();
            }}
            style={{
              position: 'absolute',
              right: 'var(--primitive-scale-3)',
              display: 'flex',
              alignItems: 'center',
              color: 'var(--color-text-muted)',
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              transition: 'color var(--primitive-duration-fast) ease',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-text-body)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = 'var(--color-text-muted)';
            }}
          >
            <X size={14} strokeWidth={1.5} />
          </button>
        )}

        {showList && (
          <ul
            id={listboxId}
            role="listbox"
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              zIndex: 50,
              backgroundColor: 'var(--color-bg-main)',
              border: '1px solid var(--color-border-input-focus)',
              borderTop: 'none',
              borderRadius: '0 0 var(--size-input-radius) var(--size-input-radius)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
              margin: 0,
              padding: 'var(--primitive-scale-1) 0',
              listStyle: 'none',
              overflowY: 'auto',
              maxHeight: '240px',
            }}
          >
            {showNoResults ? (
              // Not a selectable option — role="option" would confuse screen readers
              <li
                aria-live="polite"
                style={{
                  padding: 'var(--size-menu-item-padding)',
                  fontSize: 'var(--primitive-font-size-sm)',
                  color: 'var(--color-text-muted)',
                  userSelect: 'none',
                }}
              >
                No results for &ldquo;{value}&rdquo;
              </li>
            ) : (
              filtered.map((suggestion, index) => (
                <SearchSuggestionItem
                  key={suggestion}
                  id={`${listboxId}-option-${index}`}
                  label={suggestion}
                  query={value ?? ''}
                  isActive={index === activeIndex}
                  onMouseEnter={() => setActiveIndex(index)}
                  onSelect={() => handleSelect(suggestion)}
                />
              ))
            )}
          </ul>
        )}
      </div>
    </div>
  );
}

function SearchSuggestionItem({
  id,
  label,
  query,
  isActive,
  onMouseEnter,
  onSelect,
}: {
  id: string;
  label: string;
  query: string;
  isActive: boolean;
  onMouseEnter: () => void;
  onSelect: () => void;
}) {
  const lowerLabel = label.toLowerCase();
  const lowerQuery = query.toLowerCase();
  const matchIndex = lowerLabel.indexOf(lowerQuery);
  const hasMatch = query.length > 0 && matchIndex !== -1;

  return (
    <li
      id={id}
      role="option"
      aria-selected={isActive}
      onMouseEnter={onMouseEnter}
      onMouseDown={(e) => {
        e.preventDefault();
        onSelect();
      }}
      style={{
        padding: 'var(--size-menu-item-padding)',
        fontSize: 'var(--primitive-font-size-sm)',
        fontWeight: 'var(--primitive-font-weight-regular)',
        color: 'var(--color-text-body)',
        backgroundColor: isActive ? 'var(--primitive-gray-100)' : 'transparent',
        cursor: 'pointer',
        transition: 'background-color var(--primitive-duration-instant) ease',
        userSelect: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--primitive-scale-2)',
      }}
    >
      <Search
        size={12}
        strokeWidth={1.5}
        style={{ color: 'var(--color-text-muted)', flexShrink: 0 }}
      />
      {hasMatch ? (
        <span>
          {label.slice(0, matchIndex)}
          <strong style={{ fontWeight: 'var(--primitive-font-weight-medium)' }}>
            {label.slice(matchIndex, matchIndex + query.length)}
          </strong>
          {label.slice(matchIndex + query.length)}
        </span>
      ) : (
        <span>{label}</span>
      )}
    </li>
  );
}
