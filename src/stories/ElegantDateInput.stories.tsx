import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { ElegantDateInput, type ElegantDateInputProps } from '../components/simple/ElegantDateInput';

function ElegantDateInputDemo(args: ElegantDateInputProps) {
  const [value, setValue] = useState('');
  return <ElegantDateInput {...args} value={value} onChange={setValue} />;
}

const meta: Meta<typeof ElegantDateInput> = {
  title: 'Simple/Forms/ElegantDateInput',
  component: ElegantDateInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    onChange: { table: { disable: true } },
    value: { table: { disable: true } },
    id: { table: { disable: true } },
  },
  args: {
    label: 'Date',
    showLabel: true,
    description: 'Select a date.',
    showDescription: true,
    error: 'Error message.',
    showError: false,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof ElegantDateInput>;

export const ElegantDateInputStory: Story = {
  name: 'ElegantDateInput',
  render: (args) => <ElegantDateInputDemo {...args} />,
};
