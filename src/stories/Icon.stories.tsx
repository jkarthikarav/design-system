import type { Meta, StoryObj } from '@storybook/react-vite';
import { Icon } from '../components/Icon';

const meta = {
  title: 'Components/Icon',
  component: Icon,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    src: { control: 'text', description: 'Path or URL for the manually supplied icon image.' },
    alt: { control: 'text' },
    size: { control: 'select', options: ['16', '18', '20', '24', '32'] },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  args: { src: '/icons/your-icon.svg', alt: 'Icon description', size: '20' },
};

export const SizeScale: Story = {
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
      {(['16', '18', '20', '24', '32'] as const).map((size) => (
        <div key={size} style={{ display: 'grid', justifyItems: 'center', gap: 8 }}>
          <Icon {...args} size={size} />
          <span style={{ fontSize: 12 }}>{size}px</span>
        </div>
      ))}
    </div>
  ),
  args: { src: '/icons/your-icon.svg', alt: 'Icon size comparison' },
};
