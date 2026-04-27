'use client';

import { useRef, useState, useEffect, useId } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { ElegantErrorMessage } from './ElegantErrorMessage';

export interface ElegantDateTimePickerProps {
  // Controlled value
  value?: Date | null;
  onChange?: (date: Date) => void;

  // Label
  label?: string;
  showLabel?: boolean;

  // Description
  description?: string;
  showDescription?: boolean;

  // Error
  error?: string;
  showError?: boolean;

  // Placeholder
  placeholder?: string;

  // Misc
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
}

const DAYS_OF_WEEK = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();
}

function isBeforeDay(a: Date, b: Date): boolean {
  const aDay = new Date(a.getFullYear(), a.getMonth(), a.getDate());
  const bDay = new Date(b.getFullYear(), b.getMonth(), b.getDate());
  return aDay < bDay;
}

function isAfterDay(a: Date, b: Date): boolean {
  const aDay = new Date(a.getFullYear(), a.getMonth(), a.getDate());
  const bDay = new Date(b.getFullYear(), b.getMonth(), b.getDate());
  return aDay > bDay;
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

export function ElegantDateTimePicker({
  value,
  onChange,
  label = 'Date',
  showLabel = true,
  description = 'Select a date.',
  showDescription = true,
  error = 'Error message.',
  showError = false,
  placeholder = 'Pick a date…',
  disabled = false,
  minDate,
  maxDate,
}: ElegantDateTimePickerProps) {
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const [viewYear, setViewYear] = useState(() => (value ?? new Date()).getFullYear());
  const [viewMonth, setViewMonth] = useState(() => (value ?? new Date()).getMonth());
  const containerRef = useRef<HTMLDivElement>(null);
  const uid = useId();
  const triggerId = `cal-trigger-${uid}`;
  const hasError = showError && !!error;

  // Sync view to new value when it changes externally
  useEffect(() => {
    if (value) {
      setViewYear(value.getFullYear());
      setViewMonth(value.getMonth());
    }
  }, [value]);

  // Close on outside click
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

  function prevMonth() {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  }

  function nextMonth() {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  }

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);
  const today = new Date();

  // Build cells: leading blanks + day numbers
  const cells: Array<number | null> = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  // Pad to complete last row
  while (cells.length % 7 !== 0) cells.push(null);

  function handleDayClick(day: number) {
    const chosen = new Date(viewYear, viewMonth, day);
    if (minDate && isBeforeDay(chosen, minDate)) return;
    if (maxDate && isAfterDay(chosen, maxDate)) return;
    onChange?.(chosen);
    setOpen(false);
  }

  function isDayDisabled(day: number): boolean {
    const d = new Date(viewYear, viewMonth, day);
    if (minDate && isBeforeDay(d, minDate)) return true;
    if (maxDate && isAfterDay(d, maxDate)) return true;
    return false;
  }

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

      {/* Trigger */}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <button
          id={triggerId}
          type="button"
          disabled={disabled}
          aria-haspopup="dialog"
          aria-expanded={open}
          onClick={() => { if (!disabled) setOpen(prev => !prev); }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            padding: 'var(--primitive-scale-2) var(--primitive-scale-8) var(--primitive-scale-2) var(--primitive-scale-3)',
            fontFamily: 'var(--primitive-font-sans)',
            fontSize: 'var(--primitive-font-size-sm)',
            fontWeight: 'var(--primitive-font-weight-regular)',
            color: value ? 'var(--color-text-body)' : 'var(--color-text-muted)',
            backgroundColor: disabled ? 'var(--primitive-gray-100)' : 'var(--primitive-white)',
            border: `1px solid ${borderColor}`,
            borderRadius: 'var(--primitive-radius-md)',
            outline: 'none',
            cursor: disabled ? 'not-allowed' : 'pointer',
            opacity: disabled ? 0.6 : 1,
            transition: 'var(--motion-dropdown-trigger)',
            boxShadow,
            textAlign: 'left',
          }}
        >
          {value ? formatDate(value) : placeholder}
        </button>

        <span
          style={{
            position: 'absolute',
            right: 'var(--primitive-scale-3)',
            display: 'flex',
            alignItems: 'center',
            color: 'var(--color-text-muted)',
            pointerEvents: 'none',
          }}
        >
          <Calendar size={14} strokeWidth={1.5} />
        </span>
      </div>

      {/* Popover */}
      {open && (
        <div
          role="dialog"
          aria-label="Date picker"
          style={{
            position: 'absolute',
            top: 'calc(100% + var(--primitive-scale-1))',
            left: 0,
            zIndex: 50,
            backgroundColor: 'var(--primitive-white)',
            border: '1px solid var(--primitive-gray-300)',
            borderRadius: 'var(--primitive-radius-md)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            padding: 'var(--primitive-scale-4)',
            width: '272px',
          }}
        >
          {/* Month header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 'var(--primitive-scale-3)',
            }}
          >
            <NavButton onClick={prevMonth} label="Previous month">
              <ChevronLeft size={14} strokeWidth={1.5} />
            </NavButton>

            <span
              style={{
                fontSize: 'var(--primitive-font-size-sm)',
                fontWeight: 'var(--primitive-font-weight-medium)',
                color: 'var(--color-text-title)',
              }}
            >
              {MONTHS[viewMonth]} {viewYear}
            </span>

            <NavButton onClick={nextMonth} label="Next month">
              <ChevronRight size={14} strokeWidth={1.5} />
            </NavButton>
          </div>

          {/* Day-of-week header */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(7, 1fr)',
              marginBottom: 'var(--primitive-scale-2)',
            }}
          >
            {DAYS_OF_WEEK.map(d => (
              <span
                key={d}
                style={{
                  textAlign: 'center',
                  fontSize: 'var(--primitive-font-size-xs)',
                  fontWeight: 'var(--primitive-font-weight-medium)',
                  color: 'var(--color-text-muted)',
                  padding: 'var(--primitive-scale-1) 0',
                }}
              >
                {d}
              </span>
            ))}
          </div>

          {/* Day grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px' }}>
            {cells.map((day, idx) => {
              if (day === null) return <span key={`blank-${idx}`} />;

              const date = new Date(viewYear, viewMonth, day);
              const isSelected = value ? isSameDay(date, value) : false;
              const isToday = isSameDay(date, today);
              const isDisabled = isDayDisabled(day);

              return (
                <DayCell
                  key={day}
                  day={day}
                  isSelected={isSelected}
                  isToday={isToday}
                  isDisabled={isDisabled}
                  onClick={() => handleDayClick(day)}
                />
              );
            })}
          </div>

          {/* Today shortcut */}
          <div
            style={{
              marginTop: 'var(--primitive-scale-3)',
              borderTop: '1px solid var(--primitive-gray-100)',
              paddingTop: 'var(--primitive-scale-3)',
              textAlign: 'center',
            }}
          >
            <TodayButton
              disabled={
                (minDate ? isBeforeDay(today, minDate) : false) ||
                (maxDate ? isAfterDay(today, maxDate) : false)
              }
              onClick={() => {
                setViewYear(today.getFullYear());
                setViewMonth(today.getMonth());
                handleDayClick(today.getDate());
              }}
            />
          </div>
        </div>
      )}

      {hasError && <ElegantErrorMessage message={error} />}
    </div>
  );
}

