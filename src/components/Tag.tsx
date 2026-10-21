import type { HTMLAttributes } from 'react';
import './Tag.css';

export type TagVariant = 'default' | 'accent' | 'inverse';

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: TagVariant;
}

export function Tag({
  variant = 'default',
  className = '',
  children,
  ...props
}: TagProps) {
  const classes = [
    'tag',
    `tag--${variant}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes} {...props}>
      {children}
    </span>
  );
}