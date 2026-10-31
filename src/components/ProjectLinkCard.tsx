import './ProjectLinkCard.css';
import { Button } from './Button';
import { Icon, type IconSize } from './Icon';

export interface ProjectLinkCardProps {
  title: string;
  eyebrow?: string;
  description?: string;
  logoSrc?: string;
  logoAlt?: string;
  variant?: 'neutral' | 'inverse' | 'icon';
  iconSrc?: string;
  iconAlt?: string;
  iconSize?: IconSize;
  showButton?: boolean;
  buttonLabel?: string;
  onExplore?: () => void;
}

export function ProjectLinkCard({
  title,
  eyebrow,
  description,
  logoSrc,
  logoAlt = '',
  variant = 'neutral',
  iconSrc,
  iconAlt = '',
  iconSize = '24',
  showButton = true,
  buttonLabel = 'Explore project',
  onExplore,
}: ProjectLinkCardProps) {
  const classes = [
    'project-link-card',
    `project-link-card--${variant}`,
  ].join(' ');

  return (
    <article className={classes}>
      <div className="project-link-card__top">
        {variant === 'icon' ? (
          iconSrc ? <Icon className="project-link-card__icon" src={iconSrc} alt={iconAlt} size={iconSize} /> : null
        ) : logoSrc ? (
          <img
            className="project-link-card__logo"
            src={logoSrc}
            alt={logoAlt}
          />
        ) : eyebrow ? (
          <span className="project-link-card__eyebrow">
            {eyebrow}
          </span>
        ) : null}

        <h3 className="project-link-card__title">{title}</h3>

        {description && (
          <p className="project-link-card__description">
            {description}
          </p>
        )}
      </div>

      {showButton && (
        <div className="project-link-card__action">
          <Button
            variant="primary"
            onClick={onExplore}
          >
            {buttonLabel}
          </Button>
        </div>
      )}
    </article>
  );
}