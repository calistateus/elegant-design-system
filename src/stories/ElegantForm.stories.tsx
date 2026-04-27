import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import {
  ElegantForm,
  ElegantFormHeader,
  ElegantFormSection,
  ElegantFormFooter,
  ElegantField,
} from '../components/simple/ElegantForm';
import { ElegantTextInput } from '../components/simple/ElegantTextInput';
import { ElegantDropdown } from '../components/simple/ElegantDropdown';
import { ElegantSearch } from '../components/simple/ElegantSearch';
import { ElegantCheckbox } from '../components/simple/ElegantCheckbox';
import type { CheckboxState } from '../components/simple/ElegantCheckbox';
import { ElegantCheckboxGroup } from '../components/simple/ElegantCheckboxGroup';
import { ElegantRadio } from '../components/simple/ElegantRadio';
import type { RadioState } from '../components/simple/ElegantRadio';
import { ElegantRadioGroup } from '../components/simple/ElegantRadioGroup';
import { ElegantToggle } from '../components/simple/ElegantToggle';
import { ElegantDateInput } from '../components/simple/ElegantDateInput';
import { ElegantButton } from '../components/simple/ElegantButton';

// ─── Types ────────────────────────────────────────────────────────────────────

type FieldType = 'TextInput' | 'Dropdown' | 'Search' | 'Checkbox' | 'CheckboxGroup' | 'Radio' | 'RadioGroup' | 'Toggle' | 'DateInput';

const FIELD_OPTIONS: FieldType[] = [
  'TextInput', 'Dropdown', 'Search',
  'Checkbox', 'CheckboxGroup',
  'Radio', 'RadioGroup',
  'Toggle', 'DateInput',
];

// Prefix per type — used to namespace arg keys so each type's controls are isolated
const PFX: Record<FieldType, string> = {
  TextInput:    'TI',
  Dropdown:     'DD',
  Search:       'SR',
  Checkbox:     'CB',
  CheckboxGroup:'CG',
  Radio:        'RD',
  RadioGroup:   'RG',
  Toggle:       'TG',
  DateInput:    'DI',
};

// ─── Field instance ───────────────────────────────────────────────────────────

