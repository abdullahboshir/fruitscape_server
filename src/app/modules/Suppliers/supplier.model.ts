// models/supplier.model.ts

import { Schema, model } from 'mongoose';

const SupplierSchema = new Schema(
  {
    name: { type: String, required: true },
    code: {
  type: String,
  required: true,
  unique: true,
  uppercase: true,
  trim: true
},
    contactPerson: { type: String },
    phone: { type: String },
    email: { type: String },
    address: { type: String },
    country: { type: String, require: true, default: 'BD' },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Supplier = model('Supplier', SupplierSchema);
