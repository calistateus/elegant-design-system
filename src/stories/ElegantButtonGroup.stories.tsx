import type { Meta, StoryObj } from '@storybook/react';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
  ExternalLink,
  Send,
} from 'lucide-react';
import { ElegantButtonGroup } from '../components/simple/ElegantButtonGroup';
import type { ButtonGroupContext } from '../components/simple/ElegantButtonGroup';

const iconOptions: Record<string, LucideIcon | undefined> = {
  none: undefined,
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
  ExternalLink,
  Send,
};

const iconArgType = {
  control: { type: 'select' as const },
  options: Object.keys(iconOptions),
  mapping: iconOptions,
};

const styleArgType = {
  control: { type: 'select' as const },
  options: ['primary', 'secondary'],
};

type StoryArgs = {
  context: ButtonGroupContext;
  count: 2 | 3 | 4 | 5;

  button1Text: string;
  button1Style: 'primary' | 'secondary';
  button1ShowIcon: boolean;
  button1Icon: LucideIcon | undefined;

  button2Text: string;
  button2Style: 'primary' | 'secondary';
  button2ShowIcon: boolean;
  button2Icon: LucideIcon | undefined;

  button3Text: string;
  button3Style: 'primary' | 'secondary';
  button3ShowIcon: boolean;
  button3Icon: LucideIcon | undefined;

  button4Text: string;
  button4Style: 'primary' | 'secondary';
  button4ShowIcon: boolean;
  button4Icon: LucideIcon | undefined;

  button5Text: string;
  button5Style: 'primary' | 'secondary';
  button5ShowIcon: boolean;
  button5Icon: LucideIcon | undefined;
};

const meta: Meta<StoryArgs> = {
  title: 'Simple/Forms/ElegantButtonGroup',
  tags: ['autodocs'],
  argTypes: {
    context: { control: { type: 'select' }, options: ['default', 'menu'] },
    count:   { control: { type: 'select' }, options: [2, 3, 4, 5] },

    button1Text:     { name: 'text',      control: 'text',    table: { category: 'Button 1' } },
    button1Style:    { name: 'style',     ...styleArgType,    table: { category: 'Button 1' } },
    button1ShowIcon: { name: 'show icon', control: 'boolean', table: { category: 'Button 1' } },
    button1Icon:     { name: 'icon',      ...iconArgType,     table: { category: 'Button 1' } },

    button2Text:     { name: 'text',      control: 'text',    table: { category: 'Button 2' } },
    button2Style:    { name: 'style',     ...styleArgType,    table: { category: 'Button 2' } },
    button2ShowIcon: { name: 'show icon', control: 'boolean', table: { category: 'Button 2' } },
    button2Icon:     { name: 'icon',      ...iconArgType,     table: { category: 'Button 2' } },

    button3Text:     { name: 'text',      control: 'text',    table: { category: 'Button 3' } },
    button3Style:    { name: 'style',     ...styleArgType,    table: { category: 'Button 3' } },
    button3ShowIcon: { name: 'show icon', control: 'boolean', table: { category: 'Button 3' } },
    button3Icon:     { name: 'icon',      ...iconArgType,     table: { category: 'Button 3' } },

    button4Text:     { name: 'text',      control: 'text',    table: { category: 'Button 4' } },
    button4Style:    { name: 'style',     ...styleArgType,    table: { category: 'Button 4' } },
    button4ShowIcon: { name: 'show icon', control: 'boolean', table: { category: 'Button 4' } },
    button4Icon:     { name: 'icon',      ...iconArgType,     table: { category: 'Button 4' } },

    button5Text:     { name: 'text',      control: 'text',    table: { category: 'Button 5' } },
    button5Style:    { name: 'style',     ...styleArgType,    table: { category: 'Button 5' } },
    button5ShowIcon: { name: 'show icon', control: 'boolean', table: { category: 'Button 5' } },
    button5Icon:     { name: 'icon',      ...iconArgType,     table: { category: 'Button 5' } },
  },
  parameters: {
    backgrounds: { disable: true },
  },
};

export default meta;
type Story = StoryObj<StoryArgs>;

export const ButtonGroup: Story = {
  args: {
    context: 'default',
    count: 3,

    button1Text: 'Get started',  button1Style: 'primary',   button1ShowIcon: true,  button1Icon: ArrowRight,
    button2Text: 'Browse',       button2Style: 'secondary', button2ShowIcon: true,  button2Icon: ExternalLink,
    button3Text: 'Learn more',   button3Style: 'secondary', button3ShowIcon: false, button3Icon: undefined,
    button4Text: 'Download',     button4Style: 'secondary', button4ShowIcon: true,  button4Icon: ArrowUpRight,
    button5Text: 'Send message', button5Style: 'secondary', button5ShowIcon: true,  button5Icon: Send,
  },
  render: (args) => (
    <ElegantButtonGroup
      context={args.context}
      count={args.count}
      buttons={[
        { text: args.button1Text, style: args.button1Style, showIcon: args.button1ShowIcon, icon: args.button1Icon },
        { text: args.button2Text, style: args.button2Style, showIcon: args.button2ShowIcon, icon: args.button2Icon },
        { text: args.button3Text, style: args.button3Style, showIcon: args.button3ShowIcon, icon: args.button3Icon },
        { text: args.button4Text, style: args.button4Style, showIcon: args.button4ShowIcon, icon: args.button4Icon },
        { text: args.button5Text, style: args.button5Style, showIcon: args.button5ShowIcon, icon: args.button5Icon },
      ]}
    />
  ),
};
