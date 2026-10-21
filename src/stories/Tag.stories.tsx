import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tag } from '../components/Tag';

const meta = {
  title: 'Components/Tag',
  component: Tag,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'accent', 'inverse'],
    },
    children: {
      control: 'text',
    },
  },
  args: {
    children: 'Product Design',
    variant: 'default',
  },
} satisfies Meta<typeof Tag>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Default: Story = {
  args: {
    variant: 'default',
    children: 'Product Design',
  },
};

export const Accent: Story = {
  args: {
    variant: 'accent',
    children: 'Content Discovery',
  },
};

export const Inverse: Story = {
args: {
variant: 'inverse',
children: 'Digital Experience',
},
decorators: [
(Story) => (
<div
style={{
background: '#1B3618',
padding: '24px',
display: 'inline-flex',
borderRadius: '8px',
}}
>
<Story />
</div>
),
],
};