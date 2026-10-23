/**
 * Shared composition metadata for Storybook documentation and the page builder.
 *
 * Component props are defined beside each React component. This schema defines
 * the separate question of which design-system components the builder may nest.
 * Keep these definitions in sync with the component implementations.
 */

export type CompositionComponentName =
  | 'Section'
  | 'SectionHeader'
  | 'Typography'
  | 'Grid'
  | 'DescriptionGroup'
  | 'Button'
  | 'CaseStudyCard'
  | 'StructuredList'
  | 'ProjectLinkCard'
  | 'ImageCaption'
  | 'ProjectImageGrid'
  | 'Tag';

export interface CompositionPropDefinition {
  name: string;
  type: string;
  required?: boolean;
  description: string;
}

export interface CompositionDefinition {
  name: CompositionComponentName;
  description: string;
  acceptsChildren: boolean;
  allowedChildren: CompositionComponentName[];
  props: CompositionPropDefinition[];
}

export const compositionSchema: Record<CompositionComponentName, CompositionDefinition> = {
  Section: {
    name: 'Section',
    description: 'Page-level section with background, optional header, and content area.',
    acceptsChildren: true,
    allowedChildren: [
      'SectionHeader', 'Typography', 'Grid', 'DescriptionGroup', 'Button',
      'CaseStudyCard', 'StructuredList', 'ProjectLinkCard', 'ImageCaption',
      'ProjectImageGrid', 'Tag',
    ],
    props: [
      { name: 'background', type: "'beige' | 'white'", description: 'Section background.' },
      { name: 'headerVariant', type: "'with-description' | 'without-eyebrow' | 'title-only'", description: 'Variant used by the optional section header.' },
      { name: 'eyebrow', type: 'string', description: 'Optional header eyebrow text.' },
      { name: 'title', type: 'string', description: 'Optional section title; renders the internal header.' },
      { name: 'description', type: 'string', description: 'Optional header description.' },
      { name: 'contentWidth', type: "'full' | 'wide' | 'narrow'", description: 'Maximum width of the section content.' },
    ],
  },
  SectionHeader: {
    name: 'SectionHeader',
    description: 'Displays an eyebrow, heading, and optional description.',
    acceptsChildren: false,
    allowedChildren: [],
    props: [
      { name: 'title', type: 'string', required: true, description: 'Heading text.' },
      { name: 'eyebrow', type: 'string', description: 'Optional eyebrow text.' },
      { name: 'description', type: 'string', description: 'Optional supporting text.' },
      { name: 'variant', type: "'with-description' | 'without-eyebrow' | 'title-only'", description: 'Controls which text elements are displayed.' },
    ],
  },
  Typography: {
    name: 'Typography',
    description: 'Styled text primitive.',
    acceptsChildren: false,
    allowedChildren: [],
    props: [{ name: 'variant', type: 'TypographyVariant', required: true, description: 'Text style to apply.' }],
  },
  Grid: {
    name: 'Grid',
    description: 'Arranges its child elements in one, two, or three columns.',
    acceptsChildren: true,
    allowedChildren: [
      'Typography', 'Button', 'CaseStudyCard', 'ProjectLinkCard',
      'ImageCaption', 'ProjectImageGrid', 'Tag', 'DescriptionGroup',
    ],
    props: [
      { name: 'columns', type: '1 | 2 | 3', description: 'Number of columns.' },
      { name: 'gap', type: '1 | 2 | 3 | 4 | 5 | 6', description: 'Spacing token between grid items.' },
    ],
  },
  DescriptionGroup: {
    name: 'DescriptionGroup',
    description: 'A lead statement with supporting descriptions.',
    acceptsChildren: false,
    allowedChildren: [],
    props: [
      { name: 'lead', type: 'string', required: true, description: 'Primary statement.' },
      { name: 'descriptions', type: 'string[]', required: true, description: 'Supporting paragraphs.' },
      { name: 'width', type: "'wide' | 'narrow'", description: 'Text width.' },
    ],
  },
  Button: {
    name: 'Button',
    description: 'Action control.',
    acceptsChildren: false,
    allowedChildren: [],
    props: [{ name: 'variant', type: 'ButtonVariant', description: 'Visual button style.' }],
  },
  CaseStudyCard: {
    name: 'CaseStudyCard',
    description: 'Structured project summary or outcome.',
    acceptsChildren: false,
    allowedChildren: [],
    props: [
      { name: 'variant', type: "'default' | 'outcome'", description: 'Default card or outcome presentation.' },
      { name: 'title', type: 'string', required: true, description: 'Project or outcome title.' },
    ],
  },
  StructuredList: {
    name: 'StructuredList',
    description: 'Numbered list of titled items and descriptions.',
    acceptsChildren: false,
    allowedChildren: [],
    props: [{ name: 'items', type: 'StructuredListItem[]', required: true, description: 'List item data.' }],
  },
  ProjectLinkCard: {
    name: 'ProjectLinkCard',
    description: 'Card linking to a project or resource.',
    acceptsChildren: false,
    allowedChildren: [],
    props: [],
  },
  ImageCaption: {
    name: 'ImageCaption',
    description: 'Image with an associated caption.',
    acceptsChildren: false,
    allowedChildren: [],
    props: [],
  },
  ProjectImageGrid: {
    name: 'ProjectImageGrid',
    description: 'Grid presentation for project imagery.',
    acceptsChildren: false,
    allowedChildren: [],
    props: [],
  },
  Tag: {
    name: 'Tag',
    description: 'Compact label for categorization.',
    acceptsChildren: false,
    allowedChildren: [],
    props: [],
  },
};

export function canContain(
  parent: CompositionComponentName,
  child: CompositionComponentName,
): boolean {
  return compositionSchema[parent].allowedChildren.includes(child);
}
