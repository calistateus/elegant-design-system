import type { Meta, StoryObj } from '@storybook/react';
import { ElegantTabs } from '../components/simple/content/ElegantTabs';
import type { TabsStyle } from '../components/simple/content/ElegantTabs';

type StoryArgs = {
  tabStyle: TabsStyle;
  count: 2 | 3 | 4 | 5;

  tab1Label: string;
  tab1Content: string;

  tab2Label: string;
  tab2Content: string;

  tab3Label: string;
  tab3Content: string;

  tab4Label: string;
  tab4Content: string;

  tab5Label: string;
  tab5Content: string;
};

const meta: Meta<StoryArgs> = {
  title: 'Simple/Content/ElegantTabs',
  tags: ['autodocs'],
  argTypes: {
    tabStyle: { control: { type: 'select' }, options: ['underlined', 'contained'] },
    count:    { control: { type: 'select' }, options: [2, 3, 4, 5] },

    tab1Label:   { name: 'label',   control: 'text', table: { category: 'Tab 1' } },
    tab1Content: { name: 'content', control: 'text', table: { category: 'Tab 1' } },

    tab2Label:   { name: 'label',   control: 'text', table: { category: 'Tab 2' } },
    tab2Content: { name: 'content', control: 'text', table: { category: 'Tab 2' } },

    tab3Label:   { name: 'label',   control: 'text', table: { category: 'Tab 3' } },
    tab3Content: { name: 'content', control: 'text', table: { category: 'Tab 3' } },

    tab4Label:   { name: 'label',   control: 'text', table: { category: 'Tab 4' } },
    tab4Content: { name: 'content', control: 'text', table: { category: 'Tab 4' } },

    tab5Label:   { name: 'label',   control: 'text', table: { category: 'Tab 5' } },
    tab5Content: { name: 'content', control: 'text', table: { category: 'Tab 5' } },
  },
  parameters: {
    backgrounds: { disable: true },
  },
};

export default meta;
type Story = StoryObj<StoryArgs>;

export const Tabs: Story = {
  args: {
    tabStyle: 'contained',
    count: 5,

    tab1Label:   'Overview',
    tab1Content: 'This is the overview panel. It contains a summary of the key information.',

    tab2Label:   'Details',
    tab2Content: 'Detailed information lives here. You can go as deep as you need.',

    tab3Label:   'Settings',
    tab3Content: 'Adjust your preferences and configuration options in this panel.',

    tab4Label:   'Activity',
    tab4Content: 'A log of recent activity and events related to this item.',

    tab5Label:   'Archive',
    tab5Content: 'Archived items are stored here. Nothing here is active or visible to others.',
  },
  render: (args) => (
    <div style={{ width: 480 }}>
      <ElegantTabs
        tabStyle={args.tabStyle}
        count={args.count}
        tabs={[
          { label: args.tab1Label, content: args.tab1Content },
          { label: args.tab2Label, content: args.tab2Content },
          { label: args.tab3Label, content: args.tab3Content },
          { label: args.tab4Label, content: args.tab4Content },
          { label: args.tab5Label, content: args.tab5Content },
        ]}
      />
    </div>
  ),
};
