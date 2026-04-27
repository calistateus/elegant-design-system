import type { Meta, StoryObj } from '@storybook/react';
import { ElegantSkeleton } from '../components/simple/feedback/ElegantSkeleton';

const meta: Meta<typeof ElegantSkeleton> = {
  title: 'Simple/Feedback/ElegantSkeleton',
  component: ElegantSkeleton,
  parameters: {
    backgrounds: { disable: true },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['text', 'circle', 'rect'],
    },
    width: { control: 'text' },
    height: { control: 'text' },
    lines: { control: { type: 'number', min: 1, max: 10 } },
  },
};

export default meta;
type Story = StoryObj<typeof ElegantSkeleton>;

export const Text: Story = {
  args: {
    variant: 'text',
    width: '100%',
    lines: 1,
  },
};

export const TextMultiline: Story = {
  args: {
    variant: 'text',
    width: '100%',
    lines: 4,
  },
};

export const Circle: Story = {
  args: {
    variant: 'circle',
    width: '3rem',
    height: '3rem',
  },
};

export const Rect: Story = {
  args: {
    variant: 'rect',
    width: '100%',
    height: '8rem',
  },
};

export const CardLayout: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--size-card-gap)',
        padding: 'var(--size-card-padding)',
        background: 'var(--color-bg-surface)',
        borderRadius: 'var(--size-card-radius)',
        border: '1px solid var(--color-border-subtle)',
        width: '320px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--size-card-gap)' }}>
        <ElegantSkeleton variant="circle" width="2.5rem" height="2.5rem" />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <ElegantSkeleton variant="text" width="60%" height="0.875rem" />
          <ElegantSkeleton variant="text" width="40%" height="0.75rem" />
        </div>
      </div>
      <ElegantSkeleton variant="rect" width="100%" height="160px" />
      <ElegantSkeleton variant="text" width="100%" lines={3} />
    </div>
  ),
  argTypes: {
    variant:  { table: { disable: true } },
    width:    { table: { disable: true } },
    height:   { table: { disable: true } },
    lines:    { table: { disable: true } },
  },
};
