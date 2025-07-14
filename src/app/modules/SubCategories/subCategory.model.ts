
import { Schema, model } from 'mongoose';

const SubcategorySchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, required: true }, // Or ObjectId if you use a Category collection
    description: { type: String },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Subcategory = model('Subcategory', SubcategorySchema);
