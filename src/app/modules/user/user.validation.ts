import { z } from 'zod';

// Name schema
const nameSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  middleName: z.string().optional(),
  lastName: z.string().min(1, 'Last name is required'),
});

// User validation schema
export const createUserSchema = z.object({
  name: nameSchema,
  email: z.string().email('Invalid email address'),
  role: z.enum(['admin', 'user'], {
    message: 'Role must be either admin or user',
  }),
  phone: z
    .string()
    .max(15, 'Phone number cannot be more thant 15 characters long'),
  address: z.string().min(1, 'Address is required'),
  plan: z.enum(['basic', 'premium'], {
    message: 'Plan must be either basic or premium',
  }),
  planValidity: z.string().optional(),
  profilePhoto: z.string().url().optional(),
  coverPhoto: z.string().url().optional(),
});

export const userSchema = {
  createUserSchema,
};
