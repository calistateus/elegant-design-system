import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ElegantCheckboxGroup } from '@/components/simple/forms/ElegantCheckboxGroup';
import type { CheckboxGroupItem } from '@/components/simple/forms/ElegantCheckboxGroup';
import type { CheckboxState } from '@/components/simple/forms/ElegantCheckbox';

type Args = {
  heading: string;
  description: string;
  showDescription: boolean;
  error: string;
  showError: boolean;

  item1Label: string;
  item1Description: string;
  item1ShowDescription: boolean;
  item1State: CheckboxState;

  item2Label: string;
  item2Description: string;
  item2ShowDescription: boolean;
  item2State: CheckboxState;

  item3Label: string;
  item3Description: string;
  item3ShowDescription: boolean;
  item3State: CheckboxState;
};

const meta: Meta<Args> = {
  title: 'Simple/Forms/ElegantCheckboxGroup',
  render: (args) => {
    const [checkStates, setCheckStates] = useState<[CheckboxState, CheckboxState, CheckboxState]>([
      args.item1State,
      args.item2State,
      args.item3State,
    ]);

    const items: CheckboxGroupItem[] = [
      { id: 'item1', label: args.item1Label, description: args.item1ShowDescription ? args.item1Description : false, state: checkStates[0] },
      { id: 'item2', label: args.item2Label, description: args.item2ShowDescription ? args.item2Description : false, state: checkStates[1] },
      { id: 'item3', label: args.item3Label, description: args.item3ShowDescription ? args.item3Description : false, state: checkStates[2] },
    ];

    function handleChange(id: string, next: CheckboxState) {
      setCheckStates((prev) => {
        const idx = ['item1', 'item2', 'item3'].indexOf(id);
        const copy = [...prev] as [CheckboxState, CheckboxState, CheckboxState];
        copy[idx] = next;
        return copy;
      });
    }

    return (
      <ElegantCheckboxGroup
        heading={args.heading}
        description={args.showDescription ? args.description : false}
        items={items}
        onChange={handleChange}
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

    item1Label:          { name: 'label',            control: 'text',   table: { category: 'Item 1' } },
    item1Description:    { name: 'description',      control: 'text',   table: { category: 'Item 1' } },
    item1ShowDescription:{ name: 'show description', control: 'boolean',table: { category: 'Item 1' } },
    item1State:          { name: 'state',            control: { type: 'select' }, options: ['unselected', 'selected', 'indeterminate'], table: { category: 'Item 1' } },

    item2Label:          { name: 'label',            control: 'text',   table: { category: 'Item 2' } },
    item2Description:    { name: 'description',      control: 'text',   table: { category: 'Item 2' } },
    item2ShowDescription:{ name: 'show description', control: 'boolean',table: { category: 'Item 2' } },
    item2State:          { name: 'state',            control: { type: 'select' }, options: ['unselected', 'selected', 'indeterminate'], table: { category: 'Item 2' } },

    item3Label:          { name: 'label',            control: 'text',   table: { category: 'Item 3' } },
    item3Description:    { name: 'description',      control: 'text',   table: { category: 'Item 3' } },
    item3ShowDescription:{ name: 'show description', control: 'boolean',table: { category: 'Item 3' } },
    item3State:          { name: 'state',            control: { type: 'select' }, options: ['unselected', 'selected', 'indeterminate'], table: { category: 'Item 3' } },
  },
};

export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {
  args: {
    heading:         'Notification preferences',
    description:     "Choose how you'd like to hear from us.",
    showDescription: true,
    error:           'Please select at least one option.',
    showError:       false,

    item1Label:          'Email updates',
    item1Description:    'Weekly digest of new content.',
    item1ShowDescription: true,
    item1State:          'selected',

    item2Label:          'SMS alerts',
    item2Description:    'Standard rates may apply.',
    item2ShowDescription: true,
    item2State:          'unselected',

    item3Label:          'Push notifications',
    item3Description:    '',
    item3ShowDescription: false,
    item3State:          'unselected',
  },
};
