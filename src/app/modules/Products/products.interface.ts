

import { Types } from 'mongoose';

export interface TProduct {
  suppliers: Types.ObjectId[];
  name: string;
  sku: string;
  category: string;
  subCategories: Types.ObjectId[];
  price: number;
  unit: 'kg' | 'gram' | 'piece' | 'dozen';
  stock: number;
  origin: string;
  description?: string;
  image: string[];
  isAvailable?: boolean;
  discount?: number;
  tags?: string[];
  ratings?: number;
  reviewsCount?: number;
  isOrganic?: boolean;
  deliveryTime?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
