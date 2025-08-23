/** biome-ignore-all lint/performance/noImgElement: this image component is just used in chat. it's not an LCP performance bottleneck. */ /** biome-ignore-all lint/nursery/useImageSize: image sizes cannot be estimated. i'll look into this later. */

import { cn } from '@repo/design-system/lib/utils';
import type { Experimental_GeneratedImage } from 'ai';

export type ImageProps = Experimental_GeneratedImage & {
  className?: string;
  alt?: string;
};

export const Image = ({
  base64,
  uint8Array,
  mediaType,
  ...props
}: ImageProps) => (
  <img
    {...props}
    alt={props.alt}
    className={cn(
      'h-auto max-w-full overflow-hidden rounded-md',
      props.className
    )}
    src={`data:${mediaType};base64,${base64}`}
  />
);
