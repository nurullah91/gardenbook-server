import handleAsync from '../../utils/handleAsync';
import responseSender from '../../utils/responseSender';
import httpStatus from 'http-status';
import { PostServices } from './post.service';
import { Express } from 'express';

const createPost = handleAsync(async (req, res) => {
  const images = req.files as Express.Multer.File[];

  const postData = req.body;
  if (images?.length) {
    postData.postPhotos = images.map((image) => image.path);
  }
  const result = await PostServices.createPostIntoDB(postData);

  responseSender(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Post created successful',
    data: result,
  });
});

const getAllPosts = handleAsync(async (req, res) => {
  const result = await PostServices.getAllPostsFromDB(req.query);
  responseSender(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All posts are retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

const getUserPost = handleAsync(async (req, res) => {
  const { userId } = req.params;
  const result = await PostServices.getUserPostFromDB(userId);
  responseSender(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Posts are retrieved successfully',
    data: result,
  });
});
const getSinglePost = handleAsync(async (req, res) => {
  const { postId } = req.params;
  const result = await PostServices.getSinglePostFromDB(postId);

  responseSender(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Post is retrieved successfully',
    data: result,
  });
});

const updatePost = handleAsync(async (req, res) => {
  const { postId } = req.params;
  const images = req.files as Express.Multer.File[];

  const postData = req.body;

  if (images?.length) {
    postData.postPhotos = images.map((image) => image.path);
  }

  const result = await PostServices.updatePostInDB(postId as string, postData);

  responseSender(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Post updated successful',
    data: result,
  });
});

const deleteSinglePost = handleAsync(async (req, res) => {
  const { postId } = req.params;
  const result = await PostServices.deleteSinglePostFromDB(postId);
  responseSender(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Post is deleted successfully',
    data: result,
  });
});

// Controller to get posts by month
const getPostsByMonth = handleAsync(async (req, res) => {
  const result = await PostServices.getPostsByMonthFromDB();
  responseSender(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Posts by Month retrieved successfully',
    data: result,
  });
});

const getLatestPhotos = handleAsync(async (req, res) => {
  const result = await PostServices.getLatestPhotosFromDB();

  responseSender(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Latest photos retrieved successfully',
    data: result,
  });
});

export const PostController = {
  createPost,
  getLatestPhotos,
  updatePost,
  getUserPost,
  deleteSinglePost,
  getSinglePost,
  getPostsByMonth,
  getAllPosts,
};
