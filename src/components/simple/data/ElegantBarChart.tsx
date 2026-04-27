'use client';

import { useMemo } from 'react';

// ─── Types ────────────────────────────────────────────────────

export type BarChartColor = 'accent' | 'primary' | 'muted';
export type BarChartSize  = 'sm' | 'md' | 'lg';

export interface BarChartDatum {
  label: string;
  value: number;
}

export interface ElegantBarChartProps {
  /** Array of { label, value } pairs. Negative values are clamped to zero. */
  data?:            BarChartDatum[];
  color?:           BarChartColor;
  size?:            BarChartSize;
  /** Show numeric value above each bar. */
  showValues?:      boolean;
  /** Show baseline axis line beneath the bars. */
  showAxis?:        boolean;
  title?:           string;
  showTitle?:       boolean;
  description?:     string;
  showDescription?: boolean;
}

// ─── Constants ───────────────────────────────────────────────

const MAX_LABEL_CHARS = 12;

const COLOR_MAP: Record<BarChartColor, string> = {
  accent:  'var(--color-text-accent)',
  primary: 'var(--color-interactive-primary-bg)',
  muted:   'var(--color-text-muted)',
};

const SIZE_CFG = {
  sm: { bar: 16, gap: 6,  plot: 120, fs: '10px' },
  md: { bar: 24, gap: 8,  plot: 160, fs: '11px' },
  lg: { bar: 32, gap: 12, plot: 220, fs: '12px' },
} satisfies Record<BarChartSize, { bar: number; gap: number; plot: number; fs: string }>;

// ─── Demo data ───────────────────────────────────────────────

const DEMO_DATA: BarChartDatum[] = [
  { label: 'Jan', value: 24 },
  { label: 'Feb', value: 32 },
  { label: 'Mar', value: 18 },
  { label: 'Apr', value: 41 },
  { label: 'May', value: 28 },
  { label: 'Jun', value: 36 },
  { label: 'Jul', value: 49 },
];

// ─── Helpers ─────────────────────────────────────────────────

function trunc(s: string): string {
  return s.length > MAX_LABEL_CHARS ? s.slice(0, MAX_LABEL_CHARS) : s;
}

function formatValue(v: number): string {
  return Number.isInteger(v) ? String(v) : v.toFixed(1);
}

// ─── Component ───────────────────────────────────────────────

export function ElegantBarChart({
  data            = DEMO_DATA,
  color           = 'accent',
  size            = 'md',
  showValues      = true,
  showAxis        = true,
  title,
  showTitle       = true,
  description,
  showDescription = true,
}: ElegantBarChartProps) {
  const cfg = SIZE_CFG[size];
  const fill = COLOR_MAP[color];

  const safeData = useMemo(
    () => data.map(d => ({ label: trunc(d.label), value: Math.max(0, d.value || 0) })),
    [data],
  );

  const max = useMemo(() => {
    const m = Math.max(...safeData.map(d => d.value), 0);
    return m === 0 ? 1 : m;
  }, [safeData]);

  const monoBase: React.CSSProperties = {
    fontFamily: 'var(--primitive-font-mono)',
    fontSize:   cfg.fs,
    lineHeight: 1,
    color:      'var(--color-text-muted)',
  };

  const renderTitle       = title       && showTitle;
  const renderDescription = description && showDescription;

  return (
    <div
      style={{
        display:       'inline-flex',
        flexDirection: 'column',
        gap:           6,
      }}
    >
      {/* ── Header: title + description ── */}
      {(renderTitle || renderDescription) && (
        <div style={{ marginBottom: 'var(--size-heading-to-body)' }}>
          {renderTitle && (
            <p
              style={{
                fontFamily:    'var(--primitive-font-sans)',
                fontSize:      'var(--primitive-font-size-base)',
                fontWeight:    'var(--primitive-font-weight-medium)',
                color:         'var(--color-text-title)',
                letterSpacing: '-0.01em',
                margin:        0,
              }}
            >
              {title}
            </p>
          )}
          {renderDescription && (
            <p
              style={{
                fontFamily:    'var(--primitive-font-sans)',
                fontSize:      'var(--primitive-font-size-xs)',
                fontWeight:    'var(--primitive-font-weight-regular)',
                color:         'var(--color-text-muted)',
                letterSpacing: '-0.01em',
                margin:        0,
                marginTop:     renderTitle ? 'var(--size-label-to-description)' : 0,
              }}
            >
              {description}
            </p>
          )}
        </div>
      )}

      {/* ── Plot area ── */}
      <div
        style={{
          display:    'flex',
          alignItems: 'flex-end',
          gap:        cfg.gap,
          height:     cfg.plot,
          paddingTop: showValues ? 16 : 0,
          borderBottom: showAxis
            ? '1px solid var(--color-border-subtle)'
            : 'none',
        }}
      >
        {safeData.map((d, i) => {
          const ratio  = d.value / max;
          const height = `${ratio * 100}%`;

          return (
            <div
              key={`${d.label}-${i}`}
              style={{
                width:          cfg.bar,
                height:         '100%',
                display:        'flex',
                flexDirection:  'column',
                justifyContent: 'flex-end',
                alignItems:     'center',
              }}
            >
              {showValues && (
                <span
                  style={{
                    ...monoBase,
                    marginBottom: 4,
                    color:        'var(--color-text-body)',
                  }}
                >
                  {formatValue(d.value)}
                </span>
              )}
              <div
                style={{
                  width:           '100%',
                  height,
                  backgroundColor: fill,
                  borderRadius:    'var(--primitive-radius-sm) var(--primitive-radius-sm) 0 0',
                }}
              />
            </div>
          );
        })}
      </div>

      {/* ── X-axis labels ── */}
      <div style={{ display: 'flex', gap: cfg.gap }}>
        {safeData.map((d, i) => (
          <div
            key={`${d.label}-label-${i}`}
            style={{
              width:         cfg.bar,
              ...monoBase,
              textAlign:     'center',
              overflow:      'hidden',
              textOverflow:  'ellipsis',
              whiteSpace:    'nowrap',
            }}
          >
            {d.label}
          </div>
        ))}
      </div>
    </div>
  );
}
