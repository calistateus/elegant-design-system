import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ElegantDrawerSheet } from '@/components/simple/ElegantDrawerSheet';
import type { DrawerSide } from '@/components/simple/ElegantDrawerSheet';

// ─── Args type ────────────────────────────────────────────────

type Args = {
  side: DrawerSide;
  heading: string;
  description: string;
  showDescription: boolean;
};

// ─── Wrapper (manages open state) ─────────────────────────────

function DrawerDemo(args: Args) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        style={{
          fontFamily: 'var(--primitive-font-sans)',
          fontSize: 'var(--primitive-font-size-sm)',
          fontWeight: 'var(--primitive-font-weight-medium)',
          color: 'var(--color-interactive-primary-fg)',
          backgroundColor: 'var(--color-interactive-primary-bg)',
          border: 'none',
          borderRadius: 'var(--size-btn-radius)',
          padding: 'var(--size-btn-py) var(--size-btn-px)',
          cursor: 'pointer',
        }}
      >
        Open drawer
      </button>

      <ElegantDrawerSheet
        open={open}
        side={args.side}
        heading={args.heading}
        description={args.showDescription ? args.description : undefined}
        onClose={() => setOpen(false)}
      />
    </>
  );
}

// ─── Meta ─────────────────────────────────────────────────────

const meta: Meta<Args> = {
  title: 'Simple/Navigation/ElegantDrawerSheet',
  tags: ['autodocs'],
  parameters: {
    backgrounds: { disable: true },
    layout: 'centered',
  },
  render: (args) => <DrawerDemo key={`${args.side}-${args.showDescription}`} {...args} />,
  argTypes: {
    side: {
      options: ['right', 'left', 'bottom'],
      control: { type: 'select' },
    },
    heading: { control: 'text' },
    description: { control: 'text' },
    showDescription: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<Args>;

// ─── Story ────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    side: 'right',
    heading: 'Settings',
    description: 'Adjust your preferences below.',
    showDescription: false,
  },
};
