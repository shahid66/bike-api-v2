export type IProduct = {
  name: string;
  brand: string;
  price: number;
  category: 'Mountain' | 'Road' | 'Hybrid' | 'Electric';
  model: string;
  images: string[];
  description: string;
  quantity: number;
  inStock: boolean;
  offered: string;
  bestSell: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};
