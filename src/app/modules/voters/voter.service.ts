import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Post } from '../post/post.model';
import { Voter } from './voters.model';

const upvotePost = async (userId: string, postId: string) => {
  // Check if the post exists
  const post = await Post.findById(postId);
  if (!post) {
    throw new AppError(httpStatus.NOT_FOUND, 'Post not found');
  }

  // Check if the user has already upvoted the post
  const existingVote = await Voter.findOne({ user: userId, post: postId });
  if (existingVote) {
    if (existingVote.type === 'upvote') {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'You have already upvoted this post',
      );
    } else if (existingVote.type === 'downvote') {
      // Remove downvote
      await Voter.findByIdAndDelete(existingVote._id);
      post.downvoteCount -= 1;
    }
  }

  // Add upvote
  await Voter.create({ user: userId, post: postId, type: 'upvote' });
  post.upvoteCount += 1;
  await post.save();

  return post;
};

const downvotePost = async (userId: string, postId: string) => {
  const post = await Post.findById(postId);
  if (!post) {
    throw new AppError(httpStatus.NOT_FOUND, 'Post not found');
  }

  // Check if the user has already downvoted the post
  const existingVote = await Voter.findOne({ user: userId, post: postId });
  if (existingVote) {
    if (existingVote.type === 'downvote') {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'You have already downvoted this post',
      );
    } else if (existingVote.type === 'upvote') {
      // Remove upvote
      await Voter.findByIdAndDelete(existingVote._id);
      post.upvoteCount -= 1;
    }
  }

  // Add downvote
  await Voter.create({ user: userId, post: postId, type: 'downvote' });
  post.downvoteCount += 1;
  await post.save();

  return post;
};

const getAllVotersOfAPost = async (postId: string) => {
  // Find all upvoters and downvoters for the post
  const upVoters = await Voter.find({ post: postId, type: 'upvote' }).populate(
    'user',
  );
  const downVoters = await Voter.find({
    post: postId,
    type: 'downvote',
  }).populate('user');

  // Check if voters exist for the post
  if (!upVoters.length && !downVoters.length) {
    throw new AppError(httpStatus.NOT_FOUND, 'No voters found for this post');
  }

  // Return upvoters and downvoters
  return {
    upVoters: upVoters.map((voter) => voter.user),
    downVoters: downVoters.map((voter) => voter.user),
  };
};

export const VoteServices = {
  upvotePost,
  getAllVotersOfAPost,
  downvotePost,
};
