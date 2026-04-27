import type { Meta, StoryObj } from '@storybook/react';
import { ElegantAccordion, type AccordionItem } from '@/components/simple/ElegantAccordion';

type Args = {
  size: 'default' | 'compact';
  count: number;
  heading1: string; description1: string;
  heading2: string; description2: string;
  heading3: string; description3: string;
  heading4: string; description4: string;
  heading5: string; description5: string;
};

const meta: Meta<Args> = {
  title: 'Simple/Content/ElegantAccordion',
  tags: ['autodocs'],
  parameters: {
    backgrounds: { disable: true },
  },
  argTypes: {
    size: {
      control: { type: 'radio' },
      options: ['default', 'compact'],
    },
    count: {
      control: { type: 'number', min: 1, max: 5, step: 1 },
    },
    heading1: { control: 'text' },
    description1: { control: 'text' },
    heading2: { control: 'text' },
    description2: { control: 'text' },
    heading3: { control: 'text' },
    description3: { control: 'text' },
    heading4: { control: 'text' },
    description4: { control: 'text' },
    heading5: { control: 'text' },
    description5: { control: 'text' },
  },
  render: ({ size, count, heading1, description1, heading2, description2, heading3, description3, heading4, description4, heading5, description5 }) => {
    const all: AccordionItem[] = [
      { heading: heading1, description: description1 },
      { heading: heading2, description: description2 },
      { heading: heading3, description: description3 },
      { heading: heading4, description: description4 },
      { heading: heading5, description: description5 },
    ];
    return <ElegantAccordion size={size} items={all.slice(0, count)} />;
  },
};

export default meta;
type Story = StoryObj<Args>;

const defaultArgs = {
  count: 3,
  heading1: 'What is your return policy?',
  description1: 'We accept returns within 30 days of purchase. Items must be unused and in their original packaging.',
  heading2: 'How do I get started?',
  description2: 'Create a free account, complete the onboarding checklist, and you will be ready to use the platform within minutes.',
  heading3: 'Is my data secure?',
  description3: 'All data is encrypted in transit and at rest using AES-256. We are SOC 2 Type II certified and conduct regular third-party audits.',
  heading4: 'Can I change my plan later?',
  description4: 'Yes — you can upgrade or downgrade your plan at any time from the billing section of your account settings.',
  heading5: 'How do I cancel my subscription?',
  description5: 'You can cancel at any time from Settings → Billing. Your access will remain active until the end of the current billing period.',
};

export const Default: Story = {
  args: { ...defaultArgs, size: 'default' },
};

export const Compact: Story = {
  args: { ...defaultArgs, size: 'compact' },
};
