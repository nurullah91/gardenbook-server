import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TPost } from './post.interface';
import { User } from '../user/user.model';
import { Post } from './post.model';
import QueryBuilder from '../../builder/QueryBuilder';

const createPostIntoDB = async (payload: TPost) => {
  // check if the user is exist
  const user = await User.findById(payload?.user);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not Found');
  }
  const result = await Post.create(payload);

  return result;
};

const getAllPostsFromDB = async (query: Record<string, unknown>) => {
  const allPostsQuery = new QueryBuilder(
    Post.find({ isDeleted: false }).populate('user'),
    query,
  )
    .search(['post', 'category', 'contentType'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await allPostsQuery.countTotal();
  const result = await allPostsQuery.modelQuery;

  return {
    meta,
    result,
  };
};

const getUserPostFromDB = async (id: string) => {
  const result = await Post.find({ user: id, isDeleted: false })
    .populate('user')
    .sort({ createdAt: -1 });
  return result;
};

const getSinglePostFromDB = async (id: string) => {
  const result = await Post.findById(id).populate('user');
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

const deleteSinglePostFromDB = async (id: string) => {
  const result = await Post.findByIdAndUpdate(
    id,
    {
      isDeleted: true,
    },
    {
      new: true,
    },
  );

  return result;
};

// Fetch posts grouped by month
const getPostsByMonthFromDB = async () => {
  const postsByMonth = await Post.aggregate([
    {
      $group: {
        _id: { $month: '$createdAt' },
        postCount: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  return postsByMonth;
};

export const PostServices = {
  createPostIntoDB,
  getAllPostsFromDB,
  getUserPostFromDB,
  getSinglePostFromDB,
  getPostsByMonthFromDB,
  updatePostInDB,
  deleteSinglePostFromDB,
};
