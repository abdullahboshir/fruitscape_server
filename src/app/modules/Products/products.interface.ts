import { Types } from 'mongoose';

interface SupplierInfo {
  supplier: Types.ObjectId;
  supplyPrice: number;
  availableStock?: number;
  leadTime?: number; // in days
}


export interface IProduct {
  name: string;
  sku: string;
  category: Types.ObjectId;
  subCategories?: Types.ObjectId[];
  price: number;
  costPrice?: number;
  unit: 'kg' | 'gram' | 'piece' | 'dozen' | 'litre' | 'ml';
  stock: number;
  suppliers?: SupplierInfo[];
  origin: string;
  description?: string;
  images: string[];
  isAvailable?: boolean;
  discount?: number;
  tags?: string[];
  ratings?: number;
  reviewsCount?: number;
  isOrganic?: boolean;
  deliveryTime?: string;
  brand?: Types.ObjectId;
  weight?: number;
  barcode?: string;
  createdAt?: Date;
  updatedAt?: Date;
}


export interface IProductResponse extends IProduct {
  discountedPrice?: number;
}