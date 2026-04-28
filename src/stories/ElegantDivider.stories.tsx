import type { Meta, StoryObj } from '@storybook/react';
import { ElegantDivider } from '../components/simple/layout/ElegantDivider';

const meta: Meta<typeof ElegantDivider> = {
  title: 'Simple/Layout/ElegantDivider',
  component: ElegantDivider,
  tags: ['autodocs'],
  parameters: { backgrounds: { disable: true } },
  argTypes: {
    variant: {
      options: ['solid', 'dashed', 'dotted'],
      control: { type: 'select' },
    },
    label: { control: 'text' },
    // fixed per story — hidden globally, overridden per story if needed
    orientation: { table: { disable: true } },
    className: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof ElegantDivider>;

export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
    variant: 'solid',
  },
  argTypes: {
    label: { table: { disable: true } },
  },
};

export const WithLabel: Story = {
  args: {
    orientation: 'horizontal',
    variant: 'solid',
    label: 'or',
  },
};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
    variant: 'solid',
  },
  argTypes: {
    label: { table: { disable: true } },
  },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', height: '3rem', alignItems: 'center', gap: '1rem' }}>
        <span>Left</span>
        <Story />
        <span>Right</span>
      </div>
    ),
  ],
};