function FieldInstance({ n, args }: { n: number; args: Record<string, unknown> }) {
  const type = args[`field${n}Type`] as FieldType;
  const pfx = PFX[type];
  const g = (key: string) => args[`field${n}${pfx}${key}`];

  const [textVal,   setTextVal]   = useState('');
  const [dropVal,   setDropVal]   = useState('');
  const [searchVal, setSearchVal] = useState('');
  const [dateVal,   setDateVal]   = useState('');
  const [cbState,   setCbState]   = useState<CheckboxState>('unselected');
  const [rdState,   setRdState]   = useState<RadioState>('unselected');
  const [toggled,   setToggled]   = useState(false);

  switch (type) {
    case 'TextInput':
      return (
        <ElegantTextInput
          label={g('Label') as string}
          showLabel={g('ShowLabel') as boolean}
          placeholder={g('Placeholder') as string}
          showPlaceholder={g('ShowPlaceholder') as boolean}
          description={g('Description') as string}
          showDescription={g('ShowDescription') as boolean}
          error={g('Error') as string}
          showError={g('ShowError') as boolean}
          icon={g('Icon') as 'search' | 'arrow'}
          showIcon={g('ShowIcon') as boolean}
          disabled={g('Disabled') as boolean}
          value={textVal}
          onChange={setTextVal}
        />
      );

    case 'Dropdown':
      return (
        <ElegantDropdown
          label={g('Label') as string}
          showLabel={g('ShowLabel') as boolean}
          placeholder={g('Placeholder') as string}
          showPlaceholder={g('ShowPlaceholder') as boolean}
          description={g('Description') as string}
          showDescription={g('ShowDescription') as boolean}
          error={g('Error') as string}
          showError={g('ShowError') as boolean}
          disabled={g('Disabled') as boolean}
          value={dropVal}
          onChange={setDropVal}
          options={[
            { label: 'Option A', value: 'a' },
            { label: 'Option B', value: 'b' },
            { label: 'Option C', value: 'c' },
          ]}
        />
      );

    case 'Search':
      return (
        <ElegantSearch
          label={g('Label') as string}
          showLabel={g('ShowLabel') as boolean}
          placeholder={g('Placeholder') as string}
          showPlaceholder={g('ShowPlaceholder') as boolean}
          description={g('Description') as string}
          showDescription={g('ShowDescription') as boolean}
          autocomplete={g('Autocomplete') as boolean}
          value={searchVal}
          onChange={setSearchVal}
        />
      );

    case 'Checkbox': {
      const desc = g('ShowDescription') ? g('Description') as string : false;
      return (
        <ElegantCheckbox
          label={g('Label') as string}
          description={desc}
          checkboxState={cbState}
          onChange={setCbState}
        />
      );
    }

    case 'CheckboxGroup': {
      const opts = [g('Option1'), g('Option2'), g('Option3')]
        .filter(Boolean)
        .map((label, i) => ({ id: `cg-${i}`, label: label as string }));
      const desc = g('ShowDescription') ? g('Description') as string : false;
      return (
        <ElegantCheckboxGroup
          heading={g('Heading') as string}
          description={desc}
          error={g('Error') as string}
          showError={g('ShowError') as boolean}
          items={opts}
        />
      );
    }

    case 'Radio': {
      const desc = g('ShowDescription') ? g('Description') as string : false;
      return (
        <ElegantRadio
          label={g('Label') as string}
          description={desc}
          radioState={rdState}
          onClick={() => setRdState(rdState === 'selected' ? 'unselected' : 'selected')}
        />
      );
    }

    case 'RadioGroup': {
      const opts = [g('Option1'), g('Option2'), g('Option3')]
        .filter(Boolean)
        .map((label, i) => ({ id: `rg-${i}`, label: label as string }));
      const desc = g('ShowDescription') ? g('Description') as string : false;
      return (
        <ElegantRadioGroup
          heading={g('Heading') as string}
          description={desc}
          error={g('Error') as string}
          showError={g('ShowError') as boolean}
          items={opts}
        />
      );
    }

    case 'Toggle': {
      const desc = g('ShowDescription') ? g('Description') as string : false;
      return (
        <ElegantToggle
          label={g('Label') as string}
          description={desc}
          toggled={toggled}
          onToggle={setToggled}
        />
      );
    }

    case 'DateInput':
      return (
        <ElegantDateInput
          label={g('Label') as string}
          showLabel={g('ShowLabel') as boolean}
          description={g('Description') as string}
          showDescription={g('ShowDescription') as boolean}
          showYear={g('ShowYear') as boolean}
          error={g('Error') as string}
          showError={g('ShowError') as boolean}
          disabled={g('Disabled') as boolean}
          value={dateVal}
          onChange={setDateVal}
        />
      );
  }
}

// ─── ArgType + default generators ────────────────────────────────────────────

function a(type: FieldType, n: number, key: string, name: string, control: unknown): Record<string, unknown> {
  return {
    [`field${n}${PFX[type]}${key}`]: {
      name,
      control,
      if: { arg: `field${n}Type`, eq: type },
      table: { category: `Form element ${n}` },
    },
  };
}

