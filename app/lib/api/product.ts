import type { Product, ProductListResponse } from "@/app/lib/types";

const BASE_URL = "https://dummyjson.com/products";
const DEFAULT_SKIP = 0;
const DEFAULT_LIMIT = 30;

type ProductDetailResponse = Product;

function isValidPositiveInt(value: number): boolean {
  return Number.isInteger(value) && value >= 0;
}

export const ProductAPI = {
  async getAll({
    skip = DEFAULT_SKIP,
    limit = DEFAULT_LIMIT,
  }: { skip?: number; limit?: number } = {}): Promise<ProductListResponse> {
    if (!isValidPositiveInt(skip) || !isValidPositiveInt(limit)) {
      throw new Error("Invalid skip or limit parameter");
    }
    const res = await fetch(`${BASE_URL}?skip=${skip}&limit=${limit}`);
    if (!res.ok) throw new Error("Failed to fetch products");
    return res.json();
  },

  async getById(id: number): Promise<ProductDetailResponse> {
    if (!isValidPositiveInt(id)) {
      throw new Error("Invalid product id");
    }
    const res = await fetch(`${BASE_URL}/${id}`);
    if (!res.ok) throw new Error(`Failed to fetch product with id ${id}`);
    return res.json();
  },

  async search(
    query: string,
    {
      skip = DEFAULT_SKIP,
      limit = DEFAULT_LIMIT,
    }: { skip?: number; limit?: number } = {},
  ): Promise<ProductListResponse> {
    if (typeof query !== "string" || !query.trim()) {
      throw new Error("Query must be a non-empty string");
    }
    if (!isValidPositiveInt(skip) || !isValidPositiveInt(limit)) {
      throw new Error("Invalid skip or limit parameter");
    }
    const url = `${BASE_URL}/search?q=${encodeURIComponent(query)}&skip=${skip}&limit=${limit}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to search products");
    return res.json();
  },

  async getByCategory(
    category: string,
    {
      skip = DEFAULT_SKIP,
      limit = DEFAULT_LIMIT,
    }: { skip?: number; limit?: number } = {},
  ): Promise<ProductListResponse> {
    if (typeof category !== "string" || !category.trim()) {
      throw new Error("Category must be a non-empty string");
    }
    if (!isValidPositiveInt(skip) || !isValidPositiveInt(limit)) {
      throw new Error("Invalid skip or limit parameter");
    }
    const url = `${BASE_URL}/category/${encodeURIComponent(category)}?skip=${skip}&limit=${limit}`;
    const res = await fetch(url);
    if (!res.ok)
      throw new Error(`Failed to fetch products for category ${category}`);
    return res.json();
  },

  async getPaginated(
    skip: number,
    limit: number,
  ): Promise<ProductListResponse> {
    if (!isValidPositiveInt(skip) || !isValidPositiveInt(limit)) {
      throw new Error("Invalid skip or limit parameter");
    }
    const url = `${BASE_URL}?skip=${skip}&limit=${limit}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch paginated products");
    return res.json();
  },
};
