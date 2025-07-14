import { Schema, model, Types } from 'mongoose';
import { IProduct } from './products.interface';

const ProductSchema = new Schema<IProduct>(
  {
    name: { 
      type: String, 
      required: true,
      trim: true,
      max: 100,
      index: true,
    },
    sku: { 
      type: String, 
      required: true, 
      unique: true,
      trim: true,
      uppercase: true
    },
    category: { 
      type: Schema.Types.ObjectId, 
      ref: 'Category', 
      required: true,
      index: true, // Speeds up category-based queries
    },
    subCategories: [{ 
      type: Types.ObjectId, 
      ref: 'SubCategory',
      index: true, // Speeds up subcategory filtering
    }],
    price: { 
      type: Number, 
      required: true,
      min: 0, // Prevents negative prices
    },
    costPrice: { // Useful for profit calculations
      type: Number,
      min: 0,
    },
    unit: {
      type: String,
      required: true,
      enum: ['kg', 'gram', 'piece', 'dozen', 'litre', 'ml'],
      lowercase: true, // Ensures consistency
    },
    stock: { 
      type: Number, 
      required: true,
      min: 0, // Prevents negative stock
    },
    suppliers: [{
      supplier: { 
        type: Types.ObjectId, 
        ref: 'Supplier', 
        required: true 
      },
      supplyPrice: { 
        type: Number, 
        required: true,
        min: 0,
      },
      availableStock: { 
        type: Number, 
        default: 0,
        min: 0,
      },
      leadTime: { 
        type: Number, // Store in days (better for calculations than a string like "3-5 days")
      },
    }],
    origin: { 
      type: String, 
      required: true,
      trim: true,
    },
    description: { 
      type: String,
      trim: true,
      maxlength: 1000, // Prevents excessively long descriptions
    },
    images: { 
      type: [String], 
      default: [], 
      validate: [ // Ensures at least 1 image if required
        (val: string[]) => val.length > 0, 
        'At least one image is required',
      ],
    },
    isAvailable: { 
      type: Boolean, 
      default: true,
      index: true, // Speeds up filtering available products
    },
    discount: { 
      type: Number, 
      default: 0,
      min: 0,
      max: 100, // Ensures discount is a percentage (0-100)
    },
    tags: { 
      type: [String], 
      default: [],
      index: true, // Improves tag-based searches
    },
    ratings: { 
      type: Number, 
      default: 0,
      min: 0,
      max: 5, // Ensures ratings are within 0-5 range
    },
    reviewsCount: { 
      type: Number, 
      default: 0,
    },
    isOrganic: { 
      type: Boolean, 
      default: false,
      index: true, // Speeds up organic/non-organic filtering
    },
    deliveryTime: { 
      type: String, 
      trim: true,
    },
    // Additional useful fields:
    brand: { 
      type: Types.ObjectId, 
      ref: 'Brand',
    },
    weight: { // Useful for shipping calculations
      type: Number,
      min: 0,
    },
    barcode: { 
      type: String,
      unique: true,
      sparse: true, 
    },
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true }, 
    toObject: { virtuals: true },
  },
);


ProductSchema.virtual('discountedPrice').get(function() {
  const price = typeof this.price === 'number' ? this.price : 0;
  const discount = typeof this.discount === 'number' ? this.discount : 0;
  return price * (1 - discount / 100);
});

// Indexes for frequently queried fields
ProductSchema.index({ name: 'text', description: 'text', tags: 'text' }); // Full-text search

export const Product = model<IProduct>('Product', ProductSchema);