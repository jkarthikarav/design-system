import type { Meta, StoryObj } from '@storybook/react-vite';
import { compositionSchema } from './schema';

const meta = {
  title: 'Foundations/Composition Schema',
  parameters: {
    docs: {
      description: {
        component:
          'Shared composition rules for the page builder. Component props describe settings; this schema describes which component types may be placed inside other components.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Reference: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '2rem', maxWidth: '70rem' }}>
      <p>
        <strong>Props</strong> control a component's content and settings.
        <strong> Child rules</strong> control which components the builder may nest.
      </p>
      {Object.values(compositionSchema).map((definition) => (
        <section key={definition.name} style={{ borderTop: '1px solid #d8d8d0', paddingTop: '1rem' }}>
          <h2>{definition.name}</h2>
          <p>{definition.description}</p>
          <p><strong>Accepts child components:</strong> {definition.acceptsChildren ? 'Yes' : 'No'}</p>
          <p><strong>Allowed children:</strong> {definition.allowedChildren.length ? definition.allowedChildren.join(', ') : 'None'}</p>
          <h3>Props</h3>
          {definition.props.length ? (
            <ul>
              {definition.props.map((prop) => (
                <li key={prop.name}>
                  <code>{prop.name}</code>{prop.required ? ' (required)' : ''} — <code>{prop.type}</code>: {prop.description}
                </li>
              ))}
            </ul>
          ) : <p>Props are documented with the component implementation.</p>}
        </section>
      ))}
    </div>
  ),
};
