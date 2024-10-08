import { z } from 'zod';

// Follow validation schema
const followSchema = z.object({
  userId: z
    .string()
    .min(1, 'User ID is required')
    .nonempty('User ID cannot be empty'),
  targetUserId: z
    .string()
    .min(1, 'Target User ID is required')
    .nonempty('Target User ID cannot be empty'),
});

export const followValidationSchema = {
  followSchema,
};
