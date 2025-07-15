import { Schema, model, Types } from 'mongoose';
import { IOrder } from './orders.interface';
import { Delivery } from '../Delivery/delivery.model';

const OrderSchema = new Schema<IOrder>(
  {
    orderId: { 
      type: String, 
      required: true, 
      unique: true,
      default: () => `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`
    },
    customer: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    items: [{
      product: { 
        type: Types.ObjectId, 
        ref: 'Product', 
        required: true 
      },
      quantity: { 
        type: Number, 
        required: true, 
        min: 1 
      },
      unitPrice: { 
        type: Number, 
        required: true 
      },
      subtotal: { 
        type: Number, 
        required: true 
      }
    }],
    deliveryAddress: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true }
    },
    payment: {
      method: { 
        type: String, 
        enum: ['credit_card', 'paypal', 'cash_on_delivery'], 
        required: true 
      },
      status: { 
        type: String, 
        enum: ['pending', 'completed', 'failed', 'refunded'], 
        default: 'pending' 
      },
      transactionId: { type: String }
    },
    status: {
      type: String,
      enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
      default: 'pending'
    },
    totalAmount: { 
      type: Number, 
      required: true 
    },
    discount: { 
      type: Number, 
      default: 0 
    },
    deliveryFee: { 
      type: Number, 
      default: 0 
    },
    grandTotal: { 
      type: Number, 
      required: true 
    },
    notes: { 
      type: String 
    }
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true } 
  }
);

// Auto-calculate totals before save
OrderSchema.pre('save', function(next) {
  this.items.forEach(item => {
    item.subtotal = item.unitPrice * item.quantity;
  });
  this.grandTotal = this.totalAmount + this.deliveryFee - this.discount;
  next();
});


OrderSchema.post('save', async function(order) {
  await Delivery.create({
    order: order._id,
    deliveryAddress: order.deliveryAddress,
    deliveryFee: order.deliveryFee
  });
});




export const Order = model<IOrder>('Order', OrderSchema);