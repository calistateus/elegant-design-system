'use client';

import { useRef, useEffect, useId } from 'react';
import { ElegantErrorMessage } from './ElegantErrorMessage';

export interface WheelColumn {
  items: string[];
  value: number; // selected index
  onChange: (index: number) => void;
  label?: string;
}

export interface ElegantWheelPickerProps {
  columns: WheelColumn[];

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

  /**
   * Number of items visible at once — must be odd so the centre item is the
   * selected one. Defaults to 3.
   */
  visibleCount?: number;

  /** Height of each item row in px. Defaults to 40. */
  itemHeight?: number;

  /** Width of each column drum in px. Defaults to 72. */
  columnWidth?: number;
}

export function ElegantWheelPicker({
  columns,
  label = 'Select',
  showLabel = true,
  description = 'Scroll to select a value.',
  showDescription = true,
  error = 'Error message.',
  showError = false,
  disabled = false,
  visibleCount = 3,
  itemHeight = 40,
  columnWidth = 72,
}: ElegantWheelPickerProps) {
  const uid = useId();
  const hasError = showError && !!error;
  const halfCount = Math.floor(visibleCount / 2);
  const drumHeight = visibleCount * itemHeight;
  const hasColumnLabels = columns.some(c => c.label);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--primitive-scale-1)',
        fontFamily: 'var(--primitive-font-sans)',
      }}
    >
      {showLabel && (
        <label
          htmlFor={`wheel-${uid}`}
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

      {/* Picker shell */}
      <div
        id={`wheel-${uid}`}
        style={{
          alignSelf: 'flex-start',
          border: `1px solid ${hasError ? 'var(--color-error-border)' : 'var(--primitive-gray-300)'}`,
          borderRadius: 'var(--primitive-radius-md)',
          overflow: 'hidden',
          backgroundColor: 'var(--primitive-white)',
        }}
      >
        {/* Column header row */}
        {hasColumnLabels && (
          <div
            style={{
              display: 'flex',
              borderBottom: '1px solid var(--primitive-gray-100)',
            }}
          >
            {columns.map((col, i) => (
              <div
                key={i}
                style={{
                  width: columnWidth,
                  flexShrink: 0,
                  textAlign: 'center',
                  fontSize: 'var(--primitive-font-size-xs)',
                  fontWeight: 'var(--primitive-font-weight-medium)',
                  color: 'var(--color-text-muted)',
                  padding: 'var(--primitive-scale-2) var(--primitive-scale-2)',
                  borderLeft: i > 0 ? '1px solid var(--primitive-gray-100)' : 'none',
                }}
              >
                {col.label ?? ''}
              </div>
            ))}
          </div>
        )}

        {/* Drums container — position: relative so overlays anchor here */}
        <div style={{ display: 'flex', position: 'relative', height: drumHeight }}>
          {/* Selection highlight — z=1 so drum text (z=2) paints over it */}
          <div
            aria-hidden
            style={{
              position: 'absolute',
              top: halfCount * itemHeight,
              left: 0,
              right: 0,
              height: itemHeight,
              backgroundColor: 'var(--primitive-gray-100)',
              borderTop: '1px solid var(--primitive-gray-200)',
              borderBottom: '1px solid var(--primitive-gray-200)',
              pointerEvents: 'none',
              zIndex: 1,
            }}
          />

          {/* Top fade — z=3 so it fades drum text in the non-selected rows */}
          <div
            aria-hidden
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: halfCount * itemHeight,
              background:
                'linear-gradient(to bottom, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.15) 100%)',
              pointerEvents: 'none',
              zIndex: 3,
            }}
          />

          {/* Bottom fade — z=3 */}
          <div
            aria-hidden
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: halfCount * itemHeight,
              background:
                'linear-gradient(to top, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.15) 100%)',
              pointerEvents: 'none',
              zIndex: 3,
            }}
          />

          {columns.map((col, i) => (
            <WheelDrum
              key={i}
              items={col.items}
              value={col.value}
              onChange={disabled ? () => {} : col.onChange}
              disabled={disabled}
              visibleCount={visibleCount}
              itemHeight={itemHeight}
              columnWidth={columnWidth}
              showDivider={i > 0}
            />
          ))}
        </div>
      </div>

      {hasError && <ElegantErrorMessage message={error} />}
    </div>
  );
}

