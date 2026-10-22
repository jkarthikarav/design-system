import type { Meta, StoryObj } from '@storybook/react-vite';
import { Section } from '../components/Section';
import { Grid } from '../components/Grid';
import { CaseStudyCard, type CaseStudyCardProps } from '../components/CaseStudyCard';
const meta = { title: 'Patterns/Card Layouts', parameters: { layout: 'fullscreen' } } satisfies Meta;
export default meta;
type Story = StoryObj<typeof meta>;
const outcomes: CaseStudyCardProps[] = [
{eyebrow:'OUTCOME 01',title:'Clearer discovery',description:'Key information is easier to find.',highlights:[{heading:'Entry points',description:'Content is easier to locate.'},{heading:'Orientation',description:'Visitors understand the service.'},{heading:'Continuity',description:'Related information connects.'}],date:'Project period',role:'Research · Design'},
{eyebrow:'OUTCOME 02',title:'Simpler access',description:'Requirements follow a clearer sequence.',highlights:[{heading:'Resources',description:'Practical details are grouped.'},{heading:'Sequence',description:'Next steps are easier to follow.'},{heading:'Clarity',description:'Policies are easier to find.'}],date:'Project period',role:'Research · Design'},
{eyebrow:'OUTCOME 03',title:'Reusable patterns',description:'Layouts can support future content.',highlights:[{heading:'Reuse',description:'Common structures repeat.'},{heading:'Consistency',description:'Patterns stay familiar.'},{heading:'Growth',description:'New content can fit.'}],date:'Project period',role:'Research · Design'},
];
export const OutcomeCardGrid: Story = {
 render: () => <Section background="beige" headerVariant="title-only" title="Outcome card grid"><Grid columns={3} gap={4}>{outcomes.map(item => <CaseStudyCard key={item.eyebrow} {...item} variant="outcome" />)}</Grid></Section>,
};
