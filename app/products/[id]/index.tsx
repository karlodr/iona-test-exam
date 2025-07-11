import { FC } from "react";
import Link from "next/link";
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
        <div className="mb-6 absolute top-8 left-8 z-20">
          <Link
            href="/products"
            className="inline-flex items-center px-3 py-1 rounded-full bg-white/80 text-xs font-medium shadow-lg opacity-80 hover:opacity-100 transition-all duration-200 hover:bg-gray-100 hover:shadow-xl backdrop-blur-md"
            style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}
          >
            &larr; Back
          </Link>
        </div>
        <div className="grid grid-cols-2 h-full">
          <ProductImage src={product.thumbnail} alt={product.title} />
          <ProductInfo {...product} />
        </div>
      </div>
    </section>
  );
};
