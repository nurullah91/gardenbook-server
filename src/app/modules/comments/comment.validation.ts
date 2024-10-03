import { z } from 'zod';

// Comment validation schema
export const createCommentSchema = z.object({
  post: z.string().min(1, 'Post ID is required'),
  comment: z.string().min(1, 'Comment cannot be empty'),
  upVoters: z.array(z.string()).optional(),
  downVoters: z.array(z.string()).optional(),
});

export const commentSchema = {
  createCommentSchema,
};
