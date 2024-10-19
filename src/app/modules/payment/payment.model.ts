import { model, Schema } from 'mongoose';
import { TPayment } from './payment.interface';

const PaymentSchema: Schema = new Schema<TPayment>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    email: { type: String, required: true },
    txnId: { type: String, required: true },
    amount: { type: Number, required: true },
    paymentMethod: { type: String, required: true },
    paymentStatus: { type: String, enum: ['unpaid', 'paid'], required: true },
    isConfirmed: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

export const Payment = model<TPayment>('Payment', PaymentSchema);
