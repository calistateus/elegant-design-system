import type { Meta, StoryObj } from '@storybook/react';
import { ElegantCircularProgress } from '@/components/simple/feedback/ElegantCircularProgress';

const meta: Meta<typeof ElegantCircularProgress> = {
  title: 'Simple/Feedback/ElegantCircularProgress',
  component: ElegantCircularProgress,
  tags: ['autodocs'],
  parameters: {
    backgrounds: { disable: true },
  },
  argTypes: {
    // ── variant (fixed per story, hidden) ──────────────────────
    variant: { table: { disable: true } },

    // ── shared ─────────────────────────────────────────────────
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'select' },
    },
    label: { control: 'text' },
    labelPlacement: {
      options: ['right', 'bottom', 'center'],
      control: { type: 'select' },
    },

    // ── percentage variant ─────────────────────────────────────
    value: {
      control: { type: 'number', min: 0, max: 100 },
      if: { arg: 'variant', eq: 'percentage' },
    },
    showValue: {
      control: 'boolean',
      if: { arg: 'variant', eq: 'percentage' },
    },

    // ── steps variant ──────────────────────────────────────────
    steps: {
      control: { type: 'number', min: 1, max: 20 },
      if: { arg: 'variant', eq: 'steps' },
    },
    currentStep: {
      control: { type: 'number', min: 0, max: 20 },
      if: { arg: 'variant', eq: 'steps' },
    },
    showStepCount: {
      control: 'boolean',
      if: { arg: 'variant', eq: 'steps' },
    },

    className: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof ElegantCircularProgress>;

export const Percentage: Story = {
  args: {
    variant: 'percentage',
    value: 72,
    size: 'md',
    showValue: true,
    label: 'Profile complete',
    labelPlacement: 'right',
  },
};

export const Steps: Story = {
  args: {
    variant: 'steps',
    steps: 7,
    currentStep: 3,
    size: 'md',
    showStepCount: true,
    label: 'Onboarding',
    labelPlacement: 'right',
  },
};
