import { Document, Types } from 'mongoose';

export interface ISubcategory extends Document {
  name: string;
  slug: string;
  category: Types.ObjectId
  description?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}