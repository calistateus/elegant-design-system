import type { Meta, StoryObj } from '@storybook/react';
import { ElegantFileUpload } from '@/components/simple/ElegantFileUpload';

type Args = {
  variant: 'button' | 'dropzone';
  maxFiles: number;
  allowedTypesRaw: string;
  label: string;
  showLabel: boolean;
  description: string;
  showDescription: boolean;
  chipLayout: 'horizontal' | 'stacked';
};

const meta: Meta<Args> = {
  title: 'Simple/Forms/ElegantFileUpload',
  tags: ['autodocs'],
  parameters: {
    backgrounds: { disable: true },
  },
  render: ({ variant, maxFiles, allowedTypesRaw, label, showLabel, description, showDescription, chipLayout }) => {
    const allowedTypes = allowedTypesRaw
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    return (
      <ElegantFileUpload
        variant={variant}
        maxFiles={maxFiles}
        allowedTypes={allowedTypes}
        label={label || undefined}
        showLabel={showLabel}
        description={description || undefined}
        showDescription={showDescription}
        chipLayout={chipLayout}
      />
    );
  },
  argTypes: {
    variant: { table: { disable: true } },
    maxFiles: { control: { type: 'number', min: 1, max: 20 } },
    allowedTypesRaw: { name: 'allowedTypes', control: 'text' },
    label: { control: 'text' },
    showLabel: { control: 'boolean' },
    description: { control: 'text' },
    showDescription: { control: 'boolean' },
    chipLayout: {
      options: ['stacked', 'horizontal'],
      control: { type: 'select' },
      if: { arg: 'variant', eq: 'button' },
    },
  },
};

export default meta;
type Story = StoryObj<Args>;

export const ButtonVariant: Story = {
  args: {
    variant: 'button',
    maxFiles: 3,
    allowedTypesRaw: '.pdf, .png, .jpg',
    label: 'Attachments',
    showLabel: true,
    description: 'Upload up to 3 files.',
    showDescription: true,
    chipLayout: 'stacked',
  },
};

export const DropzoneVariant: Story = {
  parameters: {
    layout: 'padded',
  },
  args: {
    variant: 'dropzone',
    maxFiles: 5,
    allowedTypesRaw: '.pdf, .png, .jpg',
    label: 'Upload files',
    showLabel: true,
    description: 'Drag and drop or click to browse.',
    showDescription: true,
  },
};
