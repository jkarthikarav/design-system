import type { HTMLAttributes } from 'react';
import './StructuredList.css';

export interface StructuredListItem {
  id: string;
  title: string;
  description: string;
  href?: string;
  external?: boolean;
}

export interface StructuredListProps
  extends HTMLAttributes<HTMLUListElement> {
  items: StructuredListItem[];
}

export function StructuredList({
  items,
  className = '',
  ...props
}: StructuredListProps) {
  const classes = ['structured-list', className]
    .filter(Boolean)
    .join(' ');

  return (
    <ol className={classes} {...props}>
      {items.map((item, index) => {
        const content = (
          <>
            <span className="structured-list__index" aria-hidden="true">
              {String(index + 1).padStart(2, '0')}
            </span>

            <span className="structured-list__content">
              <span className="structured-list__title">
                {item.title}
              </span>

              <span className="structured-list__description">
                {item.description}
              </span>
            </span>
          </>
        );

        return (
          <li className="structured-list__item" key={item.id}>
            {item.href ? (
              <a
                className="structured-list__link"
                href={item.href}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
              >
                {content}
              </a>
            ) : (
              <div className="structured-list__row">
                {content}
              </div>
            )}
          </li>
        );
      })}
    </ol>
  );
}