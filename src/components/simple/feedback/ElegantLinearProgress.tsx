'use client';

import { ArrowRight } from 'lucide-react';
import { ElegantButton } from '@/components/simple/ElegantButton';

export interface ElegantLinearProgressProps {
  /** Total number of steps */
  steps: number;
  /** Current active step (1-based) */
  currentStep: number;
  /** Show "3/5" step counter */
  showStepCount?: boolean;
  /** Heading label. Omit or pass undefined to hide. */
  heading?: string;
  /** Where the label row sits relative to the track, or vertical orientation */
  placement?: 'top' | 'bottom' | 'vertical';
  /** Show an action button to the right of the bottom label (bottom placement only) */
  showButton?: boolean;
  /** Label for the bottom action button */
  buttonLabel?: string;
  /** Handler for the bottom action button */
  onButtonClick?: () => void;
}

function LabelRow({
  heading,
  showStepCount,
  currentStep,
  steps,
}: {
  heading?: string;
  showStepCount: boolean;
  currentStep: number;
  steps: number;
}) {
  if (!heading && !showStepCount) return null;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--size-label-to-description)',
      }}
    >
      {heading ? (
        <span
          style={{
            fontFamily: 'var(--primitive-font-sans)',
            fontSize: 'var(--primitive-font-size-sm)',
            fontWeight: 'var(--primitive-font-weight-medium)',
            color: 'var(--color-text-body)',
            lineHeight: 1.4,
          }}
        >
          {heading}
        </span>
      ) : null}

      {showStepCount && (
        <span
          style={{
            fontFamily: 'var(--primitive-font-mono)',
            fontSize: 'var(--primitive-font-size-xs)',
            color: 'var(--color-text-muted)',
            whiteSpace: 'nowrap',
          }}
        >
          {currentStep}/{steps}
        </span>
      )}
    </div>
  );
}

function HorizontalTrack({ fillPercent }: { fillPercent: number }) {
  return (
    <div
      role="progressbar"
      aria-valuenow={fillPercent}
      aria-valuemin={0}
      aria-valuemax={100}
      style={{
        position: 'relative',
        height: 'var(--size-progress-track-height)',
        backgroundColor: 'var(--color-progress-track)',
        borderRadius: 'var(--size-btn-radius)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          width: `${fillPercent}%`,
          backgroundColor: 'var(--color-text-accent)',
          borderRadius: 'var(--size-btn-radius)',
        }}
      />
    </div>
  );
}

function VerticalTrack({ fillPercent }: { fillPercent: number }) {
  return (
    <div
      role="progressbar"
      aria-valuenow={fillPercent}
      aria-valuemin={0}
      aria-valuemax={100}
      style={{
        position: 'relative',
        width: 'var(--size-progress-track-height)',
        height: 'var(--size-progress-track-length)',
        backgroundColor: 'var(--color-progress-track)',
        borderRadius: 'var(--size-btn-radius)',
        overflow: 'hidden',
        flexShrink: 0,
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: `${fillPercent}%`,
          backgroundColor: 'var(--color-text-accent)',
          borderRadius: 'var(--size-btn-radius)',
        }}
      />
    </div>
  );
}

export function ElegantLinearProgress({
  steps,
  currentStep,
  showStepCount = false,
  heading,
  placement = 'top',
  showButton = false,
  buttonLabel = 'Next',
  onButtonClick,
}: ElegantLinearProgressProps) {
  const clamped = Math.min(Math.max(currentStep, 0), steps);
  const fillPercent = steps > 0 ? (clamped / steps) * 100 : 0;

  const labelRow = (
    <LabelRow
      heading={heading}
      showStepCount={showStepCount}
      currentStep={clamped}
      steps={steps}
    />
  );

  if (placement === 'vertical') {
    return (
      <div
        style={{
          display: 'inline-flex',
          flexDirection: 'row',
          alignItems: 'flex-start',
          gap: 'var(--size-card-gap)',
        }}
      >
        <VerticalTrack fillPercent={fillPercent} />

        {(heading || showStepCount) && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--size-label-to-description)',
              paddingTop: '2px',
            }}
          >
            {heading && (
              <span
                style={{
                  fontFamily: 'var(--primitive-font-sans)',
                  fontSize: 'var(--primitive-font-size-sm)',
                  fontWeight: 'var(--primitive-font-weight-medium)',
                  color: 'var(--color-text-body)',
                  lineHeight: 1.4,
                }}
              >
                {heading}
              </span>
            )}
            {showStepCount && (
              <span
                style={{
                  fontFamily: 'var(--primitive-font-mono)',
                  fontSize: 'var(--primitive-font-size-xs)',
                  color: 'var(--color-text-muted)',
                }}
              >
                {clamped}/{steps}
              </span>
            )}
          </div>
        )}
      </div>
    );
  }

  const bottomRow =
    placement === 'bottom' && showButton ? (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'var(--size-card-gap)',
        }}
      >
        {labelRow}
        <ElegantButton
          text={buttonLabel}
          style="primary"
          context="menu"
          icon={ArrowRight}
          onClick={onButtonClick}
        />
      </div>
    ) : (
      labelRow
    );

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--size-heading-to-body)',
      }}
    >
      {placement === 'top' && labelRow}
      <HorizontalTrack fillPercent={fillPercent} />
      {placement === 'bottom' && bottomRow}
    </div>
  );
}
