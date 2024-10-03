import { Types } from 'mongoose';

export type TPayment = {
  _id: string;
  user: Types.ObjectId;
  email: string;
  txnId: string;
  amount: number;
  paymentStatus: 'unpaid' | 'paid';
  isConfirmed: boolean;
};
