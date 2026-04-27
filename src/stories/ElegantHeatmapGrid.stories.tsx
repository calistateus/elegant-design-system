import type { Meta, StoryObj } from '@storybook/react';
import { useState, useEffect } from 'react';
import {
  ElegantHeatmapGrid,
  type HeatmapColorScale,
  type HeatmapSize,
} from '../components/simple/data/ElegantHeatmapGrid';

// ─── File parsing ─────────────────────────────────────────────

const MAX_LABEL_CHARS = 10;

interface ParsedFile {
  values:   number[][];
  rows?:    string[];
  columns?: string[];
}

function parseCSV(text: string): ParsedFile {
  const lines = text.trim().split('\n').map(l => l.trim()).filter(Boolean);
  if (!lines.length) return { values: [] };

  const firstRow  = lines[0].split(',').map(c => c.trim());
  const hasHeader = firstRow.some(c => isNaN(Number(c)) || c === '');

  let columns: string[] | undefined;
  let rows:    string[] | undefined;
  let dataLines: string[];

  if (hasHeader) {
    const hasCorner = firstRow[0] === '';
    columns   = hasCorner ? firstRow.slice(1) : firstRow;
    dataLines = lines.slice(1);
    if (hasCorner && dataLines.length > 0) {
      rows = [];
    } else if (!hasCorner && dataLines.length > 0) {
      const firstData = dataLines[0].split(',').map(c => c.trim());
      if (isNaN(Number(firstData[0]))) rows = [];
    }
  } else {
    dataLines = lines;
  }

  const values: number[][] = [];
  for (const line of dataLines) {
    const cells = line.split(',').map(c => c.trim());
    if (rows !== undefined) {
      rows.push(cells[0]);
      values.push(cells.slice(1).map(Number));
    } else {
      values.push(cells.map(Number));
    }
  }

  return { values, rows, columns };
}

function parseJSON(text: string): ParsedFile | null {
  try {
    const json = JSON.parse(text) as unknown;
    if (Array.isArray(json)) return { values: json as number[][] };
    const j = json as Record<string, unknown>;
    return {
      values:  (j['values'] ?? j['data'] ?? []) as number[][],
      columns: (j['columns'] ?? j['cols'])      as string[] | undefined,
      rows:     j['rows']                       as string[] | undefined,
    };
  } catch { return null; }
}

function parseContent(text: string): ParsedFile | null {
  const t = text.trim();
  return (t.startsWith('{') || t.startsWith('[')) ? parseJSON(t) : parseCSV(t);
}

function splitLabels(raw: string): string[] {
  return raw.split(',').map(s => s.trim().slice(0, MAX_LABEL_CHARS)).filter(Boolean);
}

// ─── File-loader wrapper ──────────────────────────────────────

interface LoaderProps {
  fileData:        string | string[];
  colorScale:      HeatmapColorScale;
  size:            HeatmapSize;
  showLegend:      boolean;
  rowLabelsStr:    string;
  columnLabelsStr: string;
}

function HeatmapFileLoader({
  fileData,
  colorScale,
  size,
  showLegend,
  rowLabelsStr,
  columnLabelsStr,
}: LoaderProps) {
  const [parsed, setParsed] = useState<ParsedFile | null>(null);
  const [error,  setError]  = useState<string | null>(null);

  const url = Array.isArray(fileData) ? fileData[0] : fileData;

  useEffect(() => {
    if (!url) { setParsed(null); setError(null); return; }
    setError(null);
    fetch(url)
      .then(r => r.text())
      .then(text => {
        const result = parseContent(text);
        if (!result) setError('Could not parse file — use JSON or CSV format.');
        else setParsed(result);
      })
      .catch(() => setError('Failed to load file.'));
  }, [url]);

  const rowLabels    = rowLabelsStr    ? splitLabels(rowLabelsStr)    : parsed?.rows;
  const columnLabels = columnLabelsStr ? splitLabels(columnLabelsStr) : parsed?.columns;

  if (error) {
    return (
      <p style={{ fontFamily: 'var(--primitive-font-mono)', fontSize: '11px', color: 'var(--color-error-text)' }}>
        {error}
      </p>
    );
  }

  return (
    <ElegantHeatmapGrid
      data={parsed?.values}
      rowLabels={rowLabels}
      columnLabels={columnLabels}
      colorScale={colorScale}
      size={size}
      showLegend={showLegend}
    />
  );
}

// ─── Meta ─────────────────────────────────────────────────────

const meta: Meta<typeof ElegantHeatmapGrid> = {
  title:     'Simple/Data/ElegantHeatmapGrid',
  component: ElegantHeatmapGrid,
  parameters: {
    layout:      'centered',
    backgrounds: { disable: true },
  },
  argTypes: {
    colorScale: {
      options: ['green', 'accent', 'redgreen'] satisfies HeatmapColorScale[],
      control: { type: 'select' },
    },
    size: {
      options: ['sm', 'md', 'lg'] satisfies HeatmapSize[],
      control: { type: 'select' },
    },
    showLegend:   { control: 'boolean' },
    data:         { table: { disable: true } },
    rowLabels:    { table: { disable: true } },
    columnLabels: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof ElegantHeatmapGrid>;

// ─── Stories ──────────────────────────────────────────────────

/**
 * Demo data (7 × 12). Weekday + month labels applied automatically.
 * Toggle color scale and size in the controls panel.
 */
export const Default: Story = {
  args: {
    colorScale: 'green',
    size:       'md',
    showLegend: true,
  },
};

// ─── FromFile ─────────────────────────────────────────────────

type FileArgs = {
  fileData:        string | string[];
  colorScale:      HeatmapColorScale;
  size:            HeatmapSize;
  showLegend:      boolean;
  rowLabelsStr:    string;
  columnLabelsStr: string;
};

/**
 * Upload a .json or .csv file to populate the grid.
 * If the data is 7 rows × 12+ cols and no label overrides are typed,
 * weekday and month labels are applied automatically.
 * Override labels by typing comma-separated strings (max 10 chars each).
 */
export const FromFile: StoryObj<FileArgs> = {
  parameters: { backgrounds: { disable: true } },
  argTypes: {
    fileData: {
      name:    'Data file (.json / .csv)',
      control: { type: 'file', accept: '.json,.csv' },
    },
    colorScale: {
      name:    'Color scale',
      options: ['green', 'accent', 'redgreen'] satisfies HeatmapColorScale[],
      control: { type: 'select' },
    },
    size: {
      name:    'Size',
      options: ['sm', 'md', 'lg'] satisfies HeatmapSize[],
      control: { type: 'select' },
    },
    showLegend: {
      name:    'Show legend',
      control: 'boolean',
    },
    rowLabelsStr: {
      name:    'Row labels override (comma-separated, max 10 chars each)',
      control: 'text',
    },
    columnLabelsStr: {
      name:    'Column labels override (comma-separated, max 10 chars each)',
      control: 'text',
    },
  },
  args: {
    fileData:        '',
    colorScale:      'green',
    size:            'md',
    showLegend:      true,
    rowLabelsStr:    '',
    columnLabelsStr: '',
  },
  render: (args: FileArgs) => <HeatmapFileLoader {...args} />,
};
