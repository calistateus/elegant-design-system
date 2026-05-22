'use client';

import React from 'react';
import { Check } from 'lucide-react';

export interface StepItem {
  label?: string;
  description?: string;
}

export interface ElegantStepperProps {
  /** Total number of steps */
  steps: number;
  /** Current active step (1-based) */
  currentStep: number;
  /** Visual style of the stepper */
  variant?: 'circle' | 'tab';
  /** Per-step label and description */
  stepItems?: StepItem[];
  /** Layout direction */
  orientation?: 'horizontal' | 'vertical';
  /** Show the step number (01, 02… or number inside circle) */
  showStepNumber?: boolean;
  /** Show the step label */
  showLabel?: boolean;
  /** Show the step description */
  showDescription?: boolean;
}

type StepState = 'completed' | 'active' | 'upcoming';

function getState(index: number, currentStep: number): StepState {
  if (index + 1 < currentStep) return 'completed';
  if (index + 1 === currentStep) return 'active';
  return 'upcoming';
}

// ── Circle indicator ──────────────────────────────────────────────
function CircleIndicator({
  state,
  number,
  showStepNumber = true,
}: {
  state: StepState;
  number: number;
  showStepNumber?: boolean;
}) {
  const isActive = state === 'active';

  const bg =
    state === 'completed'
      ? 'var(--color-text-accent)'
      : isActive
      ? 'transparent'
      : 'var(--color-progress-track)';

  const fg =
    state === 'upcoming'
      ? 'var(--color-text-muted)'
      : isActive
      ? 'var(--color-text-title)'
      : 'var(--color-interactive-primary-fg)';

  return (
    <div
      style={{
        width: 'var(--primitive-scale-6)',
        height: 'var(--primitive-scale-6)',
        borderRadius: '50%',
        backgroundColor: bg,
        border: isActive ? '1.5px solid var(--color-text-title)' : 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        boxSizing: 'border-box',
      }}
    >
      {state === 'completed' ? (
        <Check size={11} color="var(--color-interactive-primary-fg)" strokeWidth={2.5} />
      ) : showStepNumber ? (
        <span
          style={{
            fontFamily: 'var(--primitive-font-mono)',
            fontSize: 'var(--primitive-font-size-xs)',
            fontWeight: 'var(--primitive-font-weight-bold)',
            color: fg,
            lineHeight: 1,
          }}
        >
          {number}
        </span>
      ) : null}
    </div>
  );
}

// ── Step copy ─────────────────────────────────────────────────────
function StepCopy({
  label,
  description,
  state,
  showLabel = true,
  showDescription = true,
  textAlign = 'center',
  responsive = false,
}: {
  label?: string;
  description?: string;
  state: StepState;
  showLabel?: boolean;
  showDescription?: boolean;
  textAlign?: 'center' | 'left';
  responsive?: boolean;
}) {
  const visibleLabel = showLabel ? label : undefined;
  const visibleDesc = showDescription ? description : undefined;

  if (!visibleLabel && !visibleDesc) return null;

  const labelColor =
    state === 'active'
      ? 'var(--color-text-title)'
      : state === 'completed'
      ? 'var(--color-text-body)'
      : 'var(--color-text-muted)';

  return (
    <div
      className="hidden md:flex"
      style={{
        flexDirection: 'column',
        gap: 'var(--size-label-to-description)',
        alignItems: textAlign === 'center' ? 'center' : 'flex-start',
        maxWidth: '100%',
        overflow: 'hidden',
      }}
    >
      {visibleLabel && (
        <span
          style={{
            fontSize: 'var(--primitive-font-size-sm)',
            fontWeight:
              state === 'active'
                ? 'var(--primitive-font-weight-medium)'
                : 'var(--primitive-font-weight-regular)',
            color: labelColor,
            textAlign,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: '100%',
          }}
        >
          {visibleLabel}
        </span>
      )}
      {visibleDesc && (
        <span
          className={responsive ? 'hidden lg:block' : ''}
          style={{
            fontSize: 'var(--primitive-font-size-xs)',
            color: 'var(--color-text-muted)',
            textAlign,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: '100%',
          }}
        >
          {visibleDesc}
        </span>
      )}
    </div>
  );
}

