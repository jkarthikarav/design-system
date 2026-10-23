import { Button } from './Button';
import './Footer.css';

export interface FooterProps {
  leftText?: string;
  rightText?: string;
  backToTopLabel?: string;
  className?: string;
}

export function Footer({
  leftText = 'Website developed by Karthik',
  rightText = 'Based in Ontario, Canada.',
  backToTopLabel = 'Back to top ↑',
  className = '',
}: FooterProps) {
  return (
    <footer className={`footer ${className}`.trim()}>
      <p className="footer__text">{leftText}</p>
      <p className="footer__text">{rightText}</p>
      <Button variant="tertiary" className="footer__back-to-top">
        {backToTopLabel}
      </Button>
    </footer>
  );
}
