
import type { ElementType, HTMLAttributes } from 'react';
import './Typography.css';

export type TypographyVariant =
  | 'hero-heading'
  | 'section-heading'
  | 'card-heading'
  | 'hero-subheading'
  | 'section-subheading'
  | 'description-large'
  | 'description-medium'
  | 'card-description'
  | 'image-caption'
  | 'eyebrow';

export type TextAlignment = 'left' | 'center';
export type DescriptionWidth = 'full' | 'wide' | 'narrow';

export interface TypographyProps
  extends HTMLAttributes<HTMLElement> {
  variant: TypographyVariant;
  align?: TextAlignment;
  width?: DescriptionWidth;
  as?: ElementType;
}

const defaultElements: Record<TypographyVariant, ElementType> = {
  'hero-heading': 'h1',
  'section-heading': 'h2',
  'card-heading': 'h3',
  'hero-subheading': 'p',
  'section-subheading': 'p',
  'description-large': 'p',
  'description-medium': 'p',
  'card-description': 'p',
  'image-caption': 'figcaption',
  eyebrow: 'p',
};

export function Typography({
  variant,
  align = 'left',
  width = 'full',
  as,
  className = '',
  children,
  ...props
}: TypographyProps) {
  const Component = as ?? defaultElements[variant];

  const classes = [
    'typography',
    `typography--${variant}`,
    `typography--${align}`,
    `typography--width-${width}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
}
