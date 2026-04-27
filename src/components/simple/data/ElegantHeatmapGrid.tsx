'use client';

import { useMemo } from 'react';

// ─── Types ────────────────────────────────────────────────────

export type HeatmapIntensity  = 0 | 1 | 2 | 3 | 4;
export type HeatmapColorScale = 'green' | 'accent' | 'redgreen';
export type HeatmapSize       = 'sm' | 'md' | 'lg';

export interface ElegantHeatmapGridProps {
  /** 2D matrix of numeric values — auto-normalised to intensity levels 0–4. */
  data?: number[][];
  /**
   * Column headers. Truncated to MAX_LABEL_CHARS each.
   * When omitted and data is 7 rows × ≥12 cols, Jan–Dec is applied automatically.
   */
  columnLabels?: string[];
  /**
   * Row headers. Truncated to MAX_LABEL_CHARS each.
   * When omitted and data is 7 rows × ≥12 cols, Sun–Sat is applied automatically.
   */
  rowLabels?: string[];
  size?:        HeatmapSize;
  colorScale?:  HeatmapColorScale;
  showLegend?:  boolean;
}

// ─── Constants ───────────────────────────────────────────────

const MAX_LABEL_CHARS = 10;

const WEEKDAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTH_LABELS   = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const SCALE_COLORS: Record<HeatmapColorScale, Record<HeatmapIntensity, string>> = {
  green: {
    0: 'var(--color-heatmap-empty)',
    1: 'var(--color-heatmap-low)',
    2: 'var(--color-heatmap-medium)',
    3: 'var(--color-heatmap-high)',
    4: 'var(--color-heatmap-max)',
  },
  accent: {
    0: 'var(--color-heatmap-empty)',
    1: 'var(--color-heatmap-accent-1)',
    2: 'var(--color-heatmap-accent-2)',
    3: 'var(--color-heatmap-accent-3)',
    4: 'var(--color-heatmap-accent-4)',
  },
  redgreen: {
    0: 'var(--color-heatmap-empty)',
    1: 'var(--color-heatmap-redgreen-1)',
    2: 'var(--color-heatmap-redgreen-2)',
    3: 'var(--color-heatmap-redgreen-3)',
    4: 'var(--color-heatmap-redgreen-4)',
  },
};

// Cell px, gap px, font size, DM Mono char-width estimate at that font size
const SIZE_CFG = {
  sm: { cell: '8px',  gap: '2px', fs: '8px',  charW: 4.8 },
  md: { cell: '10px', gap: '3px', fs: '9px',  charW: 5.4 },
  lg: { cell: '14px', gap: '4px', fs: '10px', charW: 6.0 },
} satisfies Record<HeatmapSize, { cell: string; gap: string; fs: string; charW: number }>;

// ─── Demo data: 7 weekdays × 12 months ───────────────────────

const DEMO_DATA: number[][] = [
  //Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec
  [  0,  0,  2,  1,  3,  2,  4,  3,  2,  1,  0,  0 ], // Sun
  [  3,  2,  4,  5,  6,  5,  7,  6,  5,  4,  3,  2 ], // Mon
  [  4,  3,  5,  6,  7,  8,  9,  8,  7,  6,  5,  4 ], // Tue
  [  2,  4,  3,  7,  5,  6,  8,  7,  5,  5,  4,  3 ], // Wed
  [  5,  3,  6,  4,  8,  7,  9,  8,  6,  5,  4,  3 ], // Thu
  [  3,  2,  4,  3,  5,  4,  6,  5,  4,  3,  2,  1 ], // Fri
  [  1,  1,  1,  2,  2,  2,  3,  3,  2,  2,  1,  1 ], // Sat
];

// ─── Helpers ─────────────────────────────────────────────────

function normalizeData(raw: number[][]): HeatmapIntensity[][] {
  const flatPos = raw.flat().filter(v => v > 0);
  if (!flatPos.length) return raw.map(r => r.map(() => 0 as HeatmapIntensity));
  const max = Math.max(...flatPos);
  return raw.map(row =>
    row.map(v => {
      if (v <= 0) return 0;
      const n = v / max;
      if (n <= 0.25) return 1;
      if (n <= 0.5)  return 2;
      if (n <= 0.75) return 3;
      return 4;
    }) as HeatmapIntensity[]
  );
}

function trunc(s: string): string {
  return s.length > MAX_LABEL_CHARS ? s.slice(0, MAX_LABEL_CHARS) : s;
}

// ─── Component ───────────────────────────────────────────────

