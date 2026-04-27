import type { Meta, StoryObj } from '@storybook/react';
import {
  Zap, ShieldCheck, Star, ArrowRight, Globe, Lock,
  Layers, Cpu, BarChart2, Sparkles, Rocket, Code2,
  Users, Settings, Database, CloudUpload, Search, Bell,
  PenLine, Palette, Link2, LayoutGrid, Eye, Lightbulb,
  Check, ChevronRight, Dot, Circle, Square, Minus,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { ElegantList } from '@/components/simple/ElegantList';
import type { ElegantListProps } from '@/components/simple/ElegantList';

const iconOptions: Record<string, LucideIcon> = {
  Zap, ShieldCheck, Star, ArrowRight, Globe, Lock,
  Layers, Cpu, BarChart2, Sparkles, Rocket, Code2,
  Users, Settings, Database, CloudUpload, Search, Bell,
  PenLine, Palette, Link2, LayoutGrid, Eye, Lightbulb,
  Check, ChevronRight, Dot, Circle, Square, Minus,
};

type Args = {
  heading: string;
  showHeading: boolean;
  description: string;
  showDescription: boolean;
  columns: 'single' | 'two';
  // item slots — slot 1 always visible
  label1: string; desc1: string; showDesc1: boolean; showIcon1: boolean; icon1: LucideIcon;
  item2Show: boolean; label2: string; desc2: string; showDesc2: boolean; showIcon2: boolean; icon2: LucideIcon;
  item3Show: boolean; label3: string; desc3: string; showDesc3: boolean; showIcon3: boolean; icon3: LucideIcon;
  item4Show: boolean; label4: string; desc4: string; showDesc4: boolean; showIcon4: boolean; icon4: LucideIcon;
  item5Show: boolean; label5: string; desc5: string; showDesc5: boolean; showIcon5: boolean; icon5: LucideIcon;
  item6Show: boolean; label6: string; desc6: string; showDesc6: boolean; showIcon6: boolean; icon6: LucideIcon;
  item7Show: boolean; label7: string; desc7: string; showDesc7: boolean; showIcon7: boolean; icon7: LucideIcon;
};

const meta: Meta<Args> = {
  title: 'Simple/Content/ElegantList',
  tags: ['autodocs'],
  parameters: {
    backgrounds: { disable: true },
  },
  render: (a) => {
    const slots = [
      { show: true,        label: a.label1, description: a.showDesc1 ? a.desc1 : undefined, icon: a.showIcon1 ? a.icon1 : undefined },
      { show: a.item2Show, label: a.label2, description: a.showDesc2 ? a.desc2 : undefined, icon: a.showIcon2 ? a.icon2 : undefined },
      { show: a.item3Show, label: a.label3, description: a.showDesc3 ? a.desc3 : undefined, icon: a.showIcon3 ? a.icon3 : undefined },
      { show: a.item4Show, label: a.label4, description: a.showDesc4 ? a.desc4 : undefined, icon: a.showIcon4 ? a.icon4 : undefined },
      { show: a.item5Show, label: a.label5, description: a.showDesc5 ? a.desc5 : undefined, icon: a.showIcon5 ? a.icon5 : undefined },
      { show: a.item6Show, label: a.label6, description: a.showDesc6 ? a.desc6 : undefined, icon: a.showIcon6 ? a.icon6 : undefined },
      { show: a.item7Show, label: a.label7, description: a.showDesc7 ? a.desc7 : undefined, icon: a.showIcon7 ? a.icon7 : undefined },
    ];
    const visible = slots.filter((s) => s.show).map(({ show: _s, ...rest }) => rest);
    const count = visible.length as ElegantListProps['count'];
    return (
      <ElegantList
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

    // slot visibility
    item2Show: { name: 'Item 2', control: 'boolean', table: { category: 'Items' } },
    item3Show: { name: 'Item 3', control: 'boolean', table: { category: 'Items' } },
    item4Show: { name: 'Item 4', control: 'boolean', table: { category: 'Items' } },
    item5Show: { name: 'Item 5', control: 'boolean', table: { category: 'Items' } },
    item6Show: { name: 'Item 6', control: 'boolean', table: { category: 'Items' } },
    item7Show: { name: 'Item 7', control: 'boolean', table: { category: 'Items' } },

    // item 1
    label1:    { name: 'Label',            control: 'text',    table: { category: 'Item 1' } },
    showDesc1: { name: 'Description',      control: 'boolean', table: { category: 'Item 1' } },
    desc1:     { name: 'Description text', control: 'text',    table: { category: 'Item 1' }, if: { arg: 'showDesc1', truthy: true } },
    showIcon1: { name: 'Icon',             control: 'boolean', table: { category: 'Item 1' } },
    icon1:     { name: 'Icon pick',        options: Object.keys(iconOptions), mapping: iconOptions, control: { type: 'select' }, table: { category: 'Item 1' }, if: { arg: 'showIcon1', truthy: true } },

    // item 2
    label2:    { name: 'Label',            control: 'text',    table: { category: 'Item 2' }, if: { arg: 'item2Show', truthy: true } },
    showDesc2: { name: 'Description',      control: 'boolean', table: { category: 'Item 2' }, if: { arg: 'item2Show', truthy: true } },
    desc2:     { name: 'Description text', control: 'text',    table: { category: 'Item 2' }, if: { arg: 'showDesc2', truthy: true } },
    showIcon2: { name: 'Icon',             control: 'boolean', table: { category: 'Item 2' }, if: { arg: 'item2Show', truthy: true } },
    icon2:     { name: 'Icon pick',        options: Object.keys(iconOptions), mapping: iconOptions, control: { type: 'select' }, table: { category: 'Item 2' }, if: { arg: 'showIcon2', truthy: true } },

    // item 3
    label3:    { name: 'Label',            control: 'text',    table: { category: 'Item 3' }, if: { arg: 'item3Show', truthy: true } },
    showDesc3: { name: 'Description',      control: 'boolean', table: { category: 'Item 3' }, if: { arg: 'item3Show', truthy: true } },
    desc3:     { name: 'Description text', control: 'text',    table: { category: 'Item 3' }, if: { arg: 'showDesc3', truthy: true } },
    showIcon3: { name: 'Icon',             control: 'boolean', table: { category: 'Item 3' }, if: { arg: 'item3Show', truthy: true } },
    icon3:     { name: 'Icon pick',        options: Object.keys(iconOptions), mapping: iconOptions, control: { type: 'select' }, table: { category: 'Item 3' }, if: { arg: 'showIcon3', truthy: true } },

    // item 4
    label4:    { name: 'Label',            control: 'text',    table: { category: 'Item 4' }, if: { arg: 'item4Show', truthy: true } },
    showDesc4: { name: 'Description',      control: 'boolean', table: { category: 'Item 4' }, if: { arg: 'item4Show', truthy: true } },
    desc4:     { name: 'Description text', control: 'text',    table: { category: 'Item 4' }, if: { arg: 'showDesc4', truthy: true } },
    showIcon4: { name: 'Icon',             control: 'boolean', table: { category: 'Item 4' }, if: { arg: 'item4Show', truthy: true } },
    icon4:     { name: 'Icon pick',        options: Object.keys(iconOptions), mapping: iconOptions, control: { type: 'select' }, table: { category: 'Item 4' }, if: { arg: 'showIcon4', truthy: true } },

    // item 5
    label5:    { name: 'Label',            control: 'text',    table: { category: 'Item 5' }, if: { arg: 'item5Show', truthy: true } },
    showDesc5: { name: 'Description',      control: 'boolean', table: { category: 'Item 5' }, if: { arg: 'item5Show', truthy: true } },
    desc5:     { name: 'Description text', control: 'text',    table: { category: 'Item 5' }, if: { arg: 'showDesc5', truthy: true } },
    showIcon5: { name: 'Icon',             control: 'boolean', table: { category: 'Item 5' }, if: { arg: 'item5Show', truthy: true } },
    icon5:     { name: 'Icon pick',        options: Object.keys(iconOptions), mapping: iconOptions, control: { type: 'select' }, table: { category: 'Item 5' }, if: { arg: 'showIcon5', truthy: true } },

    // item 6
    label6:    { name: 'Label',            control: 'text',    table: { category: 'Item 6' }, if: { arg: 'item6Show', truthy: true } },
    showDesc6: { name: 'Description',      control: 'boolean', table: { category: 'Item 6' }, if: { arg: 'item6Show', truthy: true } },
    desc6:     { name: 'Description text', control: 'text',    table: { category: 'Item 6' }, if: { arg: 'showDesc6', truthy: true } },
    showIcon6: { name: 'Icon',             control: 'boolean', table: { category: 'Item 6' }, if: { arg: 'item6Show', truthy: true } },
    icon6:     { name: 'Icon pick',        options: Object.keys(iconOptions), mapping: iconOptions, control: { type: 'select' }, table: { category: 'Item 6' }, if: { arg: 'showIcon6', truthy: true } },

    // item 7
    label7:    { name: 'Label',            control: 'text',    table: { category: 'Item 7' }, if: { arg: 'item7Show', truthy: true } },
    showDesc7: { name: 'Description',      control: 'boolean', table: { category: 'Item 7' }, if: { arg: 'item7Show', truthy: true } },
    desc7:     { name: 'Description text', control: 'text',    table: { category: 'Item 7' }, if: { arg: 'showDesc7', truthy: true } },
    showIcon7: { name: 'Icon',             control: 'boolean', table: { category: 'Item 7' }, if: { arg: 'item7Show', truthy: true } },
    icon7:     { name: 'Icon pick',        options: Object.keys(iconOptions), mapping: iconOptions, control: { type: 'select' }, table: { category: 'Item 7' }, if: { arg: 'showIcon7', truthy: true } },
  },
};

export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {
  args: {
    columns: 'single',
    showHeading: true,  heading: 'What you get',
    showDescription: false, description: 'Supporting description for the list.',
    label1: 'Full source code',   showDesc1: false, desc1: '', showIcon1: true,  icon1: Check,
    item2Show: true,  label2: 'Commercial licence', showDesc2: false, desc2: '', showIcon2: true,  icon2: Check,
    item3Show: true,  label3: 'Lifetime updates',   showDesc3: false, desc3: '', showIcon3: true,  icon3: Check,
    item4Show: false, label4: 'Fourth item',         showDesc4: false, desc4: '', showIcon4: false, icon4: Check,
    item5Show: false, label5: 'Fifth item',          showDesc5: false, desc5: '', showIcon5: false, icon5: Check,
    item6Show: false, label6: 'Sixth item',          showDesc6: false, desc6: '', showIcon6: false, icon6: Check,
    item7Show: false, label7: 'Seventh item',        showDesc7: false, desc7: '', showIcon7: false, icon7: Check,
  },
};
