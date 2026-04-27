import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ElegantRadioGroup } from '@/components/simple/ElegantRadioGroup';
import type { RadioGroupItem } from '@/components/simple/ElegantRadioGroup';

type Args = {
  heading: string;
  description: string;
  showDescription: boolean;
  error: string;
  showError: boolean;

  item1Label: string;
  item1Description: string;
  item1ShowDescription: boolean;

  item2Label: string;
  item2Description: string;
  item2ShowDescription: boolean;

  item3Label: string;
  item3Description: string;
  item3ShowDescription: boolean;
};

const meta: Meta<Args> = {
  title: 'Simple/Forms/ElegantRadioGroup',
  render: (args) => {
    const [selectedId, setSelectedId] = useState<string>('item1');

    const items: RadioGroupItem[] = [
      { id: 'item1', label: args.item1Label, description: args.item1ShowDescription ? args.item1Description : false },
      { id: 'item2', label: args.item2Label, description: args.item2ShowDescription ? args.item2Description : false },
      { id: 'item3', label: args.item3Label, description: args.item3ShowDescription ? args.item3Description : false },
    ];

    return (
      <ElegantRadioGroup
        heading={args.heading}
        description={args.showDescription ? args.description : false}
        items={items}
        selectedId={selectedId}
        onChange={setSelectedId}
        error={args.error}
        showError={args.showError}
      />
    );
  },
  tags: ['autodocs'],
  parameters: {
    backgrounds: { disable: true },
  },
  argTypes: {
    heading:         { control: 'text' },
    description:     { control: 'text' },
    showDescription: { control: 'boolean' },
    error:           { control: 'text' },
    showError:       { control: 'boolean' },

    item1Label:          { name: 'label',            control: 'text',    table: { category: 'Item 1' } },
    item1Description:    { name: 'description',      control: 'text',    table: { category: 'Item 1' } },
    item1ShowDescription:{ name: 'show description', control: 'boolean', table: { category: 'Item 1' } },

    item2Label:          { name: 'label',            control: 'text',    table: { category: 'Item 2' } },
    item2Description:    { name: 'description',      control: 'text',    table: { category: 'Item 2' } },
    item2ShowDescription:{ name: 'show description', control: 'boolean', table: { category: 'Item 2' } },

    item3Label:          { name: 'label',            control: 'text',    table: { category: 'Item 3' } },
    item3Description:    { name: 'description',      control: 'text',    table: { category: 'Item 3' } },
    item3ShowDescription:{ name: 'show description', control: 'boolean', table: { category: 'Item 3' } },
  },
};

export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {
  args: {
    heading:         'Notification preferences',
    description:     "Choose how you'd like to hear from us.",
    showDescription: true,
    error:           'Please select an option.',
    showError:       false,

    item1Label:          'Email updates',
    item1Description:    'Weekly digest of new content.',
    item1ShowDescription: true,

    item2Label:          'SMS alerts',
    item2Description:    'Standard rates may apply.',
    item2ShowDescription: true,

    item3Label:          'Push notifications',
    item3Description:    '',
    item3ShowDescription: false,
  },
};
