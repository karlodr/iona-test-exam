import { FC } from "react";
import { ProductImage } from "@/app/components/product-image";
import { ProductDetails } from "@/app/components/product-details";
import { ProductInfo } from "@/app/products/[id]/product-info";

type ProductDetails = {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  category: string;
  rating: number;
  ratingCount: number;
  description: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  returnPolicy: string;
};

type ViewProps = Partial<ProductDetails>;

const defaultProductDetails: ProductDetails = {
  id: 0,
  title: "Unknown Product",
  price: 0,
  imageUrl: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
  category: "Uncategorized",
  rating: 4,
  ratingCount: 0,
  description: "No description available. No description available.No description available.No description available.",
  weight: 0,
  dimensions: {
    width: 0,
    height: 0,
    depth: 0,
  },
  warrantyInformation: "No warranty information.",
  shippingInformation: "No shipping information.",
  availabilityStatus: "Unavailable",
  returnPolicy: "No return policy.",
};

export const View: FC<ViewProps> = (props) => {
  const {
    title,
    price,
    imageUrl,
    category,
    rating,
    ratingCount,
    description,
    weight,
    dimensions,
    warrantyInformation,
    shippingInformation,
    availabilityStatus,
    returnPolicy,
  } = { ...defaultProductDetails, ...props };

  return (
    <section className="w-full">
      <div className="container mx-auto py-8 h-screen">
        <div className="grid grid-cols-2 h-full">
          <ProductImage src={imageUrl} alt={title} />
          <ProductInfo
            title={title}
            price={price}
            category={category}
            rating={rating}
            ratingCount={ratingCount}
            description={description}
            weight={weight}
            dimensions={dimensions}
            warrantyInformation={warrantyInformation}
            shippingInformation={shippingInformation}
            availabilityStatus={availabilityStatus}
            returnPolicy={returnPolicy}
          />
        </div>
      </div>
    </section>
  );
};
