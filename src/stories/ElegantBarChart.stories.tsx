import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';
import {
  ElegantBarChart,
  type BarChartColor,
  type BarChartSize,
  type BarChartDatum,
} from '../components/simple/data/ElegantBarChart';

// ─── File parsing ─────────────────────────────────────────────

const MAX_LABEL_CHARS = 12;

function trunc(s: string): string {
  return s.length > MAX_LABEL_CHARS ? s.slice(0, MAX_LABEL_CHARS) : s;
}

function parseCSV(text: string): BarChartDatum[] {
  const lines = text.trim().split('\n').map(l => l.trim()).filter(Boolean);
  if (!lines.length) return [];

  // Skip a header row when neither column parses as a number.
  const firstCells = lines[0].split(',').map(c => c.trim());
  const looksLikeHeader =
    firstCells.length >= 2 && isNaN(Number(firstCells[1]));
  const dataLines = looksLikeHeader ? lines.slice(1) : lines;

  const out: BarChartDatum[] = [];
  for (const line of dataLines) {
    const [labelRaw, valueRaw] = line.split(',').map(c => c.trim());
    if (labelRaw === undefined) continue;
    const value = Number(valueRaw);
    if (Number.isNaN(value)) continue;
    out.push({ label: trunc(labelRaw), value });
  }
  return out;
}

function parseJSON(text: string): BarChartDatum[] | null {
  try {
    const json = JSON.parse(text) as unknown;

    // Form 1: [{ label, value }, ...]
    if (Array.isArray(json) && json.length > 0 && typeof json[0] === 'object') {
      return (json as Array<Record<string, unknown>>)
        .map(row => ({
          label: trunc(String(row['label'] ?? row['name'] ?? row['key'] ?? '')),
          value: Number(row['value'] ?? row['count'] ?? row['y'] ?? 0),
        }))
        .filter(d => d.label && !Number.isNaN(d.value));
    }

    // Form 2: { labels: [...], values: [...] }
    const j = json as Record<string, unknown>;
    const labels = (j['labels'] ?? j['categories']) as string[] | undefined;
    const values = (j['values'] ?? j['data']) as number[] | undefined;
    if (Array.isArray(labels) && Array.isArray(values)) {
      const len = Math.min(labels.length, values.length);
      const result: BarChartDatum[] = [];
      for (let i = 0; i < len; i++) {
        const v = Number(values[i]);
        if (!Number.isNaN(v)) result.push({ label: trunc(String(labels[i])), value: v });
      }
      return result;
    }

    return null;
  } catch {
    return null;
  }
}

function parseContent(text: string): BarChartDatum[] | null {
  const t = text.trim();
  return (t.startsWith('{') || t.startsWith('[')) ? parseJSON(t) : parseCSV(t);
}

// ─── File-loader wrapper ──────────────────────────────────────

interface LoaderProps {
  fileData:        string | string[];
  color:           BarChartColor;
  size:            BarChartSize;
  showValues:      boolean;
  showAxis:        boolean;
  title:           string;
  showTitle:       boolean;
  description:     string;
  showDescription: boolean;
}

function BarChartFileLoader({
  fileData,
  color,
  size,
  showValues,
  showAxis,
  title,
  showTitle,
  description,
  showDescription,
}: LoaderProps) {
  const [parsed, setParsed] = useState<BarChartDatum[] | null>(null);
  const [error,  setError]  = useState<string | null>(null);

  const url = Array.isArray(fileData) ? fileData[0] : fileData;

  useEffect(() => {
    if (!url) { setParsed(null); setError(null); return; }
    setError(null);
    fetch(url)
      .then(r => r.text())
      .then(text => {
        const result = parseContent(text);
        if (!result || result.length === 0) {
          setError('Could not parse file — use CSV (label,value) or JSON [{label,value}].');
        } else {
          setParsed(result);
        }
      })
      .catch(() => setError('Failed to load file.'));
  }, [url]);

  if (error) {
    return (
      <p style={{ fontFamily: 'var(--primitive-font-mono)', fontSize: '11px', color: 'var(--color-error-text)' }}>
        {error}
      </p>
    );
  }

  return (
    <ElegantBarChart
      data={parsed ?? undefined}
      color={color}
      size={size}
      showValues={showValues}
      showAxis={showAxis}
      title={title}
      showTitle={showTitle}
      description={description}
      showDescription={showDescription}
    />
  );
}

// ─── Meta ─────────────────────────────────────────────────────

const meta: Meta<typeof ElegantBarChart> = {
  title:     'Simple/Data/ElegantBarChart',
  component: ElegantBarChart,
  parameters: {
    layout:      'centered',
    backgrounds: { disable: true },
  },
  argTypes: {
    color: {
      options: ['accent', 'primary', 'muted'] satisfies BarChartColor[],
      control: { type: 'select' },
    },
    size: {
      options: ['sm', 'md', 'lg'] satisfies BarChartSize[],
      control: { type: 'select' },
    },
    showValues:      { control: 'boolean' },
    showAxis:        { control: 'boolean' },
    title:           { control: 'text' },
    showTitle:       { control: 'boolean' },
    description:     { control: 'text' },
    showDescription: { control: 'boolean' },
    data:            { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof ElegantBarChart>;

// ─── Stories ──────────────────────────────────────────────────

/**
 * Demo data (7 months). Toggle color, size, value labels, and axis line
 * in the controls panel.
 */
export const Default: Story = {
  args: {
    color:           'accent',
    size:            'md',
    showValues:      true,
    showAxis:        true,
    title:           'Monthly revenue',
    showTitle:       true,
    description:     'Bookings per month, in thousands.',
    showDescription: true,
  },
};

// ─── FromFile ─────────────────────────────────────────────────

type FileArgs = {
  fileData:        string | string[];
  color:           BarChartColor;
  size:            BarChartSize;
  showValues:      boolean;
  showAxis:        boolean;
  title:           string;
  showTitle:       boolean;
  description:     string;
  showDescription: boolean;
};

/**
 * Upload a `.csv` or `.json` file to populate the chart.
 *
 * **CSV** — two columns, optional header row:
 * ```
 * label,value
 * Jan,24
 * Feb,32
 * ```
 *
 * **JSON** — either an array of `{ label, value }` objects, or
 * `{ labels: [...], values: [...] }`.
 */
export const FromFile: StoryObj<FileArgs> = {
  parameters: { backgrounds: { disable: true } },
  argTypes: {
    fileData: {
      name:    'Data file (.csv / .json)',
      control: { type: 'file', accept: '.csv,.json' },
    },
    color: {
      name:    'Color',
      options: ['accent', 'primary', 'muted'] satisfies BarChartColor[],
      control: { type: 'select' },
    },
    size: {
      name:    'Size',
      options: ['sm', 'md', 'lg'] satisfies BarChartSize[],
      control: { type: 'select' },
    },
    showValues:      { name: 'Show values',      control: 'boolean' },
    showAxis:        { name: 'Show axis',        control: 'boolean' },
    title:           { name: 'Title',            control: 'text' },
    showTitle:       { name: 'Show title',       control: 'boolean' },
    description:     { name: 'Description',      control: 'text' },
    showDescription: { name: 'Show description', control: 'boolean' },
  },
  args: {
    fileData:        '',
    color:           'accent',
    size:            'md',
    showValues:      true,
    showAxis:        true,
    title:           'Monthly revenue',
    showTitle:       true,
    description:     'Bookings per month, in thousands.',
    showDescription: true,
  },
  render: (args: FileArgs) => <BarChartFileLoader {...args} />,
};
