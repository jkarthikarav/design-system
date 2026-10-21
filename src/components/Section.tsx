import type { HTMLAttributes, ReactNode } from 'react';
import { SectionHeader, type SectionHeaderVariant } from './SectionHeader';
import './Section.css';

export type SectionBackground = 'beige' | 'white';

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  background?: SectionBackground;
  headerVariant?: SectionHeaderVariant;
  eyebrow?: string;
  title?: string;
  description?: string;
  contentWidth?: 'full' | 'wide' | 'narrow';
  children: ReactNode;
}

export function Section({
  background = 'beige',
  headerVariant = 'with-description',
  eyebrow,
  title,
  description,
  contentWidth = 'full',
  className = '',
  children,
  ...props
}: SectionProps) {
  const classes = [
    'section',
    `section--${background}`,
    `section--content-${contentWidth}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section className={classes} {...props}>
      <div className="section__inner">
        {title && (
          <SectionHeader
            variant={headerVariant}
            eyebrow={eyebrow}
            title={title}
            description={description}
          />
        )}

        <div className="section__content">
          {children}
        </div>
      </div>
    </section>
  );
}