import { z } from 'zod';

// Voters validation schema for creating/updating votes
const votersSchema = z.object({
  post: z.string().min(1, 'Post ID is required'),
  user: z.string().min(1, 'User ID is required'),
  voteType: z.enum(['upvote', 'downvote']),
});
export const votersValidationSchema = {
  votersSchema,
};
