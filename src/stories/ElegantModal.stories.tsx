import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ElegantModal } from '../components/simple/ElegantModal';

// ─── Wrapper (manages open state) ─────────────────────────────

type Args = {
  heading: string;
  description: string;
  showDescription: boolean;
};

function ModalDemo(args: Args) {
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
        Open modal
      </button>

      <ElegantModal
        open={open}
        heading={args.heading}
        description={args.showDescription ? args.description : undefined}
        onClose={() => setOpen(false)}
      />
    </>
  );
}

// ─── Meta ─────────────────────────────────────────────────────

const meta: Meta<Args> = {
  title: 'Simple/Communications/ElegantModal',
  tags: ['autodocs'],
  parameters: {
    backgrounds: { disable: true },
    layout: 'centered',
  },
  render: (args) => <ModalDemo key={JSON.stringify(args)} {...args} />,
  argTypes: {
    heading: { control: 'text' },
    description: { control: 'text' },
    showDescription: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<Args>;

// ─── Stories ──────────────────────────────────────────────────

export const HeadingOnly: Story = {
  args: {
    heading: 'Confirm action',
    description: '',
    showDescription: false,
  },
};

export const WithDescription: Story = {
  args: {
    heading: 'Delete project',
    description: 'This will permanently remove the project and all associated files. This action cannot be undone.',
    showDescription: true,
  },
};
