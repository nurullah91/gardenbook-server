import { z } from 'zod';

// Post validation schema
export const createPostSchema = z.object({
  post: z.string().min(1, 'Post content is required'),
  postPhotos: z.array(z.string().url()).optional(),
  user: z.string().min(1, 'User ID is required'),
  category: z.string().min(1, 'Category is required'),
  contentType: z.enum(['free', 'premium'], {
    message: 'Content type must be either free or premium',
  }),
});
export const updatePostSchema = z.object({
  post: z.string().min(1, 'Post content is required').optional(),
  postPhotos: z.array(z.string().url()).optional(),
  category: z.string().min(1, 'Category is required').optional(),
  contentType: z
    .enum(['free', 'premium'], {
      message: 'Content type must be either free or premium',
    })
    .optional(),
});

export const postSchema = {
  createPostSchema,
  updatePostSchema,
};
