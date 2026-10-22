import type { Meta, StoryObj } from '@storybook/react-vite';
import { Section } from '../components/Section';
import { DescriptionGroup } from '../components/DescriptionGroup';
import { Grid } from '../components/Grid';
import { Button } from '../components/Button';
import { ProjectImageGrid } from '../components/ProjectImageGrid';
import { CaseStudyCard } from '../components/CaseStudyCard';
import { StructuredList } from '../components/StructuredList';

const meta = {
  title: 'Patterns/Case Study Sections',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Reusable page-section compositions for case studies. Section headings occupy their own row; descriptions, buttons, lists, and media sit in the content row beneath.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const placeholderImages = [
  {
    id: 'before',
    src: 'https://placehold.co/1200x800?text=Before',
    alt: 'Placeholder representing the previous website experience.',
    caption: 'Before — Information was spread across separate pages.',
  },
  {
    id: 'after',
    src: 'https://placehold.co/1200x800?text=After',
    alt: 'Placeholder representing the redesigned website experience.',
    caption: 'After — Related information is grouped into a clearer journey.',
  },
];

const outcomes = [
  {
    eyebrow: 'OUTCOME 01',
    title: 'Improved Information Discovery',
    description:
      'Important facilities and services are easier to identify and understand.',
    highlights: [
      { heading: 'Clearer entry points', description: 'Key content is easier to find.' },
      { heading: 'Better orientation', description: 'Visitors can understand the facility sooner.' },
      { heading: 'Connected content', description: 'Related information supports the next step.' },
    ],
    date: 'Nov 2024 – Mar 2025',
    role: 'UX research · Information architecture · UI design',
  },
  {
    eyebrow: 'OUTCOME 02',
    title: 'Simplified User Access',
    description:
      'Practical requirements are grouped into a more understandable access journey.',
    highlights: [
      { heading: 'Consolidated resources', description: 'Requirements are gathered in one place.' },
      { heading: 'Clearer sequence', description: 'Users can work out what to do next.' },
      { heading: 'Reduced friction', description: 'Important policies are easier to locate.' },
    ],
    date: 'Nov 2024 – Mar 2025',
    role: 'UX research · Information architecture · UI design',
  },
  {
    eyebrow: 'OUTCOME 03',
    title: 'Scalable Interface Components',
    description:
      'Reusable page patterns support future research centres within the same ecosystem.',
    highlights: [
      { heading: 'Reusable patterns', description: 'Common layouts can be applied again.' },
      { heading: 'Consistent experience', description: 'Content follows familiar structures.' },
      { heading: 'Room to grow', description: 'New facilities can fit the same system.' },
    ],
    date: 'Nov 2024 – Mar 2025',
    role: 'UX research · Information architecture · UI design',
  },
] as const;

export const OverviewSection: Story = {
  render: () => (
    <Section
      background="white"
      headerVariant="title-only"
      title="From an isolated lab website to part of ECE’s digital ecosystem"
    >
      <DescriptionGroup
        width="narrow"
        lead="TNFC’s standalone website operated separately from ECE’s branding, navigation, and broader digital ecosystem."
        descriptions={[
          'Its content structure also made important information about the facility and how to access it harder to discover.',
        ]}
      />
    </Section>
  ),
};

export const StandardContentSection: Story = {
  render: () => (
    <Section
      background="beige"
      headerVariant="title-only"
      title="Defining the information architecture around user needs"
    >
      <DescriptionGroup
        width="narrow"
        lead="The content structure was reorganized around the questions visitors needed to answer."
        descriptions={[
          'The section heading is a distinct first row. Supporting content begins below it, rather than being placed in a second column beside the heading.',
        ]}
      />
    </Section>
  ),
};

export const ButtonsThenImages: Story = {
  render: () => (
    <Section
      background="white"
      headerVariant="title-only"
      title="Explore the TNFC experience"
    >
      <div className="portfolio-pattern-stack">
        <DescriptionGroup
          width="narrow"
          lead="Separate the explanation, actions, and supporting visuals into clear rows."
          descriptions={['The action grid appears above the image comparison.']}
        />
        <Grid columns={2} gap={3}>
          <Button variant="primary">Explore TNFC</Button>
          <Button variant="secondary">View access information</Button>
        </Grid>
        <ProjectImageGrid images={placeholderImages} columns={2} gap={3} />
      </div>
    </Section>
  ),
};

export const BeforeAfterComparison: Story = {
  render: () => (
    <Section
      background="beige"
      headerVariant="title-only"
      title="A before-and-after comparison"
    >
      <ProjectImageGrid images={placeholderImages} columns={2} gap={3} />
    </Section>
  ),
};

export const OutcomesSection: Story = {
  render: () => (
    <Section
      background="beige"
      headerVariant="title-only"
      title="Outcomes"
    >
      <Grid columns={3} gap={4}>
        {outcomes.map((outcome) => (
          <CaseStudyCard key={outcome.eyebrow} {...outcome} variant="outcome" />
        ))}
      </Grid>
    </Section>
  ),
};

export const ReflectionsSection: Story = {
  render: () => (
    <Section
      background="white"
      headerVariant="title-only"
      title="Reflections"
      contentWidth="wide"
    >
      <DescriptionGroup
        width="wide"
        lead="The work reinforced the value of understanding how people look for information before reorganizing a website."
        descriptions={[
          'Starting with user needs helped connect the facility’s content to the wider ECE experience.',
          'A reusable structure also made it easier to extend the same approach to other research centres.',
        ]}
      />
    </Section>
  ),
};

export const InformationArchitectureSequence: Story = {
  render: () => (
    <Section
      background="white"
      headerVariant="title-only"
      title="Information architecture"
    >
      <StructuredList
        items={[
          {
            id: 'discover',
            title: 'Discover TNFC',
            description: 'Understand the facility, its capabilities, and available research services.',
          },
          {
            id: 'access',
            title: 'Access TNFC',
            description: 'Find training, fees, forms, policies, and compliance requirements.',
          },
          {
            id: 'continue',
            title: 'Take the next step',
            description: 'Move from understanding the facility to preparing for access.',
          },
        ]}
      />
    </Section>
  ),
};
