import type { Meta, StoryObj } from '@storybook/react-vite';
import { Section } from '../components/Section';
import { DescriptionGroup } from '../components/DescriptionGroup';

const meta = { title: 'Patterns/Sections', parameters: { layout: 'fullscreen' } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;

export const HeadingWithSupportingContent: Story = {
  render: () => <Section background="white" headerVariant="title-only" title="A section heading"><DescriptionGroup width="narrow" lead="Supporting content begins in the second row, below the section heading." descriptions={['Use this structure when the section needs a focused text introduction.']} /></Section>,
};
export const HeadingWithBodyContent: Story = {
  render: () => <Section background="beige" headerVariant="with-description" eyebrow="SECTION EYEBROW" title="Heading with a short introduction" description="SectionHeader supports one concise paragraph beside the heading."><DescriptionGroup width="wide" lead="The main section content starts below the complete SectionHeader row." descriptions={['Do not place media, cards, or arbitrary components in the SectionHeader description column.']} /></Section>,
};
export const NarrowHeadingWideContent: Story = {
  render: () => <Section background="white" headerVariant="title-only" title="A focused heading with wider content" contentWidth="wide"><DescriptionGroup width="wide" lead="The section body can use a wider measure than the heading itself." descriptions={['Useful for reflections, process notes, or longer-form supporting content.']} /></Section>,
};
