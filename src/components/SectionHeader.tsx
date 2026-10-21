import type { HTMLAttributes } from 'react';
import { Typography } from './Typography';
import './SectionHeader.css';

export type SectionHeaderVariant =
  | 'with-description'
  | 'without-eyebrow'
  | 'title-only';

export interface SectionHeaderProps
  extends HTMLAttributes<HTMLDivElement> {
  title: string;
  eyebrow?: string;
  description?: string;
  variant?: SectionHeaderVariant;
}

export function SectionHeader({
  title,
  eyebrow,
  description,
  variant = 'with-description',
  className = '',
  ...props
}: SectionHeaderProps) {
  const classes = [
    'section-header',
    `section-header--${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} {...props}>
      <div className="section-header__main">
        {variant === 'with-description' && eyebrow && (
          <Typography variant="eyebrow">
            {eyebrow}
          </Typography>
        )}

        <Typography variant="section-heading" as="h2">
          {title}
        </Typography>
      </div>

      {variant !== 'title-only' && description && (
        <div className="section-header__description">
          <Typography variant="description-medium">
            {description}
          </Typography>
        </div>
      )}
    </div>
  );
}