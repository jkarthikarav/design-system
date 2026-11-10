import type { CSSProperties } from 'react';
import './Folder.css';

export interface FolderProps {
  title: string;
  description?: string;
  href: string;
  logoSrc?: string;
  logoAlt?: string;
  logoMinHeight?: number;
  className?: string;
}

export function Folder({ title, description, href, logoSrc, logoAlt = '', logoMinHeight = 256, className = '' }: FolderProps) {
  const classes = ['jakpot-folder', className].filter(Boolean).join(' ');
  return (
    <a className={classes} href={href} style={{ '--folder-logo-min-height': `${logoMinHeight}px` } as CSSProperties}>
      <svg className="jakpot-folder__top" viewBox="0 0 320 48" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 48V38Q0 28 10 28H64Q72 28 80 21L99 5Q104 0 112 0H308Q320 0 320 12V48Z" />
      </svg>
      <div className="jakpot-folder__content">
        <h3 className="jakpot-folder__title">{title}</h3>
        <div className="jakpot-folder__details">
          {description && <p className="jakpot-folder__description">{description}</p>}
          {logoSrc && <img className="jakpot-folder__logo" src={logoSrc} alt={logoAlt} />}
        </div>
      </div>
      <svg className="jakpot-folder__bottom" viewBox="0 0 320 48" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 0H320V36Q320 48 308 48H40Q32 48 25 41L5 21Q0 16 0 8Z" />
      </svg>
    </a>
  );
}
