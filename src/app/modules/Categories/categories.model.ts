import { Schema, model } from 'mongoose';
import { ICategory } from './categories.interface';


const CategorySchema = new Schema<ICategory>(
  {
    name: { 
      type: String, 
      required: true, 
      trim: true, 
      unique: true,
      index: true, 
      maxlength: 50,
    },
    description: { 
      type: String, 
      trim: true, 
      maxlength: 200,
    },
    image: { 
      type: String, 
      default: '',
    },
    isActive: { 
      type: Boolean, 
      default: true,
    },
  },
  { timestamps: true },
);

export const Category = model<ICategory>('Category', CategorySchema);