function slotArgTypes(n: number) {
  return {
    [`field${n}Type`]: {
      name: 'Component',
      control: { type: 'select' },
      options: FIELD_OPTIONS,
      table: { category: `Form element ${n}` },
    },

    // ── TextInput
    ...a('TextInput', n, 'Label',           'Label',           'text'),
    ...a('TextInput', n, 'ShowLabel',        'Show label',      'boolean'),
    ...a('TextInput', n, 'Placeholder',      'Placeholder',     'text'),
    ...a('TextInput', n, 'ShowPlaceholder',  'Show placeholder','boolean'),
    ...a('TextInput', n, 'Description',      'Description',     'text'),
    ...a('TextInput', n, 'ShowDescription',  'Show description','boolean'),
    ...a('TextInput', n, 'Error',            'Error message',   'text'),
    ...a('TextInput', n, 'ShowError',        'Show error',      'boolean'),
    ...a('TextInput', n, 'Disabled',         'Disabled',        'boolean'),
    ...a('TextInput', n, 'Icon',             'Icon',            { type: 'select', options: ['search', 'arrow'] }),
    ...a('TextInput', n, 'ShowIcon',         'Show icon',       'boolean'),

    // ── Dropdown
    ...a('Dropdown', n, 'Label',             'Label',           'text'),
    ...a('Dropdown', n, 'ShowLabel',         'Show label',      'boolean'),
    ...a('Dropdown', n, 'Placeholder',       'Placeholder',     'text'),
    ...a('Dropdown', n, 'ShowPlaceholder',   'Show placeholder','boolean'),
    ...a('Dropdown', n, 'Description',       'Description',     'text'),
    ...a('Dropdown', n, 'ShowDescription',   'Show description','boolean'),
    ...a('Dropdown', n, 'Error',             'Error message',   'text'),
    ...a('Dropdown', n, 'ShowError',         'Show error',      'boolean'),
    ...a('Dropdown', n, 'Disabled',          'Disabled',        'boolean'),

    // ── Search
    ...a('Search', n, 'Label',               'Label',           'text'),
    ...a('Search', n, 'ShowLabel',           'Show label',      'boolean'),
    ...a('Search', n, 'Placeholder',         'Placeholder',     'text'),
    ...a('Search', n, 'ShowPlaceholder',     'Show placeholder','boolean'),
    ...a('Search', n, 'Description',         'Description',     'text'),
    ...a('Search', n, 'ShowDescription',     'Show description','boolean'),
    ...a('Search', n, 'Autocomplete',        'Autocomplete',    'boolean'),

    // ── Checkbox
    ...a('Checkbox', n, 'Label',             'Label',           'text'),
    ...a('Checkbox', n, 'Description',       'Description',     'text'),
    ...a('Checkbox', n, 'ShowDescription',   'Show description','boolean'),
    ...a('Checkbox', n, 'State',             'State',           { type: 'select', options: ['unselected', 'selected', 'indeterminate'] }),

    // ── CheckboxGroup
    ...a('CheckboxGroup', n, 'Heading',      'Heading',         'text'),
    ...a('CheckboxGroup', n, 'Description',  'Description',     'text'),
    ...a('CheckboxGroup', n, 'ShowDescription','Show description','boolean'),
    ...a('CheckboxGroup', n, 'Error',        'Error message',   'text'),
    ...a('CheckboxGroup', n, 'ShowError',    'Show error',      'boolean'),
    ...a('CheckboxGroup', n, 'Option1',      'Option 1',        'text'),
    ...a('CheckboxGroup', n, 'Option2',      'Option 2',        'text'),
    ...a('CheckboxGroup', n, 'Option3',      'Option 3',        'text'),

    // ── Radio
    ...a('Radio', n, 'Label',                'Label',           'text'),
    ...a('Radio', n, 'Description',          'Description',     'text'),
    ...a('Radio', n, 'ShowDescription',      'Show description','boolean'),
    ...a('Radio', n, 'State',               'State',            { type: 'select', options: ['unselected', 'selected'] }),

    // ── RadioGroup
    ...a('RadioGroup', n, 'Heading',         'Heading',         'text'),
    ...a('RadioGroup', n, 'Description',     'Description',     'text'),
    ...a('RadioGroup', n, 'ShowDescription', 'Show description','boolean'),
    ...a('RadioGroup', n, 'Error',           'Error message',   'text'),
    ...a('RadioGroup', n, 'ShowError',       'Show error',      'boolean'),
    ...a('RadioGroup', n, 'Option1',         'Option 1',        'text'),
    ...a('RadioGroup', n, 'Option2',         'Option 2',        'text'),
    ...a('RadioGroup', n, 'Option3',         'Option 3',        'text'),

    // ── Toggle
    ...a('Toggle', n, 'Label',               'Label',           'text'),
    ...a('Toggle', n, 'Description',         'Description',     'text'),
    ...a('Toggle', n, 'ShowDescription',     'Show description','boolean'),
    ...a('Toggle', n, 'Toggled',             'Toggled',         'boolean'),

    // ── DateInput
    ...a('DateInput', n, 'Label',            'Label',           'text'),
    ...a('DateInput', n, 'ShowLabel',        'Show label',      'boolean'),
    ...a('DateInput', n, 'Description',      'Description',     'text'),
    ...a('DateInput', n, 'ShowDescription',  'Show description','boolean'),
    ...a('DateInput', n, 'ShowYear',         'Show year',       'boolean'),
    ...a('DateInput', n, 'Error',            'Error message',   'text'),
    ...a('DateInput', n, 'ShowError',        'Show error',      'boolean'),
    ...a('DateInput', n, 'Disabled',         'Disabled',        'boolean'),
  };
}

