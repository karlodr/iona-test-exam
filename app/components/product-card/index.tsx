import { FC } from "react";
import { useRouter } from "next/navigation";
import { Image } from "@/app/components/image";

type ProductCardProps = {
	id: number;
	imageUrl: string;
	title: string;
	description: string;
	ratings: number; // 0-5
	className?: string;
};

export const ProductCard: FC<ProductCardProps> = ({
	id,
	imageUrl,
	title,
	description,
	ratings,
	className = "",
}) => {
	const router = useRouter();

	const handleClick = (id: number) => {
		router.push(`/products/${id}`);
	}

	return (
		<div onClick={() => handleClick(id)} className={className || "card bg-base-100 w-full shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-[1.01] cursor-pointer"}>
			<figure>
				<Image src={imageUrl} alt={title} width={300} height={300} />
			</figure>
			<div className="card-body">
				<h2 className="card-title">{title}</h2>
				<p>{description}</p>
				<div className="flex items-center gap-2 mb-2">
					{[...Array(5)].map((_, i) => (
						<span key={i} className={i < ratings ? "text-yellow-400" : "text-gray-300"}>
							&#9733;
						</span>
					))}
					<span className="text-sm text-gray-500">({ratings}/5)</span>
				</div>
			</div>
		</div>
	);
};