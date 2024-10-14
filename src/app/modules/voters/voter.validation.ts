import { z } from 'zod';

// Voters validation schema for creating/updating votes
const votersSchema = z.object({
  postId: z.string().min(1, 'Post ID is required'),
  userId: z.string().min(1, 'User ID is required'),
});
export const votersValidationSchema = {
  votersSchema,
};
