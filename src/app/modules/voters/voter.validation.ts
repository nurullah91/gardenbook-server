import { z } from 'zod';

// Voters validation schema
export const createVotersSchema = z.object({
  post: z.string().min(1, 'Post ID is required'),
  upVoters: z.array(z.string()).optional(),
  downVoters: z.array(z.string()).optional(),
});

export const votersSchema = {
  createVotersSchema,
};
