import type { Product, ProductListResponse } from "@/app/lib/types";

const BASE_URL = "https://dummyjson.com/products"; // Environment variable
const DEFAULT_SKIP = 0;
const DEFAULT_LIMIT = 30;

type ProductDetailResponse = Product;

export const ProductAPI = {
  // Fetch all products with optional pagination
  async getAll({ skip = DEFAULT_SKIP, limit = DEFAULT_LIMIT }: { skip?: number; limit?: number } = {}): Promise<ProductListResponse> {
    const res = await fetch(`${BASE_URL}?skip=${skip}&limit=${limit}`);
    if (!res.ok) throw new Error("Failed to fetch products");
    return res.json();
  },

  // Fetch a single product by ID
  async getById(id: number): Promise<ProductDetailResponse> {
    const res = await fetch(`${BASE_URL}/${id}`);
    if (!res.ok) throw new Error(`Failed to fetch product with id ${id}`);
    return res.json();
  },

  // Search products by query
  async search(query: string, { skip = DEFAULT_SKIP, limit = DEFAULT_LIMIT }: { skip?: number; limit?: number } = {}): Promise<ProductListResponse> {
    const url = `${BASE_URL}/search?q=${encodeURIComponent(query)}&skip=${skip}&limit=${limit}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to search products");
    return res.json();
  },

  // Fetch products by category
  async getByCategory(category: string, { skip = DEFAULT_SKIP, limit = DEFAULT_LIMIT }: { skip?: number; limit?: number } = {}): Promise<ProductListResponse> {
    const url = `${BASE_URL}/category/${encodeURIComponent(category)}?skip=${skip}&limit=${limit}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch products for category ${category}`);
    return res.json();
  },

  // Fetch products with custom skip & limit (for pagination)
  async getPaginated(skip: number, limit: number): Promise<ProductListResponse> {
    const url = `${BASE_URL}?skip=${skip}&limit=${limit}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch paginated products");
    return res.json();
  },
};
