import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { ElegantTextarea, type ElegantTextareaProps } from '../components/simple/ElegantTextarea';

function ElegantTextareaDemo(args: ElegantTextareaProps) {
  const [value, setValue] = useState('');
  return <ElegantTextarea {...args} value={value} onChange={setValue} />;
}

const meta: Meta<typeof ElegantTextarea> = {
  title: 'Simple/Forms/ElegantTextarea',
  component: ElegantTextarea,
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
    counter: {
      control: 'select',
      options: [undefined, 'char', 'word'],
    },
    onChange: { table: { disable: true } },
    value: { table: { disable: true } },
    id: { table: { disable: true } },
  },
  args: {
    label: 'Label',
    showLabel: true,
    description: 'Supporting description text.',
    showDescription: true,
    placeholder: 'Placeholder…',
    showPlaceholder: true,
    error: 'Error message.',
    showError: false,
    maxChars: undefined,
    draggable: false,
    counter: undefined,
    rows: 4,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof ElegantTextarea>;

export const ElegantTextareaStory: Story = {
  name: 'ElegantTextarea',
  render: (args) => <ElegantTextareaDemo {...args} />,
};
