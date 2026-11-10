import type { Meta, StoryObj } from '@storybook/react-vite';
import { Folder } from '../components/Folder';

const meta = {
  title: 'Components/Folder',
  component: Folder,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    title: { control: 'text' },
    description: { control: 'text' },
    href: { control: 'text' },
    logoSrc: { control: 'text' },
    logoAlt: { control: 'text' },
    logoMinHeight: { control: 'number' },
  },
} satisfies Meta<typeof Folder>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: { title: 'Folder title', description: 'A short description of this destination.', href: '#', logoSrc: '', logoAlt: '', logoMinHeight: 256 },
};

export const ThreeColumnGrid: Story = {
  render: (args) => (
    <div className="jakpot-root">
      <div className="jakpot-grid jakpot-grid--columns-3 jakpot-grid--gap-3">
        <Folder {...args} title="First folder" />
        <Folder {...args} title="Second folder" />
        <Folder {...args} title="Third folder" />
      </div>
    </div>
  ),
  args: { href: '#', description: 'A short description.' },
};
