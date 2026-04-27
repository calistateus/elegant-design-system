'use client';

import { useId, useRef, useState } from 'react';
import { ElegantErrorMessage } from './ElegantErrorMessage';

export interface ElegantDateInputProps {
  // Core — value format: "MM/DD" (showYear=false) or "MM/DD/YYYY" (showYear=true)
  value?: string;
  onChange?: (value: string) => void;

  // Year segment
  showYear?: boolean;

  // Label
  label?: string;
  showLabel?: boolean;

  // Description
  description?: string;
  showDescription?: boolean;

  // Error (external, e.g. from form submission)
  error?: string;
  showError?: boolean;

  // Misc
  disabled?: boolean;
  id?: string;
}

function maxDaysInMonth(month: string, year: string): number {
  const m = parseInt(month, 10);
  if (!m || m < 1 || m > 12) return 31;
  if (m === 2) {
    const y = parseInt(year, 10);
    if (y && y % 4 === 0 && (y % 100 !== 0 || y % 400 === 0)) return 29;
    return 28;
  }
  if ([4, 6, 9, 11].includes(m)) return 30;
  return 31;
}

function parseValue(raw: string | undefined, showYear: boolean) {
  if (!raw) return { month: '', day: '', year: '' };
  const parts = raw.split('/');
  return {
    month: parts[0] ?? '',
    day: parts[1] ?? '',
    year: showYear ? (parts[2] ?? '') : '',
  };
}

function validateMonth(m: string): string | null {
  if (m.length < 2) return null;
  const n = parseInt(m, 10);
  if (n < 1 || n > 12) return 'Month must be between 1 and 12';
  return null;
}

function validateDay(d: string, m: string, y: string): string | null {
  if (d.length < 2) return null;
  const n = parseInt(d, 10);
  const max = maxDaysInMonth(m, y);
  if (n < 1 || n > max) return `Day must be between 1 and ${max}`;
  return null;
}

