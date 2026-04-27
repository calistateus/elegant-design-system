import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { ElegantPinInput } from '../components/simple/ElegantPinInput';

const meta: Meta<typeof ElegantPinInput> = {
  title: 'Simple/Forms/ElegantPinInput',
  component: ElegantPinInput,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    digits: {
      control: 'select',
      options: [4, 6],
    },
    onChange: { table: { disable: true } },
    onComplete: { table: { disable: true } },
    actionLink: { table: { disable: true } },
  },
  args: {
    heading: 'Enter your PIN',
    description: 'We sent a code to your email.',
    digits: 4,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof ElegantPinInput>;

export const FourDigit: Story = {
  name: '4-digit',
  args: {
    heading: 'Enter your PIN',
    description: 'We sent a 4-digit code to your email.',
    digits: 4,
    actionLink: { label: 'Resend code', onClick: () => {} },
  },
};

export const SixDigit: Story = {
  name: '6-digit',
  args: {
    heading: 'Enter verification code',
    description: 'Check your authenticator app for a 6-digit code.',
    digits: 6,
    actionLink: { label: 'Use backup code instead', onClick: () => {} },
  },
};

export const NoDescription: Story = {
  name: 'No description',
  args: {
    heading: 'Enter your PIN',
    digits: 4,
    actionLink: { label: 'Forgot PIN?', onClick: () => {} },
  },
};

export const NoActionLink: Story = {
  name: 'No action link',
  args: {
    heading: 'Enter your PIN',
    description: 'Enter the 4-digit code from your email.',
    digits: 4,
  },
};

export const Disabled: Story = {
  name: 'Disabled',
  args: {
    heading: 'Enter your PIN',
    description: 'This field is currently disabled.',
    digits: 4,
    actionLink: { label: 'Resend code', onClick: () => {} },
    disabled: true,
  },
};
