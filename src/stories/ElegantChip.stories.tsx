import type { Meta, StoryObj } from '@storybook/react';
import { ElegantChip } from '@/components/simple/ElegantChip';

type Args = {
  label: string;
  color: 'neutral' | 'black' | 'white';
  maxChars: number;
  dismissible: boolean;
};

const meta: Meta<Args> = {
  title: 'Simple/ElegantChip',
  tags: ['autodocs'],
  parameters: {
    backgrounds: { disable: true },
  },
  render: ({ label, color, maxChars, dismissible }) => (
    <ElegantChip
      label={label}
      color={color}
      maxChars={maxChars}
      onDismiss={dismissible ? () => {} : undefined}
    />
  ),
  argTypes: {
    label: { control: 'text' },
    color: {
      options: ['neutral', 'black', 'white'],
      control: { type: 'select' },
    },
    maxChars: { control: { type: 'number', min: 1, max: 40 } },
    dismissible: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<Args>;

export const Neutral: Story = {
  args: {
    label: 'design-system',
    color: 'neutral',
    maxChars: 40,
    dismissible: true,
  },
};

export const Black: Story = {
  args: {
    label: 'design-system',
    color: 'black',
    maxChars: 40,
    dismissible: true,
  },
};

export const White: Story = {
  args: {
    label: 'design-system',
    color: 'white',
    maxChars: 40,
    dismissible: true,
  },
};
