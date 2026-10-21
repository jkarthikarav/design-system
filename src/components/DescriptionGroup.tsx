import type { HTMLAttributes } from 'react';
import { Typography } from './Typography';
import './DescriptionGroup.css';

export interface DescriptionGroupProps
  extends HTMLAttributes<HTMLDivElement> {
  lead: string;
  descriptions: string[];
  width?: 'wide' | 'narrow';
}

export function DescriptionGroup({
  lead,
  descriptions,
  width = 'wide',
  className = '',
  ...props
}: DescriptionGroupProps) {
  const classes = [
    'description-group',
    `description-group--${width}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} {...props}>
      <Typography variant="description-large">
        {lead}
      </Typography>

      {descriptions.length > 0 && (
        <div className="description-group__supporting">
          {descriptions.map((description, index) => (
            <Typography
              key={`${index}-${description.slice(0, 20)}`}
              variant="description-medium"
            >
              {description}
            </Typography>
          ))}
        </div>
      )}
    </div>
  );
}