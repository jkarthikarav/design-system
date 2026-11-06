import type { Meta, StoryObj } from '@storybook/react-vite';
import { StructuredList } from '../components/StructuredList';

const meta = {
  title: 'Components/StructuredList',
  component: StructuredList,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: '**Making a list item keyboard-focusable with internal links**\n\nIf an item needs to participate in DOM-order keyboard navigation, add the `domorder` class and `tabIndex={0}` to its `<li>`. Put individual links inside the item content; do not wrap the entire list item or row in an `<a>` element.\n\n```tsx\n<li className="structured-list__item domorder" tabIndex={0}>\n  <div className="structured-list__row">\n    <span className="structured-list__index" aria-hidden="true">01</span>\n    <span className="structured-list__content">\n      <span className="structured-list__title">Resource title</span>\n      <span className="structured-list__description">\n        Read the <a href="/resource">resource details</a> or <a href="/contact">contact the team</a>.\n      </span>\n    </span>\n  </div>\n</li>\n```',
      },
    },
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