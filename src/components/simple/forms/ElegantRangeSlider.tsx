'use client';

import { useState, useRef, useCallback, useId, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { XCircle, X } from 'lucide-react';

// ─── Self-contained error toast ───────────────────────────────
function RangeErrorToast({
  message,
  onDismiss,
}: {
  message: string;
  onDismiss: () => void;
}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  function dismiss() {
    setVisible(false);
    setTimeout(onDismiss, 300);
  }

  return (
    <div
      role="alert"
      aria-live="assertive"
      style={{
        position: 'fixed',
        top: 'var(--primitive-scale-6)',
        left: '50%',
        transform: visible
          ? 'translateX(-50%) translateY(0)'
          : 'translateX(-50%) translateY(-110%)',
        opacity: visible ? 1 : 0,
        transition: `opacity 350ms cubic-bezier(0.22, 1, 0.36, 1),
                     transform 350ms cubic-bezier(0.22, 1, 0.36, 1)`,
        display: 'flex',
        alignItems: 'flex-start',
        gap: 'var(--size-notification-gap)',
        padding: 'var(--size-notification-padding)',
        backgroundColor: 'var(--color-bg-main)',
        border: '1px solid var(--primitive-red-500)',
        borderRadius: 'var(--size-notification-radius)',
        boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
        fontSize: 'var(--primitive-font-size-sm)',
        color: 'var(--color-text-body)',
        minWidth: '240px',
        maxWidth: '360px',
        zIndex: 9999,
        pointerEvents: 'auto',
      }}
    >
      <span style={{ color: 'var(--color-error-text)', flexShrink: 0, paddingTop: '1px' }}>
        <XCircle size={16} strokeWidth={1.5} />
      </span>
      <span style={{ flex: 1, lineHeight: 1.5 }}>{message}</span>
      <button
        onClick={dismiss}
        aria-label="Dismiss"
        style={{
          display: 'flex',
          alignItems: 'center',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
          color: 'var(--color-text-muted)',
          flexShrink: 0,
        }}
      >
        <X size={14} strokeWidth={1.5} />
      </button>
    </div>
  );
}

export interface ElegantRangeSliderProps {
  value?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;

  label?: string;
  showLabel?: boolean;

  description?: string;
  showDescription?: boolean;

  disabled?: boolean;
  id?: string;
}

const KNOB_SIZE = 18;
const TRACK_HEIGHT = 4;

export function ElegantRangeSlider({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  label = 'Label',
  showLabel = true,
  description = 'Drag the knob or use the stepper.',
  showDescription = true,
  disabled = false,
  id,
}: ElegantRangeSliderProps) {
  const uid = useId();
  const sliderId = id ?? `slider-${uid}`;

  const isControlled = value !== undefined;

  const clampAndStep = useCallback(
    (raw: number) => {
      const stepped = Math.round((raw - min) / step) * step + min;
      return Math.min(max, Math.max(min, parseFloat(stepped.toFixed(10))));
    },
    [min, max, step],
  );

  const [internalValue, setInternalValue] = useState(() =>
    clampAndStep(value ?? min),
  );
  const [inputText, setInputText] = useState(() =>
    String(clampAndStep(value ?? min)),
  );
  const [isDragging, setIsDragging] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [errorToast, setErrorToast] = useState<{ message: string; key: number } | null>(null);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showErrorToast = useCallback((message: string) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setErrorToast({ message, key: Date.now() });
    toastTimerRef.current = setTimeout(() => setErrorToast(null), 4000);
  }, []);

  const current = isControlled ? clampAndStep(value) : internalValue;
  const percent = ((current - min) / (max - min)) * 100;

  const trackRef = useRef<HTMLDivElement>(null);
  // Always holds the latest current value — used by the repeat interval
  // to avoid stale closures when holding +/−.
  const currentRef = useRef(current);
  currentRef.current = current;

  const repeatRef = useRef<{
    timeout: ReturnType<typeof setTimeout> | null;
    interval: ReturnType<typeof setInterval> | null;
  }>({ timeout: null, interval: null });

  const commit = useCallback(
    (raw: number) => {
      const clamped = clampAndStep(raw);
      if (!isControlled) setInternalValue(clamped);
      setInputText(String(clamped));
      onChange?.(clamped);
    },
    [clampAndStep, isControlled, onChange],
  );

  const valueFromClientX = useCallback(
    (clientX: number): number => {
      const track = trackRef.current;
      if (!track) return current;
      const { left, width } = track.getBoundingClientRect();
      return ((clientX - left) / width) * (max - min) + min;
    },
    [current, min, max],
  );

  const attachDragListeners = useCallback(
    (snap: boolean, initialClientX: number) => {
      if (disabled) return;
      setIsDragging(true);
      if (snap) commit(valueFromClientX(initialClientX));

      const onMove = (e: MouseEvent | TouchEvent) => {
        const clientX =
          'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
        commit(valueFromClientX(clientX));
      };
      const onUp = () => {
        setIsDragging(false);
        window.removeEventListener('mousemove', onMove);
        window.removeEventListener('mouseup', onUp);
        window.removeEventListener('touchmove', onMove);
        window.removeEventListener('touchend', onUp);
      };
      window.addEventListener('mousemove', onMove);
      window.addEventListener('mouseup', onUp);
      window.addEventListener('touchmove', onMove, { passive: true });
      window.addEventListener('touchend', onUp);
    },
    [disabled, commit, valueFromClientX],
  );

  const handleTrackPointerDown = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const clientX =
      'touches' in e
        ? (e as React.TouchEvent).touches[0].clientX
        : (e as React.MouseEvent).clientX;
    attachDragListeners(true, clientX);
  };

  const handleKnobPointerDown = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const clientX =
      'touches' in e
        ? (e as React.TouchEvent).touches[0].clientX
        : (e as React.MouseEvent).clientX;
    attachDragListeners(false, clientX);
  };

  const stopRepeat = useCallback(() => {
    if (repeatRef.current.timeout) clearTimeout(repeatRef.current.timeout);
    if (repeatRef.current.interval) clearInterval(repeatRef.current.interval);
    repeatRef.current = { timeout: null, interval: null };
  }, []);

  const startRepeat = useCallback(
    (direction: 1 | -1) => {
      if (disabled) return;
      const fire = () => commit(currentRef.current + direction * step);
      fire();
      repeatRef.current.timeout = setTimeout(() => {
        repeatRef.current.interval = setInterval(fire, 60);
      }, 400);
    },
    [disabled, commit, step],
  );

  const handleKnobKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    const largeStep = (max - min) / 10;
    const map: Record<string, number> = {
      ArrowRight: current + step,
      ArrowUp: current + step,
      ArrowLeft: current - step,
      ArrowDown: current - step,
      PageUp: current + largeStep,
      PageDown: current - largeStep,
      Home: min,
      End: max,
    };
    if (e.key in map) {
      e.preventDefault();
      commit(map[e.key]);
    }
  };

  // ─── Styles ───────────────────────────────────────────────

  const wrapperStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--primitive-scale-1)',
    width: '100%',
    opacity: disabled ? 'var(--opacity-disabled)' : 1,
  };

  const headerRowStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 'var(--primitive-scale-3)',
  };

  const labelStyle: React.CSSProperties = {
    fontSize: 'var(--primitive-font-size-sm)',
    fontWeight: 'var(--primitive-font-weight-medium)',
    color: 'var(--color-text-title)',
    lineHeight: 1.4,
  };

  const stepperStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'stretch',
    border: `1px solid var(--color-border-input)`,
    borderRadius: 'var(--size-input-radius)',
    overflow: 'hidden',
    flexShrink: 0,
  };

  const stepperBtnStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '1.75rem',
    padding: 'var(--primitive-scale-1) 0',
    background: 'none',
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    color: 'var(--color-text-muted)',
    fontSize: 'var(--primitive-font-size-base)',
    lineHeight: 1,
    userSelect: 'none',
  };

  const stepperDividerStyle: React.CSSProperties = {
    width: '1px',
    backgroundColor: 'var(--color-border-input)',
    flexShrink: 0,
  };

  const stepperInputStyle: React.CSSProperties = {
    width: '3rem',
    padding: 'var(--primitive-scale-1) var(--primitive-scale-2)',
    fontSize: 'var(--primitive-font-size-sm)',
    fontWeight: 'var(--primitive-font-weight-regular)',
    color: 'var(--color-text-body)',
    textAlign: 'center',
    fontVariantNumeric: 'tabular-nums',
    lineHeight: 1.4,
    border: 'none',
    outline: 'none',
    background: 'none',
    cursor: disabled ? 'not-allowed' : 'text',
    // Hide native number spinners — not possible purely inline on all
    // browsers, so use type="text" with inputMode instead.
  };

  const descriptionStyle: React.CSSProperties = {
    fontSize: 'var(--primitive-font-size-xs)',
    color: 'var(--color-text-muted)',
    lineHeight: 1.5,
    marginBottom: 'var(--primitive-scale-1)',
  };

  const trackRowStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--primitive-scale-3)',
  };

  const trackAreaStyle: React.CSSProperties = {
    flex: 1,
    paddingBlock: `${(KNOB_SIZE - TRACK_HEIGHT) / 2}px`,
    cursor: disabled ? 'not-allowed' : 'pointer',
    userSelect: 'none',
    touchAction: 'none',
  };

  const trackStyle: React.CSSProperties = {
    position: 'relative',
    height: `${TRACK_HEIGHT}px`,
    borderRadius: 'var(--primitive-radius-full)',
    backgroundColor: 'var(--color-progress-track)',
    overflow: 'visible',
  };

  const fillStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: `${percent}%`,
    borderRadius: 'var(--primitive-radius-full)',
    backgroundColor: 'var(--color-interactive-primary-bg)',
    transition: isDragging
      ? 'none'
      : `width var(--primitive-duration-fast) var(--primitive-easing-default)`,
    pointerEvents: 'none',
  };

  const knobStyle: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    left: `${percent}%`,
    transform: 'translate(-50%, -50%)',
    width: `${KNOB_SIZE}px`,
    height: `${KNOB_SIZE}px`,
    borderRadius: '50%',
    backgroundColor: 'var(--color-bg-main)',
    border: `1.5px solid var(--color-border-input)`,
    boxShadow: isFocused
      ? 'var(--shadow-focus-ring), 0 1px 3px rgba(0,0,0,0.15)'
      : '0 1px 3px rgba(0,0,0,0.15)',
    cursor: disabled ? 'not-allowed' : isDragging ? 'grabbing' : 'grab',
    transition: isDragging
      ? 'none'
      : `left var(--primitive-duration-fast) var(--primitive-easing-default), box-shadow var(--primitive-duration-fast) var(--primitive-easing-default)`,
    zIndex: 1,
    outline: 'none',
  };

  const minMaxStyle: React.CSSProperties = {
    fontSize: 'var(--primitive-font-size-xs)',
    color: 'var(--color-text-muted)',
    fontVariantNumeric: 'tabular-nums',
    flexShrink: 0,
  };

  return (
    <div style={wrapperStyle}>
      {showLabel && (
        <div style={headerRowStyle}>
          <span id={`${sliderId}-label`} style={labelStyle}>
            {label}
          </span>

          {/* Stepper: [−] | value | [+] */}
          <div style={stepperStyle} role="group" aria-label={`${label} stepper`}>
            <button
              type="button"
              aria-label={`Decrease ${label}`}
              disabled={disabled || current <= min}
              style={stepperBtnStyle}
              onMouseDown={(e) => { e.preventDefault(); startRepeat(-1); }}
              onMouseUp={stopRepeat}
              onMouseLeave={stopRepeat}
              onTouchStart={(e) => { e.preventDefault(); startRepeat(-1); }}
              onTouchEnd={stopRepeat}
            >
              −
            </button>
            <div style={stepperDividerStyle} />
            <input
              type="text"
              inputMode="numeric"
              aria-label={`${label} value`}
              aria-live="polite"
              disabled={disabled}
              value={inputText}
              style={stepperInputStyle}
              onChange={(e) => setInputText(e.target.value)}
              onFocus={() => setInputText('')}
              onBlur={() => {
                const parsed = parseFloat(inputText);
                if (isNaN(parsed)) {
                  setInputText(String(current));
                } else {
                  const clamped = clampAndStep(parsed);
                  if (clamped !== parsed) {
                    showErrorToast(`Out of range — corrected to ${clamped}.`);
                  }
                  commit(parsed);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') e.currentTarget.blur();
              }}
            />
            <div style={stepperDividerStyle} />
            <button
              type="button"
              aria-label={`Increase ${label}`}
              disabled={disabled || current >= max}
              style={stepperBtnStyle}
              onMouseDown={(e) => { e.preventDefault(); startRepeat(1); }}
              onMouseUp={stopRepeat}
              onMouseLeave={stopRepeat}
              onTouchStart={(e) => { e.preventDefault(); startRepeat(1); }}
              onTouchEnd={stopRepeat}
            >
              +
            </button>
          </div>
        </div>
      )}

      {showDescription && (
        <span style={descriptionStyle}>{description}</span>
      )}

      {/* Track row */}
      <div style={trackRowStyle}>
        <span style={minMaxStyle}>{min}</span>

        <div
          ref={trackRef}
          style={trackAreaStyle}
          onMouseDown={handleTrackPointerDown}
          onTouchStart={handleTrackPointerDown}
        >
          <div style={trackStyle}>
            <div style={fillStyle} />
            <div
              role="slider"
              aria-labelledby={`${sliderId}-label`}
              aria-valuemin={min}
              aria-valuemax={max}
              aria-valuenow={current}
              aria-valuetext={String(current)}
              aria-disabled={disabled}
              tabIndex={disabled ? -1 : 0}
              style={knobStyle}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onKeyDown={handleKnobKeyDown}
              onMouseDown={handleKnobPointerDown}
              onTouchStart={handleKnobPointerDown}
            />
          </div>
        </div>

        <span style={minMaxStyle}>{max}</span>
      </div>

      {errorToast &&
        createPortal(
          <RangeErrorToast
            key={errorToast.key}
            message={errorToast.message}
            onDismiss={() => setErrorToast(null)}
          />,
          document.body,
        )}
    </div>
  );
}
