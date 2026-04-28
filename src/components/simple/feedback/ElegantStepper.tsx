'use client';

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
  variant?: 'circle' | 'tab' | 'arrows';
  /** Per-step label and description */
  stepItems?: StepItem[];
  /** Layout direction */
  orientation?: 'horizontal' | 'vertical';
  /** Hide labels and descriptions below the md breakpoint (600px) */
  hideCopyOnMobile?: boolean;
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
  hideCopyOnMobile,
  showLabel = true,
  showDescription = true,
  textAlign = 'center',
}: {
  label?: string;
  description?: string;
  state: StepState;
  hideCopyOnMobile?: boolean;
  showLabel?: boolean;
  showDescription?: boolean;
  textAlign?: 'center' | 'left';
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
      className={hideCopyOnMobile ? 'hidden md:flex' : 'flex'}
      style={{
        flexDirection: 'column',
        gap: 'var(--size-label-to-description)',
        alignItems: textAlign === 'center' ? 'center' : 'flex-start',
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
          }}
        >
          {visibleLabel}
        </span>
      )}
      {visibleDesc && (
        <span
          style={{
            fontSize: 'var(--primitive-font-size-xs)',
            color: 'var(--color-text-muted)',
            textAlign,
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
  hideCopyOnMobile,
  showStepNumber,
  showLabel,
  showDescription,
}: {
  count: number;
  currentStep: number;
  stepItems: StepItem[];
  orientation: 'horizontal' | 'vertical';
  hideCopyOnMobile?: boolean;
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

          return (
            <div key={i}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  gap: 'var(--primitive-scale-3)',
                }}
              >
                <CircleIndicator state={state} number={i + 1} showStepNumber={showStepNumber} />
                <StepCopy
                  label={item.label}
                  description={item.description}
                  state={state}
                  hideCopyOnMobile={hideCopyOnMobile}
                  showLabel={showLabel}
                  showDescription={showDescription}
                  textAlign="left"
                />
              </div>

              {i < count - 1 && (
                <div
                  style={{
                    width: '1px',
                    height: 'var(--primitive-scale-6)',
                    backgroundColor: connectorFilled
                      ? 'var(--color-text-accent)'
                      : 'var(--color-progress-track)',
                    marginLeft: '11px',
                    marginBlock: 'var(--primitive-scale-1)',
                  }}
                />
              )}
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
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 'var(--size-label-to-description)',
                flexShrink: 0,
              }}
            >
              <CircleIndicator state={state} number={i + 1} showStepNumber={showStepNumber} />
              <StepCopy
                label={item.label}
                description={item.description}
                state={state}
                hideCopyOnMobile={hideCopyOnMobile}
                showLabel={showLabel}
                showDescription={showDescription}
                textAlign="center"
              />
            </div>

            {i < count - 1 && (
              <div
                style={{
                  flex: 1,
                  height: '1px',
                  backgroundColor: connectorFilled
                    ? 'var(--color-text-accent)'
                    : 'var(--color-progress-track)',
                  marginTop: '11px',
                  flexShrink: 0,
                  minWidth: 'var(--primitive-scale-4)',
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
  hideCopyOnMobile,
  showStepNumber,
  showLabel,
  showDescription,
}: {
  count: number;
  currentStep: number;
  stepItems: StepItem[];
  orientation: 'horizontal' | 'vertical';
  hideCopyOnMobile?: boolean;
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
                  color: accentColor,
                  lineHeight: 1,
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
            )}

            {((showLabel !== false && item.label) || (showDescription !== false && item.description)) && (
              <div
                className={hideCopyOnMobile ? 'hidden md:flex' : 'flex'}
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
                    style={{
                                fontSize: 'var(--primitive-font-size-xs)',
                      color: 'var(--color-text-muted)',
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

// ── Arrows variant ────────────────────────────────────────────────
const ARROW_SIZE = 10; // px — chevron notch depth

function arrowClipPath(i: number, count: number): string {
  const isFirst = i === 0;
  const isLast = i === count - 1;
  const s = ARROW_SIZE;

  if (isFirst && isLast) return 'none';
  if (isFirst) return `polygon(0 0, calc(100% - ${s}px) 0, 100% 50%, calc(100% - ${s}px) 100%, 0 100%)`;
  if (isLast) return `polygon(0 0, 100% 0, 100% 100%, 0 100%, ${s}px 50%)`;
  return `polygon(0 0, calc(100% - ${s}px) 0, 100% 50%, calc(100% - ${s}px) 100%, 0 100%, ${s}px 50%)`;
}

function arrowClipPathVertical(i: number, count: number): string {
  const isFirst = i === 0;
  const isLast = i === count - 1;
  const s = ARROW_SIZE;

  if (isFirst && isLast) return 'none';
  if (isFirst) return `polygon(0 0, 100% 0, 100% calc(100% - ${s}px), 50% 100%, 0 calc(100% - ${s}px))`;
  if (isLast) return `polygon(50% 0, 100% ${s}px, 100% 100%, 0 100%, 0 ${s}px)`;
  return `polygon(50% 0, 100% ${s}px, 100% calc(100% - ${s}px), 50% 100%, 0 calc(100% - ${s}px), 0 ${s}px)`;
}

function ArrowsStepper({
  count,
  currentStep,
  stepItems,
  orientation,
  hideCopyOnMobile,
  showStepNumber,
  showLabel,
  showDescription,
}: {
  count: number;
  currentStep: number;
  stepItems: StepItem[];
  orientation: 'horizontal' | 'vertical';
  hideCopyOnMobile?: boolean;
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
        width: isVertical ? 'fit-content' : '100%',
      }}
    >
      {indices.map((i) => {
        const state = getState(i, currentStep);
        const item = stepItems[i] ?? {};

        const bg =
          state === 'completed'
            ? 'var(--color-text-accent)'
            : state === 'active'
            ? 'var(--color-text-title)'
            : 'var(--color-progress-track)';

        const fg =
          state === 'upcoming'
            ? 'var(--color-text-muted)'
            : 'var(--color-interactive-primary-fg)';

        const clipPath = isVertical
          ? arrowClipPathVertical(i, count)
          : arrowClipPath(i, count);

        const overlap = isVertical
          ? { marginTop: i > 0 ? `-${ARROW_SIZE}px` : 0, zIndex: i }
          : { marginLeft: i > 0 ? `-${ARROW_SIZE}px` : 0, zIndex: i };

        return (
          <div
            key={i}
            style={{
              flex: isVertical ? 'none' : 1,
              clipPath,
              backgroundColor: bg,
              padding: isVertical
                ? `${i === 0 ? ARROW_SIZE : ARROW_SIZE * 2}px var(--primitive-scale-4) ${i === count - 1 ? ARROW_SIZE : ARROW_SIZE * 2}px`
                : `var(--primitive-scale-2) var(--primitive-scale-4) var(--primitive-scale-2) ${i === 0 ? 'var(--primitive-scale-4)' : `${ARROW_SIZE + 16}px`}`,
              position: 'relative',
              display: 'flex',
              flexDirection: isVertical ? 'row' : 'column',
              alignItems: 'center',
              gap: 'var(--primitive-scale-1)',
              ...overlap,
            }}
          >
            {showStepNumber !== false && (
              <span
                style={{
                  fontFamily: 'var(--primitive-font-mono)',
                  fontSize: 'var(--primitive-font-size-xs)',
                  fontWeight: 'var(--primitive-font-weight-bold)',
                  color: fg,
                  flexShrink: 0,
                }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
            )}

            {((showLabel !== false && item.label) || (showDescription !== false && item.description)) && (
              <div
                className={hideCopyOnMobile ? 'hidden md:flex' : 'flex'}
                style={{
                  flexDirection: 'column',
                  gap: '2px',
                  alignItems: isVertical ? 'flex-start' : 'center',
                }}
              >
                {showLabel !== false && item.label && (
                  <span
                    style={{
                                fontSize: 'var(--primitive-font-size-xs)',
                      fontWeight:
                        state === 'active'
                          ? 'var(--primitive-font-weight-medium)'
                          : 'var(--primitive-font-weight-regular)',
                      color: fg,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {item.label}
                  </span>
                )}
                {showDescription !== false && item.description && (
                  <span
                    style={{
                                fontSize: '0.625rem',
                      color: state === 'upcoming' ? 'var(--color-text-muted)' : 'rgba(255,255,255,0.7)',
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
  hideCopyOnMobile,
  showStepNumber = true,
  showLabel = true,
  showDescription = true,
}: ElegantStepperProps) {
  const count = Math.max(1, Math.round(steps));
  const clamped = Math.min(Math.max(currentStep, 1), count);
  const items = Array.from({ length: count }, (_, i) => stepItems[i] ?? {});

  const shared = { count, currentStep: clamped, stepItems: items, orientation, hideCopyOnMobile, showStepNumber, showLabel, showDescription };

  if (variant === 'tab') return <TabStepper {...shared} />;
  if (variant === 'arrows') return <ArrowsStepper {...shared} />;
  return <CircleStepper {...shared} />;
}
