import './CaseStudyCard.css';
import { Typography } from './Typography';
import { Button } from './Button';

export interface CaseStudyHighlight {
  heading: string;
  description: string;
}

export type CaseStudyCardVariant = 'default' | 'outcome';

export interface CaseStudyCardProps {
  eyebrow: string;
  title: string;
  description: string;
  highlights: [CaseStudyHighlight, CaseStudyHighlight, CaseStudyHighlight];
  date: string;
  role: string;
  variant?: CaseStudyCardVariant;
  buttonLabel?: string;
  onExplore?: () => void;
}

export function CaseStudyCard({
  eyebrow,
  title,
  description,
  highlights,
  date,
  role,
  variant = 'default',
  buttonLabel = 'Explore',
  onExplore,
}: CaseStudyCardProps) {
  const isOutcome = variant === 'outcome';

  return (
    <article className={`case-study-card case-study-card--${variant}`}>
      <div className="case-study-card__top">
        <div className="case-study-card__content">
          <Typography variant="eyebrow">
            {eyebrow}
          </Typography>

          <div className="case-study-card__title-row">
            <Typography variant="card-heading" as="h2">
              {title}
            </Typography>
          </div>

          <Typography variant="description-large" width="wide">
            {description}
          </Typography>
        </div>

        {!isOutcome && (
          <Button variant="primary" onClick={onExplore}>
            {buttonLabel} →
          </Button>
        )}
      </div>

      <div className="case-study-card__highlights">
        {highlights.map((highlight) => (
          <div
            className="case-study-card__highlight"
            key={highlight.heading}
          >
            <Typography variant="section-subheading" as="h3">
              {highlight.heading}
            </Typography>

            <Typography variant="description-medium">
              {highlight.description}
            </Typography>
          </div>
        ))}
      </div>

      {!isOutcome && (
        <footer className="case-study-card__footer">
          <Typography
            variant="eyebrow"
            className="case-study-card__date"
          >
            {date}
          </Typography>

          <Typography
            variant="image-caption"
            className="case-study-card__role"
          >
            {role}
          </Typography>
        </footer>
      )}
    </article>
  );
}