import type { Meta, StoryObj } from '@storybook/react';
import { ElegantTooltip } from '../components/simple/communications/ElegantTooltip';

const meta: Meta<typeof ElegantTooltip> = {
  title: 'Simple/Communications/ElegantTooltip',
  component: ElegantTooltip,
  tags: ['autodocs'],
  argTypes: {
    content: { control: 'text' },
    // position is fixed per variant
    position: { table: { disable: true } },
    children: { table: { disable: true } },
  },
  parameters: {
    backgrounds: { disable: true },
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof ElegantTooltip>;

const Trigger = () => (
  <button
    style={{
      padding: 'var(--size-input-padding)',
      backgroundColor: 'var(--color-bg-surface)',
      border: '1px solid var(--color-border-subtle)',
      borderRadius: 'var(--size-btn-radius)',
      fontSize: 'var(--primitive-font-size-sm)',
      color: 'var(--color-text-body)',
      cursor: 'default',
    }}
  >
    Hover me
  </button>
);

export const Top: Story = {
  args: {
    content: 'This is a tooltip',
    position: 'top',
  },
  render: (args) => (
    <ElegantTooltip {...args}>
      <Trigger />
    </ElegantTooltip>
  ),
};

export const Bottom: Story = {
  args: {
    content: 'This is a tooltip',
    position: 'bottom',
  },
  render: (args) => (
    <ElegantTooltip {...args}>
      <Trigger />
    </ElegantTooltip>
  ),
};

export const Left: Story = {
  args: {
    content: 'This is a tooltip',
    position: 'left',
  },
  render: (args) => (
    <ElegantTooltip {...args}>
      <Trigger />
    </ElegantTooltip>
  ),
};

export const Right: Story = {
  args: {
    content: 'This is a tooltip',
    position: 'right',
  },
  render: (args) => (
    <ElegantTooltip {...args}>
      <Trigger />
    </ElegantTooltip>
  ),
};
