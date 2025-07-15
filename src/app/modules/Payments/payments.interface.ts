import { Document, Types } from 'mongoose';

export interface IPaymentDetails {
  cardLast4?: string;
  cardBrand?: string;
  paypalEmail?: string;
  bankName?: string;
  walletProvider?: string;
}

export interface IRefund {
  amount: number;
  reason?: string;
  processedAt?: Date;
}

export interface IPayment extends Document {
  order: Types.ObjectId;
  customer: Types.ObjectId;
  paymentId: string;
  method: 'credit_card' | 'debit_card' | 'paypal' | 'bank_transfer' | 'cash_on_delivery' | 'mobile_wallet';
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded' | 'partially_refunded';
  amount: number;
  currency: string;
  transactionId?: string;
  paymentDetails?: IPaymentDetails;
  refunds?: IRefund[];
  gatewayResponse?: any;
  ipAddress?: string;
  metadata?: any;
  createdAt: Date;
  updatedAt: Date;
}