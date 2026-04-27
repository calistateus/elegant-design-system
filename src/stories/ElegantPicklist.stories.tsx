import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { ElegantPicklist, type ElegantPicklistProps } from '../components/simple/ElegantPicklist';

const FIXED_OPTIONS = [
  { label: 'Design', value: 'design' },
  { label: 'Engineering', value: 'engineering' },
  { label: 'Product', value: 'product' },
  { label: 'Marketing', value: 'marketing' },
  { label: 'Operations', value: 'operations' },
];

function ElegantPicklistDemo(args: ElegantPicklistProps) {
  const [value, setValue] = useState<string[]>(args.value ?? []);
  return (
    <ElegantPicklist
      {...args}
      options={FIXED_OPTIONS}
      value={value}
      onChange={setValue}
    />
  );
}

const meta: Meta<typeof ElegantPicklist> = {
  title: 'Simple/Forms/ElegantPicklist',
  component: ElegantPicklist,
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
    label: { control: 'text' },
    description: { control: 'text' },
    placeholder: { control: 'text' },
    error: { control: 'text' },
    showLabel: { control: 'boolean' },
    showDescription: { control: 'boolean' },
    showPlaceholder: { control: 'boolean' },
    showError: { control: 'boolean' },
    disabled: { control: 'boolean' },
    // Hidden — implementation details
    options: { table: { disable: true } },
    onChange: { table: { disable: true } },
    value: { table: { disable: true } },
    id: { table: { disable: true } },
  },
  args: {
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
type Story = StoryObj<typeof ElegantPicklist>;

export const ElegantPicklistStory: Story = {
  name: 'ElegantPicklist',
  render: (args) => <ElegantPicklistDemo {...args} />,
};
