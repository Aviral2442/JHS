// types/service.types.ts
export interface Service {
  id: string;
  name: string;
  slug: string;
  description: string;
  subCategories: SubCategory[];
}

export interface SubCategory {
  id: string;
  name: string;
  slug: string;
  serviceId: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  serviceId: string;
  subCategoryId: string;
  image: string;
  rating: number;
  reviews: number;
  duration: string; // e.g., "2 hours", "1 day"
  popular: boolean;
  featured: boolean;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

export type FilterState = {
  service: string | null;
  subCategory: string | null;
  minPrice: number;
  maxPrice: number;
  sortBy: 'popular' | 'price_low' | 'price_high' | 'rating';
  search: string;
};