function defaultSlotArgs(n: number, type: FieldType, label: string): Record<string, unknown> {
  const d = (pfxKey: string, val: unknown) => ({ [`field${n}${pfxKey}`]: val });
  return {
    [`field${n}Type`]: type,
    // TextInput
    ...d('TILabel', type === 'TextInput' ? label : 'Label'),
    ...d('TIShowLabel', true), ...d('TIPlaceholder', 'Enter value…'), ...d('TIShowPlaceholder', true),
    ...d('TIDescription', 'Supporting description.'), ...d('TIShowDescription', false),
    ...d('TIError', 'This field is required.'), ...d('TIShowError', false),
    ...d('TIDisabled', false), ...d('TIIcon', 'search'), ...d('TIShowIcon', true),
    // Dropdown
    ...d('DDLabel', type === 'Dropdown' ? label : 'Label'),
    ...d('DDShowLabel', true), ...d('DDPlaceholder', 'Select an option…'), ...d('DDShowPlaceholder', true),
    ...d('DDDescription', 'Supporting description.'), ...d('DDShowDescription', false),
    ...d('DDError', 'This field is required.'), ...d('DDShowError', false), ...d('DDDisabled', false),
    // Search
    ...d('SRLabel', type === 'Search' ? label : 'Search'),
    ...d('SRShowLabel', true), ...d('SRPlaceholder', 'Search…'), ...d('SRShowPlaceholder', true),
    ...d('SRDescription', 'Supporting description.'), ...d('SRShowDescription', false),
    ...d('SRAutocomplete', false),
    // Checkbox
    ...d('CBLabel', type === 'Checkbox' ? label : 'Option'),
    ...d('CBDescription', 'Supporting description.'), ...d('CBShowDescription', false),
    ...d('CBState', 'unselected'),
    // CheckboxGroup
    ...d('CGHeading', type === 'CheckboxGroup' ? label : 'Options'),
    ...d('CGDescription', 'Supporting description.'), ...d('CGShowDescription', false),
    ...d('CGError', 'Please select at least one.'), ...d('CGShowError', false),
    ...d('CGOption1', 'Option A'), ...d('CGOption2', 'Option B'), ...d('CGOption3', 'Option C'),
    // Radio
    ...d('RDLabel', type === 'Radio' ? label : 'Option'),
    ...d('RDDescription', 'Supporting description.'), ...d('RDShowDescription', false),
    ...d('RDState', 'unselected'),
    // RadioGroup
    ...d('RGHeading', type === 'RadioGroup' ? label : 'Options'),
    ...d('RGDescription', 'Supporting description.'), ...d('RGShowDescription', false),
    ...d('RGError', 'Please select an option.'), ...d('RGShowError', false),
    ...d('RGOption1', 'Option A'), ...d('RGOption2', 'Option B'), ...d('RGOption3', 'Option C'),
    // Toggle
    ...d('TGLabel', type === 'Toggle' ? label : 'Option'),
    ...d('TGDescription', 'Supporting description.'), ...d('TGShowDescription', false),
    ...d('TGToggled', false),
    // DateInput
    ...d('DILabel', type === 'DateInput' ? label : 'Date'),
    ...d('DIShowLabel', true), ...d('DIDescription', 'Supporting description.'), ...d('DIShowDescription', false),
    ...d('DIShowYear', true), ...d('DIError', 'Invalid date.'), ...d('DIShowError', false), ...d('DIDisabled', false),
  };
}

