import { Types } from 'mongoose';
import { TUser } from '../user/user.interface';

export type TPayment = {
  _id?: string;
  user: Types.ObjectId;
  email: string;
  txnId: string;
  paymentMethod: string;
  amount: number;
  paymentStatus: 'unpaid' | 'paid';
  isConfirmed: boolean;
};

export type TPaymentData = {
  _id?: string;
  user: TUser;
  email: string;
  txnId: string;
  amount: number;
  paymentStatus: 'unpaid' | 'paid';
  isConfirmed: boolean;
};
