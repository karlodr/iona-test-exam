"use client";

import { FC, useState, useMemo, useCallback, useRef, useEffect } from "react";
import { ProductCard } from "@/app/components/product-card";
import { Pagination } from "@/app/components/pagination";
import { SortSidebar } from "../components/sort-sidebar";
import { HeaderWithSearch } from "@/app/components/header";
import { Product } from "@/app/lib/types";

import { ProductAPI } from "@/app/lib/api/product";

const PAGE_SIZE = 21;

const debounce = <T extends unknown[]>(
  func: (...args: T) => void,
  delay: number,
) => {
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

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [paginatedProducts, setPaginatedProducts] =
    useState<Product[]>(products);
  const [totalProducts, setTotalProducts] = useState<number>(products.length);

  // For search pagination
  const [searchTotal, setSearchTotal] = useState<number>(0);

  // Fetch paginated products when not searching
  useEffect(() => {
    if (searchValue.trim() !== "") return; // Don't fetch if searching
    const fetchPaginated = async () => {
      setIsSearching(true);
      setSearchError(null);
      try {
        const skip = (currentPage - 1) * PAGE_SIZE;
        const res = await ProductAPI.getPaginated(skip, PAGE_SIZE);
        setPaginatedProducts(res.products);
        setTotalProducts(res.total);
      } catch {
        setSearchError("Failed to fetch products");
        setPaginatedProducts([]);
      } finally {
        setIsSearching(false);
      }
    };
    fetchPaginated();
  }, [currentPage, searchValue]);

  const performSearch = useCallback(async (value: string, page: number = 1) => {
    if (value.trim() === "") {
      setSearchResults(null);
      setSearchError(null);
      setSearchTotal(0);
      return;
    }

    setIsSearching(true);
    setSearchError(null);

    try {
      const skip = (page - 1) * PAGE_SIZE;
      const res = await ProductAPI.search(value, { skip, limit: PAGE_SIZE });
      setSearchResults(res.products);
      setSearchTotal(res.total);
    } catch {
      setSearchError("Failed to search products");
      setSearchResults([]);
      setSearchTotal(0);
    } finally {
      setIsSearching(false);
    }
  }, []);

  const debouncedSearch = useRef(
    debounce((value: string, page: number = 1) => {
      performSearch(value, page);
    }, 400),
  ).current;

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchValue(value);
      setCurrentPage(1);
      debouncedSearch(value, 1);
    },
    [debouncedSearch],
  );

  // When currentPage changes and searching, fetch new search page
  useEffect(() => {
    if (searchValue.trim() === "") return;
    performSearch(searchValue, currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const sortedProducts = useMemo(() => {
    const list =
      searchValue.trim() !== ""
        ? (searchResults ?? [])
        : (paginatedProducts ?? []);
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
  }, [
    paginatedProducts,
    searchResults,
    products,
    searchValue,
    sortKey,
    sortOrder,
  ]);

  const handleSortKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSortKey(e.target.value as SortKey);
  };

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const shouldShowPagination =
    (searchValue.trim() !== ""
      ? (searchResults?.length ?? 0)
      : (paginatedProducts?.length ?? 0)) > 0;

  const totalPages = useMemo(() => {
    if (searchValue.trim() !== "") {
      return Math.ceil(searchTotal / PAGE_SIZE) || 1;
    }
    return Math.ceil(totalProducts / PAGE_SIZE) || 1;
  }, [searchValue, searchTotal, totalProducts]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (searchValue.trim() !== "") {
      debouncedSearch(searchValue, page);
    }
  };

  return (
    <main className="w-full h-min-screen">
      <HeaderWithSearch
        title="Product List page"
        subtitle="Browse our collection of products. Use the search and sorting options to find exactly what you need."
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
                  <Pagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};
