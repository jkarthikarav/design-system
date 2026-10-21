import type { Meta, StoryObj } from '@storybook/react-vite';
import { Section } from "../components/Section";
import { StructuredList } from "../components/StructuredList";

const meta = {
  title: 'UI Patterns/Portfolio Sections/Structured List',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const items = [
  {
    id: 'research',
    title: 'Research and discovery',
    description:
      'Understand user needs, goals, and barriers through research and analysis.',
  },
  {
    id: 'strategy',
    title: 'Content strategy',
    description:
      'Organize information around user needs and make important resources easier to find.',
    href: 'https://example.com/strategy',
    external: true,
  },
  {
    id: 'experience',
    title: 'Digital experience',
    description:
      'Translate insights into clear, accessible, and consistent digital journeys.',
  },
];

export const Beige: Story = {
  render: () => (
    <Section
      background="beige"
      eyebrow="OUR APPROACH"
      title="From research to experience"
      description="A structured overview of the key stages in the process."
      headerVariant="with-description"
      contentWidth="full"
    >
      <StructuredList items={items} />
    </Section>
  ),
};

export const White: Story = {
  render: () => (
    <Section
      background="white"
      eyebrow="OUR APPROACH"
      title="From research to experience"
      description="A structured overview of the key stages in the process."
      headerVariant="with-description"
      contentWidth="full"
    >
      <StructuredList items={items} />
    </Section>
  ),
};

export const TitleOnly: Story = {
  render: () => (
    <Section
      background="beige"
      title="Our approach"
      headerVariant="title-only"
      contentWidth="full"
    >
      <StructuredList items={items} />
    </Section>
  ),
};