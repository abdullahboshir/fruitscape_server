import { Document, Types } from 'mongoose';

export interface IDeliveryAddress {
  street: string;
  city: string;
  postalCode: string;
  country: string;
  coordinates?: [number, number]; // [lng, lat]
}

export interface IDeliveryProof {
  image?: string;
  signature?: string;
  notes?: string;
}

export interface IDelivery extends Document {
  order: Types.ObjectId;
  courier?: Types.ObjectId;
  trackingNumber?: string;
  status: 'pending' | 'dispatched' | 'in_transit' | 'out_for_delivery' | 'delivered' | 'failed';
  estimatedDelivery?: Date;
  actualDelivery?: Date;
  deliveryProof?: IDeliveryProof;
  deliveryAddress: IDeliveryAddress;
  deliveryFee: number;
  distance?: number;
  timeToDelivery?: number;
  attempts: number;
  failureReason?: 'unavailable' | 'wrong_address' | 'rejected' | 'damaged' | 'other';
  createdAt: Date;
  updatedAt: Date;
}