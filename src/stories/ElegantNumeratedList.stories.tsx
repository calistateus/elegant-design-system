import type { Meta, StoryObj } from '@storybook/react';
import { ElegantNumeratedList } from '@/components/simple/ElegantNumeratedList';
import type { ElegantNumeratedListProps } from '@/components/simple/ElegantNumeratedList';

type Args = {
  heading: string;
  showHeading: boolean;
  description: string;
  showDescription: boolean;
  columns: 'single' | 'two';
  label1: string; desc1: string; showDesc1: boolean;
  item2Show: boolean; label2: string; desc2: string; showDesc2: boolean;
  item3Show: boolean; label3: string; desc3: string; showDesc3: boolean;
  item4Show: boolean; label4: string; desc4: string; showDesc4: boolean;
  item5Show: boolean; label5: string; desc5: string; showDesc5: boolean;
  item6Show: boolean; label6: string; desc6: string; showDesc6: boolean;
  item7Show: boolean; label7: string; desc7: string; showDesc7: boolean;
};

const meta: Meta<Args> = {
  title: 'Simple/Content/ElegantNumeratedList',
  tags: ['autodocs'],
  parameters: {
    backgrounds: { disable: true },
  },
  render: (a) => {
    const slots = [
      { show: true,        label: a.label1, description: a.showDesc1 ? a.desc1 : undefined },
      { show: a.item2Show, label: a.label2, description: a.showDesc2 ? a.desc2 : undefined },
      { show: a.item3Show, label: a.label3, description: a.showDesc3 ? a.desc3 : undefined },
      { show: a.item4Show, label: a.label4, description: a.showDesc4 ? a.desc4 : undefined },
      { show: a.item5Show, label: a.label5, description: a.showDesc5 ? a.desc5 : undefined },
      { show: a.item6Show, label: a.label6, description: a.showDesc6 ? a.desc6 : undefined },
      { show: a.item7Show, label: a.label7, description: a.showDesc7 ? a.desc7 : undefined },
    ];
    const visible = slots.filter((s) => s.show).map(({ show: _s, ...rest }) => rest);
    const count = visible.length as ElegantNumeratedListProps['count'];
    return (
      <ElegantNumeratedList
        count={count}
        items={visible}
        heading={a.showHeading ? a.heading : undefined}
        description={a.showDescription ? a.description : undefined}
        columns={a.columns}
      />
    );
  },
  argTypes: {
    columns:         { options: ['single', 'two'], control: { type: 'select' } },
    heading:         { control: 'text' },
    showHeading:     { control: 'boolean' },
    description:     { control: 'text' },
    showDescription: { control: 'boolean' },

    item2Show: { name: 'Item 2', control: 'boolean', table: { category: 'Items' } },
    item3Show: { name: 'Item 3', control: 'boolean', table: { category: 'Items' } },
    item4Show: { name: 'Item 4', control: 'boolean', table: { category: 'Items' } },
    item5Show: { name: 'Item 5', control: 'boolean', table: { category: 'Items' } },
    item6Show: { name: 'Item 6', control: 'boolean', table: { category: 'Items' } },
    item7Show: { name: 'Item 7', control: 'boolean', table: { category: 'Items' } },

    label1:    { name: 'Label',            control: 'text',    table: { category: 'Item 1' } },
    showDesc1: { name: 'Description',      control: 'boolean', table: { category: 'Item 1' } },
    desc1:     { name: 'Description text', control: 'text',    table: { category: 'Item 1' }, if: { arg: 'showDesc1', truthy: true } },

    label2:    { name: 'Label',            control: 'text',    table: { category: 'Item 2' }, if: { arg: 'item2Show', truthy: true } },
    showDesc2: { name: 'Description',      control: 'boolean', table: { category: 'Item 2' }, if: { arg: 'item2Show', truthy: true } },
    desc2:     { name: 'Description text', control: 'text',    table: { category: 'Item 2' }, if: { arg: 'showDesc2', truthy: true } },

    label3:    { name: 'Label',            control: 'text',    table: { category: 'Item 3' }, if: { arg: 'item3Show', truthy: true } },
    showDesc3: { name: 'Description',      control: 'boolean', table: { category: 'Item 3' }, if: { arg: 'item3Show', truthy: true } },
    desc3:     { name: 'Description text', control: 'text',    table: { category: 'Item 3' }, if: { arg: 'showDesc3', truthy: true } },

    label4:    { name: 'Label',            control: 'text',    table: { category: 'Item 4' }, if: { arg: 'item4Show', truthy: true } },
    showDesc4: { name: 'Description',      control: 'boolean', table: { category: 'Item 4' }, if: { arg: 'item4Show', truthy: true } },
    desc4:     { name: 'Description text', control: 'text',    table: { category: 'Item 4' }, if: { arg: 'showDesc4', truthy: true } },

    label5:    { name: 'Label',            control: 'text',    table: { category: 'Item 5' }, if: { arg: 'item5Show', truthy: true } },
    showDesc5: { name: 'Description',      control: 'boolean', table: { category: 'Item 5' }, if: { arg: 'item5Show', truthy: true } },
    desc5:     { name: 'Description text', control: 'text',    table: { category: 'Item 5' }, if: { arg: 'showDesc5', truthy: true } },

    label6:    { name: 'Label',            control: 'text',    table: { category: 'Item 6' }, if: { arg: 'item6Show', truthy: true } },
    showDesc6: { name: 'Description',      control: 'boolean', table: { category: 'Item 6' }, if: { arg: 'item6Show', truthy: true } },
    desc6:     { name: 'Description text', control: 'text',    table: { category: 'Item 6' }, if: { arg: 'showDesc6', truthy: true } },

    label7:    { name: 'Label',            control: 'text',    table: { category: 'Item 7' }, if: { arg: 'item7Show', truthy: true } },
    showDesc7: { name: 'Description',      control: 'boolean', table: { category: 'Item 7' }, if: { arg: 'item7Show', truthy: true } },
    desc7:     { name: 'Description text', control: 'text',    table: { category: 'Item 7' }, if: { arg: 'showDesc7', truthy: true } },
  },
};

export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {
  args: {
    columns: 'single',
    showHeading: true,
    heading: 'Key contributions',
    showDescription: true,
    description: 'Key contributions across the engagement.',
    label1: 'Discovery & research planning', showDesc1: true,  desc1: 'Stakeholder interviews, heuristic audits, and competitive analysis.',
    item2Show: true,  label2: 'Information architecture', showDesc2: true,  desc2: 'Card sorting, tree testing, and IA redesign across four product areas.',
    item3Show: true,  label3: 'Prototype testing',        showDesc3: true,  desc3: 'Moderated sessions with 12 participants across two rounds.',
    item4Show: false, label4: 'Fourth item',              showDesc4: false, desc4: '',
    item5Show: false, label5: 'Fifth item',               showDesc5: false, desc5: '',
    item6Show: false, label6: 'Sixth item',               showDesc6: false, desc6: '',
    item7Show: false, label7: 'Seventh item',             showDesc7: false, desc7: '',
  },
};
