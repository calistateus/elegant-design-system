import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { ElegantWheelPicker, type ElegantWheelPickerProps } from '../components/simple/forms/ElegantWheelPicker';

/* ── Data sets ───────────────────────────────────────────────── */
const HOURS   = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));
const MINUTES = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0'));
const PERIODS = ['AM', 'PM'];

const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
];
const DAYS  = Array.from({ length: 31 }, (_, i) => String(i + 1));
const YEARS = Array.from({ length: 30 }, (_, i) => String(2010 + i));

/* ── Extended args type ──────────────────────────────────────── */
type StoryArgs = ElegantWheelPickerProps & { preset: 'time' | 'date'; showPeriod: boolean; showYear: boolean };

function Demo({ preset, showPeriod, showYear, ...args }: StoryArgs) {
  const [hour,   setHour]   = useState(0);
  const [minute, setMinute] = useState(0);
  const [period, setPeriod] = useState(0);
  const [month,  setMonth]  = useState(0);
  const [day,    setDay]    = useState(0);
  const [year,   setYear]   = useState(0);

  const timeColumns = [
    { items: HOURS,   value: hour,   onChange: setHour,   label: 'Hour'   },
    { items: MINUTES, value: minute, onChange: setMinute, label: 'Minute' },
    ...(showPeriod ? [{ items: PERIODS, value: period, onChange: setPeriod, label: 'AM/PM' }] : []),
  ];

  const dateColumns = [
    { items: MONTHS, value: month, onChange: setMonth, label: 'Month' },
    { items: DAYS,   value: day,   onChange: setDay,   label: 'Day'   },
    ...(showYear ? [{ items: YEARS, value: year, onChange: setYear, label: 'Year' }] : []),
  ];

  return (
    <ElegantWheelPicker
      {...args}
      columns={preset === 'date' ? dateColumns : timeColumns}
    />
  );
}

/* ── Meta ────────────────────────────────────────────────────── */
const meta: Meta<StoryArgs> = {
  title: 'Simple/Forms/ElegantWheelPicker',
  component: ElegantWheelPicker,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    backgrounds: { disable: true },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    preset:          { control: 'select', options: ['time', 'date'] },
    showPeriod:      { control: 'boolean', if: { arg: 'preset', eq: 'time' } },
    showYear:        { control: 'boolean', if: { arg: 'preset', eq: 'date' } },
    label:           { control: 'text' },
    description:     { control: 'text' },
    error:           { control: 'text' },
    showLabel:       { control: 'boolean' },
    showDescription: { control: 'boolean' },
    showError:       { control: 'boolean' },
    disabled:        { control: 'boolean' },
    visibleCount:    { control: { type: 'select', options: [3, 5, 7] } },
    itemHeight:      { control: { type: 'range', min: 32, max: 56, step: 4 } },
    columnWidth:     { control: { type: 'range', min: 56, max: 140, step: 4 } },
    columns:         { table: { disable: true } },
  },
  args: {
    preset:          'time',
    showPeriod:      true,
    showYear:        true,
    label:           'Time',
    showLabel:       true,
    description:     'Scroll each column to pick a value.',
    showDescription: true,
    error:           'Please select a valid value.',
    showError:       false,
    disabled:        false,
    visibleCount:    3,
    itemHeight:      40,
    columnWidth:     72,
  },
};

export default meta;
type Story = StoryObj<StoryArgs>;

export const ElegantWheelPickerStory: Story = {
  name: 'ElegantWheelPicker',
  render: (args) => <Demo {...args} />,
};