// ── Circle variant ────────────────────────────────────────────────
function CircleStepper({
  count,
  currentStep,
  stepItems,
  orientation,
  showStepNumber,
  showLabel,
  showDescription,
}: {
  count: number;
  currentStep: number;
  stepItems: StepItem[];
  orientation: 'horizontal' | 'vertical';
  showStepNumber?: boolean;
  showLabel?: boolean;
  showDescription?: boolean;
}) {
  const indices = Array.from({ length: count }, (_, i) => i);

  if (orientation === 'vertical') {
    return (
      <div style={{ display: 'inline-flex', flexDirection: 'column' }}>
        {indices.map((i) => {
          const state = getState(i, currentStep);
          const item = stepItems[i] ?? {};
          const connectorFilled = state === 'completed';
          const isLast = i === count - 1;

          return (
            <div key={i} style={{ display: 'flex', flexDirection: 'row', alignItems: 'stretch' }}>
              {/* Left column: circle + connector line in same column so spacing is symmetric */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  flexShrink: 0,
                }}
              >
                <CircleIndicator state={state} number={i + 1} showStepNumber={showStepNumber} />
                {!isLast && (
                  <div
                    style={{
                      width: '1px',
                      flex: 1,
                      minHeight: 'var(--primitive-scale-6)',
                      backgroundColor: connectorFilled
                        ? 'var(--color-text-accent)'
                        : 'var(--color-progress-track)',
                      marginBlock: 'var(--primitive-scale-1)',
                    }}
                  />
                )}
              </div>

              {/* Right column: text */}
              <div
                style={{
                  paddingLeft: 'var(--primitive-scale-3)',
                  paddingBottom: !isLast ? 'var(--primitive-scale-6)' : 0,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                }}
              >
                <StepCopy
                  label={item.label}
                  description={item.description}
                  state={state}
                  showLabel={showLabel}
                  showDescription={showDescription}
                  textAlign="left"
                />
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // Horizontal
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', width: '100%' }}>
      {indices.map((i) => {
        const state = getState(i, currentStep);
        const item = stepItems[i] ?? {};
        const connectorFilled = state === 'completed';

        return (
          <div key={i} style={{ display: 'contents' }}>
            <div
              style={{
                flex: 4,
                minWidth: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 'var(--size-label-to-description)',
              }}
            >
              <CircleIndicator state={state} number={i + 1} showStepNumber={showStepNumber} />
              <StepCopy
                label={item.label}
                description={item.description}
                state={state}
                showLabel={showLabel}
                showDescription={showDescription}
                textAlign="center"
                responsive
              />
            </div>

            {i < count - 1 && (
              <div
                style={{
                  flex: 1,
                  minWidth: '12px',
                  height: '1px',
                  backgroundColor: connectorFilled
                    ? 'var(--color-text-accent)'
                    : 'var(--color-progress-track)',
                  marginTop: '11px',
                  alignSelf: 'flex-start',
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Tab variant ───────────────────────────────────────────────────
function TabStepper({
  count,
  currentStep,
  stepItems,
  orientation,
  showStepNumber,
  showLabel,
  showDescription,
}: {
  count: number;
  currentStep: number;
  stepItems: StepItem[];
  orientation: 'horizontal' | 'vertical';
  showStepNumber?: boolean;
  showLabel?: boolean;
  showDescription?: boolean;
}) {
  const indices = Array.from({ length: count }, (_, i) => i);
  const isVertical = orientation === 'vertical';

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: isVertical ? 'column' : 'row',
        gap: '2px',
        width: isVertical ? 'fit-content' : '100%',
      }}
    >
      {indices.map((i) => {
        const state = getState(i, currentStep);
        const item = stepItems[i] ?? {};

        const accentColor =
          state === 'completed'
            ? 'var(--color-text-accent)'
            : state === 'active'
            ? 'var(--color-text-title)'
            : 'var(--color-progress-track)';

        const numberColor =
          state === 'completed'
            ? 'var(--color-text-accent)'
            : state === 'active'
            ? 'var(--color-text-title)'
            : 'var(--color-text-muted)';

        const labelColor =
          state === 'active'
            ? 'var(--color-text-title)'
            : state === 'completed'
            ? 'var(--color-text-body)'
            : 'var(--color-text-muted)';

        const borderProp = isVertical
          ? { borderLeft: `3px solid ${accentColor}` }
          : { borderTop: `3px solid ${accentColor}` };

        return (
          <div
            key={i}
            style={{
              flex: isVertical ? 'none' : 1,
              minWidth: isVertical ? undefined : 0,
              padding: isVertical
                ? 'var(--primitive-scale-2) var(--primitive-scale-3)'
                : 'var(--primitive-scale-2) var(--primitive-scale-2) var(--primitive-scale-3)',
              ...borderProp,
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--size-label-to-description)',
              alignItems: isVertical ? 'flex-start' : 'flex-start',
            }}
          >
            {/* Step number */}
            {showStepNumber !== false && (
              <span
                style={{
                  fontFamily: 'var(--primitive-font-mono)',
                  fontSize: 'var(--primitive-font-size-xs)',
                  color: numberColor,
                  lineHeight: 1,
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
            )}

            {((showLabel !== false && item.label) || (showDescription !== false && item.description)) && (
              <div
                className={isVertical ? 'flex' : 'hidden md:flex'}
                style={{
                  flexDirection: 'column',
                  gap: 'var(--size-label-to-description)',
                }}
              >
                {showLabel !== false && item.label && (
                  <span
                    style={{
                      fontSize: 'var(--primitive-font-size-sm)',
                      fontWeight:
                        state === 'active'
                          ? 'var(--primitive-font-weight-medium)'
                          : 'var(--primitive-font-weight-regular)',
                      color: labelColor,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {item.label}
                  </span>
                )}
                {showDescription !== false && item.description && (
                  <span
                    className={isVertical ? '' : 'hidden lg:block'}
                    style={{
                      fontSize: 'var(--primitive-font-size-xs)',
                      color: 'var(--color-text-muted)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {item.description}
                  </span>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Root component ────────────────────────────────────────────────
export function ElegantStepper({
  steps,
  currentStep,
  variant = 'circle',
  stepItems = [],
  orientation = 'horizontal',
  showStepNumber = true,
  showLabel = true,
  showDescription = true,
}: ElegantStepperProps) {
  const count = Math.max(1, Math.round(steps));
  const clamped = Math.min(Math.max(currentStep, 1), count);
  const items = Array.from({ length: count }, (_, i) => stepItems[i] ?? {});

  const shared = { count, currentStep: clamped, stepItems: items, orientation, showStepNumber, showLabel, showDescription };

  const isHorizontal = orientation === 'horizontal';
  const wrapStyle = isHorizontal ? { width: '100%' } : undefined;

  let inner: React.ReactNode;
  if (variant === 'tab') inner = <TabStepper {...shared} />;
  else inner = <CircleStepper {...shared} />;

  return <div style={wrapStyle}>{inner}</div>;
}
