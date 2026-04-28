import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ElegantPagination } from '../components/simple/navigation/ElegantPagination';

type Args = {
  totalPages: number;
  currentPage: number;
  siblings: number;
};

const meta: Meta<Args> = {
  title: 'Simple/Navigation/ElegantPagination',
  tags: ['autodocs'],
  parameters: {
    backgrounds: { disable: true },
  },
  argTypes: {
    totalPages:  { control: { type: 'number', min: 1, max: 50 } },
    currentPage: { control: { type: 'number', min: 1 } },
    siblings:    { control: { type: 'number', min: 0, max: 3 } },
  },
  render: ({ totalPages, currentPage: initialPage, siblings }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [page, setPage] = useState(initialPage);
    return (
      <ElegantPagination
        totalPages={totalPages}
        currentPage={page}
        siblings={siblings}
        onPageChange={setPage}
      />
    );
  },
};

export default meta;
type Story = StoryObj<Args>;

export const Pagination: Story = {
  args: {
    totalPages: 10,
    currentPage: 5,
    siblings: 1,
  },
};
