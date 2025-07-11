'use client'

import { FC } from "react";
import { ProductCard } from "@/app/components/product-card";
import { Pagination } from "@/app/components/pagination";
import { CategorySidebar } from "@/app/products/components/category-sidebar";
import { HeaderWithSearch } from "@/app/components/header";

export const View: FC = () => {
	return <main className="w-full h-min-screen">
		<HeaderWithSearch title="Product List page" subtitle="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum, molestias." inputPlaceholder="Type a keyword" />

		<section className="container mx-auto py-4 ">
			<div className="grid grid-cols-12 gap-x-4">
				<div className="col-span-3">
					<CategorySidebar title="CATEGORIES" categories={[
						"Clothing",
						"Books",
						"Toys",
						"Furniture",
						"Shoes",
						"Jewelry",
					]} selectedCategories={[]} onCategoryChange={() => { }} />
				</div>

				<div className="col-span-9 flex flex-col gap-y-4 items-center justify-center">
					<div className="grid grid-cols-3 gap-4">
						{[...Array(9)].map((_, index) => (
							<ProductCard key={index} id={index} imageUrl="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" title="Product 1" description="Product 1 description" ratings={4.5} />
						))}
					</div>

					<Pagination totalPages={10} currentPage={1} onPageChange={() => { }} />
				</div>
			</div>
		</section>
	</main>;
};