import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TPost } from './post.interface';
import { User } from '../user/user.model';
import { Post } from './post.model';

const createPostIntoDB = async (payload: TPost) => {
  // check if the user is exist
  const user = await User.findById(payload?.user);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not Found');
  }
  const result = await Post.create(payload);

  return result;
};

const updatePostInDB = async (postId: string, payload: Partial<TPost>) => {
  // Check if the post exists by ID
  const post = await Post.findById(postId);

  if (!post) {
    throw new AppError(httpStatus.NOT_FOUND, 'Post not found');
  }

  // Update post
  const result = await Post.findByIdAndUpdate(postId, payload, {
    new: true,
  });

  if (!result) {
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to update post',
    );
  }

  // Return updated post
  return result;
};

export const PostServices = {
  createPostIntoDB,
  updatePostInDB,
};
