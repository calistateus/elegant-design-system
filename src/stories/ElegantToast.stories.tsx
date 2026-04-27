import type { Meta, StoryObj } from '@storybook/react';
import { useEffect } from 'react';
import { ToastProvider, useToast } from '../components/simple/ElegantToast';

// ─── Types ────────────────────────────────────────────────────

type ToastVariant = 'default' | 'success' | 'error';

interface ToastStoryProps {
  variant: ToastVariant;
  message: string;
}

// ─── Trigger button (needs to live inside the provider) ───────

function ToastTrigger({ variant, message }: ToastStoryProps) {
  const { toast } = useToast();
  return (
    <button
      onClick={() => toast(message, variant)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '0.5rem 1rem',
        border: '1px solid var(--primitive-gray-300)',
        borderRadius: 'var(--primitive-radius-md)',
        background: 'none',
        fontFamily: 'var(--primitive-font-sans)',
        fontSize: 'var(--primitive-font-size-sm)',
        cursor: 'pointer',
      }}
    >
      Show toast
    </button>
  );
}

// ─── Wrapper that supplies the provider ───────────────────────

function ToastDemo({ variant, message }: ToastStoryProps) {
  return (
    <ToastProvider>
      <ToastTrigger variant={variant} message={message} />
    </ToastProvider>
  );
}

// ─── Meta ─────────────────────────────────────────────────────

const meta: Meta<ToastStoryProps> = {
  title: 'Simple/Communications/ElegantToast',
  component: ToastDemo,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'error'],
      description: 'Visual style of the toast',
    },
    message: {
      control: 'text',
      description: 'Text content displayed in the toast',
    },
  },
  parameters: {
    backgrounds: { disable: true },
    docs: {
      description: {
        component:
          'Wrap your app in `<ToastProvider>`. Use the `useToast()` hook to fire toasts from any child component. Toasts auto-dismiss after 4 s.',
      },
    },
  },
  render: (args) => <ToastDemo {...args} />,
};

export default meta;
type Story = StoryObj<ToastStoryProps>;

// ─── Stories ──────────────────────────────────────────────────

export const Default: Story = {
  name: 'Default',
  args: {
    variant: 'default',
    message: 'Here is some information for you.',
  },
};

export const Success: Story = {
  name: 'Success',
  args: {
    variant: 'success',
    message: 'Saved successfully.',
  },
};

export const Error: Story = {
  name: 'Error',
  args: {
    variant: 'error',
    message: 'Something went wrong.',
  },
};
