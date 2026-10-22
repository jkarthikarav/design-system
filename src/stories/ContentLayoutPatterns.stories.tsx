import type { Meta, StoryObj } from '@storybook/react-vite';
import { Section } from '../components/Section';
import { StructuredList } from '../components/StructuredList';
const meta = { title: 'Patterns/Content Layouts', parameters: { layout: 'fullscreen' } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
export const OrderedContentList: Story = {
  render: () => <Section background="white" headerVariant="title-only" title="A structured sequence"><StructuredList items={[{id:'one',title:'First step',description:'Introduce the first stage of the process.'},{id:'two',title:'Second step',description:'Explain what follows and what users need.'},{id:'three',title:'Next step',description:'Help people understand how to continue.'}]} /></Section>,
};
