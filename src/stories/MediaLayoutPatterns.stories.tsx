import type { Meta, StoryObj } from '@storybook/react-vite';
import { Section } from '../components/Section';
import { DescriptionGroup } from '../components/DescriptionGroup';
import { Grid } from '../components/Grid';
import { Button } from '../components/Button';
import { ProjectImageGrid } from '../components/ProjectImageGrid';
const meta = { title: 'Patterns/Media Layouts', parameters: { layout: 'fullscreen' } } satisfies Meta;
export default meta;
const images = [
{id:'before',src:'https://placehold.co/1200x800?text=Before',alt:'Example of an earlier interface',caption:'Before — The original experience.'},
{id:'after',src:'https://placehold.co/1200x800?text=After',alt:'Example of a revised interface',caption:'After — The updated experience.'},
];
type Story = StoryObj<typeof meta>;
export const ActionsThenMedia: Story = {
 render: () => <Section background="white" headerVariant="title-only" title="Actions followed by supporting media"><div style={{display:'flex',flexDirection:'column',gap:'var(--space-6)'}}><DescriptionGroup width="narrow" lead="Introduce the action and the visuals that support it." descriptions={['Keep the action row above the media row.']} /><Grid columns={2} gap={3}><Button variant="primary">Primary action</Button><Button variant="secondary">Secondary action</Button></Grid><ProjectImageGrid images={images} columns={2} gap={3} /></div></Section>,
};
export const TwoColumnMediaComparison: Story = {
 render: () => <Section background="beige" headerVariant="title-only" title="Two-column media comparison"><ProjectImageGrid images={images} columns={2} gap={3} /></Section>,
};
