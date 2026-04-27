import type { Meta, StoryObj } from '@storybook/react';
import { ElegantSpinner } from '@/components/simple/feedback/ElegantSpinner';

const meta: Meta<typeof ElegantSpinner> = {
  title: 'Simple/Feedback/ElegantSpinner',
  component: ElegantSpinner,
  tags: ['autodocs'],
  parameters: {
    backgrounds: { disable: true },
  },
  argTypes: {
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'select' },
    },
    className: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof ElegantSpinner>;

export const Default: Story = {
  args: {
    size: 'md',
  },
};