export function ElegantHeatmapGrid({
  data = DEMO_DATA,
  columnLabels,
  rowLabels,
  size       = 'md',
  colorScale = 'green',
  showLegend = true,
}: ElegantHeatmapGridProps) {
  const normalized = useMemo(() => normalizeData(data), [data]);

  const numRows = normalized.length;
  const numCols = normalized[0]?.length ?? 0;

  // Auto-detect weekdays×months when no custom labels supplied
  const autoPreset =
    numRows === 7 &&
    numCols >= 12 &&
    !rowLabels?.length &&
    !columnLabels?.length;

  const resolvedRowLabels = autoPreset ? WEEKDAY_LABELS           : rowLabels?.map(trunc);
  const resolvedColLabels = autoPreset ? MONTH_LABELS.slice(0, numCols) : columnLabels?.map(trunc);

  const showRowLabels = (resolvedRowLabels?.length ?? 0) > 0;
  const showColLabels = (resolvedColLabels?.length ?? 0) > 0;

  const cfg    = SIZE_CFG[size];
  const colors = SCALE_COLORS[colorScale];

  // Column-label area height: max label length × estimated char width + padding.
  // With writing-mode: vertical-rl the label's character count becomes vertical extent.
  const maxColLen  = showColLabels
    ? Math.max(...(resolvedColLabels!).map(l => l.length), 1)
    : 0;
  const colLabelH  = showColLabels ? Math.ceil(maxColLen * cfg.charW) + 8 : 0;

  const ROW_LABEL_W = showRowLabels ? 32 : 0;

  const monoBase: React.CSSProperties = {
    fontFamily: 'var(--primitive-font-mono)',
    fontSize:   cfg.fs,
    lineHeight: 1,
    color:      'var(--color-text-muted)',
  };

  const cellBase: React.CSSProperties = {
    width:        'var(--size-heatmap-cell)',
    height:       'var(--size-heatmap-cell)',
    borderRadius: 'var(--size-heatmap-cell-radius)',
    flexShrink:   0,
  };

  return (
    // Override the CSS vars for cell/gap so all children inherit the right size
    <div
      style={{
        '--size-heatmap-cell': cfg.cell,
        '--size-heatmap-gap':  cfg.gap,
        display:       'inline-flex',
        flexDirection: 'column',
        gap:           6,
      } as React.CSSProperties}
    >

      {/* ── Scrollable grid ── */}
      <div style={{ overflowX: 'auto', overflowY: 'auto' }}>
        <div style={{ display: 'inline-flex', flexDirection: 'column', gap: 'var(--size-heatmap-gap)' }}>

          {/* ── Column labels (rotated, never overlap) ── */}
          {showColLabels && (
            <div style={{ display: 'flex', gap: 'var(--size-heatmap-gap)', paddingLeft: ROW_LABEL_W }}>
              {Array.from({ length: numCols }, (_, ci) => (
                <div
                  key={ci}
                  style={{
                    width:          'var(--size-heatmap-cell)',
                    height:         colLabelH,
                    flexShrink:     0,
                    display:        'flex',
                    alignItems:     'flex-end',   // anchor text to grid edge
                    justifyContent: 'center',
                    overflow:       'hidden',
                  }}
                >
                  <span
                    style={{
                      ...monoBase,
                      writingMode:   'vertical-rl',
                      transform:     'rotate(180deg)', // bottom-to-top reading direction
                      whiteSpace:    'nowrap',
                      overflow:      'hidden',
                    }}
                  >
                    {resolvedColLabels?.[ci] ?? ''}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* ── Data rows ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--size-heatmap-gap)' }}>
            {normalized.map((row, ri) => (
              <div
                key={ri}
                style={{ display: 'flex', gap: 'var(--size-heatmap-gap)', alignItems: 'center' }}
              >
                {showRowLabels && (
                  <div
                    style={{
                      ...monoBase,
                      width:        ROW_LABEL_W,
                      flexShrink:   0,
                      textAlign:    'right',
                      paddingRight: 4,
                      overflow:     'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace:   'nowrap',
                    }}
                  >
                    {resolvedRowLabels?.[ri] ?? ''}
                  </div>
                )}

                {row.map((intensity, ci) => (
                  <div key={ci} style={{ ...cellBase, backgroundColor: colors[intensity] }} />
                ))}
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* ── Legend ── */}
      {showLegend && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 4 }}>
          <span style={monoBase}>Less</span>
          {([0, 1, 2, 3, 4] as HeatmapIntensity[]).map(level => (
            <div key={level} style={{ ...cellBase, backgroundColor: colors[level] }} />
          ))}
          <span style={monoBase}>More</span>
        </div>
      )}
    </div>
  );
}
