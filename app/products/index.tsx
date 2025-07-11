'use client'

import { FC, useState, useMemo, useCallback, useRef } from "react";
import { ProductCard } from "@/app/components/product-card";
import { Pagination } from "@/app/components/pagination";
import { SortSidebar } from "../components/sort-sidebar";
import { HeaderWithSearch } from "@/app/components/header";
import { Product } from "@/app/lib/types";

import { ProductAPI } from "@/app/lib/api/product";

const debounce = <T extends unknown[]>(func: (...args: T) => void, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: T) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

type SortKey = "title" | "rating";
type SortOrder = "asc" | "desc";

export const View: FC<{ products: Product[] }> = ({ products }) => {
	const [sortKey, setSortKey] = useState<SortKey>("title");
	const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
	const [searchValue, setSearchValue] = useState<string>("");
	const [searchResults, setSearchResults] = useState<Product[] | null>(null);
	const [isSearching, setIsSearching] = useState(false);
	const [searchError, setSearchError] = useState<string | null>(null);

	const performSearch = useCallback(
		async (value: string) => {
			if (value.trim() === "") {
				setSearchResults(null);
				setSearchError(null);
				return;
			}

			setIsSearching(true);
			setSearchError(null);

			try {
				const res = await ProductAPI.search(value);
				setSearchResults(res.products);
			} catch {
				setSearchError("Failed to search products");
				setSearchResults([]);
			} finally {
				setIsSearching(false);
			}
		},
		[]
	);

	const debouncedSearch = useRef(
		debounce((value: string) => {
			performSearch(value);
		}, 400)
	).current;

	const handleInputChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const value = e.target.value;
			setSearchValue(value);
			debouncedSearch(value);
		},
		[debouncedSearch]
	);

	const sortedProducts = useMemo(() => {
		const list = searchResults !== null ? searchResults : products;
		const sorted = [...list].sort((a, b) => {
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
	}, [products, searchResults, sortKey, sortOrder]);

	const handleSortKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSortKey(e.target.value as SortKey);
	};

	const toggleSortOrder = () => {
		setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
	};

	const shouldShowPagination = sortedProducts.length > 0;

	return (
		<main className="w-full h-min-screen">
			<HeaderWithSearch
				title="Product List page"
				subtitle="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum, molestias."
				inputPlaceholder="Type a keyword"
				inputValue={searchValue}
				onInputChange={handleInputChange}
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
						{isSearching && (
							<div className="text-center text-gray-500 py-8">Searching...</div>
						)}
						{searchError && (
							<div className="text-center text-red-500 py-8">{searchError}</div>
						)}
						{!isSearching && !searchError && (
							<>
								<div className="grid grid-cols-3 gap-4">
									{sortedProducts.length === 0 ? (
										<div className="col-span-3 text-center text-gray-500 py-8">
											No products found.
										</div>
									) : (
										sortedProducts.map((product) => (
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
										))
									)}
								</div>

								{shouldShowPagination && (
									<Pagination totalPages={10} currentPage={1} onPageChange={() => { }} />
								)}
							</>
						)}
					</div>
				</div>
			</section>
		</main>
	);
};