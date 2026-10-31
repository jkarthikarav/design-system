/**
 * Shared composition schema for the JAKpot Builder and Storybook.
 * Keep the allowed parent/child relationships here rather than duplicating
 * container rules in the builder UI.
 */
export const compositionSchema = {
  section: {
    label: 'Section',
    acceptsChildren: true,
    allowedChildren: [
      'section-header', 'description-group', 'typography', 'button', 'tag', 'icon', 'icon',
      'grid', 'project-link-card', 'case-study-card', 'structured-list',
      'image-caption', 'project-image-grid', 'skeleton',
    ],
  },
  'section-header': { label: 'Section header', acceptsChildren: false, allowedChildren: [] },
  'description-group': { label: 'Description group', acceptsChildren: false, allowedChildren: [] },
  typography: { label: 'Typography / text', acceptsChildren: false, allowedChildren: [] },
  button: { label: 'Button', acceptsChildren: false, allowedChildren: [] },
  tag: { label: 'Tag', acceptsChildren: false, allowedChildren: [] },
  icon: { label: 'Icon', acceptsChildren: false, allowedChildren: [] },
  grid: {
    label: 'Grid',
    acceptsChildren: true,
    allowedChildren: [
      'description-group', 'typography', 'button', 'tag',
      'project-link-card', 'case-study-card', 'structured-list', 'image-caption',
      'skeleton',
    ],
  },
  'project-link-card': { label: 'Project link card', acceptsChildren: false, allowedChildren: [] },
  'case-study-card': { label: 'Case study card', acceptsChildren: false, allowedChildren: [] },
  'structured-list': { label: 'Structured list', acceptsChildren: false, allowedChildren: [] },
  'image-caption': { label: 'Image with caption', acceptsChildren: false, allowedChildren: [] },
  'project-image-grid': {
    label: 'Project image grid',
    acceptsChildren: true,
    allowedChildren: ['image-caption', 'skeleton'],
  },
  footer: { label: 'Footer', acceptsChildren: false, allowedChildren: [] },
  skeleton: { label: 'Skeleton HTML', acceptsChildren: false, allowedChildren: [] },
} as const;

export type CompositionElementType = keyof typeof compositionSchema;

export function canContain(type: string): type is CompositionElementType {
  return type in compositionSchema && compositionSchema[type as CompositionElementType].acceptsChildren;
}

export function canNest(parentType: string, childType: string): boolean {
  if (!(parentType in compositionSchema)) return false;
  return (compositionSchema[parentType as CompositionElementType].allowedChildren as readonly string[]).includes(childType);
}
