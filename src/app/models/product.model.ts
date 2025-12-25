export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category?: string;
  imageUrl: string;
  rating: number;
  reviewsCount?: number;
  isFeatured?: boolean;
  isNew?: boolean;
}
