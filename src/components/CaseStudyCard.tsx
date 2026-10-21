import './CaseStudyCard.css';
import { Typography } from './Typography';
import { Button } from './Button';

export interface CaseStudyHighlight {
  heading: string;
  description: string;
}

export interface CaseStudyCardProps {
  eyebrow: string;
  title: string;
  description: string;
  highlights: [CaseStudyHighlight, CaseStudyHighlight, CaseStudyHighlight];
  date: string;
  role: string;
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
  buttonLabel = 'Explore',
  onExplore,
}: CaseStudyCardProps) {
  return (
    <article className="case-study-card">
      <div className="case-study-card__top">
        <Typography variant="eyebrow">
          {eyebrow}
        </Typography>

        <div className="case-study-card__title-row">
          <Typography variant="card-heading" as="h2">
            {title}
          </Typography>

          <Button variant="primary" onClick={onExplore}>
            {buttonLabel} →
          </Button>
        </div>

        <Typography variant="description-large" width="wide">
          {description}
        </Typography>
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
    </article>
  );
}