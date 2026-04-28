'use client';

export type CircularProgressVariant = 'percentage' | 'steps';
export type CircularProgressSize = 'sm' | 'md' | 'lg';
export type LabelPlacement = 'right' | 'bottom' | 'center';

export interface ElegantCircularProgressProps {
  variant: CircularProgressVariant;
  size?: CircularProgressSize;

  // ── percentage variant ─────────────────────────────────────
  /** Progress value 0–100. Required for the `percentage` variant. */
  value?: number;
  /** Show the percentage number near the circle. */
  showValue?: boolean;

  // ── steps variant ──────────────────────────────────────────
  /** Total number of steps. Required for the `steps` variant. */
  steps?: number;
  /** Current step (1-based). Required for the `steps` variant. */
  currentStep?: number;
  /** Show a "3/7" step counter near the circle. */
  showStepCount?: boolean;

  // ── shared ─────────────────────────────────────────────────
  /** Optional description label placed outside the circle. */
  label?: string;
  /**
   * Where to place outside content (value display + label) relative to the
   * circle. Defaults to `'right'`. Ignored when there is no outside content.
   */
  labelPlacement?: LabelPlacement;

  className?: string;
}

// ── SVG constants ──────────────────────────────────────────────
const RADIUS = 44;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

// ── Size tokens ────────────────────────────────────────────────
const sizeTokenMap: Record<CircularProgressSize, string> = {
  sm: 'var(--size-circular-progress-sm)',
  md: 'var(--size-circular-progress-md)',
  lg: 'var(--size-circular-progress-lg)',
};

/** Font-size in SVG user units (viewBox 100×100) — keeps visual size ~12–16 px */
const insideFontSizeMap: Record<CircularProgressSize, number> = {
  sm: 24,
  md: 18,
  lg: 13,
};

// ── Label area (outside the circle) ───────────────────────────
function OutsideContent({
  valueText,
  label,
  centered,
}: {
  valueText: string | null;
  label: string | undefined;
  centered: boolean;
}) {
  if (!valueText && !label) return null;
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--size-label-to-description)',
        textAlign: centered ? 'center' : 'left',
      }}
    >
      {valueText && (
        <span
          style={{
            fontFamily: 'var(--primitive-font-mono)',
            fontSize: 'var(--primitive-font-size-base)',
            fontWeight: 'var(--primitive-font-weight-medium)',
            color: 'var(--color-text-body)',
            lineHeight: 1,
          }}
        >
          {valueText}
        </span>
      )}
      {label && (
        <span
          style={{
            fontSize: 'var(--primitive-font-size-sm)',
            color: 'var(--color-text-muted)',
            lineHeight: 1.4,
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────
export function ElegantCircularProgress({
  variant,
  size = 'md',
  value,
  showValue = false,
  steps,
  currentStep,
  showStepCount = false,
  label,
  labelPlacement = 'right',
  className = '',
}: ElegantCircularProgressProps) {
  // ── Fill calculation ────────────────────────────────────────
  const fillPercent =
    variant === 'percentage'
      ? Math.min(Math.max(value ?? 0, 0), 100)
      : steps && steps > 0
        ? (Math.min(Math.max(currentStep ?? 0, 0), steps) / steps) * 100
        : 0;

  const clampedStep = Math.min(Math.max(currentStep ?? 0, 0), steps ?? 0);
  const offset = CIRCUMFERENCE * (1 - fillPercent / 100);

  // ── Value text ──────────────────────────────────────────────
  const showNumericDisplay =
    variant === 'percentage' ? showValue : showStepCount;

  const numericText =
    variant === 'percentage'
      ? `${Math.round(fillPercent)}%`
      : `${clampedStep}/${steps ?? 0}`;

  // 'center' is only meaningful at lg — everything goes inside the SVG
  const isCenter = size === 'lg' && labelPlacement === 'center';

  // Numeric goes inside SVG only for center placement at lg; everywhere else it's outside
  const showInsideNumeric = isCenter && showNumericDisplay;
  const showInsideLabel = isCenter && !!label;
  // When both numeric and label are inside, shift them off-centre so they stack
  const bothInside = showInsideNumeric && showInsideLabel;
  const numericY = bothInside ? 43 : 50;

  const outsideValueText = !isCenter && showNumericDisplay ? numericText : null;

  // Outside area is suppressed entirely for center placement
  const hasOutsideArea = !isCenter && (!!outsideValueText || !!label);

  // ── SVG ─────────────────────────────────────────────────────
  const circleSvg = (
    <svg
      role="progressbar"
      aria-valuenow={Math.round(fillPercent)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={
        variant === 'percentage'
          ? `${Math.round(fillPercent)}% complete`
          : `Step ${clampedStep} of ${steps ?? 0}`
      }
      viewBox="0 0 100 100"
      style={{
        width: sizeTokenMap[size],
        height: sizeTokenMap[size],
        display: 'block',
        flexShrink: 0,
      }}
    >
      {/* Track ring */}
      <circle
        cx="50"
        cy="50"
        r={RADIUS}
        fill="none"
        stroke="var(--color-progress-track)"
        strokeWidth="8"
      />
      {/* Fill arc — starts at 12 o'clock */}
      <circle
        cx="50"
        cy="50"
        r={RADIUS}
        fill="none"
        stroke="var(--color-text-accent)"
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray={CIRCUMFERENCE}
        strokeDashoffset={offset}
        transform="rotate(-90 50 50)"
        style={{
          transition: `stroke-dashoffset var(--primitive-duration-relaxed) var(--primitive-easing-power2-out)`,
        }}
      />
      {/* Inside numeric — lg only */}
      {showInsideNumeric && (
        <text
          x="50"
          y={numericY}
          dominantBaseline="middle"
          textAnchor="middle"
          fontSize={insideFontSizeMap[size]}
          style={{
            fill: 'var(--color-text-body)',
            fontFamily: 'var(--primitive-font-mono)',
            fontWeight: 'var(--primitive-font-weight-medium)',
          }}
        >
          {numericText}
        </text>
      )}
      {/* Inside label — lg + center placement only */}
      {showInsideLabel && (
        <text
          x="50"
          y="59"
          dominantBaseline="middle"
          textAnchor="middle"
          fontSize="10"
          style={{
            fill: 'var(--color-text-muted)',
          }}
        >
          {label}
        </text>
      )}
    </svg>
  );

  // ── No outside content → bare circle ────────────────────────
  if (!hasOutsideArea) {
    return (
      <span className={className} style={{ display: 'inline-block' }}>
        {circleSvg}
      </span>
    );
  }

  // ── Wrapper layout ───────────────────────────────────────────
  // Only 'right' and 'bottom' reach here ('center' has no outside area)
  const isColumn = labelPlacement === 'bottom';

  return (
    <div
      className={className}
      style={{
        display: 'inline-flex',
        flexDirection: isColumn ? 'column' : 'row',
        alignItems: 'center',
        gap: 'var(--size-card-gap)',
      }}
    >
      {circleSvg}
      <OutsideContent
        valueText={outsideValueText}
        label={label}
        centered={isColumn}
      />
    </div>
  );
}
