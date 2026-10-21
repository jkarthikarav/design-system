import type { HTMLAttributes } from 'react';
import './Grid.css';

export type GridColumns = 1 | 2 | 3;

export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  columns?: GridColumns;
  gap?: 1 | 2 | 3 | 4 | 5 | 6;
}

export function Grid({
  columns = 3,
  gap = 4,
  className = '',
  children,
  ...props
}: GridProps) {
  const classes = [
    'grid',
    `grid--columns-${columns}`,
    `grid--gap-${gap}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}