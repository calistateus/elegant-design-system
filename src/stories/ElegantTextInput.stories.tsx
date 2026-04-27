import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { ElegantTextInput, type ElegantTextInputProps } from '../components/simple/ElegantTextInput';

function ElegantTextInputDemo(args: ElegantTextInputProps) {
  const [value, setValue] = useState('');
  return <ElegantTextInput {...args} value={value} onChange={setValue} />;
}

const meta: Meta<typeof ElegantTextInput> = {
  title: 'Simple/Forms/ElegantTextInput',
  component: ElegantTextInput,
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
    icon: {
      control: 'select',
      options: ['search', 'arrow'],
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
    icon: 'search',
    showIcon: true,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof ElegantTextInput>;

export const ElegantTextInputStory: Story = {
  name: 'ElegantTextInput',
  render: (args) => <ElegantTextInputDemo {...args} />,
};
