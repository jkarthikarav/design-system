import type { Meta, StoryObj } from '@storybook/react-vite';
import { Section } from '../components/Section';
import { Grid } from '../components/Grid';
import { CaseStudyCard } from '../components/CaseStudyCard';
import type { CaseStudyCardProps } from '../components/CaseStudyCard';

const meta = {
  title: 'UI Patterns/Portfolio Sections/Case Study Cards/One Column',
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const caseStudies: CaseStudyCardProps[] = [
  {
    title: 'Making a Research Facility Easier to Discover and Access',
    eyebrow: 'CONTENT STRATEGY / UX DESIGN',
    description:
      'Restructuring a research facility website to help researchers find services, understand requirements, and access essential information.',
    highlights: [
      {
        heading: 'Research',
        description: 'Identified user needs and barriers through discovery.',
      },
      {
        heading: 'Structure',
        description: 'Organized complex information around user tasks.',
      },
      {
        heading: 'Experience',
        description: 'Designed a clearer and more accessible content journey.',
      },
    ],
    date: '2025',
    role: 'Research, UX Design, Development',
  },
  {
    title: 'Building a Reusable Design System',
    eyebrow: 'DESIGN SYSTEM / DEVELOPMENT',
    description:
      'Creating reusable interface components and design tokens to improve consistency and make future portfolio development more efficient.',
    highlights: [
      {
        heading: 'Foundations',
        description: 'Defined reusable color, spacing, and typography tokens.',
      },
      {
        heading: 'Components',
        description: 'Built a library of configurable React components.',
      },
      {
        heading: 'Documentation',
        description: 'Used Storybook to demonstrate component variations.',
      },
    ],
    date: '2026',
    role: 'UI Design, React, TypeScript',
  },
];

export const Beige: Story = {
  render: () => (
    <Section
      background="beige"
      eyebrow="SELECTED WORK"
      title="Case studies"
      description="Explore the research, decisions, and design work behind each project."
      headerVariant="with-description"
      contentWidth="full"
    >
      <Grid columns={1} gap={4}>
        {caseStudies.map((study) => (
          <CaseStudyCard key={study.title} {...study} />
        ))}
      </Grid>
    </Section>
  ),
};

export const White: Story = {
  render: () => (
    <Section
      background="white"
      eyebrow="SELECTED WORK"
      title="Case studies"
      description="Explore the research, decisions, and design work behind each project."
      headerVariant="with-description"
      contentWidth="full"
    >
      <Grid columns={1} gap={4}>
        {caseStudies.map((study) => (
          <CaseStudyCard key={study.title} {...study} />
        ))}
      </Grid>
    </Section>
  ),
};