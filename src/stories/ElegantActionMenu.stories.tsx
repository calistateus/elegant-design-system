import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ElegantActionMenu } from '../components/simple/ElegantActionMenu';
import type { ActionMenuItem, SubMenuItem } from '../components/simple/ElegantActionMenu';

// ─── Icon options ─────────────────────────────────────────────────────────────

const ICON_OPTIONS = [
  'MoreVertical', 'MoreHorizontal', 'Pencil', 'Copy', 'Archive', 'Trash2',
  'Settings', 'LogOut', 'FolderPlus', 'Folder', 'Upload', 'Star',
  'Bookmark', 'Bell', 'Search', 'Link', 'Lock', 'Globe', 'Eye',
  'Plus', 'Minus', 'Check', 'X', 'ChevronDown', 'ExternalLink',
];

// ─── Flat Args ────────────────────────────────────────────────────────────────

type Args = {
  // Trigger
  triggerIcon:     boolean;
  triggerIconName: string;
  triggerLabel:    boolean;
  label:           string;

  // Item slot visibility (item 1 always shown)
  item2Show: boolean;
  item3Show: boolean;
  item4Show: boolean;
  item5Show: boolean;
  item6Show: boolean;
  item7Show: boolean;

  // Item slots (1–7) — each has: label, showIcon, icon, danger, hasSub
  item1Label: string; item1ShowIcon: boolean; item1Icon: string; item1Danger: boolean; item1HasSub: boolean;
  item2Label: string; item2ShowIcon: boolean; item2Icon: string; item2Danger: boolean; item2HasSub: boolean;
  item3Label: string; item3ShowIcon: boolean; item3Icon: string; item3Danger: boolean; item3HasSub: boolean;
  item4Label: string; item4ShowIcon: boolean; item4Icon: string; item4Danger: boolean; item4HasSub: boolean;
  item5Label: string; item5ShowIcon: boolean; item5Icon: string; item5Danger: boolean; item5HasSub: boolean;
  item6Label: string; item6ShowIcon: boolean; item6Icon: string; item6Danger: boolean; item6HasSub: boolean;
  item7Label: string; item7ShowIcon: boolean; item7Icon: string; item7Danger: boolean; item7HasSub: boolean;

  // Sub-menu slots (1–7, up to 4 sub-items each)
  item1SubCount: number;
  item1Sub1Label: string; item1Sub1Danger: boolean;
  item1Sub2Label: string; item1Sub2Danger: boolean;
  item1Sub3Label: string; item1Sub3Danger: boolean;
  item1Sub4Label: string; item1Sub4Danger: boolean;

  item2SubCount: number;
  item2Sub1Label: string; item2Sub1Danger: boolean;
  item2Sub2Label: string; item2Sub2Danger: boolean;
  item2Sub3Label: string; item2Sub3Danger: boolean;
  item2Sub4Label: string; item2Sub4Danger: boolean;

  item3SubCount: number;
  item3Sub1Label: string; item3Sub1Danger: boolean;
  item3Sub2Label: string; item3Sub2Danger: boolean;
  item3Sub3Label: string; item3Sub3Danger: boolean;
  item3Sub4Label: string; item3Sub4Danger: boolean;

  item4SubCount: number;
  item4Sub1Label: string; item4Sub1Danger: boolean;
  item4Sub2Label: string; item4Sub2Danger: boolean;
  item4Sub3Label: string; item4Sub3Danger: boolean;
  item4Sub4Label: string; item4Sub4Danger: boolean;

  item5SubCount: number;
  item5Sub1Label: string; item5Sub1Danger: boolean;
  item5Sub2Label: string; item5Sub2Danger: boolean;
  item5Sub3Label: string; item5Sub3Danger: boolean;
  item5Sub4Label: string; item5Sub4Danger: boolean;

  item6SubCount: number;
  item6Sub1Label: string; item6Sub1Danger: boolean;
  item6Sub2Label: string; item6Sub2Danger: boolean;
  item6Sub3Label: string; item6Sub3Danger: boolean;
  item6Sub4Label: string; item6Sub4Danger: boolean;

  item7SubCount: number;
  item7Sub1Label: string; item7Sub1Danger: boolean;
  item7Sub2Label: string; item7Sub2Danger: boolean;
  item7Sub3Label: string; item7Sub3Danger: boolean;
  item7Sub4Label: string; item7Sub4Danger: boolean;
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function buildSubItems(
  hasSub: boolean,
  count: number,
  labels: string[],
  dangers: boolean[],
): SubMenuItem[] | undefined {
  if (!hasSub || count === 0) return undefined;
  return labels.slice(0, count).map((label, i) => ({
    label,
    danger: dangers[i] ?? false,
    onSelect: () => {},
  }));
}

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<Args> = {
  title: 'Simple/Navigation/ElegantActionMenu',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    backgrounds: { disable: true },
  },

  render: (a) => {
    const slots = [
      { show: true,        label: a.item1Label, showIcon: a.item1ShowIcon, icon: a.item1Icon, danger: a.item1Danger,
        hasSub: a.item1HasSub, subCount: a.item1SubCount,
        subLabels:  [a.item1Sub1Label, a.item1Sub2Label, a.item1Sub3Label, a.item1Sub4Label],
        subDangers: [a.item1Sub1Danger, a.item1Sub2Danger, a.item1Sub3Danger, a.item1Sub4Danger] },
      { show: a.item2Show, label: a.item2Label, showIcon: a.item2ShowIcon, icon: a.item2Icon, danger: a.item2Danger,
        hasSub: a.item2HasSub, subCount: a.item2SubCount,
        subLabels:  [a.item2Sub1Label, a.item2Sub2Label, a.item2Sub3Label, a.item2Sub4Label],
        subDangers: [a.item2Sub1Danger, a.item2Sub2Danger, a.item2Sub3Danger, a.item2Sub4Danger] },
      { show: a.item3Show, label: a.item3Label, showIcon: a.item3ShowIcon, icon: a.item3Icon, danger: a.item3Danger,
        hasSub: a.item3HasSub, subCount: a.item3SubCount,
        subLabels:  [a.item3Sub1Label, a.item3Sub2Label, a.item3Sub3Label, a.item3Sub4Label],
        subDangers: [a.item3Sub1Danger, a.item3Sub2Danger, a.item3Sub3Danger, a.item3Sub4Danger] },
      { show: a.item4Show, label: a.item4Label, showIcon: a.item4ShowIcon, icon: a.item4Icon, danger: a.item4Danger,
        hasSub: a.item4HasSub, subCount: a.item4SubCount,
        subLabels:  [a.item4Sub1Label, a.item4Sub2Label, a.item4Sub3Label, a.item4Sub4Label],
        subDangers: [a.item4Sub1Danger, a.item4Sub2Danger, a.item4Sub3Danger, a.item4Sub4Danger] },
      { show: a.item5Show, label: a.item5Label, showIcon: a.item5ShowIcon, icon: a.item5Icon, danger: a.item5Danger,
        hasSub: a.item5HasSub, subCount: a.item5SubCount,
        subLabels:  [a.item5Sub1Label, a.item5Sub2Label, a.item5Sub3Label, a.item5Sub4Label],
        subDangers: [a.item5Sub1Danger, a.item5Sub2Danger, a.item5Sub3Danger, a.item5Sub4Danger] },
      { show: a.item6Show, label: a.item6Label, showIcon: a.item6ShowIcon, icon: a.item6Icon, danger: a.item6Danger,
        hasSub: a.item6HasSub, subCount: a.item6SubCount,
        subLabels:  [a.item6Sub1Label, a.item6Sub2Label, a.item6Sub3Label, a.item6Sub4Label],
        subDangers: [a.item6Sub1Danger, a.item6Sub2Danger, a.item6Sub3Danger, a.item6Sub4Danger] },
      { show: a.item7Show, label: a.item7Label, showIcon: a.item7ShowIcon, icon: a.item7Icon, danger: a.item7Danger,
        hasSub: a.item7HasSub, subCount: a.item7SubCount,
        subLabels:  [a.item7Sub1Label, a.item7Sub2Label, a.item7Sub3Label, a.item7Sub4Label],
        subDangers: [a.item7Sub1Danger, a.item7Sub2Danger, a.item7Sub3Danger, a.item7Sub4Danger] },
    ];

    const items: ActionMenuItem[] = slots.filter(s => s.show).map(s => ({
      label:    s.label,
      icon:     s.showIcon,
      iconName: s.showIcon ? s.icon : undefined,
      variant:  s.danger ? 'danger' : 'default',
      onSelect: () => {},
      subItems: buildSubItems(s.hasSub, s.subCount, s.subLabels, s.subDangers),
    }));

    const useIcon  = a.triggerIcon || (!a.triggerIcon && !a.triggerLabel);
    const useLabel = a.triggerLabel && a.label.trim().length > 0;
    const iconName = a.triggerIconName || undefined;

    if (useIcon && useLabel) return <ElegantActionMenu icon triggerIconName={iconName} label={a.label} items={items} />;
    if (useLabel)            return <ElegantActionMenu label={a.label} items={items} />;
    return                          <ElegantActionMenu icon triggerIconName={iconName} items={items} />;
  },

  argTypes: {
    // ── Trigger ───────────────────────────────────────────────────────────────
    triggerIcon:     { name: 'Show icon',   control: 'boolean',                                       table: { category: 'Trigger' } },
    triggerIconName: { name: 'Icon',        control: { type: 'select' }, options: ICON_OPTIONS,       table: { category: 'Trigger' } },
    triggerLabel:    { name: 'Show label',  control: 'boolean',                                       table: { category: 'Trigger' } },
    label:           { name: 'Label text',  control: 'text',                                          table: { category: 'Trigger' } },

    // ── Item slot toggles ─────────────────────────────────────────────────────
    item2Show: { name: 'Item 2', control: 'boolean', table: { category: 'Items' } },
    item3Show: { name: 'Item 3', control: 'boolean', table: { category: 'Items' } },
    item4Show: { name: 'Item 4', control: 'boolean', table: { category: 'Items' } },
    item5Show: { name: 'Item 5', control: 'boolean', table: { category: 'Items' } },
    item6Show: { name: 'Item 6', control: 'boolean', table: { category: 'Items' } },
    item7Show: { name: 'Item 7', control: 'boolean', table: { category: 'Items' } },

    // ── Item 1 (always visible) ───────────────────────────────────────────────
    item1Label:    { name: 'Label',     control: 'text',                                        table: { category: 'Item 1' } },
    item1ShowIcon: { name: 'Icon',      control: 'boolean',                                     table: { category: 'Item 1' } },
    item1Icon:     { name: 'Icon name', control: { type: 'select' }, options: ICON_OPTIONS,     table: { category: 'Item 1' }, if: { arg: 'item1ShowIcon', truthy: true } },
    item1Danger:   { name: 'Danger',    control: 'boolean',                                     table: { category: 'Item 1' } },
    item1HasSub:   { name: 'Sub-menu',  control: 'boolean',                                     table: { category: 'Item 1' } },

    // Item 1 sub
    item1SubCount:   { name: '# sub-items', control: { type: 'range', min: 1, max: 4, step: 1 }, table: { category: 'Item 1 — Sub' }, if: { arg: 'item1HasSub', truthy: true } },
    item1Sub1Label:  { name: 'Sub 1 label', control: 'text',    table: { category: 'Item 1 — Sub' }, if: { arg: 'item1HasSub', truthy: true } },
    item1Sub1Danger: { name: 'Sub 1 danger',control: 'boolean', table: { category: 'Item 1 — Sub' }, if: { arg: 'item1HasSub', truthy: true } },
    item1Sub2Label:  { name: 'Sub 2 label', control: 'text',    table: { category: 'Item 1 — Sub' }, if: { arg: 'item1HasSub', truthy: true } },
    item1Sub2Danger: { name: 'Sub 2 danger',control: 'boolean', table: { category: 'Item 1 — Sub' }, if: { arg: 'item1HasSub', truthy: true } },
    item1Sub3Label:  { name: 'Sub 3 label', control: 'text',    table: { category: 'Item 1 — Sub' }, if: { arg: 'item1HasSub', truthy: true } },
    item1Sub3Danger: { name: 'Sub 3 danger',control: 'boolean', table: { category: 'Item 1 — Sub' }, if: { arg: 'item1HasSub', truthy: true } },
    item1Sub4Label:  { name: 'Sub 4 label', control: 'text',    table: { category: 'Item 1 — Sub' }, if: { arg: 'item1HasSub', truthy: true } },
    item1Sub4Danger: { name: 'Sub 4 danger',control: 'boolean', table: { category: 'Item 1 — Sub' }, if: { arg: 'item1HasSub', truthy: true } },

    // ── Item 2 ────────────────────────────────────────────────────────────────
    item2Label:    { name: 'Label',     control: 'text',                                    table: { category: 'Item 2' }, if: { arg: 'item2Show', truthy: true } },
    item2ShowIcon: { name: 'Icon',      control: 'boolean',                                 table: { category: 'Item 2' }, if: { arg: 'item2Show', truthy: true } },
    item2Icon:     { name: 'Icon name', control: { type: 'select' }, options: ICON_OPTIONS, table: { category: 'Item 2' }, if: { arg: 'item2Show', truthy: true } },
    item2Danger:   { name: 'Danger',    control: 'boolean',                                 table: { category: 'Item 2' }, if: { arg: 'item2Show', truthy: true } },
    item2HasSub:   { name: 'Sub-menu',  control: 'boolean',                                 table: { category: 'Item 2' }, if: { arg: 'item2Show', truthy: true } },

    item2SubCount:   { name: '# sub-items', control: { type: 'range', min: 1, max: 4, step: 1 }, table: { category: 'Item 2 — Sub' }, if: { arg: 'item2HasSub', truthy: true } },
    item2Sub1Label:  { name: 'Sub 1 label', control: 'text',    table: { category: 'Item 2 — Sub' }, if: { arg: 'item2HasSub', truthy: true } },
    item2Sub1Danger: { name: 'Sub 1 danger',control: 'boolean', table: { category: 'Item 2 — Sub' }, if: { arg: 'item2HasSub', truthy: true } },
    item2Sub2Label:  { name: 'Sub 2 label', control: 'text',    table: { category: 'Item 2 — Sub' }, if: { arg: 'item2HasSub', truthy: true } },
    item2Sub2Danger: { name: 'Sub 2 danger',control: 'boolean', table: { category: 'Item 2 — Sub' }, if: { arg: 'item2HasSub', truthy: true } },
    item2Sub3Label:  { name: 'Sub 3 label', control: 'text',    table: { category: 'Item 2 — Sub' }, if: { arg: 'item2HasSub', truthy: true } },
    item2Sub3Danger: { name: 'Sub 3 danger',control: 'boolean', table: { category: 'Item 2 — Sub' }, if: { arg: 'item2HasSub', truthy: true } },
    item2Sub4Label:  { name: 'Sub 4 label', control: 'text',    table: { category: 'Item 2 — Sub' }, if: { arg: 'item2HasSub', truthy: true } },
    item2Sub4Danger: { name: 'Sub 4 danger',control: 'boolean', table: { category: 'Item 2 — Sub' }, if: { arg: 'item2HasSub', truthy: true } },

    // ── Item 3 ────────────────────────────────────────────────────────────────
    item3Label:    { name: 'Label',     control: 'text',                                    table: { category: 'Item 3' }, if: { arg: 'item3Show', truthy: true } },
    item3ShowIcon: { name: 'Icon',      control: 'boolean',                                 table: { category: 'Item 3' }, if: { arg: 'item3Show', truthy: true } },
    item3Icon:     { name: 'Icon name', control: { type: 'select' }, options: ICON_OPTIONS, table: { category: 'Item 3' }, if: { arg: 'item3Show', truthy: true } },
    item3Danger:   { name: 'Danger',    control: 'boolean',                                 table: { category: 'Item 3' }, if: { arg: 'item3Show', truthy: true } },
    item3HasSub:   { name: 'Sub-menu',  control: 'boolean',                                 table: { category: 'Item 3' }, if: { arg: 'item3Show', truthy: true } },

    item3SubCount:   { name: '# sub-items', control: { type: 'range', min: 1, max: 4, step: 1 }, table: { category: 'Item 3 — Sub' }, if: { arg: 'item3HasSub', truthy: true } },
    item3Sub1Label:  { name: 'Sub 1 label', control: 'text',    table: { category: 'Item 3 — Sub' }, if: { arg: 'item3HasSub', truthy: true } },
    item3Sub1Danger: { name: 'Sub 1 danger',control: 'boolean', table: { category: 'Item 3 — Sub' }, if: { arg: 'item3HasSub', truthy: true } },
    item3Sub2Label:  { name: 'Sub 2 label', control: 'text',    table: { category: 'Item 3 — Sub' }, if: { arg: 'item3HasSub', truthy: true } },
    item3Sub2Danger: { name: 'Sub 2 danger',control: 'boolean', table: { category: 'Item 3 — Sub' }, if: { arg: 'item3HasSub', truthy: true } },
    item3Sub3Label:  { name: 'Sub 3 label', control: 'text',    table: { category: 'Item 3 — Sub' }, if: { arg: 'item3HasSub', truthy: true } },
    item3Sub3Danger: { name: 'Sub 3 danger',control: 'boolean', table: { category: 'Item 3 — Sub' }, if: { arg: 'item3HasSub', truthy: true } },
    item3Sub4Label:  { name: 'Sub 4 label', control: 'text',    table: { category: 'Item 3 — Sub' }, if: { arg: 'item3HasSub', truthy: true } },
    item3Sub4Danger: { name: 'Sub 4 danger',control: 'boolean', table: { category: 'Item 3 — Sub' }, if: { arg: 'item3HasSub', truthy: true } },

    // ── Item 4 ────────────────────────────────────────────────────────────────
    item4Label:    { name: 'Label',     control: 'text',                                    table: { category: 'Item 4' }, if: { arg: 'item4Show', truthy: true } },
    item4ShowIcon: { name: 'Icon',      control: 'boolean',                                 table: { category: 'Item 4' }, if: { arg: 'item4Show', truthy: true } },
    item4Icon:     { name: 'Icon name', control: { type: 'select' }, options: ICON_OPTIONS, table: { category: 'Item 4' }, if: { arg: 'item4Show', truthy: true } },
    item4Danger:   { name: 'Danger',    control: 'boolean',                                 table: { category: 'Item 4' }, if: { arg: 'item4Show', truthy: true } },
    item4HasSub:   { name: 'Sub-menu',  control: 'boolean',                                 table: { category: 'Item 4' }, if: { arg: 'item4Show', truthy: true } },

    item4SubCount:   { name: '# sub-items', control: { type: 'range', min: 1, max: 4, step: 1 }, table: { category: 'Item 4 — Sub' }, if: { arg: 'item4HasSub', truthy: true } },
    item4Sub1Label:  { name: 'Sub 1 label', control: 'text',    table: { category: 'Item 4 — Sub' }, if: { arg: 'item4HasSub', truthy: true } },
    item4Sub1Danger: { name: 'Sub 1 danger',control: 'boolean', table: { category: 'Item 4 — Sub' }, if: { arg: 'item4HasSub', truthy: true } },
    item4Sub2Label:  { name: 'Sub 2 label', control: 'text',    table: { category: 'Item 4 — Sub' }, if: { arg: 'item4HasSub', truthy: true } },
    item4Sub2Danger: { name: 'Sub 2 danger',control: 'boolean', table: { category: 'Item 4 — Sub' }, if: { arg: 'item4HasSub', truthy: true } },
    item4Sub3Label:  { name: 'Sub 3 label', control: 'text',    table: { category: 'Item 4 — Sub' }, if: { arg: 'item4HasSub', truthy: true } },
    item4Sub3Danger: { name: 'Sub 3 danger',control: 'boolean', table: { category: 'Item 4 — Sub' }, if: { arg: 'item4HasSub', truthy: true } },
    item4Sub4Label:  { name: 'Sub 4 label', control: 'text',    table: { category: 'Item 4 — Sub' }, if: { arg: 'item4HasSub', truthy: true } },
    item4Sub4Danger: { name: 'Sub 4 danger',control: 'boolean', table: { category: 'Item 4 — Sub' }, if: { arg: 'item4HasSub', truthy: true } },

    // ── Item 5 ────────────────────────────────────────────────────────────────
    item5Label:    { name: 'Label',     control: 'text',                                    table: { category: 'Item 5' }, if: { arg: 'item5Show', truthy: true } },
    item5ShowIcon: { name: 'Icon',      control: 'boolean',                                 table: { category: 'Item 5' }, if: { arg: 'item5Show', truthy: true } },
    item5Icon:     { name: 'Icon name', control: { type: 'select' }, options: ICON_OPTIONS, table: { category: 'Item 5' }, if: { arg: 'item5Show', truthy: true } },
    item5Danger:   { name: 'Danger',    control: 'boolean',                                 table: { category: 'Item 5' }, if: { arg: 'item5Show', truthy: true } },
    item5HasSub:   { name: 'Sub-menu',  control: 'boolean',                                 table: { category: 'Item 5' }, if: { arg: 'item5Show', truthy: true } },

    item5SubCount:   { name: '# sub-items', control: { type: 'range', min: 1, max: 4, step: 1 }, table: { category: 'Item 5 — Sub' }, if: { arg: 'item5HasSub', truthy: true } },
    item5Sub1Label:  { name: 'Sub 1 label', control: 'text',    table: { category: 'Item 5 — Sub' }, if: { arg: 'item5HasSub', truthy: true } },
    item5Sub1Danger: { name: 'Sub 1 danger',control: 'boolean', table: { category: 'Item 5 — Sub' }, if: { arg: 'item5HasSub', truthy: true } },
    item5Sub2Label:  { name: 'Sub 2 label', control: 'text',    table: { category: 'Item 5 — Sub' }, if: { arg: 'item5HasSub', truthy: true } },
    item5Sub2Danger: { name: 'Sub 2 danger',control: 'boolean', table: { category: 'Item 5 — Sub' }, if: { arg: 'item5HasSub', truthy: true } },
    item5Sub3Label:  { name: 'Sub 3 label', control: 'text',    table: { category: 'Item 5 — Sub' }, if: { arg: 'item5HasSub', truthy: true } },
    item5Sub3Danger: { name: 'Sub 3 danger',control: 'boolean', table: { category: 'Item 5 — Sub' }, if: { arg: 'item5HasSub', truthy: true } },
    item5Sub4Label:  { name: 'Sub 4 label', control: 'text',    table: { category: 'Item 5 — Sub' }, if: { arg: 'item5HasSub', truthy: true } },
    item5Sub4Danger: { name: 'Sub 4 danger',control: 'boolean', table: { category: 'Item 5 — Sub' }, if: { arg: 'item5HasSub', truthy: true } },

    // ── Item 6 ────────────────────────────────────────────────────────────────
    item6Label:    { name: 'Label',     control: 'text',                                    table: { category: 'Item 6' }, if: { arg: 'item6Show', truthy: true } },
    item6ShowIcon: { name: 'Icon',      control: 'boolean',                                 table: { category: 'Item 6' }, if: { arg: 'item6Show', truthy: true } },
    item6Icon:     { name: 'Icon name', control: { type: 'select' }, options: ICON_OPTIONS, table: { category: 'Item 6' }, if: { arg: 'item6Show', truthy: true } },
    item6Danger:   { name: 'Danger',    control: 'boolean',                                 table: { category: 'Item 6' }, if: { arg: 'item6Show', truthy: true } },
    item6HasSub:   { name: 'Sub-menu',  control: 'boolean',                                 table: { category: 'Item 6' }, if: { arg: 'item6Show', truthy: true } },

    item6SubCount:   { name: '# sub-items', control: { type: 'range', min: 1, max: 4, step: 1 }, table: { category: 'Item 6 — Sub' }, if: { arg: 'item6HasSub', truthy: true } },
    item6Sub1Label:  { name: 'Sub 1 label', control: 'text',    table: { category: 'Item 6 — Sub' }, if: { arg: 'item6HasSub', truthy: true } },
    item6Sub1Danger: { name: 'Sub 1 danger',control: 'boolean', table: { category: 'Item 6 — Sub' }, if: { arg: 'item6HasSub', truthy: true } },
    item6Sub2Label:  { name: 'Sub 2 label', control: 'text',    table: { category: 'Item 6 — Sub' }, if: { arg: 'item6HasSub', truthy: true } },
    item6Sub2Danger: { name: 'Sub 2 danger',control: 'boolean', table: { category: 'Item 6 — Sub' }, if: { arg: 'item6HasSub', truthy: true } },
    item6Sub3Label:  { name: 'Sub 3 label', control: 'text',    table: { category: 'Item 6 — Sub' }, if: { arg: 'item6HasSub', truthy: true } },
    item6Sub3Danger: { name: 'Sub 3 danger',control: 'boolean', table: { category: 'Item 6 — Sub' }, if: { arg: 'item6HasSub', truthy: true } },
    item6Sub4Label:  { name: 'Sub 4 label', control: 'text',    table: { category: 'Item 6 — Sub' }, if: { arg: 'item6HasSub', truthy: true } },
    item6Sub4Danger: { name: 'Sub 4 danger',control: 'boolean', table: { category: 'Item 6 — Sub' }, if: { arg: 'item6HasSub', truthy: true } },

    // ── Item 7 ────────────────────────────────────────────────────────────────
    item7Label:    { name: 'Label',     control: 'text',                                    table: { category: 'Item 7' }, if: { arg: 'item7Show', truthy: true } },
    item7ShowIcon: { name: 'Icon',      control: 'boolean',                                 table: { category: 'Item 7' }, if: { arg: 'item7Show', truthy: true } },
    item7Icon:     { name: 'Icon name', control: { type: 'select' }, options: ICON_OPTIONS, table: { category: 'Item 7' }, if: { arg: 'item7Show', truthy: true } },
    item7Danger:   { name: 'Danger',    control: 'boolean',                                 table: { category: 'Item 7' }, if: { arg: 'item7Show', truthy: true } },
    item7HasSub:   { name: 'Sub-menu',  control: 'boolean',                                 table: { category: 'Item 7' }, if: { arg: 'item7Show', truthy: true } },

    item7SubCount:   { name: '# sub-items', control: { type: 'range', min: 1, max: 4, step: 1 }, table: { category: 'Item 7 — Sub' }, if: { arg: 'item7HasSub', truthy: true } },
    item7Sub1Label:  { name: 'Sub 1 label', control: 'text',    table: { category: 'Item 7 — Sub' }, if: { arg: 'item7HasSub', truthy: true } },
    item7Sub1Danger: { name: 'Sub 1 danger',control: 'boolean', table: { category: 'Item 7 — Sub' }, if: { arg: 'item7HasSub', truthy: true } },
    item7Sub2Label:  { name: 'Sub 2 label', control: 'text',    table: { category: 'Item 7 — Sub' }, if: { arg: 'item7HasSub', truthy: true } },
    item7Sub2Danger: { name: 'Sub 2 danger',control: 'boolean', table: { category: 'Item 7 — Sub' }, if: { arg: 'item7HasSub', truthy: true } },
    item7Sub3Label:  { name: 'Sub 3 label', control: 'text',    table: { category: 'Item 7 — Sub' }, if: { arg: 'item7HasSub', truthy: true } },
    item7Sub3Danger: { name: 'Sub 3 danger',control: 'boolean', table: { category: 'Item 7 — Sub' }, if: { arg: 'item7HasSub', truthy: true } },
    item7Sub4Label:  { name: 'Sub 4 label', control: 'text',    table: { category: 'Item 7 — Sub' }, if: { arg: 'item7HasSub', truthy: true } },
    item7Sub4Danger: { name: 'Sub 4 danger',control: 'boolean', table: { category: 'Item 7 — Sub' }, if: { arg: 'item7HasSub', truthy: true } },
  },

  args: {
    // Trigger
    triggerIcon: true, triggerIconName: 'MoreVertical', triggerLabel: false, label: 'Options',

    // Item slot visibility
    item2Show: true, item3Show: true, item4Show: true,
    item5Show: false, item6Show: false, item7Show: false,

    // Item content
    item1Label: 'Edit',      item1ShowIcon: true, item1Icon: 'Pencil',  item1Danger: false, item1HasSub: false,
    item2Label: 'Duplicate', item2ShowIcon: true, item2Icon: 'Copy',    item2Danger: false, item2HasSub: false,
    item3Label: 'Archive',   item3ShowIcon: true, item3Icon: 'Archive', item3Danger: false, item3HasSub: false,
    item4Label: 'Delete',    item4ShowIcon: true, item4Icon: 'Trash2',  item4Danger: true,  item4HasSub: false,
    item5Label: 'Export',    item5ShowIcon: false, item5Icon: 'Upload',  item5Danger: false, item5HasSub: false,
    item6Label: 'Share',     item6ShowIcon: false, item6Icon: 'Link',    item6Danger: false, item6HasSub: false,
    item7Label: 'Bookmark',  item7ShowIcon: false, item7Icon: 'Bookmark',item7Danger: false, item7HasSub: false,

    // Sub defaults (pre-filled so controls aren't blank when first toggled on)
    item1SubCount: 2, item1Sub1Label: 'Option A', item1Sub1Danger: false, item1Sub2Label: 'Option B', item1Sub2Danger: false, item1Sub3Label: 'Option C', item1Sub3Danger: false, item1Sub4Label: 'Option D', item1Sub4Danger: false,
    item2SubCount: 2, item2Sub1Label: 'Option A', item2Sub1Danger: false, item2Sub2Label: 'Option B', item2Sub2Danger: false, item2Sub3Label: 'Option C', item2Sub3Danger: false, item2Sub4Label: 'Option D', item2Sub4Danger: false,
    item3SubCount: 2, item3Sub1Label: 'Option A', item3Sub1Danger: false, item3Sub2Label: 'Option B', item3Sub2Danger: false, item3Sub3Label: 'Option C', item3Sub3Danger: false, item3Sub4Label: 'Option D', item3Sub4Danger: false,
    item4SubCount: 2, item4Sub1Label: 'Option A', item4Sub1Danger: false, item4Sub2Label: 'Option B', item4Sub2Danger: false, item4Sub3Label: 'Option C', item4Sub3Danger: false, item4Sub4Label: 'Option D', item4Sub4Danger: false,
    item5SubCount: 2, item5Sub1Label: 'Option A', item5Sub1Danger: false, item5Sub2Label: 'Option B', item5Sub2Danger: false, item5Sub3Label: 'Option C', item5Sub3Danger: false, item5Sub4Label: 'Option D', item5Sub4Danger: false,
    item6SubCount: 2, item6Sub1Label: 'Option A', item6Sub1Danger: false, item6Sub2Label: 'Option B', item6Sub2Danger: false, item6Sub3Label: 'Option C', item6Sub3Danger: false, item6Sub4Label: 'Option D', item6Sub4Danger: false,
    item7SubCount: 2, item7Sub1Label: 'Option A', item7Sub1Danger: false, item7Sub2Label: 'Option B', item7Sub2Danger: false, item7Sub3Label: 'Option C', item7Sub3Danger: false, item7Sub4Label: 'Option D', item7Sub4Danger: false,
  },
};

export default meta;
type Story = StoryObj<Args>;

export const ActionMenu: Story = { name: 'ActionMenu' };
