import type { Meta, StoryObj } from '@storybook/react-vite';
import { Section } from '../components/Section';
import { DescriptionGroup } from '../components/DescriptionGroup';

const meta = {
  title: 'UI Patterns/Portfolio Sections/Description Group',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const lead =
  'Making complex information easier to understand starts with identifying what people need and organizing content around their goals.';

const descriptions = [
  'Research helped uncover the questions, barriers, and information needs that shaped the experience.',
  'The resulting structure made important content easier to discover, understand, and access across devices.',
];

export const Width75: Story = {
  render: () => (
    <Section
      background="beige"
      eyebrow="RESEARCH / STRATEGY"
      title="Designing around user needs"
      description="A content experience shaped by research, clarity, and accessibility."
      headerVariant="with-description"
      contentWidth="full"
    >
      <DescriptionGroup
        lead={lead}
        descriptions={descriptions}
        width="wide"
      />
    </Section>
  ),
};

export const Width50: Story = {
  render: () => (
    <Section
      background="beige"
      eyebrow="RESEARCH / STRATEGY"
      title="Designing around user needs"
      description="A content experience shaped by research, clarity, and accessibility."
      headerVariant="with-description"
      contentWidth="full"
    >
      <DescriptionGroup
        lead={lead}
        descriptions={descriptions}
        width="narrow"
      />
    </Section>
  ),
};

export const WhiteBackground: Story = {
  render: () => (
    <Section
      background="white"
      eyebrow="RESEARCH / STRATEGY"
      title="Designing around user needs"
      description="A content experience shaped by research, clarity, and accessibility."
      headerVariant="with-description"
      contentWidth="full"
    >
      <DescriptionGroup
        lead={lead}
        descriptions={descriptions}
        width="wide"
      />
    </Section>
  ),
};