/* ── WheelDrum ───────────────────────────────────────────────── */

function WheelDrum({
  items,
  value,
  onChange,
  disabled,
  visibleCount,
  itemHeight,
  columnWidth,
  showDivider,
}: {
  items: string[];
  value: number;
  onChange: (index: number) => void;
  disabled: boolean;
  visibleCount: number;
  itemHeight: number;
  columnWidth: number;
  showDivider: boolean;
}) {
  const halfCount = Math.floor(visibleCount / 2);
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Track the last committed index so we avoid spurious onChange calls
  const committedRef = useRef(value);

  // Set initial scroll position once on mount
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = value * itemHeight;
    committedRef.current = value;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Sync when value is changed externally (e.g. parent resets)
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const target = value * itemHeight;
    if (Math.abs(el.scrollTop - target) > 2) {
      committedRef.current = value;
      el.scrollTo({ top: target, behavior: 'smooth' });
    }
  }, [value, itemHeight]);

  function handleScroll() {
    if (scrollTimer.current) clearTimeout(scrollTimer.current);
    scrollTimer.current = setTimeout(() => {
      const el = scrollRef.current;
      if (!el) return;
      const idx = Math.round(el.scrollTop / itemHeight);
      const clamped = Math.max(0, Math.min(items.length - 1, idx));
      if (clamped !== committedRef.current) {
        committedRef.current = clamped;
        onChange(clamped);
      }
    }, 120);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (disabled) return;
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      onChange(Math.max(0, value - 1));
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      onChange(Math.min(items.length - 1, value + 1));
    }
  }

  return (
    <div
      ref={scrollRef}
      role="listbox"
      tabIndex={disabled ? -1 : 0}
      onScroll={handleScroll}
      onKeyDown={handleKeyDown}
      className="elegant-wheel-scroll"
      style={{
        width: columnWidth,
        flexShrink: 0,
        height: '100%',
        overflowY: disabled ? 'hidden' : 'scroll',
        scrollSnapType: 'y mandatory',
        borderLeft: showDivider ? '1px solid var(--primitive-gray-200)' : 'none',
        outline: 'none',
        cursor: disabled ? 'not-allowed' : 'default',
        opacity: disabled ? 0.45 : 1,
        position: 'relative',
        zIndex: 2,
      }}
    >
      {/* Top padding so the first item can centre */}
      <div style={{ height: halfCount * itemHeight, flexShrink: 0 }} />

      {items.map((item, i) => {
        const distance = Math.abs(i - value);
        const opacity = distance === 0 ? 1 : distance === 1 ? 0.5 : 0.25;

        return (
          <div
            key={i}
            role="option"
            aria-selected={i === value}
            style={{
              height: itemHeight,
              scrollSnapAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 'var(--primitive-font-size-sm)',
              fontFamily: 'var(--primitive-font-sans)',
              fontWeight:
                i === value
                  ? 'var(--primitive-font-weight-medium)'
                  : 'var(--primitive-font-weight-regular)',
              color: 'var(--color-text-body)',
              opacity,
              transition: `opacity var(--primitive-duration-base) var(--primitive-easing-default)`,
              userSelect: 'none',
              paddingInline: 'var(--primitive-scale-2)',
            }}
          >
            {item}
          </div>
        );
      })}

      {/* Bottom padding so the last item can centre */}
      <div style={{ height: halfCount * itemHeight, flexShrink: 0 }} />
    </div>
  );
}
