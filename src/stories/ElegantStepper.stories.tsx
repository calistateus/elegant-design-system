import type { Meta, StoryObj } from '@storybook/react';
import { ElegantStepper } from '@/components/simple/feedback/ElegantStepper';

const meta: Meta<typeof ElegantStepper> = {
  title: 'Simple/Feedback/ElegantStepper',
  component: ElegantStepper,
  parameters: {
    backgrounds: { disable: true },
  },
  argTypes: {
    steps: { control: { type: 'number', min: 2, max: 8 } },
    currentStep: { control: { type: 'number', min: 1, max: 8 } },
    variant: {
      control: 'select',
      options: ['circle', 'tab', 'arrows'],
    },
    orientation: {
      control: 'radio',
      options: ['horizontal', 'vertical'],
    },
    hideCopyOnMobile: { control: 'boolean' },
    showStepNumber: { control: 'boolean' },
    showLabel: { control: 'boolean' },
    showDescription: { control: 'boolean' },
    stepItems: { table: { disable: true } },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '2rem', maxWidth: '720px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ElegantStepper>;

const withLabels = [
  { label: 'Account', description: 'Your details' },
  { label: 'Plan', description: 'Choose a tier' },
  { label: 'Payment', description: 'Card info' },
  { label: 'Review', description: 'Confirm order' },
];

const withLabelsOnly = [
  { label: 'Account' },
  { label: 'Plan' },
  { label: 'Payment' },
  { label: 'Review' },
];

export const CircleHorizontal: Story = {
  args: {
    steps: 4,
    currentStep: 2,
    variant: 'circle',
    orientation: 'horizontal',
    stepItems: withLabels,
    hideCopyOnMobile: false,
    showStepNumber: true,
    showLabel: true,
    showDescription: true,
  },
};

export const CircleVertical: Story = {
  args: {
    steps: 4,
    currentStep: 2,
    variant: 'circle',
    orientation: 'vertical',
    stepItems: withLabels,
    hideCopyOnMobile: false,
    showStepNumber: true,
    showLabel: true,
    showDescription: true,
  },
};

export const TabHorizontal: Story = {
  args: {
    steps: 4,
    currentStep: 2,
    variant: 'tab',
    orientation: 'horizontal',
    stepItems: withLabelsOnly,
    hideCopyOnMobile: false,
    showStepNumber: true,
    showLabel: true,
    showDescription: true,
  },
};

export const TabVertical: Story = {
  args: {
    steps: 4,
    currentStep: 2,
    variant: 'tab',
    orientation: 'vertical',
    stepItems: withLabelsOnly,
    hideCopyOnMobile: false,
    showStepNumber: true,
    showLabel: true,
    showDescription: true,
  },
};

export const ArrowsHorizontal: Story = {
  args: {
    steps: 4,
    currentStep: 2,
    variant: 'arrows',
    orientation: 'horizontal',
    stepItems: withLabelsOnly,
    hideCopyOnMobile: false,
    showStepNumber: true,
    showLabel: true,
    showDescription: true,
  },
};

export const ArrowsVertical: Story = {
  args: {
    steps: 4,
    currentStep: 2,
    variant: 'arrows',
    orientation: 'vertical',
    stepItems: withLabelsOnly,
    hideCopyOnMobile: false,
    showStepNumber: true,
    showLabel: true,
    showDescription: true,
  },
};

export const NoLabels: Story = {
  name: 'No Labels (circle)',
  args: {
    steps: 5,
    currentStep: 3,
    variant: 'circle',
    orientation: 'horizontal',
    stepItems: [],
    hideCopyOnMobile: false,
    showStepNumber: true,
    showLabel: true,
    showDescription: true,
  },
};

export const HideCopyOnMobile: Story = {
  name: 'Hide Copy on Mobile',
  args: {
    steps: 4,
    currentStep: 2,
    variant: 'circle',
    orientation: 'horizontal',
    stepItems: withLabels,
    hideCopyOnMobile: true,
  },
};
