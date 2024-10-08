import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { Post } from '../post/post.model';
import { TComment } from './comment.interface';
import { Comment } from './comment.mode';
import { Types } from 'mongoose';

const createComment = async (payload: TComment) => {
  // Check if user and post exist
  const user = await User.findById(payload.user);
  const post = await Post.findById(payload.post);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  if (!post) {
    throw new AppError(httpStatus.NOT_FOUND, 'Post not found');
  }

  const newComment = await Comment.create(payload);
  return newComment;
};

const updateComment = async (commentId: string, payload: Partial<TComment>) => {
  const comment = await Comment.findById(commentId);

  if (!comment) {
    throw new AppError(httpStatus.NOT_FOUND, 'Comment not found');
  }

  const updatedComment = await Comment.findByIdAndUpdate(commentId, payload, {
    new: true,
  });
  return updatedComment;
};

// Handle upvote/downvote logic

const voteOnComment = async (
  commentId: string,
  userId: string,
  voteType: 'upvote' | 'downvote',
) => {
  const comment = await Comment.findById(commentId);
  const userObjectId = new Types.ObjectId(userId);

  if (!comment) {
    throw new AppError(httpStatus.NOT_FOUND, 'Comment not found');
  }

  const isUpvoted = comment.upVoters.some((id) => id.equals(userObjectId));
  const isDownvoted = comment.downVoters.some((id) => id.equals(userObjectId));

  if (voteType === 'upvote') {
    if (isUpvoted) {
      // If user already upvoted, remove from upVoters
      comment.upVoters = comment.upVoters.filter(
        (id) => !id.equals(userObjectId),
      );
    } else {
      // If previously downvoted, remove from downVoters
      if (isDownvoted) {
        comment.downVoters = comment.downVoters.filter(
          (id) => !id.equals(userObjectId),
        );
      }

      // Add to upVoters (only if not upvoted yet)
      comment.upVoters.push(userObjectId);
    }
  } else if (voteType === 'downvote') {
    if (isDownvoted) {
      // If user already downvoted, remove from downVoters
      comment.downVoters = comment.downVoters.filter(
        (id) => !id.equals(userObjectId),
      );
    } else {
      // If previously upvoted, remove from upVoters
      if (isUpvoted) {
        comment.upVoters = comment.upVoters.filter(
          (id) => !id.equals(userObjectId),
        );
      }

      // Add to downVoters (only if not downvoted yet)
      comment.downVoters.push(userObjectId);
    }
  }

  await comment.save();
  return comment;
};

export const CommentServices = {
  createComment,
  updateComment,
  voteOnComment,
};
