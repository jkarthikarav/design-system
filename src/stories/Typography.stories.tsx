import type { Meta, StoryObj } from '@storybook/react-vite';
import { Typography } from '../components/Typography';

const meta = {
  title: 'Foundations/Typography',
  component: Typography,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['hero-heading','section-heading','card-heading','hero-subheading','section-subheading','description-large','description-medium','card-description','image-caption','eyebrow'], description: 'Select a typography style.' },
    align: { control: 'inline-radio', options: ['left','center'], description: 'Text alignment.' },
    width: { control: 'select', options: ['full','wide','narrow'], description: 'Text container width.' },
    as: { control: false },
    children: { control: 'text' },
  },
  args: { align: 'left', width: 'full' },
} satisfies Meta<typeof Typography>;
export default meta;
type Story = StoryObj<typeof meta>;

export const VariantCatalog: Story = {
  args: { variant: 'section-heading', children: 'Typography variants' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
      {(['hero-heading','section-heading','card-heading','hero-subheading','section-subheading','description-large','description-medium','card-description','image-caption','eyebrow'] as const).map((variant) => (
        <div key={variant} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          <Typography variant="eyebrow">{variant}</Typography>
          <Typography variant={variant}>A sample of the {variant} style.</Typography>
        </div>
      ))}
    </div>
  ),
};
export const Playground: Story = { args: { variant: 'hero-heading', children: 'Making Digital Experiences Easier to Discover', align: 'left', width: 'full' } };
export const HeroHeading: Story = { args: { variant: 'hero-heading', children: 'Making Digital Experiences Easier to Discover', align: 'left' } };
export const SectionHeading: Story = { args: { variant: 'section-heading', children: 'Selected Projects', align: 'left' } };
export const CardHeading: Story = { args: { variant: 'card-heading', children: 'Making a Research Facility Easier to Discover and Access', align: 'left' } };
export const HeroSubheading: Story = { args: { variant: 'hero-subheading', children: 'I design and develop thoughtful digital experiences grounded in research and clear information architecture.', align: 'left', width: 'wide' } };
export const SectionSubheading: Story = { args: { variant: 'section-subheading', children: 'Selected work across product design, content discovery, and digital experiences.', align: 'left', width: 'wide' } };
export const LargeDescription: Story = { args: { variant: 'description-large', children: 'I integrated the Toronto Nanofabrication Centre into the university website, aligning its branding, navigation, and content with the department’s digital ecosystem.', align: 'left', width: 'wide' } };
export const MediumDescription: Story = { args: { variant: 'description-medium', children: 'The updated experience improves access to facility information through clearer navigation and a more consistent content structure.', align: 'left', width: 'full' } };
export const CardDescription: Story = { args: { variant: 'card-description', children: 'Improved information discovery through clearer navigation and more accessible facility information.', align: 'left', width: 'full' } };
export const ImageCaption: Story = { args: { variant: 'image-caption', children: 'The redesigned content hub for the Toronto Nanofabrication Centre.', align: 'left', width: 'full' } };
export const Eyebrow: Story = { args: { variant: 'eyebrow', children: 'Content Discovery / Digital Experience', align: 'left', width: 'full' } };
export const CenteredHeroHeading: Story = { args: { variant: 'hero-heading', children: 'Designing Better Digital Experiences', align: 'center' } };
export const CenteredDescription: Story = { args: { variant: 'description-large', children: 'Clear, accessible digital experiences shaped by research and thoughtful design.', align: 'center', width: 'narrow' } };
