import { Document, Types } from 'mongoose';

export interface IOrderItem {
  product: Types.ObjectId;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface IDeliveryAddress {
  street: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface IPaymentInfo {
  method: 'credit_card' | 'paypal' | 'cash_on_delivery';
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  transactionId?: string;
}

export interface IOrder extends Document {
  orderId: string;
  customer: Types.ObjectId;
  items: IOrderItem[];
  deliveryAddress: IDeliveryAddress;
  payment: IPaymentInfo;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  totalAmount: number;
  discount: number;
  deliveryFee: number;
  grandTotal: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}