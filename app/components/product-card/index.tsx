import { FC } from "react";
import { useRouter } from "next/navigation";
import { Image } from "@/app/components/image";
import { Rating } from "@/app/components/rating";
import { PriceDisplay } from "@/app/components/price-display";

type ProductCardProps = {
  id: number;
  imageUrl: string;
  title: string;
  description: string;
  ratings: number;
  price: number;
  discountPercentage: number;
  className?: string;
};

export const ProductCard: FC<ProductCardProps> = ({
  id,
  imageUrl,
  title,
  description,
  ratings,
  price,
  discountPercentage,
  className = "",
}) => {
  const router = useRouter();

  const handleClick = (id: number) => {
    router.push(`/products/${id}`);
  };

  return (
    <div
      onClick={() => handleClick(id)}
      className={
        className ||
        "card bg-base-100 w-full shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.01] cursor-pointer"
      }
    >
      <figure>
        <Image src={imageUrl} alt={title} width={300} height={300} />
      </figure>
      <div className="card-body">
        <PriceDisplay price={price} discountPercentage={discountPercentage} />
        <h2 className="card-title">{title}</h2>
        <p
          title={description}
          className="line-clamp-2 text-sm"
          style={{ maxWidth: "100%" }}
        >
          {description}
        </p>
        <div className="flex items-center gap-2 mb-2">
          <Rating ratings={ratings} />
          <span className="text-sm text-gray-500">({ratings}/5)</span>
        </div>
      </div>
    </div>
  );
};