export function ElegantDateInput({
  value,
  onChange,
  showYear = true,
  label = 'Date',
  showLabel = true,
  description = 'Enter a date.',
  showDescription = true,
  error = 'Error message.',
  showError = false,
  disabled = false,
  id,
}: ElegantDateInputProps) {
  const uid = useId();
  const labelId = id ?? `date-input-${uid}`;
  const externalError = showError && !!error ? error : null;

  const parsed = parseValue(value, showYear);
  const [month, setMonth] = useState(parsed.month);
  const [day, setDay] = useState(parsed.day);
  const [year, setYear] = useState(parsed.year);
  const [monthFocused, setMonthFocused] = useState(false);
  const [dayFocused, setDayFocused] = useState(false);
  const [yearFocused, setYearFocused] = useState(false);
  const [monthError, setMonthError] = useState<string | null>(null);
  const [dayError, setDayError] = useState<string | null>(null);

  const monthRef = useRef<HTMLInputElement>(null);
  const dayRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);

  // Track latest typed values so blur handlers don't read stale closure state.
  // When auto-advance calls dayRef.focus(), the month blur fires synchronously
  // before React re-renders — these refs hold the up-to-date value.
  const latestMonth = useRef(month);
  const latestDay = useRef(day);

  function emit(m: string, d: string, y: string) {
    onChange?.(showYear ? `${m}/${d}/${y}` : `${m}/${d}`);
  }

  function handleMonthChange(raw: string) {
    const digits = raw.replace(/\D/g, '').slice(0, 2);
    latestMonth.current = digits;
    setMonth(digits);
    setMonthError(validateMonth(digits));
    // Re-validate day — max days may shift when month changes
    setDayError(validateDay(day, digits, year));
    emit(digits, day, year);
    if (digits.length === 2) {
      dayRef.current?.focus();
    }
  }

  function handleDayChange(raw: string) {
    const digits = raw.replace(/\D/g, '').slice(0, 2);
    latestDay.current = digits;
    setDay(digits);
    setDayError(validateDay(digits, month, year));
    emit(month, digits, year);
    if (digits.length === 2 && showYear) {
      yearRef.current?.focus();
    }
  }

  function handleYearChange(raw: string) {
    const digits = raw.replace(/\D/g, '').slice(0, 4);
    setYear(digits);
    // Re-validate day — leap year affects Feb
    setDayError(validateDay(day, month, digits));
    emit(month, day, digits);
  }

  function handleMonthBlur() {
    setMonthFocused(false);
    const current = latestMonth.current;
    const n = parseInt(current, 10);
    if (current && (n < 1 || n > 12)) {
      const clamped = String(Math.min(Math.max(n, 1), 12));
      latestMonth.current = clamped;
      setMonth(clamped);
      setMonthError(null);
      emit(clamped, latestDay.current, year);
    }
  }

  function handleDayBlur() {
    setDayFocused(false);
    const current = latestDay.current;
    const n = parseInt(current, 10);
    const max = maxDaysInMonth(latestMonth.current, year);
    if (current && (n < 1 || n > max)) {
      const clamped = String(Math.min(Math.max(n, 1), max));
      latestDay.current = clamped;
      setDay(clamped);
      setDayError(null);
      emit(latestMonth.current, clamped, year);
    }
  }

  function handleMonthKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'ArrowRight' && monthRef.current?.selectionStart === month.length) {
      dayRef.current?.focus();
    }
  }

  function handleDayKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Backspace' && day === '') {
      monthRef.current?.focus();
    } else if (e.key === 'ArrowLeft' && dayRef.current?.selectionStart === 0) {
      monthRef.current?.focus();
    } else if (e.key === 'ArrowRight' && showYear && dayRef.current?.selectionStart === day.length) {
      yearRef.current?.focus();
    }
  }

  function handleYearKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Backspace' && year === '') {
      dayRef.current?.focus();
    } else if (e.key === 'ArrowLeft' && yearRef.current?.selectionStart === 0) {
      dayRef.current?.focus();
    }
  }

  const internalErrors = [monthError, dayError].filter(Boolean) as string[];
  const displayErrors = internalErrors.length > 0 ? internalErrors : externalError ? [externalError] : [];

  function segmentStyle(isFocused: boolean, isError: boolean): React.CSSProperties {
    return {
      padding: 'var(--primitive-scale-2) var(--primitive-scale-3)',
      fontFamily: 'var(--primitive-font-sans)',
      fontSize: 'var(--primitive-font-size-sm)',
      fontWeight: 'var(--primitive-font-weight-regular)',
      color: 'var(--color-text-body)',
      backgroundColor: disabled ? 'var(--primitive-gray-100)' : 'var(--primitive-white)',
      border: `1px solid ${isError ? 'var(--color-error-border)' : isFocused ? 'var(--primitive-gray-600)' : 'var(--primitive-gray-300)'}`,
      borderRadius: 'var(--primitive-radius-md)',
      outline: 'none',
      boxShadow: isFocused && !isError ? '0 0 0 2px var(--primitive-gray-200)' : 'none',
      transition: 'border-color 150ms ease, box-shadow 150ms ease',
      textAlign: 'center',
      cursor: disabled ? 'not-allowed' : 'text',
      opacity: disabled ? 0.6 : 1,
    };
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--primitive-scale-1)',
        fontFamily: 'var(--primitive-font-sans)',
        width: '100%',
      }}
    >
      {showLabel && (
        <label
          htmlFor={labelId}
          style={{
            fontSize: 'var(--primitive-font-size-sm)',
            fontWeight: 'var(--primitive-font-weight-medium)',
            color: 'var(--color-text-title)',
            lineHeight: 1.4,
          }}
          onClick={() => monthRef.current?.focus()}
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

      <div id={labelId} style={{ display: 'flex', gap: 'var(--primitive-scale-2)' }}>
        <input
          ref={monthRef}
          type="text"
          inputMode="numeric"
          placeholder={monthFocused ? undefined : 'MM'}
          value={month}
          maxLength={2}
          disabled={disabled}
          aria-label="Month"
          aria-invalid={!!monthError}
          onChange={(e) => handleMonthChange(e.target.value)}
          onKeyDown={handleMonthKeyDown}
          onFocus={() => setMonthFocused(true)}
          onBlur={handleMonthBlur}
          style={{ ...segmentStyle(monthFocused, !!(monthError || externalError)), width: '3.5rem' }}
        />

        <input
          ref={dayRef}
          type="text"
          inputMode="numeric"
          placeholder={dayFocused ? undefined : 'DD'}
          value={day}
          maxLength={2}
          disabled={disabled}
          aria-label="Day"
          aria-invalid={!!dayError}
          onChange={(e) => handleDayChange(e.target.value)}
          onKeyDown={handleDayKeyDown}
          onFocus={() => setDayFocused(true)}
          onBlur={handleDayBlur}
          style={{ ...segmentStyle(dayFocused, !!(dayError || externalError)), width: '3.5rem' }}
        />

        {showYear && (
          <input
            ref={yearRef}
            type="text"
            inputMode="numeric"
            placeholder={yearFocused ? undefined : 'YYYY'}
            value={year}
            maxLength={4}
            disabled={disabled}
            aria-label="Year"
            onChange={(e) => handleYearChange(e.target.value)}
            onKeyDown={handleYearKeyDown}
            onFocus={() => setYearFocused(true)}
            onBlur={() => setYearFocused(false)}
            style={{ ...segmentStyle(yearFocused, !!externalError), width: '5rem' }}
          />
        )}
      </div>

      {displayErrors.map((msg) => (
        <ElegantErrorMessage key={msg} message={msg} />
      ))}
    </div>
  );
}