// ─── Meta ─────────────────────────────────────────────────────────────────────

type Args = {
  headerTitle: string;
  headerDescription: string;
  showDescription: boolean;
  sectionTitle: string;
  showSectionTitle: boolean;
  disabled: boolean;
  count: number;
} & Record<string, unknown>;

const meta: Meta<Args> = {
  title: 'Simple/Forms/ElegantForm',
  tags: ['autodocs'],
  parameters: { backgrounds: { disable: true }, layout: 'centered' },
  decorators: [(Story) => <div style={{ width: 480 }}><Story /></div>],
  argTypes: {
    headerTitle:      { control: 'text',    table: { category: 'Header' } },
    headerDescription:{ control: 'text',    table: { category: 'Header' } },
    showDescription:  { control: 'boolean', table: { category: 'Header' } },
    sectionTitle:     { control: 'text',    table: { category: 'Section' } },
    showSectionTitle: { control: 'boolean', table: { category: 'Section' } },
    disabled:         { control: 'boolean', table: { category: 'Form' } },
    count:            { control: { type: 'range', min: 1, max: 5, step: 1 }, table: { category: 'Fields' } },
    ...slotArgTypes(1),
    ...slotArgTypes(2),
    ...slotArgTypes(3),
    ...slotArgTypes(4),
    ...slotArgTypes(5),
  },
  render: function Render(args) {
    const [submitted, setSubmitted] = useState(false);
    const count = args.count as number;

    async function handleSubmit() {
      await new Promise<void>((r) => setTimeout(r, 800));
      setSubmitted(true);
    }

    if (submitted) {
      return (
        <div style={{
          border: '1px solid var(--color-border-subtle)',
          borderRadius: 'var(--primitive-radius-md)',
          padding: 'var(--primitive-scale-8)',
          fontFamily: 'var(--primitive-font-sans)',
          fontSize: 'var(--primitive-font-size-sm)',
          color: 'var(--color-text-muted)',
          textAlign: 'center',
        }}>
          Form submitted.
          <div style={{ marginTop: 'var(--primitive-scale-4)' }}>
            <ElegantButton text="Reset" style="secondary" onClick={() => setSubmitted(false)} />
          </div>
        </div>
      );
    }

    return (
      <ElegantForm onSubmit={handleSubmit} disabled={args.disabled as boolean}>
        <ElegantFormHeader
          title={args.headerTitle as string}
          description={args.headerDescription as string}
          showDescription={args.showDescription as boolean}
        />
        <ElegantFormSection
          title={args.sectionTitle as string}
          showTitle={args.showSectionTitle as boolean}
        >
          {Array.from({ length: count }, (_, i) => i + 1).map((n) => (
            <ElegantField key={`${n}-${args[`field${n}Type`]}`}>
              <FieldInstance
                key={`${n}-${args[`field${n}Type`]}`}
                n={n}
                args={args as Record<string, unknown>}
              />
            </ElegantField>
          ))}
        </ElegantFormSection>
        <ElegantFormFooter>
          <ElegantButton text="Cancel" style="secondary" />
          <ElegantButton text="Submit" style="primary" onClick={() => {}} />
        </ElegantFormFooter>
      </ElegantForm>
    );
  },
};

export default meta;
type Story = StoryObj<Args>;

export const Default: Story = {
  args: {
    headerTitle: 'Contact us',
    headerDescription: 'Fill in the form and we will get back to you.',
    showDescription: true,
    sectionTitle: 'Your details',
    showSectionTitle: false,
    disabled: false,
    count: 2,
    ...defaultSlotArgs(1, 'TextInput',  'Full name'),
    ...defaultSlotArgs(2, 'TextInput',  'Email'),
    ...defaultSlotArgs(3, 'Dropdown',   'Country'),
    ...defaultSlotArgs(4, 'Toggle',     'Subscribe to newsletter'),
    ...defaultSlotArgs(5, 'RadioGroup', 'Preferred contact method'),
  },
};
