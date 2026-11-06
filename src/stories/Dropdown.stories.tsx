import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Dropdown, type DropdownValue } from '../components/Dropdown';

const options = ['Branding', 'Campaign', 'Editorial', 'Packaging', 'Social media', 'Web design'];

const meta = {
  title: 'Components/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['multi-select', 'single-select'] },
  },
  args: {
    label: 'By Type',
    options,
    variant: 'multi-select',
    value: [],
    onChange: () => {},
  },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MultiSelect: Story = {
  render: (args) => {
    const [value, setValue] = useState<DropdownValue>([]);
    return <Dropdown {...args} variant="multi-select" value={value} onChange={setValue} />;
  },
};

export const SingleSelect: Story = {
  args: { label: 'By Client', variant: 'single-select', value: '' },
  render: (args) => {
    const [value, setValue] = useState<DropdownValue>('');
    return <Dropdown {...args} variant="single-select" value={value} onChange={setValue} />;
  },
};
