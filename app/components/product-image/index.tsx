import { FC } from "react";
import { Image } from "@/app/components/image";

type ProductImageProps = {
  src: string;
  alt?: string;
};

/**
 * This component currently renders the same image twice (once blurred, once sharp) which can cause
 * unnecessary network requests and memory usage, especially for large images.
 * 
 * A more efficient approach is to use Next.js's built-in blur placeholder feature,
 * which only loads a tiny blurred version as a placeholder and then swaps in the full image.
 * 
 * This way, only one image is loaded, and the blur effect is handled natively.
 * 
 * If you want a persistent blurred background behind the main image, you can use CSS to create a blurred
 * version of the same image using a background-image style, so the browser only loads the image once.
 */

export const ProductImage: FC<ProductImageProps> = ({ src, alt = "product" }) => (
  <div className="relative h-full flex items-center justify-center overflow-hidden">
    {/* Blurred background using CSS background-image */}
    <div
      className="absolute inset-0 w-full h-full object-cover blur-lg scale-110 z-0"
      style={{
        backgroundImage: `url(${src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: "blur(16px)",
        transform: "scale(1.1)",
      }}
      aria-hidden="true"
    />
    {/* Foreground product image with Next.js blur placeholder */}
    <Image
      src={src}
      alt={alt}
      width={400}
      height={400}
      className="relative z-10 max-h-[80%] max-w-[80%] rounded-lg shadow-lg"
      placeholder="blur"
      // blurDataURL can be provided for custom blur, or let Next.js generate it
      priority={false}
    />
  </div>
);