import { Schema, model, Types } from 'mongoose';
import { IDelivery } from './delivery.interface';
import { Order } from '../Orders/orders.model';

const DeliverySchema = new Schema<IDelivery>(
  {
    order: { 
      type: Schema.Types.ObjectId, 
      ref: 'Order', 
      required: true,
      index: true 
    },
    courier: { 
      type: Types.ObjectId, 
      ref: 'Courier',
      index: true 
    },
    trackingNumber: { 
      type: String, 
      unique: true,
      sparse: true 
    },
    status: {
      type: String,
      enum: ['pending', 'dispatched', 'in_transit', 'out_for_delivery', 'delivered', 'failed'],
      default: 'pending'
    },
    estimatedDelivery: { 
      type: Date 
    },
    actualDelivery: { 
      type: Date 
    },
    deliveryProof: {
      image: { type: String },
      signature: { type: String },
      notes: { type: String }
    },
    deliveryAddress: {
      type: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true },
        coordinates: { 
          type: [Number],  // [longitude, latitude]
          index: '2dsphere'
        }
      },
      required: true
    },
    deliveryFee: { 
      type: Number, 
      required: true,
      min: 0 
    },
    distance: {  // in kilometers
      type: Number,
      min: 0
    },
    timeToDelivery: {  // in minutes
      type: Number,
      min: 0
    },
    attempts: { 
      type: Number, 
      default: 0 
    },
    failureReason: {
      type: String,
      enum: ['unavailable', 'wrong_address', 'rejected', 'damaged', 'other']
    }
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true } 
  }
);



// Auto-populate order details when querying
DeliverySchema.pre(/^find/, function(next) {
  (this as any).populate('order', 'orderId status grandTotal');
  next();
});

DeliverySchema.post('findOneAndUpdate', async function(doc) {
  if (doc.status === 'delivered') {
    await Order.findByIdAndUpdate(doc.order, { status: 'delivered' });
  }
});

export const Delivery = model<IDelivery>('Delivery', DeliverySchema);