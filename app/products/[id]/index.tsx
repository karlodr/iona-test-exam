import { FC } from "react";
import type { Product } from "@/app/lib/types";
import { ProductImage } from "@/app/components/product-image";
import { ProductInfo } from "@/app/products/[id]/components/product-info";

type ViewProps = {
  product: Product;
};

export const View: FC<ViewProps> = ({ product }) => {
  return (
    <section className="w-full">
      <div className="container mx-auto py-8 h-screen">
        <div className="grid grid-cols-2 h-full">
          <ProductImage src={product.thumbnail} alt={product.title} />
          <ProductInfo
            {...product}
          />
        </div>
      </div>
    </section>
  );
};
