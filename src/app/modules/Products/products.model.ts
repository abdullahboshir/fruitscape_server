// models/product.model.ts

import { Schema, model, Types } from 'mongoose'

const ProductSchema = new Schema(
  {
    suppliers: [
  {
    supplier: { type: Types.ObjectId, ref: 'Supplier', required: true },
    supplyPrice: { type: Number, required: true },
    availableStock: { type: Number, default: 0 },
    leadTime: { type: String },
  }
],
    name: { type: String, required: true },
    sku: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    subCategories: [{ type: Types.ObjectId, ref: 'Subcategory' }],
    price: { type: Number, required: true },
    unit: {
      type: String,
      required: true,
      enum: ['kg', 'gram', 'piece', 'dozen'],
    },
    stock: { type: Number, required: true },
    origin: { type: String, required: true },
    description: { type: String },
    image: { type: [String], required: true, default: [] },
    isAvailable: { type: Boolean, default: true },
    discount: { type: Number, default: 0 },
    tags: { type: [String], default: [] },
    ratings: { type: Number, default: 0 },
    reviewsCount: { type: Number, default: 0 },
    isOrganic: { type: Boolean, default: false },
    deliveryTime: { type: String },
  },
  { timestamps: true },
)

export const Product = model('Product', ProductSchema)
