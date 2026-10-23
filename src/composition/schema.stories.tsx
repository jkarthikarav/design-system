import type { Meta, StoryObj } from '@storybook/react';
import { compositionSchema } from './schema';

const meta = {
  title: 'Foundations/Composition Schema',
  parameters: { layout: 'padded' },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const AllowedComposition: Story = {
  render: () => (
    <div style={{ maxWidth: 900, fontFamily: 'sans-serif' }}>
      <p>
        This schema defines which JAKpot elements may contain other elements.
        BuilderApp uses the same source for nesting rules and child controls.
      </p>
      {Object.values(compositionSchema).map((component) => (
        <section
          key={component.label}
          style={{ padding: '16px 0', borderBottom: '1px solid #ddd' }}
        >
          <h3 style={{ margin: '0 0 8px' }}>{component.label}</h3>
          {component.acceptsChildren ? (
            <p style={{ margin: '0 0 6px' }}>
              Can contain: {component.allowedChildren.length
                ? component.allowedChildren.map((name) => compositionSchema[name].label).join(', ')
                : 'No elements'}
            </p>
          ) : (
            <p style={{ margin: 0 }}>Leaf element — cannot contain children.</p>
          )}
        </section>
      ))}
    </div>
  ),
};
