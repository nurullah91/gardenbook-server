import { z } from 'zod';

// Followers validation schema
export const createFollowersSchema = z.object({
  user: z.string().min(1, 'User ID is required'),
  followers: z.array(z.string()).optional(),
  following: z.array(z.string()).optional(),
});

export const followersSchema = {
  createFollowersSchema,
};
