import { z } from 'zod';

// Name schema
const nameSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  middleName: z.string().optional(),
  lastName: z.string().min(1, 'Last name is required'),
});

// User validation schema
const createUserSchema = z.object({
  password: z.string().min(6, 'At least 6 password is required'),
  name: nameSchema,
  email: z.string().email('Invalid email address'),
  role: z
    .enum(['admin', 'user'], {
      message: 'Role must be either admin or user',
    })
    .optional(),
  phone: z
    .string()
    .max(15, 'Phone number cannot be more thant 15 characters long'),
  address: z.string().min(1, 'Address is required'),
  plan: z
    .enum(['basic', 'premium'], {
      message: 'Plan must be either basic or premium',
    })
    .optional(),
  planValidity: z.string().optional(),
  bio: z.string().optional(),
  profilePhoto: z.string().url().optional(),
  coverPhoto: z.string().url().optional(),
  status: z
    .enum(['active', 'blocked'], {
      message: 'Status must be either active or blocked',
    })
    .optional(),
  isDeleted: z.boolean().optional(),
});

// Name schema
const updateNameSchema = z.object({
  firstName: z.string().min(1, 'First name is required').optional(),
  middleName: z.string().optional(),
  lastName: z.string().min(1, 'Last name is required').optional(),
});

// User validation schema
const updateUserSchema = z.object({
  password: z.string().min(6, 'At least 6 password is required').optional(),
  name: updateNameSchema.optional(),
  email: z.string().email('Invalid email address').optional(),
  role: z
    .enum(['admin', 'user'], {
      message: 'Role must be either admin or user',
    })
    .optional(),
  phone: z
    .string()
    .max(15, 'Phone number cannot be more thant 15 characters long')
    .optional(),
  address: z.string().min(1, 'Address is required').optional(),
  plan: z
    .enum(['basic', 'premium'], {
      message: 'Plan must be either basic or premium',
    })
    .optional(),
  planValidity: z.string().optional(),
  bio: z.string().optional(),
  profilePhoto: z.string().url().optional(),
  coverPhoto: z.string().url().optional(),
  status: z
    .enum(['active', 'blocked'], {
      message: 'Status must be either active or blocked',
    })
    .optional(),
  isDeleted: z.boolean().optional(),
});

const loginUserSchema = z.object({
  password: z.string().nonempty('Password cannot be empty'),
  email: z.string().email('Invalid email address'),
});

export const userSchema = {
  createUserSchema,
  updateUserSchema,
  loginUserSchema,
};
