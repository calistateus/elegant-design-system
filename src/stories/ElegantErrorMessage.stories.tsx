import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ElegantErrorMessage } from '../components/simple/forms/ElegantErrorMessage';

const meta: Meta<typeof ElegantErrorMessage> = {
  title: 'Simple/Forms/ElegantErrorMessage',
  component: ElegantErrorMessage,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    message: 'Something went wrong. Please try again.',
  },
};

export default meta;
type Story = StoryObj<typeof ElegantErrorMessage>;

export const ElegantErrorMessageStory: Story = {
  name: 'ElegantErrorMessage',
};
