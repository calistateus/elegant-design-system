import type { Meta, StoryObj } from '@storybook/react';
import { ElegantDataTable } from '@/components/simple/data/ElegantDataTable';

// ─── Dummy data ───────────────────────────────────────────────

const PEOPLE_DATA = {
  headers: ['Name', 'Role', 'Department', 'Location', 'Status', 'Joined'],
  rows: [
    ['Alice Hoffman',    'Product Designer',    'Design',         'New York',     'Active',   '2021-03-12'],
    ['Ben Nakamura',     'Frontend Engineer',   'Engineering',    'San Francisco','Active',   '2020-07-08'],
    ['Clara Osei',       'Data Analyst',        'Analytics',      'London',       'Active',   '2022-01-25'],
    ['David Reyes',      'Engineering Manager', 'Engineering',    'Austin',       'Active',   '2019-11-03'],
    ['Elena Kovač',      'UX Researcher',       'Design',         'Berlin',       'On leave', '2021-09-14'],
    ['Fiona Tang',       'Backend Engineer',    'Engineering',    'Toronto',      'Active',   '2023-02-17'],
    ['George Okafor',    'Product Manager',     'Product',        'Lagos',        'Active',   '2020-05-30'],
    ['Hannah Bergström', 'Brand Designer',      'Design',         'Stockholm',    'Active',   '2022-08-01'],
    ['Ivan Petrov',      'DevOps Engineer',     'Infrastructure', 'Moscow',       'Active',   '2018-04-22'],
    ['Jess Liu',         'Content Strategist',  'Marketing',      'Singapore',    'Inactive', '2021-12-05'],
  ],
};

// ─── Meta ─────────────────────────────────────────────────────

const meta: Meta<typeof ElegantDataTable> = {
  title: 'Simple/Data/ElegantDataTable',
  component: ElegantDataTable,
  render: (args) => <ElegantDataTable key={`${args.rows}-${args.columns}`} {...args} />,
  tags: ['autodocs'],
  parameters: {
    backgrounds: { disable: true },
  },
  argTypes: {
    rows:           { control: { type: 'number', min: 1, max: 50, step: 1 } },
    columns:        { control: { type: 'number', min: 1, max: 15, step: 1 } },
    zebraStriping:  { control: 'boolean' },
    columnSort:     { control: 'boolean' },
    tableSearch:    { control: 'boolean' },
    rowSelect:      { control: 'boolean' },
    rowMultiSelect: { control: 'boolean' },
    initialData:    { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof ElegantDataTable>;

export const Default: Story = {
  args: {
    rows: 10,
    columns: 6,
    zebraStriping: false,
    columnSort: false,
    tableSearch: false,
    rowSelect: false,
    rowMultiSelect: false,
    initialData: PEOPLE_DATA,
  },
};
