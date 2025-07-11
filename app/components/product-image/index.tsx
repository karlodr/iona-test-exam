import { FC } from "react";
import { Image } from "@/app/components/image";

type ProductImageProps = {
  src: string;
  alt?: string;
};

export const ProductImage: FC<ProductImageProps> = ({ src, alt = "product" }) => (
  <div className="relative h-full flex items-center justify-center overflow-hidden">
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
    
    <Image
      src={src}
      alt={alt}
      width={400}
      height={400}
      className="relative z-10 max-h-[80%] max-w-[80%] rounded-lg shadow-lg"
      placeholder="blur"
      priority={false}
    />
  </div>
);