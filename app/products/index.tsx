'use client'

import { FC, useState, useMemo } from "react";
import { ProductCard } from "@/app/components/product-card";
import { Pagination } from "@/app/components/pagination";
import { SortSidebar } from "../components/sort-sidebar";
import { HeaderWithSearch } from "@/app/components/header";
import { Product } from "@/app/lib/types";

type SortKey = "title" | "rating";
type SortOrder = "asc" | "desc";

export const View: FC<{ products: Product[] }> = ({ products }) => {
	const [sortKey, setSortKey] = useState<SortKey>("title");
	const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

	const sortedProducts = useMemo(() => {
		const sorted = [...products].sort((a, b) => {
			let aValue: string | number = "";
			let bValue: string | number = "";

			if (sortKey === "title") {
				aValue = a.title.toLowerCase();
				bValue = b.title.toLowerCase();
				if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
				if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
				return 0;
			} else if (sortKey === "rating") {
				aValue = a.rating;
				bValue = b.rating;
				return sortOrder === "asc"
					? (aValue as number) - (bValue as number)
					: (bValue as number) - (aValue as number);
			}
			return 0;
		});
		return sorted;
	}, [products, sortKey, sortOrder]);

	const handleSortKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSortKey(e.target.value as SortKey);
	};

	const toggleSortOrder = () => {
		setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
	};

	return (
		<main className="w-full h-min-screen">
			<HeaderWithSearch
				title="Product List page"
				subtitle="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum, molestias."
				inputPlaceholder="Type a keyword"
			/>

			<section className="px-4 py-4 ">
				<div className="grid grid-cols-12 gap-x-4">
					<div className="col-span-3 pl-12">
						<SortSidebar
							sortKey={sortKey}
							sortOrder={sortOrder}
							onSortKeyChange={handleSortKeyChange}
							onToggleSortOrder={toggleSortOrder}
						/>
					</div>

					<div className="col-span-9 flex flex-col gap-y-4 items-center justify-center">
						<div className="grid grid-cols-3 gap-4">
							{sortedProducts.map((product) => (
								<ProductCard
									key={product.id}
									id={product.id}
									imageUrl={product.thumbnail}
									title={product.title}
									description={product.description}
									ratings={product.rating}
									price={product.price}
									discountPercentage={product.discountPercentage}
								/>
							))}
						</div>

						<Pagination totalPages={10} currentPage={1} onPageChange={() => { }} />
					</div>
				</div>
			</section>
		</main>
	);
};