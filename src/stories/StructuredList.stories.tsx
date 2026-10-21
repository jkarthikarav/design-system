import type { Meta, StoryObj } from '@storybook/react-vite';
import { StructuredList } from '../components/StructuredList';

const meta = {
  title: 'Components/StructuredList',
  component: StructuredList,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof StructuredList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      {
        id: 'research',
        title: 'Research and discovery',
        description:
          'Understanding user needs, goals, and barriers through research.',
      },
      {
        id: 'strategy',
        title: 'Content strategy',
        description:
          'Structuring information so people can find what they need.',
        href: 'https://example.com/strategy',
        external: true,
      },
      {
        id: 'experience',
        title: 'Digital experience',
        description:
          'Creating clear, accessible, and cohesive digital journeys.',
      },
    ],
  },
};

export const AllLinks: Story = {
  args: {
    items: [
      {
        id: 'one',
        title: 'First resource',
        description: 'An overview of the first resource.',
        href: 'https://example.com/one',
        external: true,
      },
      {
        id: 'two',
        title: 'Second resource',
        description: 'More information about the second resource.',
        href: 'https://example.com/two',
        external: true,
      },
    ],
  },
};

export const PlainText: Story = {
  args: {
    items: [
      {
        id: 'one',
        title: 'Research and discovery',
        description: 'Understanding user needs and goals.',
      },
      {
        id: 'two',
        title: 'Design systems',
        description: 'Building consistent reusable components.',
      },
      {
        id: 'three',
        title: 'Content design',
        description: 'Making information clear and useful.',
      },
    ],
  },
};