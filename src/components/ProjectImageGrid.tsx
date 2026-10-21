import type { HTMLAttributes } from 'react';
import { Grid } from './Grid';
import { ImageCaption } from './ImageCaption';
import './ProjectImageGrid.css';

export interface ProjectImage {
  id: string;
  src: string;
  alt: string;
  caption?: string;
}

export interface ProjectImageGridProps
  extends HTMLAttributes<HTMLDivElement> {
  images: ProjectImage[];
  columns?: 1 | 2 | 3;
  gap?: 1 | 2 | 3 | 4 | 5 | 6;
}

export function ProjectImageGrid({
  images,
  columns = 2,
  gap = 3,
  className = '',
  ...props
}: ProjectImageGridProps) {
  const classes = [
    'project-image-grid',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} {...props}>
      <Grid columns={columns} gap={gap}>
        {images.map((image) => (
          <ImageCaption
            key={image.id}
            src={image.src}
            alt={image.alt}
            caption={image.caption}
            imageWidth="full"
            aspectRatio="auto"
          />
        ))}
      </Grid>
    </div>
  );
}