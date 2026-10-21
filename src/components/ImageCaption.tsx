import type { ImgHTMLAttributes } from 'react';
import './ImageCaption.css';

export interface ImageCaptionProps {
  src: string;
  alt: string;
  caption?: string;
  imageWidth?: 'full' | 'wide' | 'narrow';
  aspectRatio?: 'auto' | 'landscape' | 'square';
  imageProps?: Omit<
    ImgHTMLAttributes<HTMLImageElement>,
    'src' | 'alt'
  >;
}

export function ImageCaption({
  src,
  alt,
  caption,
  imageWidth = 'full',
  aspectRatio = 'auto',
  imageProps,
}: ImageCaptionProps) {
  const classes = [
    'image-caption',
    `image-caption--${imageWidth}`,
    `image-caption--${aspectRatio}`,
  ].join(' ');

  return (
    <figure className={classes}>
      <img
        className="image-caption__image"
        src={src}
        alt={alt}
        {...imageProps}
      />

      {caption && (
        <figcaption className="image-caption__text">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}