import './Icon.css';

export type IconSize = '16' | '18' | '20' | '24' | '32';

export interface IconProps {
  src: string;
  alt?: string;
  size?: IconSize;
  className?: string;
}

export function Icon({ src, alt = '', size = '20', className }: IconProps) {
  if (!src) return null;

  const classes = ['jakpot-icon', `jakpot-icon--${size}`, className]
    .filter(Boolean)
    .join(' ');

  return <img className={classes} src={src} alt={alt} />;
}
