import mongoose, { Schema, model, Types } from 'mongoose';
import { IPayment } from './payments.interface';


const PaymentSchema = new Schema<IPayment>(
  {
    order: { 
      type: Schema.Types.ObjectId, 
      ref: 'Order', 
      required: true,
      index: true 
    },
    customer: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    paymentId: { 
      type: String, 
      required: true, 
      unique: true,
      default: () => `PAY-${Date.now()}-${Math.floor(Math.random() * 1000)}`
    },
    method: {
      type: String,
      enum: ['credit_card', 'debit_card', 'paypal', 'bank_transfer', 'cash_on_delivery', 'mobile_wallet'],
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'processing', 'completed', 'failed', 'refunded', 'partially_refunded'],
      default: 'pending'
    },
    amount: { 
      type: Number, 
      required: true,
      min: 0 
    },
    currency: {
      type: String,
      default: 'USD',
      enum: ['USD', 'EUR', 'GBP', 'BDT'], // Add other currencies as needed
      uppercase: true
    },
    transactionId: { 
      type: String, 
      index: true 
    },
    paymentDetails: {
      // Flexible structure for different payment methods
      cardLast4: { type: String },
      cardBrand: { type: String },
      paypalEmail: { type: String },
      bankName: { type: String },
      walletProvider: { type: String }
    },
    refunds: [{
      amount: { type: Number, required: true },
      reason: { type: String },
      processedAt: { type: Date },
      _id: false
    }],
    gatewayResponse: { 
      type: Schema.Types.Mixed // Raw response from payment processor
    },
    ipAddress: { type: String }, // For fraud detection
    metadata: { type: Schema.Types.Mixed } // Additional custom data
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true } 
  }
);

// Indexes for frequent queries
PaymentSchema.index({ customer: 1, status: 1 });
PaymentSchema.index({ transactionId: 1 }, { unique: true, sparse: true });

// Auto-update order payment status when payment is completed
PaymentSchema.post('save', async function(payment) {
  if (payment.status === 'completed') {
    await mongoose.model('Order').findByIdAndUpdate(
      payment.order,
      { 'payment.status': 'completed' }
    );
  }
});

export const Payment = model<IPayment>('Payment', PaymentSchema);