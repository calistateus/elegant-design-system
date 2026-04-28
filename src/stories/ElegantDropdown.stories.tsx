import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { ElegantDropdown, type ElegantDropdownProps } from '../components/simple/forms/ElegantDropdown';

const FIXED_OPTIONS = [
  { label: 'Design', value: 'design' },
  { label: 'Engineering', value: 'engineering' },
  { label: 'Product', value: 'product' },
  { label: 'Marketing', value: 'marketing' },
  { label: 'Operations', value: 'operations' },
];

function ElegantDropdownDemo(args: ElegantDropdownProps) {
  const [value, setValue] = useState(args.value);
  return (
    <ElegantDropdown
      {...args}
      options={FIXED_OPTIONS}
      value={value}
      onChange={setValue}
    />
  );
}

const meta: Meta<typeof ElegantDropdown> = {
  title: 'Simple/Forms/ElegantDropdown',
  component: ElegantDropdown,
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
    // Text controls
    label: { control: 'text' },
    description: { control: 'text' },
    placeholder: { control: 'text' },
    error: { control: 'text' },
    // Value select
    value: {
      control: 'select',
      options: [undefined, ...FIXED_OPTIONS.map((o) => o.value)],
    },
    // Boolean toggles
    showLabel: { control: 'boolean' },
    showDescription: { control: 'boolean' },
    showPlaceholder: { control: 'boolean' },
    showError: { control: 'boolean' },
    disabled: { control: 'boolean' },
    // Hidden — implementation details
    options: { table: { disable: true } },
    onChange: { table: { disable: true } },
    id: { table: { disable: true } },
  },
  args: {
    value: undefined,
    label: 'Label',
    showLabel: true,
    description: 'Supporting description text.',
    showDescription: true,
    placeholder: 'Select…',
    showPlaceholder: true,
    error: 'Error message.',
    showError: false,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof ElegantDropdown>;

export const ElegantDropdownStory: Story = {
  name: 'ElegantDropdown',
  render: (args) => <ElegantDropdownDemo key={args.value ?? '__none__'} {...args} />,
};
