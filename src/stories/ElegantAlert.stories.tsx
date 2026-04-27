import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ElegantAlert } from '../components/simple/ElegantAlert';
import type { AlertVariant } from '../components/simple/ElegantAlert';

// ─── Flat args type (onDismiss is derived from showDismiss) ───

type Args = {
  variant: AlertVariant;
  title: string;
  showTitle: boolean;
  message: string;
  showDismiss: boolean;
  showIcon: boolean;
};

// ─── Dismissible wrapper (manages local visibility state) ─────

function AlertDemo(args: Args) {
  const [visible, setVisible] = useState(true);

  if (!visible) {
    return (
      <button
        onClick={() => setVisible(true)}
        style={{
          fontFamily: 'var(--primitive-font-sans)',
          fontSize: 'var(--primitive-font-size-sm)',
          color: 'var(--color-text-muted)',
          background: 'none',
          border: '1px dashed var(--primitive-gray-300)',
          borderRadius: 'var(--primitive-radius-md)',
          padding: 'var(--primitive-scale-3) var(--primitive-scale-4)',
          cursor: 'pointer',
          width: '100%',
        }}
      >
        Dismissed — click to restore
      </button>
    );
  }

  return (
    <ElegantAlert
      variant={args.variant}
      title={args.showTitle ? args.title : undefined}
      message={args.message}
      onDismiss={args.showDismiss ? () => setVisible(false) : undefined}
      showIcon={args.showIcon}
    />
  );
}

// ─── Meta ─────────────────────────────────────────────────────

const meta: Meta<Args> = {
  title: 'Simple/Communications/ElegantAlert',
  tags: ['autodocs'],
  parameters: {
    backgrounds: { disable: true },
    layout: 'padded',
  },
  render: (args) => <AlertDemo key={JSON.stringify(args)} {...args} />,
  argTypes: {
    variant: {
      options: ['info', 'success', 'error'] satisfies AlertVariant[],
      control: { type: 'select' },
    },
    title: { control: 'text' },
    showTitle: { control: 'boolean' },
    message: { control: 'text' },
    showDismiss: { control: 'boolean' },
    showIcon: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<Args>;

// ─── Story ────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    variant: 'info',
    title: 'Heads up',
    showTitle: true,
    message: 'This is an inline persistent message that stays until dismissed.',
    showDismiss: true,
    showIcon: true,
  },
};
