import { FC } from "react";
import NextImage, { ImageProps as NextImageProps } from "next/image";

export type ImageProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  sources?: Array<{
    srcSet: string;
    type?: string;
    media?: string;
  }>;
} & Omit<NextImageProps, "src" | "alt" | "width" | "height" | "className">;

export const Image: FC<ImageProps> = ({
  src,
  alt,
  width,
  height,
  className = "",
  sources = [],
  ...imgProps
}) => {
  if (sources.length > 0) {
    return (
      <picture>
        {sources.map((source, idx) => (
          <source
            key={idx}
            srcSet={source.srcSet}
            type={source.type}
            media={source.media}
          />
        ))}
        <NextImage
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={className}
          loading="lazy"
          {...imgProps}
        />
      </picture>
    );
  }

  return (
    <NextImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      blurDataURL={src}
      loading="lazy"
      {...imgProps}
    />
  );
};