/* ── Sub-components ─────────────────────────────────────────── */

function NavButton({
  onClick,
  label,
  children,
}: {
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 'var(--primitive-scale-6)',
        height: 'var(--primitive-scale-6)',
        borderRadius: 'var(--primitive-radius-md)',
        border: 'none',
        backgroundColor: hovered ? 'var(--primitive-gray-100)' : 'transparent',
        color: 'var(--color-text-body)',
        cursor: 'pointer',
        transition: 'background-color var(--primitive-duration-instant) var(--primitive-easing-default)',
        padding: 0,
      }}
    >
      {children}
    </button>
  );
}

function DayCell({
  day,
  isSelected,
  isToday,
  isDisabled,
  onClick,
}: {
  day: number;
  isSelected: boolean;
  isToday: boolean;
  isDisabled: boolean;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  let bg = 'transparent';
  if (isSelected) bg = 'var(--primitive-black)';
  else if (hovered && !isDisabled) bg = 'var(--primitive-gray-100)';

  let color = 'var(--color-text-body)';
  if (isSelected) color = 'var(--primitive-white)';
  else if (isDisabled) color = 'var(--primitive-gray-300)';

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isDisabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        aspectRatio: '1',
        borderRadius: 'var(--primitive-radius-md)',
        border: isToday && !isSelected ? '1px solid var(--primitive-gray-300)' : '1px solid transparent',
        fontSize: 'var(--primitive-font-size-xs)',
        fontFamily: 'var(--primitive-font-sans)',
        fontWeight: isSelected ? 'var(--primitive-font-weight-medium)' : 'var(--primitive-font-weight-regular)',
        color,
        backgroundColor: bg,
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        transition: 'background-color var(--primitive-duration-instant) var(--primitive-easing-default)',
        padding: 0,
      }}
    >
      {day}
    </button>
  );
}

function TodayButton({ onClick, disabled }: { onClick: () => void; disabled: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontSize: 'var(--primitive-font-size-xs)',
        fontFamily: 'var(--primitive-font-sans)',
        fontWeight: 'var(--primitive-font-weight-medium)',
        color: disabled ? 'var(--primitive-gray-300)' : hovered ? 'var(--color-text-title)' : 'var(--color-text-muted)',
        background: 'none',
        border: 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'color var(--primitive-duration-fast) var(--primitive-easing-default)',
        padding: 0,
      }}
    >
      Today
    </button>
  );
}
