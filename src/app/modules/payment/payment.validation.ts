import { z } from 'zod';

// Payment validation schema
export const createPaymentSchema = z.object({
  user: z.string().min(1, 'User ID is required'),
  email: z.string().email('Invalid email address'),
  paymentMethod: z.string().min(1, 'Payment method is required'),
  amount: z.number().min(0, 'Amount must be a positive number'),
});

export const updatePaymentSchema = z.object({
  paymentMethod: z.string().min(1, 'Minimum 1 character need').optional(),
  amount: z.number().min(0, 'Amount must be a positive number').optional(),
  paymentStatus: z
    .enum(['unpaid', 'paid'], {
      message: 'Payment status must be either unpaid or paid',
    })
    .optional(),
  isConfirmed: z.boolean().optional(),
});

export const paymentSchema = {
  createPaymentSchema,
  updatePaymentSchema,
};
